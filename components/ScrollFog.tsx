"use client";

import { useEffect, useState } from "react";

export default function ScrollFog() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const newOpacity = Math.min(0.45, y / 600);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-200"
      style={{
        zIndex: -10,
        opacity,
        background: "rgba(100, 120, 255, 1)",
      }}
    />
  );
}
