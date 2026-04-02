import type { Metadata } from "next";
import Image from "next/image";
import { FloralCorner, FloralDivider } from "@/components/FloralDecor";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "メンバー",
  description: "研究室のメンバー紹介です。",
};

type Member = {
  name: string;
  nameEn: string;
  role: string;
  titleJa?: string;
  year?: string;
  interests: string[];
  bio?: string;
  color: string;
  initial: string;
  photo?: string;
};

const pi: Member = {
  name: "横窪 安奈 准教授",
  nameEn: "Anna Yokokubo, PhD",
  role: "Associate Professor",
  interests: ["HCI", "Cultural Computing", "Ikebana × Digital", "行動変容", "情報デザイン"],
  bio: "博士（理学）。2011年IPA未踏ユース事業にチーフクリエータとして採択。2012年から2017年までキヤノン株式会社にて研究開発に従事し、2015年にフィンランドのTurku University of Applied Sciencesで客員研究員を務める。2017年より青山学院大学理工学部助手・助教、2023年より東京大学大学院情報学環助教、2026年4月より東京大学大学院情報学環総合分析情報学コース准教授。専門はHCI、Cultural Computing、行動変容、情報デザイン、スマートシティ等。",
  color: "#BC9EC1",
  initial: "Y",
  photo: `${BASE}/images/yokokubo-square_2026.jpg`,
};

const docStudents: Member[] = [
  {
    name: "田中 慶一",
    nameEn: "Keiichi Tanaka",
    role: "博士課程3年",
    interests: ["Digital Ikebana", "Tangible UI", "文化的知識表現"],
    color: "#E3BAC6",
    initial: "T",
  },
];

const masterStudents: Member[] = [
  {
    name: "佐藤 美咲",
    nameEn: "Misaki Sato",
    role: "修士課程2年",
    interests: ["Cultural Heritage", "Participatory Design", "CSCW"],
    color: "#D4B8D8",
    initial: "S",
  },
  {
    name: "鈴木 大輔",
    nameEn: "Daisuke Suzuki",
    role: "修士課程2年",
    interests: ["Information Design", "Smart City", "Data Visualization"],
    color: "#E3BAC6",
    initial: "S",
  },
  {
    name: "伊藤 さくら",
    nameEn: "Sakura Ito",
    role: "修士課程1年",
    interests: ["Behavior Change", "Smart Home", "Ambient Display"],
    color: "#BC9EC1",
    initial: "I",
  },
  {
    name: "渡辺 優",
    nameEn: "Yu Watanabe",
    role: "修士課程1年",
    interests: ["Cultural Computing", "AR/MR", "Wearables"],
    color: "#D4B8D8",
    initial: "W",
  },
];

/* const undergrads: Member[] = [
  {
    name: "小林 陽菜",
    nameEn: "Hina Kobayashi",
    role: "学部4年",
    interests: ["HCI", "情報デザイン"],
    color: "#E3BAC6",
    initial: "K",
  },
  {
    name: "中村 颯太",
    nameEn: "Sota Nakamura",
    role: "学部4年",
    interests: ["スマートシティ", "Urban Computing"],
    color: "#BC9EC1",
    initial: "N",
  },
]; */

/* const alumni = [
  { name: "高橋 一郎", year: "2024年修了" },
  { name: "松本 奈々", year: "2024年修了" },
  { name: "井上 剛", year: "2023年修了" },
]; */

function MemberCard({ member, large = false }: { member: Member; large?: boolean }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#EDD8E8] hover:shadow-md hover:shadow-[#E3BAC6]/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
        large ? "sm:flex" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex items-center justify-center shrink-0 ${
          large ? "sm:w-40 h-40 sm:h-auto" : "h-32"
        }`}
        style={{ backgroundColor: member.color + "30" }}
      >
        {member.photo ? (
          <div
            className={`relative rounded-full overflow-hidden ${
              large ? "w-28 h-28" : "w-14 h-14"
            }`}
          >
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
              sizes={large ? "112px" : "56px"}
            />
          </div>
        ) : (
          <div
            className={`rounded-full flex items-center justify-center font-bold text-white ${
              large ? "w-20 h-20 text-3xl" : "w-14 h-14 text-xl"
            }`}
            style={{ backgroundColor: member.color }}
          >
            {member.initial}
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`p-5 ${large ? "" : ""}`}>
        <p className="text-xs text-[#BC9EC1] font-medium mb-0.5">{member.role}</p>
        <h3 className="font-bold text-[#3D1B3F] text-base">{member.name}</h3>
        {member.titleJa ? (
          <p className="text-sm font-medium text-[#6E4B7A] mb-0.5">{member.titleJa}</p>
        ) : null}
        <p className="text-xs text-[#6E4B7A] mb-3">{member.nameEn}</p>
        {member.bio && (
          <p className="text-sm text-[#6E4B7A] leading-relaxed mb-3">{member.bio}</p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {member.interests.map((kw) => (
            <span
              key={kw}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
              style={{ backgroundColor: member.color + "25", color: "#6E4B7A" }}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MembersPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#FDE8E9] via-[#FDE8E9]/50 to-[#FEFAF9] overflow-hidden">
        <FloralCorner className="absolute right-0 top-0 w-40 opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium tracking-[0.3em] text-[#BC9EC1] uppercase mb-3">
            Members
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1B3F] mb-4">
            メンバー
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* PI */}
        <section className="pt-14">
          <h2 className="text-lg font-bold text-[#3D1B3F] mb-6 flex items-center gap-3">
            <span className="w-1 h-5 rounded-full bg-[#BC9EC1] inline-block" />
            Principal Investigator
          </h2>
          <MemberCard member={pi} large />
        </section>

        <FloralDivider className="w-48 my-10 opacity-50" />

        {/* Doctoral */}
        <section>
          <h2 className="text-lg font-bold text-[#3D1B3F] mb-6 flex items-center gap-3">
            <span className="w-1 h-5 rounded-full bg-[#BC9EC1] inline-block" />
            博士課程学生
          </h2>
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-[#E3BAC6] bg-[#FDE8E9]/30 py-10 text-sm text-[#BC9EC1] tracking-wide">
            Coming Soon
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docStudents.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div> */}
        </section>

        <FloralDivider className="w-48 my-10 opacity-50" />

        {/* Master's */}
        <section>
          <h2 className="text-lg font-bold text-[#3D1B3F] mb-6 flex items-center gap-3">
            <span className="w-1 h-5 rounded-full bg-[#E3BAC6] inline-block" />
            修士課程学生
          </h2>
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-[#E3BAC6] bg-[#FDE8E9]/30 py-10 text-sm text-[#BC9EC1] tracking-wide">
            Coming Soon
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {masterStudents.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div> */}
        </section>

        {/* Undergrad — commented out (no undergrads yet) */}
        {/* <FloralDivider className="w-48 my-10 opacity-50" />
        <section>
          <h2 className="text-lg font-bold text-[#3D1B3F] mb-6 flex items-center gap-3">
            <span className="w-1 h-5 rounded-full bg-[#D4B8D8] inline-block" />
            学部生
          </h2>
        </section> */}

        {/* Alumni — commented out (no alumni yet) */}
        {/* <FloralDivider className="w-48 my-10 opacity-50" />
        <section>
          <h2 className="text-lg font-bold text-[#3D1B3F] mb-6 flex items-center gap-3">
            <span className="w-1 h-5 rounded-full bg-[#7FA67F] inline-block" />
            修了生・卒業生
          </h2>
        </section> */}
      </div>
    </>
  );
}
