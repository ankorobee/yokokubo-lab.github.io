import type { Metadata } from "next";
import { FloralCorner, FloralDivider } from "@/components/FloralDecor";
import type { ScholarPub, PubType } from "@/lib/fetchScholar";
import { publications } from "@/lib/publications-data";

const typeConfig: Record<PubType, { label: string; labelJa: string; bg: string; text: string }> = {
  J: { label: "Journal",    labelJa: "論文誌",   bg: "#E3BAC6", text: "#3D1B3F" },
  C: { label: "Conference", labelJa: "会議",     bg: "#BC9EC1", text: "#3D1B3F" },
  W: { label: "Workshop",   labelJa: "WS",       bg: "#D4B8D8", text: "#3D1B3F" },
  P: { label: "Patent",     labelJa: "特許",     bg: "#7FA67F", text: "#fff"    },
  "?": { label: "Other",   labelJa: "その他",   bg: "#D8D0DC", text: "#3D1B3F" },
};

export const metadata: Metadata = {
  title: "業績",
  description: "研究室の論文・学会発表等の研究業績一覧です。Google Scholar より自動取得。",
};

function groupByYear(pubs: ScholarPub[]) {
  const map = new Map<number, ScholarPub[]>();
  for (const p of pubs) {
    const key = p.year === 0 ? -1 : p.year; // year=0 → special bucket
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  // Sort years descending; put -1 (unknown year) at the end
  return Array.from(map.entries()).sort((a, b) => {
    if (a[0] === -1) return 1;
    if (b[0] === -1) return -1;
    return b[0] - a[0];
  });
}

export default function PublicationsPage() {
  const pubs = publications;
  const grouped = groupByYear(pubs);

  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#FDE8E9] via-[#FDE8E9]/50 to-[#FEFAF9] overflow-hidden">
        <FloralCorner className="absolute right-0 top-0 w-40 opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium tracking-[0.3em] text-[#BC9EC1] uppercase mb-3">
            Publications
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1B3F] mb-4">
            業績
          </h1>
        </div>
      </section>

      {/* Attribution + Legend */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
          {/* Type legend */}
          <div className="flex flex-wrap items-center gap-2">
            {(Object.entries(typeConfig) as [PubType, typeof typeConfig[PubType]][]).map(([key, val]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: val.bg + "30", color: "#6E4B7A" }}
              >
                <span
                  className="inline-block w-5 h-5 rounded text-center text-[10px] font-bold leading-5"
                  style={{ backgroundColor: val.bg, color: val.text }}
                >
                  {key}
                </span>
                {val.labelJa}
              </span>
            ))}
          </div>
          <a
            href="https://scholar.google.co.jp/citations?user=VhHsUvsAAAAJ&hl=ja&oi=ao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#BC9EC1] hover:text-[#6E4B7A] transition-colors shrink-0"
          >
            Google Scholar →
          </a>
        </div>
      </div>

      {/* Publications */}
      <section className="py-8 pb-20 bg-[#FEFAF9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {pubs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#BC9EC1] text-sm mb-2">
                現在、業績情報はありません。
              </p>
            </div>
          ) : (
            grouped.map(([yearKey, yearPubs], yi) => (
              <div key={yearKey} className={yi > 0 ? "mt-14" : "mt-6"}>
                {/* Year heading */}
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-[#3D1B3F]">
                    {yearKey === -1 ? "プレプリント・掲載予定" : yearKey}
                  </h2>
                  <div className="h-px flex-1 bg-[#EDD8E8]" />
                </div>

                <ol className="space-y-4">
                  {yearPubs.map((pub, i) => (
                    <li
                      key={i}
                      className="flex gap-4 bg-white rounded-xl border border-[#EDD8E8] p-5 hover:border-[#E3BAC6] hover:shadow-sm transition-all duration-200"
                    >
                      {/* Type badge */}
                      <div className="shrink-0 mt-0.5">
                        {(() => {
                          const t = typeConfig[pub.type];
                          return (
                            <span
                              className="inline-block w-6 h-6 rounded text-center text-[11px] font-bold leading-6 shadow-sm"
                              style={{ backgroundColor: t.bg, color: t.text }}
                              title={t.label}
                            >
                              {pub.type}
                            </span>
                          );
                        })()}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <a
                          href={pub.scholarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#3D1B3F] leading-snug hover:text-[#BC9EC1] transition-colors"
                        >
                          {pub.title}
                        </a>
                        {pub.authors && (
                          <p className="text-xs text-[#6E4B7A] mt-1">
                            {pub.authors}
                          </p>
                        )}
                        {pub.venue && (
                          <p className="text-xs text-[#BC9EC1] mt-1 italic leading-relaxed">
                            {pub.venue}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))
          )}
        </div>
      </section>

      <FloralDivider className="w-full max-w-2xl mx-auto opacity-40 mb-8" />
    </>
  );
}
