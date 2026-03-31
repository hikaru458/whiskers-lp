"use client";

import { useState, useEffect } from "react";
import { SpiralBackground } from "@/components/SpiralBackground";

const SECTIONS = [
  { id: "gallery", label: "GALLERY", color: "#60a5fa" },
  { id: "creator", label: "CREATOR", color: "#22d3ee" },
  { id: "contest", label: "CONTEST", color: "#a78bfa" },
  { id: "product", label: "PRODUCT", color: "#fbbf24" },
  { id: "faq", label: "FAQ", color: "#34d399" },
  { id: "contact", label: "CONTACT", color: "#f87171" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const sectionIndex = Math.round(scrollProgress * (SECTIONS.length - 1));
      setActiveSection(Math.min(sectionIndex, SECTIONS.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const scrollTarget = (index / (SECTIONS.length - 1)) * (document.body.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      <SpiralBackground />
      
      {/* 垂直ナビゲーション - 右側サイドバー */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`text-right text-[10px] tracking-[0.2em] font-light transition-all duration-300 ${
              index === activeSection 
                ? "text-white opacity-100 translate-x-0" 
                : "text-slate-400 opacity-50 hover:opacity-80 translate-x-1"
            }`}
            style={{
              color: index === activeSection ? section.color : undefined,
              textShadow: index === activeSection ? `0 0 10px ${section.color}80` : undefined,
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
