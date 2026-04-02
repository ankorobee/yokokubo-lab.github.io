import Link from "next/link";
import { FlowerMark } from "./FloralDecor";

const footerLinks = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "研究内容" },
  { href: "/news", label: "ニュース" },
  { href: "/publications", label: "業績" },
  { href: "/members", label: "メンバー" },
  { href: "/access", label: "アクセス・お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className="bg-[#3D1B3F] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Lab info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FlowerMark size={28} />
              <div>
                <div className="text-white font-bold text-sm">横窪研究室</div>
                <div className="text-white/60 text-xs">
                  東京大学大学院情報学環
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              人・文化・テクノロジーの交差点で、
              <br />
              新たな価値とインタラクションを創る。
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Pages
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#E3BAC6] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Contact
            </h3>
            <address className="not-italic space-y-2 text-sm text-white/60">
              <p>〒113-0033</p>
              <p>東京都文京区本郷7-3-1</p>
              <p>東京大学大学院情報学環</p>
              <p>ダイワユビキタス学術研究館</p>
              <p className="pt-2">
                <a
                  href="#"
                  className="hover:text-[#E3BAC6] transition-colors cursor-default select-all"
                  onClick={(e) => e.preventDefault()}
                >
                  anna.yokokubo [at] iii.u-tokyo.ac.jp
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Yokokubo-Lab., The University of Tokyo.
            All rights reserved.
          </p>
          <p>Graduate School of Interdisciplinary Information Studies (GSII), UTokyo</p>
        </div>
      </div>
    </footer>
  );
}
