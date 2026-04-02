import { unstable_cache } from "next/cache";

export type PubType = "J" | "C" | "W" | "P" | "?";

export type ScholarPub = {
  title: string;
  scholarUrl: string; // absolute URL to paper on Google Scholar
  authors: string;
  venue: string;
  year: number; // 0 = unknown (preprint, in-press)
  citedBy: number; // 0 = not cited or unknown
  type: PubType;
};

/**
 * Infer publication type from venue string.
 * J = Journal, C = Conference/Symposium, W = Workshop, P = Patent, ? = Other
 */
function inferPubType(venue: string): PubType {
  if (!venue) return "?";

  // Patent
  if (/patent|特許|特開/i.test(venue)) return "P";

  // Journal — explicit markers
  if (/journal|transactions?|論文誌|^sensors\s+\d/i.test(venue)) return "J";

  // Workshop — explicit "workshop" keyword
  if (/\bworkshop\b/i.test(venue)) return "W";

  // Conference / Symposium / Proceedings
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

const SCHOLAR_URL =
  "https://scholar.google.co.jp/citations?user=VhHsUvsAAAAJ&hl=ja&oi=ao&pagesize=100&sortby=pubdate";

const SCHOLAR_BASE = "https://scholar.google.co.jp";

/** Decode common HTML entities in Scholar output */
function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

async function _fetchScholarPublications(): Promise<ScholarPub[]> {
  try {
    const res = await fetch(SCHOLAR_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "ja,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.warn(
        `[fetchScholar] HTTP ${res.status} from Google Scholar — falling back to empty list`
      );
      return [];
    }

    const html = await res.text();

    // Split on each publication row — each row starts with class="gsc_a_tr"
    const rowChunks = html.split('class="gsc_a_tr"');
    // The first chunk is everything before the first row (header etc.) — skip it
    const rows = rowChunks.slice(1);

    if (rows.length === 0) {
      console.warn(
        "[fetchScholar] No publication rows found — Scholar may have returned a CAPTCHA or changed its HTML structure"
      );
      return [];
    }

    const pubs: ScholarPub[] = [];

    for (const row of rows) {
      // ── Title and Scholar URL ──────────────────────────────────────────
      // Actual HTML: <a href="/citations?..." class="gsc_a_at">Title</a>
      // href comes BEFORE class in Scholar's HTML output.
      // Step 1: find the full opening <a> tag that contains class="gsc_a_at"
      const openTagMatch = row.match(/<a\b[^>]*class="gsc_a_at"[^>]*>/);
      if (!openTagMatch) continue;

      // Step 2: extract href from that opening tag (contains &amp; entities)
      const hrefMatch = openTagMatch[0].match(/href="([^"]+)"/);
      if (!hrefMatch) continue;
      const relativeUrl = decodeHtml(hrefMatch[1]); // decode &amp; in URL

      // Step 3: extract title text between the <a> and </a>
      const titleMatch = row.match(/<a\b[^>]*class="gsc_a_at"[^>]*>([^<]+)<\/a>/);
      if (!titleMatch) continue;
      const title = decodeHtml(titleMatch[1]);
      if (!title) continue;

      const scholarUrl = relativeUrl.startsWith("/")
        ? SCHOLAR_BASE + relativeUrl
        : relativeUrl;

      // ── Authors & Venue (first and second .gs_gray divs) ───────────────
      const grayMatches = [
        ...row.matchAll(/class="gs_gray"[^>]*>([^<]*)</g),
      ];
      const authors = grayMatches[0]
        ? decodeHtml(grayMatches[0][1])
        : "";
      const venue = grayMatches[1]
        ? decodeHtml(grayMatches[1][1])
        : "";

      // ── Citation count ─────────────────────────────────────────────────
      // Matches the <a> inside the gsc_a_c cell that contains a number
      let citedBy = 0;
      const citCell = row.match(/class="gsc_a_c"[^>]*>([\s\S]*?)<\/td/);
      if (citCell) {
        const citNum = citCell[1].match(/<a[^>]*>(\d+)<\/a>/);
        if (citNum) citedBy = parseInt(citNum[1], 10);
      }

      // ── Year ────────────────────────────────────────────────────────────
      let year = 0;
      const yearCell = row.match(/class="gsc_a_y"[^>]*>[\s\S]*?<span[^>]*>(\d{4})<\/span>/);
      if (yearCell) year = parseInt(yearCell[1], 10);

      pubs.push({ title, scholarUrl, authors, venue, year, citedBy, type: inferPubType(venue) });
    }

    // Sort: year descending, then citedBy descending within same year
    pubs.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.citedBy - a.citedBy;
    });

    return pubs;
  } catch (err) {
    console.warn("[fetchScholar] Fetch/parse failed:", err);
    return [];
  }
}

/**
 * Fetch publications from Google Scholar profile.
 * Cached for 24 hours via unstable_cache (Next.js previous caching model).
 * Always resolves — returns [] on any error.
 */
export const fetchScholarPublications = unstable_cache(
  _fetchScholarPublications,
  ["scholar-pubs-VhHsUvsAAAAJ"],
  { revalidate: 86400 } // 24 hours
);
