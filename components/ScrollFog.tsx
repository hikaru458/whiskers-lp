"use client";

import { useEffect, useState } from "react";

export default function ScrollFog() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const newOpacity = Math.min(0.6, y / 600);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-200"
      style={{
        opacity,
        background: "radial-gradient(ellipse at center, rgba(10,15,40,0.8) 0%, rgba(5,10,20,0.9) 100%)",
      }}
    />
  );
}
