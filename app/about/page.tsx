import type { Metadata } from "next";
import { FloralCorner, FloralDivider } from "@/components/FloralDecor";

export const metadata: Metadata = {
  title: "研究内容",
  description: "HCI・Cultural Computing・行動変容・情報デザイン・スマートシティ等の研究内容を紹介します。",
};

const researchAreas = [
  {
    id: "hci",
    icon: "◎",
    en: "Human-Computer Interaction",
    ja: "ヒューマン・コンピュータ・インタラクション",
    color: "#E3BAC6",
    desc: [
      "人と情報技術のインタフェースを多角的に研究します。身体的インタラクション、タンジブルUI、拡張現実(AR)など、従来の画面とキーボードを超えた新しいインタラクションを探求します。",
      "ユーザスタディ・プロトタイピング・評価手法を組み合わせ、日常生活に溶け込む自然なインタフェースの設計原理を明らかにします。",
    ],
    keywords: ["Tangible UI", "Embodied Interaction", "AR/MR", "User Study", "Prototyping"],
  },
  {
    id: "cultural",
    icon: "✿",
    en: "Cultural Computing",
    ja: "文化コンピューティング",
    color: "#BC9EC1",
    desc: [
      "文化体験や芸術表現を融合させる新しい研究分野です。文化的知識の表現・伝承・創造を計算論的アプローチで捉えます。",
      "特に、日本の伝統芸道（華道・茶道・書道など）に着目し、デジタル技術を融合することで、幅広い人に芸道を体験できるような環境を構築したり、暗黙知の可視化や対話的な学習・体験環境の構築など、多様な角度から研究を進めています。",
    ],
    keywords: ["Cultural Heritage", "Intangible Heritage", "Visualization", "伝統芸道"],
  },
  {
    id: "behavior",
    icon: "⟳",
    en: "Behavior Change",
    ja: "行動変容",
    color: "#D4B8D8",
    desc: [
      "情報技術を活用して人々の健康・環境・社会的行動をポジティブな方向へ促す「説得的テクノロジー」を研究します。",
      "各種センサを用いた生体情報の計測やゲーミフィケーション、HCIのアプローチを組み合わせ、継続的な行動変容を支援するシステムのデザインと評価を行います。",
    ],
    keywords: ["Persuasive Technology", "Nudge", "Health Behavior", "Gamification", "Self-regulation"],
  },
  {
    id: "infodesign",
    icon: "◈",
    en: "Information Design",
    ja: "情報デザイン",
    color: "#E3BAC6",
    desc: [
      "複雑なデータや情報を、視覚的・直感的に理解できる形で伝えるデザイン手法を研究します。データビジュアライゼーション、インフォグラフィクス、インタラクティブな情報表現が研究の中心です。",
      "特にアクセシビリティと包括的デザインの観点から、多様な人々が情報にアクセスできる表現形式を探求します。",
    ],
    keywords: ["Data Visualization", "Infographics", "Accessibility", "Information Architecture", "Visual Communication"],
  },
  {
    id: "smartcity",
    icon: "◉",
    en: "Smart City & Slow Digital",
    ja: "スマートシティにおけるスローデジタル",
    color: "#BC9EC1",
    desc: [
      "IoTやビッグデータ等のテクノロジーを活用した都市・社会課題の解決と、人間中心の都市空間デザインを研究します。",
      "特に、都市生活の中で人が心にゆとりや感受能力を醸成するためのテクノロジーのあり方について探求しています。",
    ],
    keywords: ["IoT", "Urban Computing", "Slow Digital", "Participatory Design", "Wellbeing"],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#FDE8E9] via-[#FDE8E9]/50 to-[#FEFAF9] overflow-hidden">
        <FloralCorner className="absolute right-0 top-0 w-40 opacity-40 pointer-events-none" />
        <FloralCorner className="absolute left-0 bottom-0 w-32 opacity-30 pointer-events-none rotate-180" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium tracking-[0.3em] text-[#BC9EC1] uppercase mb-3">
            Research
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1B3F] mb-4">
            研究内容
          </h1>
        </div>
      </section>

      {/* Research Philosophy */}
      <section className="py-16 bg-[#FEFAF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#EDD8E8] p-8 sm:p-12 relative overflow-hidden">
            <FloralCorner className="absolute right-0 bottom-0 w-28 opacity-20 pointer-events-none" />
            <h2 className="text-xl font-bold text-[#3D1B3F] mb-4">
              研究室の理念
            </h2>
            <div className="space-y-4 text-[#6E4B7A] leading-relaxed relative">
              <p>
                テクノロジーは、文化・社会・人間の営みと切り離して考えることはできません。
                私たちの研究室では、<strong className="text-[#3D1B3F]">Human-Computer Interaction（HCI）</strong>を基盤としながら、
                華道・香道などの文化体験を拡張・深化するインタラクションと生活者・環境に密着した心を豊かにする技術を探求します。
              </p>
              {/* <p>
                特に、日本が世界に誇る伝統芸道「<strong className="text-[#3D1B3F]">華道（生け花）</strong>」との融合研究は、
                本研究室の独自性であり、身体・感性・美意識とデジタル技術を結びつける
                新しい研究フロンティアを切り拓いていきたいと考えています。
              </p> */}
            </div>
            {/* Three pillars */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: "天", desc: "最も高く，主となる線", sub: "Technology", color: "#E3BAC6" },
                { label: "地", desc: "土台", sub: "Culture", color: "#BC9EC1" },
                { label: "人", desc: "人間・調和", sub: "Human", color: "#D4B8D8" },
              ].map((pillar) => (
                <div key={pillar.label} className="text-center">
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold text-white shadow-sm"
                    style={{ backgroundColor: pillar.color }}
                  >
                    {pillar.label}
                  </div>
                  <p className="text-xs text-[#BC9EC1] font-medium">{pillar.sub}</p>
                  <p className="text-xs text-[#9B7AA5] mt-1">{pillar.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#BC9EC1] text-center mt-4 italic">
              ― いけばなの思想を研究の指針に
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-[#FDE8E9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#3D1B3F]">研究分野</h2>
          </div>
          <div className="space-y-8">
            {researchAreas.map((area, i) => (
              <div
                key={area.id}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-6 bg-white rounded-2xl border border-[#EDD8E8] overflow-hidden hover:shadow-md hover:shadow-[#E3BAC6]/20 transition-shadow duration-300`}
              >
                {/* Color accent panel */}
                <div
                  className="lg:w-48 shrink-0 flex flex-col items-center justify-center py-10 px-6"
                  style={{ backgroundColor: area.color + "30" }}
                >
                  <div
                    className="text-4xl mb-3"
                    style={{ color: area.color }}
                  >
                    {area.icon}
                  </div>
                  <p className="text-xs font-bold text-[#3D1B3F] text-center mb-1">
                    {area.en}
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-[#3D1B3F] mb-1">
                    {area.ja}
                  </h3>
                  <div className="space-y-3 mt-3">
                    {area.desc.map((p, j) => (
                      <p key={j} className="text-sm text-[#6E4B7A] leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {area.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1 rounded-full text-xs border font-medium"
                        style={{
                          borderColor: area.color,
                          color: "#6E4B7A",
                          backgroundColor: area.color + "15",
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloralDivider className="w-full max-w-2xl mx-auto opacity-40 my-8" />
    </>
  );
}
