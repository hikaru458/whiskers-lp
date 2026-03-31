"use client";

import { useEffect, useState } from "react";
import SpiralBackground from "@/components/SpiralBackground";
import GlassSection from "@/components/GlassSection";

const PANELS = [
  { label: "Gallery", z: 0 },
  { label: "Creator", z: -0.6 },
  { label: "Contest", z: -1.2 },
  { label: "Product", z: -1.8 },
  { label: "FAQ", z: -2.4 },
  { label: "Contact", z: -3.0 },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = 0;

      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) current = i;
      });

      setActiveSection(Math.max(0, current - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const target = document.querySelectorAll("section")[index + 1];
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f3f6ff] text-white relative">
      <SpiralBackground />

      {/* 右側ナビ */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {PANELS.map((p, i) => {
          const active = i === activeSection;
          return (
            <button
              key={p.label}
              onClick={() => scrollToSection(i)}
              className={`
                text-[10px] tracking-[0.3em] font-serif transition
                ${active ? "text-white" : "text-slate-400"}
              `}
              style={{
                textShadow: active
                  ? "0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.6)"
                  : "none",
              }}
            >
              {p.label}
            </button>
          );
        })}
      </nav>

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between relative z-40">
        <span className="text-sm tracking-[0.25em] uppercase text-slate-700">
          Whiskers
        </span>
      </header>

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 relative z-30">
        <div className="w-full max-w-3xl space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-600">
            Hello, Creator
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-[1.1] tracking-wide font-serif text-slate-800">
            Glass-like horizontal monitors
            <br />
            floating in pastel mist.
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Soft pastel gradients, transparent glass, and cinematic depth.
          </p>
        </div>
      </section>

      {/* Glass Sections */}
      {PANELS.map((panel, i) => (
        <GlassSection key={panel.label} panel={panel} index={i} />
      ))}

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-10 text-xs text-slate-500 flex justify-between relative z-40">
        <span>© {new Date().getFullYear()} Whiskers</span>
        <span>Designed for pastel glass narratives.</span>
      </footer>
    </main>
  );
}
