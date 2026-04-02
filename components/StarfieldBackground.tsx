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
      "#ff0080", // ホットピンク
      "#00ffff", // シアン
      "#ff6b00", // オレンジ
      "#ff00ff", // マゼンタ
      "#ffff00", // イエロー
      "#00ff88", // ライム
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

  // ネオングリッド線
  const gridLines = useMemo(() => {
    const lines = [];
    // 水平線
    for (let i = 0; i < 12; i++) {
      lines.push({
        id: `h-${i}`,
        type: "horizontal",
        position: (i / 12) * 100,
        delay: i * 0.1,
      });
    }
    // 垂直線（遠近感あり）
    for (let i = 0; i < 8; i++) {
      lines.push({
        id: `v-${i}`,
        type: "vertical",
        position: ((i / 8) * 100 - 50) * 2, // 中央から放射
        delay: i * 0.15,
      });
    }
    return lines;
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(255, 0, 128, 0.15), transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(0, 255, 255, 0.1), transparent 40%),
          radial-gradient(ellipse at 80% 80%, rgba(255, 107, 0, 0.1), transparent 40%),
          linear-gradient(to bottom, #0a0a1a, #1a0a2e)
        `,
      }}
    >
      {/* ネオングリッド */}
      <div className="absolute inset-0 opacity-30">
        {gridLines.map((line) =>
          line.type === "horizontal" ? (
            <div
              key={line.id}
              className="absolute w-full"
              style={{
                top: `${line.position}%`,
                height: "1px",
                background: "linear-gradient(90deg, transparent, #ff0080, #00ffff, transparent)",
                animation: `pulse ${2 + line.delay}s ease-in-out infinite`,
                opacity: 0.6,
              }}
            />
          ) : (
            <div
              key={line.id}
              className="absolute h-full"
              style={{
                left: `${50 + line.position * 0.5}%`,
                width: "1px",
                background: `linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.4), transparent)`,
                transform: `perspective(500px) rotateY(${line.position}deg)`,
              }}
            />
          )
        )}
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
