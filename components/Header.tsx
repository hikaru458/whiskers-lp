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
        {/* ロゴ */}
        <span className="text-lg font-bold tracking-[0.15em] text-white">
          Whiskers
        </span>

        {/* PCナビ - 横並び */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* スマホハンバーガー - 猫ヒゲ3本線 */}
        <button
          className="md:hidden relative w-8 h-6 flex flex-col justify-between"
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

      {/* スマホメニュー */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-md py-4 px-6">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors py-2"
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
