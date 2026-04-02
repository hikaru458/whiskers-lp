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

    // スポットライト（大きな光）
    for (let i = 0; i < 6; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60, // 上側に集中
        size: Math.random() * 80 + 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 2 + 1, // 速いパルス
        delay: Math.random() * 3,
        type: "spot",
      });
    }

    // ビーム（光の筋）
    for (let i = 6; i < 15; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
        type: "beam",
      });
    }

    // パルス粒子（小さな光）
    for (let i = 15; i < 40; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 1.5 + 0.5, // BPM感
        delay: Math.random() * 2,
        type: "pulse",
      });
    }

    return generated;
  }, []);

  // ネオングリッド線 - 中心に向かって収束し中心でフェード
  const gridLines = useMemo(() => {
    const lines = [];
    
    // 上部から中心への垂直線
    for (let i = 0; i < 8; i++) {
      const x = 20 + (i / 7) * 60; // 20%〜80%の範囲
      lines.push({
        id: `top-v-${i}`,
        type: "vertical-converge",
        x: x,
        from: "top",
        delay: i * 0.1,
      });
    }
    
    // 下部から中心への垂直線
    for (let i = 0; i < 8; i++) {
      const x = 20 + (i / 7) * 60;
      lines.push({
        id: `bottom-v-${i}`,
        type: "vertical-converge",
        x: x,
        from: "bottom",
        delay: i * 0.1 + 0.5,
      });
    }
    
    // 上部から中心への水平線
    for (let i = 0; i < 6; i++) {
      const y = 10 + (i / 5) * 35; // 10%〜45%
      lines.push({
        id: `top-h-${i}`,
        type: "horizontal-converge",
        y: y,
        from: "top",
        delay: i * 0.08,
      });
    }
    
    // 下部から中心への水平線
    for (let i = 0; i < 6; i++) {
      const y = 55 + (i / 5) * 35; // 55%〜90%
      lines.push({
        id: `bottom-h-${i}`,
        type: "horizontal-converge",
        y: y,
        from: "bottom",
        delay: i * 0.08 + 0.5,
      });
    }
    
    return lines;
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.15), transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(139, 92, 246, 0.12), transparent 40%),
          radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.12), transparent 40%),
          linear-gradient(to bottom, #0a0f1a, #0f172a)
        `,
      }}
    >
      {/* ネオングリッド - 中心に向かって収束し中心でフェード */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* グリッドコンテナ - 上下から中心へ */}
        <div className="absolute inset-0">
          {gridLines.map((line) => {
            // 中心に近いほど透明に（グレーパネルの文字を際立たせる）
            const distanceFromCenter = line.type === "vertical-converge" 
              ? Math.abs((line.x || 50) - 50) / 50  // 0=中心, 1=端
              : line.type === "horizontal-converge"
                ? Math.abs((line.y || 50) - 50) / 50
                : 1;
            const opacity = 0.1 + distanceFromCenter * 0.5; // 中心=0.1, 端=0.6
            
            if (line.type === "horizontal-converge") {
              return (
                <div
                  key={line.id}
                  className="absolute w-full"
                  style={{
                    top: `${line.y}%`,
                    height: "1px",
                    background: line.from === "top"
                      ? `linear-gradient(to bottom, 
                          rgba(59, 130, 246, ${opacity}) 0%, 
                          rgba(139, 92, 246, ${opacity * 0.5}) 50%,
                          transparent 100%
                        )`
                      : `linear-gradient(to top, 
                          rgba(59, 130, 246, ${opacity}) 0%, 
                          rgba(139, 92, 246, ${opacity * 0.5}) 50%,
                          transparent 100%
                        )`,
                    animation: `gridPulse ${2 + line.delay}s ease-in-out infinite`,
                    boxShadow: `0 0 6px rgba(59, 130, 246, ${opacity * 0.3})`,
                  }}
                />
              );
            }
            
            if (line.type === "vertical-converge") {
              return (
                <div
                  key={line.id}
                  className="absolute"
                  style={{
                    left: `${line.x}%`,
                    top: "0",
                    width: "1px",
                    height: "100%",
                    background: line.from === "top"
                      ? `linear-gradient(to bottom, 
                          rgba(6, 182, 212, ${opacity}) 0%, 
                          rgba(99, 102, 241, ${opacity * 0.5}) 50%,
                          transparent 100%
                        )`
                      : `linear-gradient(to top, 
                          rgba(6, 182, 212, ${opacity}) 0%, 
                          rgba(99, 102, 241, ${opacity * 0.5}) 50%,
                          transparent 100%
                        )`,
                    animation: `gridPulse ${2 + line.delay}s ease-in-out infinite`,
                    boxShadow: `0 0 6px rgba(6, 182, 212, ${opacity * 0.3})`,
                  }}
                />
              );
            }
            
            return null;
          })}
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
