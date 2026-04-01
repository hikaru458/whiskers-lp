"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Gallery", href: "#gallery" },
    { label: "Creator", href: "#creator" },
    { label: "Contest", href: "#contest" },
    { label: "Product", href: "#product" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const targetId = href.replace("#", "");
    const headerHeight = 80;
    const isPc = window.innerWidth >= 768;
    
    // PC版は -pc 接尾辞、モバイルはそのまま
    const fullId = isPc ? `${targetId}-pc` : targetId;
    const element = document.getElementById(fullId) || document.getElementById(targetId);
    
    if (!element) return;
    
    if (isPc) {
      // PC: スクロール可能な親コンテナを見つける
      let parent = element.parentElement;
      let scrollContainer: HTMLElement | null = null;
      
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.overflowY === 'scroll' || style.overflowY === 'auto') {
          scrollContainer = parent;
          break;
        }
        parent = parent.parentElement;
      }
      
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: Math.max(0, element.offsetTop - headerHeight),
          behavior: "smooth",
        });
      }
    } else {
      // モバイル: windowスクロール
      const rect = element.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* ロゴ */}
        <span className="text-lg font-bold tracking-[0.15em] text-white">
          Whiskers
        </span>

        {/* ハンバーガーメニュー - PC/スマホ共通 */}
        <button
          className="relative w-8 h-6 flex flex-col justify-between"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span
            className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </button>
      </div>

      {/* メニュー - PC/スマホ共通 */}
      {menuOpen && (
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
