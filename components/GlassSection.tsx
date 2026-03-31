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
    <section className="h-[120vh] flex items-center justify-center">
      <div className="w-full max-w-5xl h-[70vh]">
        <Canvas camera={{ position: [0, 0, 10], fov: 32 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 8]} intensity={1.2} />
          <GlassMonitor label={panel.label} z={panel.z} scrollFactor={scrollFactor} />
        </Canvas>
      </div>
    </section>
  );
}
