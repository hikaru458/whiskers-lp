"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import GlassMonitor from "./GlassMonitor";

export default function GlassSection({
  index,
  images = [],
}: {
  index: number;
  images?: string[];
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById(`section-${index}`);
      if (section) {
        const rect = section.getBoundingClientRect();
        const active = rect.top < window.innerHeight * 0.5 && rect.bottom > 0;
        setIsActive(active);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [index]);

  return (
    <section id={`section-${index}`} className="h-[200vh] flex items-center justify-center relative z-30">
      <div className="w-full max-w-7xl h-[200vh] relative" style={{ zIndex: 50 }}>
        <Canvas
          camera={{ position: [0, 0, 13.5], fov: 45 }}
          gl={{ antialias: true }}
          dpr={[1, 1.5]}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[4, 6, 8]} intensity={1.5} />
          <GlassMonitor
            images={images}
            isActive={isActive}
          />
        </Canvas>
      </div>
    </section>
  );
}
