"use client";

import { useState } from "react";

export type NewsItem = {
  date: string;
  category: string;
  title: string;
  desc?: string;
};

const categoryColors: Record<string, string> = {
  すべて: "#6E4B7A",
  論文採択: "#BC9EC1",
  受賞: "#E3BAC6",
  イベント: "#7FA67F",
  お知らせ: "#D4B8D8",
  メディア: "#BC9EC1",
};

export default function NewsClient({ items }: { items: NewsItem[] }) {
  const categories = ["すべて", ...Array.from(new Set(items.map((i) => i.category)))];
  const [active, setActive] = useState("すべて");

  const filtered =
    active === "すべて" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "bg-[#BC9EC1] text-white shadow-sm"
                : "bg-white border border-[#EDD8E8] text-[#6E4B7A] hover:bg-[#FDE8E9]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News list */}
      <div className="space-y-3">
        {filtered.map((item, i) => (
          <article
            key={i}
            className="bg-white rounded-xl border border-[#EDD8E8] hover:border-[#E3BAC6] hover:shadow-sm transition-all duration-200 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 p-5">
              <time className="text-xs text-[#BC9EC1] font-medium tracking-wide shrink-0 pt-0.5">
                {item.date}
              </time>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 flex-wrap">
                  <span
                    className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor:
                        (categoryColors[item.category] ?? "#BC9EC1") + "25",
                      color: categoryColors[item.category] ?? "#6E4B7A",
                    }}
                  >
                    {item.category}
                  </span>
                  <p className="text-sm text-[#3D1B3F] font-medium leading-snug">
                    {item.title}
                  </p>
                </div>
                {item.desc && (
                  <p className="text-sm text-[#6E4B7A] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#BC9EC1] py-12 text-sm">
            該当するニュースはありません。
          </p>
        )}
      </div>
    </div>
  );
}
