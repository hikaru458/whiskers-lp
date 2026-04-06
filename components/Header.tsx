"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTarget } from "@/lib/TargetContext";

interface HeaderProps {
  variant?: "dark" | "light";
}

export default function Header({ variant = "dark" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isElastic, setIsElastic] = useState(false);
  const pathname = usePathname();
  const { target, setTarget } = useTarget();
  const isHomePage = pathname === "/";
  const isLight = variant === "light";

  const navItems = target === "biz"
    ? [
        { label: "仕組み",       href: "how-it-works" },
        { label: "企業向け",     href: "business" },
        { label: "料金プラン",   href: "pricing" },
        { label: "FAQ",          href: "faq" },
        { label: "お問い合わせ", href: "contact" },
      ]
    : [
        { label: "仕組み",           href: "how-it-works" },
        { label: "クリエイター向け", href: "creators" },
        { label: "FAQ",              href: "faq" },
        { label: "支援を募集中",     href: "crowdfunding" },
        { label: "お問い合わせ",     href: "contact" },
      ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    // 1. そのままのIDで検索
    let element = document.getElementById(href);

    // 2. PCプレフィックス付きで検索
    if (!element) {
      element = document.getElementById("pc-" + href);
    }

    // 3. SPプレフィックス付きで検索
    if (!element) {
      element = document.getElementById("sp-" + href);
    }

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 開閉時に弾性変形をトリガー
  const toggleMenu = () => {
    setIsElastic(true);
    setMenuOpen(!menuOpen);
    setTimeout(() => setIsElastic(false), 300);
  };

  return (
    <header id="whiskers-header" className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 ${isLight ? 'bg-white/80 backdrop-blur-sm' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 猫耳 */}
            <path d="M8 16Q12 4 16 12L20 16" stroke={isLight ? "black" : "white"} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M40 16Q36 4 32 12L28 16" stroke={isLight ? "black" : "white"} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* 顔の輪郭 */}
            <ellipse cx="24" cy="28" rx="18" ry="14" stroke={isLight ? "black" : "white"} strokeWidth="1.5" fill="none"/>
            {/* 目 */}
            <path d="M16 24Q18 20 20 24Q18 28 16 24Z" fill={isLight ? "black" : "white"}/>
            <path d="M28 24Q30 20 32 24Q30 28 28 24Z" fill={isLight ? "black" : "white"}/>
            {/* 鼻 */}
            <path d="M24 28L22 30H26L24 28Z" fill={isLight ? "black" : "white"}/>
            {/* 髭（3本×2） */}
            <path d="M8 24Q14 26 18 28" stroke={isLight ? "black" : "white"} strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M6 28Q12 30 18 32" stroke={isLight ? "black" : "white"} strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M6 32Q12 34 18 36" stroke={isLight ? "black" : "white"} strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M40 24Q34 26 30 28" stroke={isLight ? "black" : "white"} strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M42 28Q36 30 30 32" stroke={isLight ? "black" : "white"} strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M42 32Q36 34 30 36" stroke={isLight ? "black" : "white"} strokeWidth="1" strokeLinecap="round" fill="none"/>
            {/* 口元 */}
            <path d="M22 34Q24 36 26 34" stroke={isLight ? "black" : "white"} strokeWidth="1" strokeLinecap="round" fill="none"/>
          </svg>
          <span className={`text-lg font-bold tracking-[0.15em] ${isLight ? 'text-gray-900' : 'text-white'}`}>
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
              className={`absolute w-full ${isLight ? 'bg-gray-900' : 'bg-white'} rounded-full transition-all duration-300 origin-center ${
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
              className={`absolute w-full ${isLight ? 'bg-gray-900' : 'bg-white'} rounded-full transition-all duration-300 origin-center ${
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
            className={`ml-auto px-4 py-2 text-sm flex items-center gap-2 ${isLight ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'} transition-colors`}
          >
            ← トップページに戻る
          </Link>
        )}
      </div>

      {/* サブヘッダー - LPのみ表示 */}
      {isHomePage && (
        <div className="max-w-7xl mx-auto flex items-center justify-center py-3 border-t border-white/10">
          <div className="flex border border-white/20 rounded-full overflow-hidden">
            <button
              onClick={() => setTarget("biz")}
              className={`px-5 py-1.5 text-xs font-medium transition-all duration-300 ${
                target === "biz"
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              企業の方
            </button>
            <button
              onClick={() => setTarget("creator")}
              className={`px-5 py-1.5 text-xs font-medium transition-all duration-300 ${
                target === "creator"
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              クリエイターの方
            </button>
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
