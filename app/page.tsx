"use client";

import { useEffect, useState } from "react";
import SpiralBackground from "@/components/SpiralBackground";
import HelloGlassMonitor from "@/components/HelloGlassMonitor";

// 全20枚の画像を1つの配列にまとめる
const ALL_IMAGES = [
  // image_fx 0-7 (8枚)
  "/images/image_fx_0.jpg",
  "/images/image_fx_1.jpg",
  "/images/image_fx_2.jpg",
  "/images/image_fx_3.jpg",
  "/images/image_fx_4.jpg",
  "/images/image_fx_5.jpg",
  "/images/image_fx_6.jpg",
  "/images/image_fx_7.jpg",
  // juno 0-2 (3枚)
  "/images/juno_0.png",
  "/images/juno_1.png",
  "/images/juno_2.png",
  // Whisk 9枚
  "/images/Whisk_183ee3fd14.jpg",
  "/images/Whisk_3013699a43.jpg",
  "/images/Whisk_4a53114df4.jpg",
  "/images/Whisk_c4c5e10064.jpg",
  "/images/Whisk_cab3f11229.jpg",
  "/images/Whisk_ccf674b333.jpg",
  "/images/Whisk_d6ef45a2de.jpg",
  "/images/Whisk_d869a0da19.jpg",
  "/images/Whisk_edb0a6bb60.jpg",
];

export default function Home() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // ハローページは常にアクティブ
    setIsActive(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#050814] text-white relative">
      <SpiralBackground />

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between relative z-40">
        <span className="text-sm tracking-[0.25em] uppercase text-slate-300">
          Whiskers
        </span>
      </header>

      {/* Hero - ガラスモニター1枚のみ */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative z-30">
        <div className="w-full max-w-2xl">
          <HelloGlassMonitor images={ALL_IMAGES} isActive={isActive} />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-10 text-xs text-slate-500 flex justify-between relative z-40">
        <span>© {new Date().getFullYear()} Whiskers</span>
        <span>Designed for vertical glass narratives.</span>
      </footer>
    </main>
  );
}
