"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import GlassMonitor from "./GlassMonitor";

export default function GlassSection({
  panel,
  index,
  images = [],
}: {
  panel: { label: string; z: number };
  index: number;
  images?: string[];
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollFactor = 0;

  // 6色テーマ（青→赤→緑→紫→黄→ピンク）
  const themes = ["blue", "red", "green", "purple", "yellow", "pink"];
  const glassTheme = themes[index % themes.length];

  return (
    <section className="h-[200vh] flex items-center justify-center relative z-30">
      <div className="w-full max-w-7xl h-[200vh] relative" style={{ zIndex: 50 }}>
        <Canvas
          camera={{ position: [0, 0, 13.5], fov: 45 }}
          gl={{ antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[4, 6, 8]} intensity={1.5} />
          <GlassMonitor
            label={panel.label}
            z={panel.z}
            scrollFactor={scrollFactor}
            images={images}
            glassTheme={glassTheme}
          />
        </Canvas>
      </div>
    </section>
  );
}
