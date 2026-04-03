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
          /* 主構造：中央から外側へ広がるラディアルグラデーション */
          radial-gradient(ellipse at 50% 50%, 
            #E0003A 0%,      /* 中心：深く濃い赤（発光感） */
            #C4002E 15%,     /* 赤 */
            #D4006E 30%,     /* マゼンタ */
            #9D4EDD 50%,     /* パープル */
            #7C3AED 65%,     /* 紫 */
            #4F46E5 80%,     /* 青紫 */
            #1E2BFF 100%     /* 外周：深いブルー */
          ),
          /* 補助構造：左上→右下にごく薄い線形グラデーション（奥行き用） */
          linear-gradient(160deg, 
            rgba(255, 59, 92, 0.15) 0%,
            transparent 30%,
            transparent 70%,
            rgba(122, 59, 255, 0.12) 100%
          )
        `,
        /* 軽い霧（ディフューズ）効果 5-8% */
        filter: "contrast(1.08) saturate(1.05)",
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
