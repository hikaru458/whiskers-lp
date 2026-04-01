"use client";

import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export default function StarfieldBackground() {
  const stars = useMemo<Star[]>(() => {
    const colors = ["#7fd4ff", "#ffffff", "#c7baff"];
    const generated: Star[] = [];

    for (let i = 0; i < 35; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 5,
      });
    }

    return generated;
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255, 150, 200, 0.10), transparent 60%),
          radial-gradient(circle at 70% 80%, rgba(180, 120, 255, 0.12), transparent 70%),
          radial-gradient(circle at 50% 50%, rgba(100, 120, 255, 0.08), transparent 80%),
          linear-gradient(to bottom, #0a1a2f, #050a14)
        `,
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            animation: `float ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
            opacity: 0.8,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
