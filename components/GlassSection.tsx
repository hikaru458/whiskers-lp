"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import GlassMonitor from "./GlassMonitor";

export default function GlassSection({
  panel,
  index,
}: {
  panel: { label: string; z: number };
  index: number;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollFactor = scrollY * 0.01 * (index + 1);

  return (
    <section className="h-[230vh] flex items-center justify-center relative z-30">
      <div className="w-full max-w-7xl h-[100vh]">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 35 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[4, 6, 8]} intensity={1.5} />
          <GlassMonitor label={panel.label} z={panel.z} scrollFactor={scrollFactor} />
        </Canvas>
      </div>
    </section>
  );
}
