"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isElastic, setIsElastic] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navItems = [
    { label: "Gallery", href: "gallery" },
    { label: "Creator", href: "creator" },
    { label: "Contest", href: "contest" },
    { label: "Product", href: "product" },
    { label: "FAQ", href: "faq" },
    { label: "Contact", href: "contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    const target = href;
    const isMobile = window.innerWidth < 768;
    const prefix = isMobile ? "sp-" : "pc-";
    const targetId = prefix + target;

    console.log(`[Nav] Target: ${target}, isMobile: ${isMobile}, Looking for ID: ${targetId}`);

    const element = document.getElementById(targetId);
    if (!element) {
      console.warn(`[Nav] Section not found: ${targetId}`);
      // フォールバック: pc-またはsp-なしのIDも探す
      const fallbackElement = document.getElementById(target);
      if (fallbackElement) {
        console.log(`[Nav] Found fallback ID: ${target}`);
        fallbackElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    console.log(`[Nav] Found element: ${targetId}, scrolling...`);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 開閉時に弾性変形をトリガー
  const toggleMenu = () => {
    setIsElastic(true);
    setMenuOpen(!menuOpen);
    setTimeout(() => setIsElastic(false), 300);
  };

  return (
    <header id="whiskers-header" className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 猫耳 */}
            <path d="M8 16Q12 4 16 12L20 16" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M40 16Q36 4 32 12L28 16" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* 顔の輪郭 */}
            <ellipse cx="24" cy="28" rx="18" ry="14" stroke="white" strokeWidth="1.5" fill="none"/>
            {/* 目 */}
            <path d="M16 24Q18 20 20 24Q18 28 16 24Z" fill="white"/>
            <path d="M28 24Q30 20 32 24Q30 28 28 24Z" fill="white"/>
            {/* 鼻 */}
            <path d="M24 28L22 30H26L24 28Z" fill="white"/>
            {/* 髭（3本×2） */}
            <path d="M8 24Q14 26 18 28" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M6 28Q12 30 18 32" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M6 32Q12 34 18 36" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M40 24Q34 26 30 28" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M42 28Q36 30 30 32" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M42 32Q36 34 30 36" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
            {/* 口元 */}
            <path d="M22 34Q24 36 26 34" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
          </svg>
          <span className="text-lg font-bold tracking-[0.15em] text-white">
            Whiskers
          </span>
        </Link>

        {/* 右側 - LPの場合はハンバーガーメニュー、別ページの場合は戻るリンク */}
        {isHomePage ? (
          <button
            className="relative w-8 h-6 flex flex-col justify-center items-center ml-auto"
            onClick={toggleMenu}
            aria-label="メニュー"
          >
            <span
              className={`absolute w-full bg-white rounded-full transition-all duration-300 origin-center ${
                isElastic ? "scale-y-150" : ""
              } ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
              style={{
                height: "0.75px",
                transitionTimingFunction: isElastic ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)" : "ease-out",
              }}
            />
            <span
              className={`absolute w-full bg-white rounded-full transition-all duration-300 origin-center ${
                isElastic ? "scale-y-150" : ""
              } ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
              style={{
                height: "0.5px",
                transitionTimingFunction: isElastic ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)" : "ease-out",
              }}
            />
          </button>
        ) : (
          <Link 
            href="/" 
            className="ml-auto px-4 py-2 text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            ← トップページに戻る
          </Link>
        )}
      </div>

      {/* サブヘッダー - LPのみ表示 */}
      {isHomePage && (
        <div className="max-w-7xl mx-auto flex items-center justify-center py-3 border-t border-white/10">
          <div className="flex flex-row items-center gap-3">
            <a
              href="#business"
              className="px-4 py-1.5 rounded-full text-xs md:text-sm font-medium text-white/80 border border-white/30 hover:border-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              企業様向け
            </a>
            <a
              href="#creators"
              className="px-4 py-1.5 rounded-full text-xs md:text-sm font-medium text-white/80 border border-white/30 hover:border-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              クリエイター様向け
            </a>
          </div>
        </div>
      )}

      {/* メニュー - LPのみPC/スマホ共通 */}
      {isHomePage && menuOpen && (
        <nav
          className="absolute top-full right-0 py-4 px-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.40) 100%)",
            backdropFilter: "blur(20px)",
            minWidth: "160px",
          }}
        >
          <div className="flex flex-col">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors py-3 text-right opacity-0 animate-slideIn"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: "forwards",
                }}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
