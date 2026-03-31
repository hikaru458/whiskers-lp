"use client";

import { useState, useEffect } from "react";
import SpiralBackground from "@/components/SpiralBackground";

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
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`text-right text-[9px] tracking-[0.35em] font-serif font-extralight transition-all duration-500 ${
              index === activeSection 
                ? "opacity-100 translate-x-0" 
                : "text-slate-600 opacity-20 hover:opacity-40 translate-x-2"
            }`}
            style={{
              color: index === activeSection ? section.color : undefined,
              textShadow: index === activeSection ? `0 0 20px ${section.color}, 0 0 40px ${section.color}60` : undefined,
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
