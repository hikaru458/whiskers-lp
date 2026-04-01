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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* ロゴ - 2段構成のブロックスタイル */}
        <div
          className="flex flex-col items-center leading-none"
          style={{ gap: "0.02em" }}
        >
          <span
            className="font-extrabold tracking-[0.12em] uppercase"
            style={{
              fontSize: "clamp(14px, 2.5vw, 20px)",
              background: "linear-gradient(135deg, rgba(220,230,255,0.95) 0%, rgba(140,160,220,0.9) 50%, rgba(80,100,180,0.95) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 0 6px rgba(120,160,255,0.4))",
              transform: "translateY(1px)",
            }}
          >
            WHIS
          </span>
          <span
            className="font-extrabold tracking-[0.12em] uppercase"
            style={{
              fontSize: "clamp(14px, 2.5vw, 20px)",
              background: "linear-gradient(135deg, rgba(220,230,255,0.95) 0%, rgba(140,160,220,0.9) 50%, rgba(80,100,180,0.95) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 0 6px rgba(120,160,255,0.4))",
              transform: "translateY(-1px)",
            }}
          >
            KERS
          </span>
        </div>

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
          className="absolute top-full right-0 py-4 px-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.40) 100%)",
            backdropFilter: "blur(20px)",
            minWidth: "160px",
          }}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors py-2 text-right"
                onClick={() => setMenuOpen(false)}
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
