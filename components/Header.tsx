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
    
    const id = href.replace("#", "");
    const isPc = window.innerWidth >= 768;
    
    console.log(`[Nav] Clicked: ${href}, isPc: ${isPc}`);
    
    // PC/モバイル両方のIDパターンを生成
    const pcId = `${id}-pc`;
    const mobileId = id;
    
    // 優先的に現在の画面幅に合ったIDを探す
    const primaryId = isPc ? pcId : mobileId;
    const fallbackId = isPc ? mobileId : pcId;
    
    console.log(`[Nav] Looking for: ${primaryId} or ${fallbackId}`);
    
    // 要素を取得（優先ID → fallbackID の順）
    let element = document.getElementById(primaryId) || document.getElementById(fallbackId);
    
    console.log(`[Nav] Found element:`, element?.id || "NOT FOUND");
    
    // 要素が見つからない場合は処理中断
    if (!element) {
      console.warn(`[Nav] Section not found: ${primaryId} or ${fallbackId}`);
      return;
    }
    
    // 少し遅延してスクロール（メニュー閉じるアニメーション後）
    setTimeout(() => {
      // ヘッダー高さを動的に取得
      const header = document.querySelector("header");
      const headerHeight = header?.offsetHeight ?? 80;
      
      console.log(`[Nav] Header height: ${headerHeight}`);
      
      if (isPc) {
        // PC: pc-scroll-container 内でスクロール
        const pcContainer = document.querySelector('.pc-scroll-container') as HTMLElement | null;
        if (pcContainer) {
          const elementTop = element.offsetTop - pcContainer.offsetTop;
          console.log(`[Nav] PC scroll: ${elementTop - headerHeight}`);
          pcContainer.scrollTo({
            top: Math.max(0, elementTop - headerHeight),
            behavior: "smooth",
          });
        }
      } else {
        // スマホ版: window.scrollTo を使用
        const rect = element.getBoundingClientRect();
        const scrollY = window.scrollY;
        const targetY = rect.top + scrollY - headerHeight;
        
        console.log(`[Nav] Mobile scroll target: ${targetY}`);
        console.log(`[Nav] rect.top: ${rect.top}, scrollY: ${scrollY}`);
        
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: "smooth",
        });
      }
    }, 300); // メニュー閉じるアニメーション待機
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
