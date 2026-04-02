"use client";

import { useMemo } from "react";

interface LightParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  type: "pulse" | "beam" | "spot";
}

interface GridLine {
  id: string;
  type: "vertical-converge" | "horizontal-converge";
  x?: number;
  y?: number;
  from: "top" | "bottom";
  opacity: number;
  width: number;
  blur: number;
  delay: number;
}

interface GridLayers {
  foreground: GridLine[];
  middle: GridLine[];
  background: GridLine[];
}

export default function StarfieldBackground() {
  // ライブ会場風の照明パーティクル
  const lights = useMemo<LightParticle[]>(() => {
    const colors = [
      "#00d4ff", // シアンブルー
      "#8b5cf6", // 紫
      "#3b82f6", // 青
      "#06b6d4", // シアン
      "#6366f1", // インディゴ
      "#a78bfa", // 薄紫
    ];
    
    const generated: LightParticle[] = [];

    // スポットライト（大きな光）- 減らす
    for (let i = 0; i < 3; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 40, // より上側に集中
        size: Math.random() * 60 + 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
        type: "spot",
      });
    }

    // ビーム（光の筋）- 減らす
    for (let i = 3; i < 7; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
        type: "beam",
      });
    }

    // パルス粒子（小さな光）- 減らす
    for (let i = 7; i < 15; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        type: "pulse",
      });
    }

    return generated;
  }, []);

  // ネオングリッド線 - 3レイヤー奥行き構造
  const gridLayers = useMemo<GridLayers>(() => {
    const layers: GridLayers = {
      foreground: [], // 近景: opacity 0.5, 太線
      middle: [],     // 中景: opacity 0.25, 細線  
      background: [], // 遠景: opacity 0.1, ぼかし
    };
    
    // === 近景（下部）===
    // 垂直線（減らす）
    for (let i = 0; i < 3; i++) {
      const x = 30 + (i / 2) * 40;
      layers.foreground.push({
        id: `fg-v-${i}`,
        type: "vertical-converge",
        x: x,
        from: "bottom",
        opacity: 0.3,
        width: 2,
        blur: 0,
        delay: i * 0.1,
      });
    }
    // 水平線（減らす）
    for (let i = 0; i < 2; i++) {
      const y = 70 + (i / 1) * 25;
      layers.foreground.push({
        id: `fg-h-${i}`,
        type: "horizontal-converge",
        y: y,
        from: "bottom",
        opacity: 0.3,
        width: 2,
        blur: 0,
        delay: i * 0.08,
      });
    }
    
    // === 中景（中部）===
    // 垂直線（減らす）
    for (let i = 0; i < 4; i++) {
      const x = 20 + (i / 3) * 60;
      layers.middle.push({
        id: `md-v-${i}`,
        type: "vertical-converge",
        x: x,
        from: Math.random() > 0.5 ? "top" : "bottom",
        opacity: 0.15,
        width: 1,
        blur: 0,
        delay: i * 0.15,
      });
    }
    // 水平線（減らす）
    for (let i = 0; i < 3; i++) {
      const y = 30 + (i / 2) * 40;
      layers.middle.push({
        id: `md-h-${i}`,
        type: "horizontal-converge",
        y: y,
        from: Math.random() > 0.5 ? "top" : "bottom",
        opacity: 0.15,
        width: 1,
        blur: 0,
        delay: i * 0.12,
      });
    }
    
    // === 遠景（上部・奥）===
    // 垂直線（減らす）
    for (let i = 0; i < 5; i++) {
      const x = 15 + (i / 4) * 70;
      layers.background.push({
        id: `bg-v-${i}`,
        type: "vertical-converge",
        x: x,
        from: "top",
        opacity: 0.08,
        width: 1,
        blur: 2,
        delay: i * 0.2,
      });
    }
    // 水平線（減らす）
    for (let i = 0; i < 4; i++) {
      const y = 10 + (i / 3) * 25;
      layers.background.push({
        id: `bg-h-${i}`,
        type: "horizontal-converge",
        y: y,
        from: "top",
        opacity: 0.08,
        width: 1,
        blur: 2,
        delay: i * 0.15,
      });
    }
    
    return layers;
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.08), transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(139, 92, 246, 0.06), transparent 40%),
          radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.06), transparent 40%),
          linear-gradient(to bottom, #0a0f1a, #0f172a)
        `,
      }}
    >
      {/* ネオングリッド - 3レイヤー奥行き構造 */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* グリッドコンテナ - 上下から中心へ */}
        <div className="absolute inset-0">
          {/* 遠景: ぼかし、薄く */}
          {gridLayers.background.map((line) => (
            <div
              key={line.id}
              className="absolute"
              style={{
                left: line.type === "vertical-converge" ? `${line.x}%` : undefined,
                top: line.type === "vertical-converge" ? "0" : `${line.y}%`,
                width: line.type === "vertical-converge" ? `${line.width}px` : "100%",
                height: line.type === "vertical-converge" ? "100%" : `${line.width}px`,
                background: line.type === "vertical-converge"
                  ? `linear-gradient(to ${line.from === "top" ? "bottom" : "top"}, 
                      rgba(59, 130, 246, ${line.opacity}) 0%, 
                      rgba(139, 92, 246, ${line.opacity * 0.5}) 50%,
                      transparent 100%
                    )`
                  : `linear-gradient(to ${line.from === "top" ? "bottom" : "top"}, 
                      rgba(59, 130, 246, ${line.opacity}) 0%, 
                      rgba(139, 92, 246, ${line.opacity * 0.5}) 50%,
                      transparent 100%
                    )`,
                filter: `blur(${line.blur}px)`,
                animation: `gridPulse ${3 + line.delay}s ease-in-out infinite`,
                opacity: line.opacity,
              }}
            />
          ))}
          
          {/* 中景: 普通 */}
          {gridLayers.middle.map((line) => (
            <div
              key={line.id}
              className="absolute"
              style={{
                left: line.type === "vertical-converge" ? `${line.x}%` : undefined,
                top: line.type === "vertical-converge" ? "0" : `${line.y}%`,
                width: line.type === "vertical-converge" ? `${line.width}px` : "100%",
                height: line.type === "vertical-converge" ? "100%" : `${line.width}px`,
                background: line.type === "vertical-converge"
                  ? `linear-gradient(to ${line.from === "top" ? "bottom" : "top"}, 
                      rgba(6, 182, 212, ${line.opacity}) 0%, 
                      rgba(99, 102, 241, ${line.opacity * 0.5}) 50%,
                      transparent 100%
                    )`
                  : `linear-gradient(to ${line.from === "top" ? "bottom" : "top"}, 
                      rgba(59, 130, 246, ${line.opacity}) 0%, 
                      rgba(139, 92, 246, ${line.opacity * 0.5}) 50%,
                      transparent 100%
                    )`,
                animation: `gridPulse ${2 + line.delay}s ease-in-out infinite`,
                boxShadow: line.type === "vertical-converge" 
                  ? `0 0 6px rgba(6, 182, 212, ${line.opacity * 0.3})`
                  : `0 0 6px rgba(59, 130, 246, ${line.opacity * 0.3})`,
              }}
            />
          ))}
          
          {/* 近景: 太く、明るく */}
          {gridLayers.foreground.map((line) => (
            <div
              key={line.id}
              className="absolute"
              style={{
                left: line.type === "vertical-converge" ? `${line.x}%` : undefined,
                top: line.type === "vertical-converge" ? "0" : `${line.y}%`,
                width: line.type === "vertical-converge" ? `${line.width}px` : "100%",
                height: line.type === "vertical-converge" ? "100%" : `${line.width}px`,
                background: line.type === "vertical-converge"
                  ? `linear-gradient(to ${line.from === "top" ? "bottom" : "top"}, 
                      rgba(139, 92, 246, ${line.opacity}) 0%, 
                      rgba(59, 130, 246, ${line.opacity * 0.8}) 50%,
                      transparent 100%
                    )`
                  : `linear-gradient(to ${line.from === "top" ? "bottom" : "top"}, 
                      rgba(139, 92, 246, ${line.opacity}) 0%, 
                      rgba(59, 130, 246, ${line.opacity * 0.8}) 50%,
                      transparent 100%
                    )`,
                animation: `gridPulse ${1.5 + line.delay}s ease-in-out infinite`,
                boxShadow: line.type === "vertical-converge" 
                  ? `0 0 10px rgba(139, 92, 246, ${line.opacity * 0.5})`
                  : `0 0 10px rgba(139, 92, 246, ${line.opacity * 0.5})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ライブ照明パーティクル */}
      {lights.map((light) => (
        <div
          key={light.id}
          className="absolute"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: `${light.size}px`,
            height: `${light.size}px`,
            backgroundColor: light.color,
            borderRadius: light.type === "beam" ? "50%" : "50%",
            boxShadow: `
              0 0 ${light.size}px ${light.color},
              0 0 ${light.size * 2}px ${light.color},
              0 0 ${light.size * 3}px ${light.color}
            `,
            animation: `
              ${light.type === "pulse" ? "pulse" : light.type === "spot" ? "spotPulse" : "float"} 
              ${light.duration}s ease-in-out ${light.delay}s infinite alternate
            `,
            opacity: light.type === "spot" ? 0.3 : 0.8,
            filter: light.type === "spot" ? "blur(20px)" : "blur(4px)",
          }}
        />
      ))}

      {/* スキャンライン効果 */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.1) 50%)",
          backgroundSize: "100% 4px",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />

      {/* ビネット（周りを暗く） */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      <style jsx>{`
        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes spotPulse {
          0% {
            opacity: 0.2;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0.5;
            transform: scale(1.5) translateY(-20px);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(-30px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}
