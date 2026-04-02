import type { Metadata } from "next";
import { FloralCorner, FloralDivider } from "@/components/FloralDecor";

export const metadata: Metadata = {
  title: "アクセス・お問い合わせ",
  description: "研究室へのアクセス方法とお問い合わせ先です。",
};

const accessInfo = [
  {
    icon: "📍",
    label: "所在地",
    content: "〒113-0033 東京都文京区本郷7-3-1\n東京大学大学院情報学環\nダイワユビキタス学術研究館",
  },
  {
    icon: "🚃",
    label: "電車",
    content:
      "東京メトロ南北線・丸ノ内線「本郷三丁目」駅 徒歩8分\n都営大江戸線「本郷三丁目」駅 徒歩8分\nJR「御茶ノ水」駅 徒歩12分",
  },
  {
    icon: "✉️",
    label: "メール",
    content: "anna.yokokubo [at] iii.u-tokyo.ac.jp",
  },
  {
    icon: "🏛",
    label: "所属",
    content:
      "東京大学大学院 情報学環・学際情報学府\nThe University of Tokyo Interfaculty Initiative in Information Studies / Graduate School of Interdisciplinary Information Studies",
  },
];

export default function AccessPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#FDE8E9] via-[#FDE8E9]/50 to-[#FEFAF9] overflow-hidden">
        <FloralCorner className="absolute right-0 top-0 w-40 opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium tracking-[0.3em] text-[#BC9EC1] uppercase mb-3">
            Access &amp; Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1B3F] mb-4">
            アクセス・お問い合わせ
          </h1>
        </div>
      </section>

      <section className="py-16 bg-[#FEFAF9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-[#EDD8E8] shadow-sm">
              <iframe
                title="ダイワユビキタス学術研究館 地図"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d139.7626915!3d35.7080547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c24b4b839df%3A0xdc3797c740b08479!2z44OA44Kk44Ov44Om44OT44Kt44K_44K55a2m6KGT56CU56m26aSo!5e0!3m2!1sja!2sjp!4v1743000000000"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Access info cards */}
            <div className="space-y-3">
              {accessInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 bg-white rounded-xl border border-[#EDD8E8] p-4"
                >
                  <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#BC9EC1] mb-1 tracking-wide uppercase">
                      {item.label}
                    </p>
                    {item.isEmail ? (
                      <a
                        href={`mailto:${item.content}`}
                        className="text-sm text-[#6E4B7A] hover:text-[#BC9EC1] transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm text-[#6E4B7A] whitespace-pre-line leading-relaxed">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Note for prospective students */}
            <div className="bg-[#E3BAC6]/20 rounded-xl border border-[#E3BAC6]/40 p-5">
              <h3 className="text-sm font-bold text-[#3D1B3F] mb-2">
                配属・見学を希望される方へ
              </h3>
              <p className="text-sm text-[#6E4B7A] leading-relaxed">
                当研究室は越塚・羽多野・横窪・濱田・葛合同研究室として運営しており，各種研究活動は，越塚研究室配属メンバーと合同で行います。<br />
                また2026年4月より横窪が着任したことに伴い設立した研究室ですので、2026年度より学生募集が開始になります（配属は2027年度からです）。<br />
                面談希望の方を随時受け付けています。修士課程・博士課程への進学を希望される方も歓迎します。
              </p>
            </div>
          </div>
        </div>
      </section>

      <FloralDivider className="w-full max-w-2xl mx-auto opacity-40 mb-8" />
    </>
  );
}
