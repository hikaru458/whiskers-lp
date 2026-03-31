"use client";

import SpiralBackground from "@/components/SpiralBackground";
import GlassSection from "@/components/GlassSection";

const PANELS = [
  { label: "Gallery", z: 0 },
  { label: "Creator", z: -0.5 },
  { label: "Contest", z: -1.0 },
  { label: "Product", z: -1.5 },
  { label: "FAQ", z: -2.0 },
  { label: "Contact", z: -2.5 },
];

export default function Home() {
  const scrollToSection = (index: number) => {
    const target = document.querySelectorAll("section")[index + 1];
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#0a1025] text-white relative">
      <SpiralBackground />

      {/* 右側ナビ */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {PANELS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => scrollToSection(i)}
            className="text-[10px] tracking-[0.3em] text-slate-300 hover:text-white transition font-serif"
          >
            {p.label}
          </button>
        ))}
      </nav>

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between relative z-30">
        <span className="text-sm tracking-[0.25em] uppercase text-slate-300">
          Whiskers
        </span>
        <nav className="flex gap-6 text-xs text-slate-300">
          <span>Gallery</span>
          <span>Creator</span>
          <span>Contest</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 relative z-20">
        <div className="w-full max-w-3xl space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
            Hello, Creator
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-[1.1] tracking-wide font-serif text-slate-50">
            Glass-like vertical monitors
            <br />
            for a misty, cinematic interface.
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            9:16 white glass panels, floating in a soft pastel mist.
          </p>
        </div>
      </section>

      {/* Glass Sections */}
      {PANELS.map((panel, i) => (
        <GlassSection key={panel.label} panel={panel} index={i} />
      ))}

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-10 text-xs text-slate-500 flex justify-between relative z-30">
        <span>© {new Date().getFullYear()} Whiskers</span>
        <span>Designed for vertical glass narratives.</span>
      </footer>
    </main>
  );
}
