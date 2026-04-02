/**
 * Fetch publications from Google Scholar and save to lib/publications-cache.json
 * Run before `next build` in CI.
 */

import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = join(__dirname, "../lib/publications-cache.json");

const SCHOLAR_URL =
  "https://scholar.google.co.jp/citations?user=VhHsUvsAAAAJ&hl=ja&oi=ao&pagesize=100&sortby=pubdate";
const SCHOLAR_BASE = "https://scholar.google.co.jp";

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function inferPubType(venue) {
  if (!venue) return "?";
  if (/patent|特許|特開/i.test(venue)) return "P";
  if (/journal|transactions?|論文誌|^sensors\s+\d/i.test(venue)) return "J";
  if (/\bworkshop\b/i.test(venue)) return "W";
  if (
    /proceedings|conference|symposium|\bsymp\b|congress|^proc\./i.test(venue) ||
    /シンポジウム|全国大会|インタラクション|研究発表大会|論文集|マルチメディア.*分散|研究報告/i.test(venue) ||
    /healthinf|biosignals|wiss|eurographics|ipsj interaction|augmented humans/i.test(venue) ||
    /ieee \d{4}|behavior computing|human activity|intelligent environments/i.test(venue) ||
    /pervasive computing|affective computing|mechatronics|cognitive info/i.test(venue)
  )
    return "C";
  return "?";
}

async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      console.warn(`Attempt ${i + 1}: HTTP ${res.status}`);
    } catch (e) {
      console.warn(`Attempt ${i + 1} failed:`, e.message);
    }
    if (i < retries - 1) await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
  }
  return null;
}

async function main() {
  console.log("Fetching Google Scholar publications...");

  const res = await fetchWithRetry(SCHOLAR_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept-Language": "ja,en;q=0.9",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    signal: AbortSignal.timeout(20_000),
  });

  if (!res) {
    console.warn("All fetch attempts failed. Keeping existing cache.");
    process.exit(0);
  }

  const html = await res.text();
  const rowChunks = html.split('class="gsc_a_tr"');
  const rows = rowChunks.slice(1);

  if (rows.length === 0) {
    console.warn("No rows found (possible CAPTCHA). Keeping existing cache.");
    process.exit(0);
  }

  const pubs = [];
  for (const row of rows) {
    const openTagMatch = row.match(/<a\b[^>]*class="gsc_a_at"[^>]*>/);
    if (!openTagMatch) continue;
    const hrefMatch = openTagMatch[0].match(/href="([^"]+)"/);
    if (!hrefMatch) continue;
    const relativeUrl = decodeHtml(hrefMatch[1]);
    const titleMatch = row.match(/<a\b[^>]*class="gsc_a_at"[^>]*>([^<]+)<\/a>/);
    if (!titleMatch) continue;
    const title = decodeHtml(titleMatch[1]);
    if (!title) continue;
    const scholarUrl = relativeUrl.startsWith("/") ? SCHOLAR_BASE + relativeUrl : relativeUrl;

    const grayMatches = [...row.matchAll(/class="gs_gray"[^>]*>([^<]*)</g)];
    const authors = grayMatches[0] ? decodeHtml(grayMatches[0][1]) : "";
    const venue = grayMatches[1] ? decodeHtml(grayMatches[1][1]) : "";

    let citedBy = 0;
    const citCell = row.match(/class="gsc_a_c"[^>]*>([\s\S]*?)<\/td/);
    if (citCell) {
      const citNum = citCell[1].match(/<a[^>]*>(\d+)<\/a>/);
      if (citNum) citedBy = parseInt(citNum[1], 10);
    }

    let year = 0;
    const yearCell = row.match(/class="gsc_a_y"[^>]*>[\s\S]*?<span[^>]*>(\d{4})<\/span>/);
    if (yearCell) year = parseInt(yearCell[1], 10);

    pubs.push({ title, scholarUrl, authors, venue, year, citedBy, type: inferPubType(venue) });
  }

  pubs.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return b.citedBy - a.citedBy;
  });

  writeFileSync(CACHE_PATH, JSON.stringify(pubs, null, 2) + "\n");
  console.log(`Saved ${pubs.length} publications to cache.`);
}

main().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(0); // Don't fail the build
});
