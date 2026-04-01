"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050814] text-white relative">
      {/* Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between relative z-40">
        <span className="text-sm tracking-[0.25em] uppercase text-slate-300">
          Whiskers
        </span>
      </header>

      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative z-30">
        <div className="w-full max-w-3xl space-y-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
            Hello, Creator
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-[1.1] tracking-wide font-serif text-slate-50">
            Whiskers
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            A fresh start. New design coming soon.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-10 text-xs text-slate-500 flex justify-between relative z-40">
        <span>© {new Date().getFullYear()} Whiskers</span>
      </footer>
    </main>
  );
}
