import Link from "next/link";
import Image from "next/image";
import { FloralDivider, SakuraIcon, AoiIcon } from "@/components/FloralDecor";

const researchAreas = [
  {
    icon: <SakuraIcon color="#E3BAC6" size={20} />,
    title: "HCI",
    titleJa: "ヒューマン・コンピュータ・インタラクション",
    desc: "人と情報技術の関わりを探求し、より自然で豊かなインタラクションの設計・評価を行います。",
    color: "#E3BAC6",
  },
  {
    icon: <AoiIcon color="#BC9EC1" size={20} />,
    title: "Cultural Computing",
    titleJa: "文化コンピューティング",
    desc: "文化体験や芸術表現を融合させ、文化の継承と創造を支援する新たな手法を研究します。",
    color: "#BC9EC1",
  },
  {
    icon: <SakuraIcon color="#D4B8D8" size={20} />,
    title: "Behavior Change",
    titleJa: "行動変容",
    desc: "情報技術を活用して人々の行動・習慣をポジティブな方向へ導く説得的デザインを探求します。",
    color: "#D4B8D8",
  },
  {
    icon: <AoiIcon color="#E3BAC6" size={20} />,
    title: "Information Design",
    titleJa: "情報デザイン",
    desc: "複雑なデータや情報を、視覚的・直感的に伝えるデザイン手法と表現形式を研究します。",
    color: "#E3BAC6",
  },
  {
    icon: <SakuraIcon color="#BC9EC1" size={20} />,
    title: "Smart City",
    titleJa: "スマートシティ",
    desc: "テクノロジーを活用した都市・社会課題の解決と、人間中心の都市空間デザインを研究します。",
    color: "#BC9EC1",
  },
  {
    icon: <AoiIcon color="#D4B8D8" size={20} />,
    title: "Ikebana × Digital",
    titleJa: "華道とデジタル技術",
    desc: "日本の伝統芸道「華道」とデジタル技術を融合させ、新しい表現・体験・学習環境を創出します。",
    color: "#D4B8D8",
  },
];

const latestNews = [
  {
    date: "2026.04.01",
    category: "お知らせ",
    title: "東京大学大学院 情報学環・学際情報学府 総合分析情報学コース 准教授として着任しました",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-[#FDE8E9] via-[#FEFAF9] to-[#FEFAF9]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: text */}
          <div className="flex-1 animate-fade-up">
            <p className="text-xs font-medium tracking-[0.3em] text-[#BC9EC1] uppercase mb-4">
              Yokokubo Laboratory,{" "}
              <br />
              Applied Computer Science Course, GSII, The University of Tokyo
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#3D1B3F] leading-tight mb-2">
              横窪研究室
            </h1>
            <p className="text-lg text-[#6E4B7A] mt-4 mb-8 leading-relaxed">
              人・文化・テクノロジーの交差点で、
              <br className="hidden sm:block" />
              新たな価値とインタラクションを創る。
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#BC9EC1] text-white text-sm font-medium hover:bg-[#A888B0] transition-colors shadow-sm shadow-[#BC9EC1]/30"
              >
                研究内容を見る
                <span className="text-xs opacity-75">→</span>
              </Link>
              <Link
                href="/members"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E3BAC6] text-[#6E4B7A] text-sm font-medium hover:bg-[#FDE8E9] transition-colors"
              >
                メンバー
              </Link>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mt-10 animate-fade-up-2">
              {["HCI", "Cultural Computing", "行動変容", "情報デザイン", "華道×Digital"].map(
                (kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-full text-xs text-[#6E4B7A] bg-white/70 border border-[#E3BAC6]/60"
                  >
                    {kw}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: research photos — 2-column staggered, no overlap, all 200px */}
          <div
            className="hidden lg:block relative shrink-0 animate-fade-up-1"
            style={{ width: 410, height: 620 }}
          >
            {[
              { src: "/images/Ikebana3DGS.png",    alt: "Ikebana × 3DGS",  left: 210, top: 0   },
              { src: "/images/eGenjiko.png",        alt: "eGenjiko",         left: 0,   top: 105 },
              { src: "/images/HappinessFinder.jpg", alt: "HappinessFinder",  left: 210, top: 210 },
              { src: "/images/CADo.png",            alt: "CADo",             left: 0,   top: 315 },
              { src: "/images/TracKenzan.gif",      alt: "TracKenzan",       left: 210, top: 420 },
            ].map((img) => (
              <div
                key={img.alt}
                className="absolute rounded-full overflow-hidden border-4 border-white shadow-lg shadow-[#E3BAC6]/40"
                style={{ width: 200, height: 200, left: img.left, top: img.top }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FEFAF9] to-transparent pointer-events-none" />
      </section>

      {/* ── Research Areas ── */}
      <section className="py-20 bg-[#FEFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.3em] text-[#BC9EC1] uppercase mb-2">
              Research
            </p>
            <h2 className="text-3xl font-bold text-[#3D1B3F]">研究分野</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="group bg-white rounded-2xl p-6 border border-[#EDD8E8] hover:shadow-md hover:shadow-[#E3BAC6]/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: area.color + "40" }}
                >
                  {area.icon}
                </div>
                <h3 className="font-semibold text-[#3D1B3F] text-sm mb-0.5">
                  {area.titleJa}
                </h3>
                <p className="text-xs text-[#BC9EC1] font-medium mb-3 tracking-wide">
                  {area.title}
                </p>
                <p className="text-sm text-[#6E4B7A] leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm text-[#BC9EC1] hover:text-[#6E4B7A] transition-colors font-medium"
            >
              研究内容の詳細を見る →
            </Link>
          </div>
        </div>
      </section>

      <FloralDivider className="w-full max-w-2xl mx-auto opacity-50" />

      {/* ── Latest News ── */}
      <section className="py-20 bg-[#FDE8E9]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-[#BC9EC1] uppercase mb-2">
                News
              </p>
              <h2 className="text-3xl font-bold text-[#3D1B3F]">最新情報</h2>
            </div>
            <Link
              href="/news"
              className="text-sm text-[#BC9EC1] hover:text-[#6E4B7A] transition-colors font-medium"
            >
              すべてのニュースを見る →
            </Link>
          </div>
          <div className="space-y-3">
            {latestNews.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 bg-white rounded-xl px-6 py-4 border border-[#EDD8E8] hover:border-[#E3BAC6] hover:shadow-sm transition-all duration-200"
              >
                <time className="text-xs text-[#BC9EC1] font-medium shrink-0 tracking-wide">
                  {item.date}
                </time>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#E3BAC6]/30 text-[#6E4B7A] font-medium shrink-0 w-fit">
                  {item.category}
                </span>
                <p className="text-sm text-[#3D1B3F]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
