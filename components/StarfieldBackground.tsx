"use client";

import { useMemo } from "react";

interface GridLine {
  id: string;
  y: number;
  from: "top" | "bottom";
  opacity: number;
  blur: number;
}

export default function StarfieldBackground() {
  // 最小限の水平グリッド線 - 奥行きのみ表現
  const gridLines = useMemo<GridLine[]>(() => {
    const lines: GridLine[] = [];
    
    // 上部から中心へ（遠景）
    for (let i = 0; i < 3; i++) {
      lines.push({
        id: `top-${i}`,
        y: 15 + i * 15,
        from: "top",
        opacity: 0.08 - i * 0.02, // 遠いほど薄く
        blur: 2,
      });
    }
    
    // 下部から中心へ（近景）
    for (let i = 0; i < 2; i++) {
      lines.push({
        id: `bottom-${i}`,
        y: 70 + i * 15,
        from: "bottom",
        opacity: 0.15 - i * 0.05, // 近いほど濃く
        blur: 0,
      });
    }
    
    return lines;
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(135, 206, 250, 0.3), transparent 50%),
          radial-gradient(ellipse at 80% 30%, rgba(0, 200, 255, 0.4), transparent 45%),
          radial-gradient(ellipse at 20% 80%, rgba(0, 220, 220, 0.35), transparent 45%),
          radial-gradient(ellipse at 80% 20%, rgba(255, 100, 150, 0.3), transparent 50%),
          linear-gradient(to bottom, #0a1a2d 0%, #0d2d4a 30%, #0a4a5a 60%, #0a2d4a 100%)
        `,
      }}
    >
      {/* 最小限グリッド - 水平線のみ */}
      <div className="absolute inset-0">
        {gridLines.map((line) => (
          <div
            key={line.id}
            className="absolute w-full h-px"
            style={{
              top: `${line.y}%`,
              background: `linear-gradient(to ${line.from === "top" ? "bottom" : "top"}, 
                transparent 0%,
                rgba(100, 130, 200, ${line.opacity}) 30%,
                rgba(100, 130, 200, ${line.opacity * 0.5}) 70%,
                transparent 100%
              )`,
              filter: `blur(${line.blur}px)`,
              opacity: line.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
