"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isElastic, setIsElastic] = useState(false);

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
    
    const baseId = href.replace("#", "");
    const pcId = `${baseId}-pc`;
    
    // PC版とモバイル版の両方を探す
    let element = document.getElementById(baseId) || document.getElementById(pcId);
    
    // 要素が見つからない場合は処理中断
    if (!element) {
      console.warn(`[Nav] Section not found: ${baseId} or ${pcId}`);
      return;
    }
    
    // 通常のページスクロール（PC/モバイル共通）
    const header = document.querySelector("header");
    const headerHeight = header?.offsetHeight ?? 80;

    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY;
    const targetY = rect.top + scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
  };

  // 開閉時に弾性変形をトリガー
  const toggleMenu = () => {
    setIsElastic(true);
    setMenuOpen(!menuOpen);
    setTimeout(() => setIsElastic(false), 300);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* ロゴ */}
        <span className="text-lg font-bold tracking-[0.15em] text-white">
          Whiskers
        </span>

        {/* ハンバーガーメニュー - 2本線 + 弾性 */}
        <button
          className="relative w-8 h-6 flex flex-col justify-center items-center"
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
