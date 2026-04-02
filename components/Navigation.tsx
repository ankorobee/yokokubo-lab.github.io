"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlowerMark } from "./FloralDecor";

const navLinks = [
  { href: "/", label: "Home", labelJa: "ホーム" },
  { href: "/about", label: "About", labelJa: "研究内容" },
  { href: "/news", label: "News", labelJa: "ニュース" },
  { href: "/publications", label: "Publications", labelJa: "業績" },
  { href: "/members", label: "Members", labelJa: "メンバー" },
  { href: "/access", label: "Access", labelJa: "アクセス" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm shadow-[#E3BAC6]/30"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <FlowerMark size={32} />
            <div className="leading-tight">
              <div className="text-sm font-bold text-[#3D1B3F] group-hover:text-[#BC9EC1] transition-colors">
                横窪研究室
              </div>
              <div className="text-[10px] text-[#6E4B7A] tracking-wide">
                東京大学大学院情報学環・学際情報学府
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm transition-all duration-200 group ${
                    isActive
                      ? "text-[#3D1B3F] font-medium"
                      : "text-[#6E4B7A] hover:text-[#3D1B3F]"
                  }`}
                >
                  <span
                    className={`absolute inset-0 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#E3BAC6]/50"
                        : "bg-transparent group-hover:bg-[#FDE8E9]"
                    }`}
                  />
                  <span className="relative">{link.labelJa}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-[#FDE8E9] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[#6E4B7A] mb-1 transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#6E4B7A] mb-1 transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#6E4B7A] transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="border-t border-[#EDD8E8] pt-3 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
                    isActive
                      ? "bg-[#E3BAC6]/50 text-[#3D1B3F] font-medium"
                      : "text-[#6E4B7A] hover:bg-[#FDE8E9]"
                  }`}
                >
                  <span>{link.labelJa}</span>
                  <span className="text-xs text-[#BC9EC1] font-light">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
