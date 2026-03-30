"use client";

import { useEffect, useState } from "react";

export function FilmGrain() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        backgroundRepeat: "repeat",
        opacity: 0.4,
      }}
    />
  );
}
