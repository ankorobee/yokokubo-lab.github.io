import type { Metadata } from "next";
import { FloralCorner } from "@/components/FloralDecor";
import NewsClient from "./NewsClient";
import type { NewsItem } from "./NewsClient";

export const metadata: Metadata = {
  title: "ニュース",
  description: "研究室の最新情報・お知らせ・受賞・論文採択等のニュースをお届けします。",
};

const newsItems: NewsItem[] = [
  {
    date: "2026.04.01",
    category: "お知らせ",
    title: "東京大学大学院 情報学環・学際情報学府 総合分析情報学コース 准教授として着任しました",
  },
];

export default function NewsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#FDE8E9] via-[#FDE8E9]/50 to-[#FEFAF9] overflow-hidden">
        <FloralCorner className="absolute right-0 top-0 w-40 opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium tracking-[0.3em] text-[#BC9EC1] uppercase mb-3">
            News
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1B3F] mb-4">
            ニュース
          </h1>
        </div>
      </section>

      {/* News list */}
      <section className="py-16 bg-[#FEFAF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsClient items={newsItems} />
        </div>
      </section>
    </>
  );
}
