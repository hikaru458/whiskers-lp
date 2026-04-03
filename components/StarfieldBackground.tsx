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
          /* 左上：鮮やかなレッド〜ピンク */
          radial-gradient(ellipse at 20% 20%, rgba(255, 59, 92, 0.6) 0%, transparent 50%),
          /* 中央：深いブルー光（奥行き演出） */
          radial-gradient(circle at 50% 50%, rgba(30, 58, 255, 0.4) 0%, transparent 60%),
          /* 右下：紫〜バイオレット */
          radial-gradient(ellipse at 80% 80%, rgba(122, 59, 255, 0.55) 0%, transparent 50%),
          /* 主軸グラデーション：赤 → 青 → 紫 */
          linear-gradient(145deg, 
            #FF3B5C 0%,     /* 左上：レッドピンク */
            #FF4B8C 15%,    /* ピンク */
            #8B5CF6 35%,    /* 中間：バイオレット */
            #1E3AFF 50%,    /* 中央：深いブルー（最も明るい） */
            #5B4DFF 65%,    /* 青紫 */
            #7A3BFF 80%,    /* 右下：紫 */
            #6366F1 100%     /* 紫系で締める */
          )
        `,
        /* わずかに霧がかったディフューズ感 */
        filter: "contrast(1.05) saturate(1.1)",
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
