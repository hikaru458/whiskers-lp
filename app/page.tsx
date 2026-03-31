"use client";

import SpiralBackground from "@/components/SpiralBackground";
import GlassSection from "@/components/GlassSection";

const PANELS = [
  { label: "Gallery", z: 0 },
  { label: "Creator", z: -0.3 },
  { label: "Contest", z: -0.6 },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050814] text-white">
      <SpiralBackground />

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm tracking-[0.25em] uppercase text-slate-300">
            Whiskers
          </span>
        </div>
        <nav className="flex gap-6 text-xs text-slate-300">
          <span>Gallery</span>
          <span>Creator</span>
          <span>Contest</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-3xl space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
            Hello, Creator
          </p>
          <h1 className="text-4xl md:text-5xl font-light leading-tight text-slate-50">
            Glass-like vertical monitors
            <br />
            for a misty, cinematic interface.
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            9:16 white glass panels, floating in a soft midnight mist.
          </p>
        </div>
      </section>

      {/* Glass Sections */}
      {PANELS.map((panel, i) => (
        <GlassSection key={panel.label} panel={panel} index={i} />
      ))}

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-10 text-xs text-slate-500 flex justify-between">
        <span>© {new Date().getFullYear()} Whiskers</span>
        <span>Designed for vertical glass narratives.</span>
      </footer>
    </main>
  );
}
