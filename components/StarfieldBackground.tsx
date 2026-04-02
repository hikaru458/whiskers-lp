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

  // ネオングリッド線 - 奥行き強調版
  const gridLines = useMemo(() => {
    const lines = [];
    
    // 水平線（床面グリッド - 遠近法で下に集中）
    for (let i = 0; i < 20; i++) {
      // 非線形分布: 下に近いほど密に、上に行くほど疎に
      const t = i / 20;
      const position = 100 - (Math.pow(1 - t, 2) * 60 + t * 40); // 下70%に集中
      lines.push({
        id: `h-${i}`,
        type: "horizontal",
        position: position,
        delay: i * 0.05,
        opacity: 0.3 + (1 - t) * 0.5, // 手前ほど明るく
      });
    }
    
    // 垂直線（放射状 - 地平線から広がる）
    for (let i = 0; i < 16; i++) {
      const angle = ((i / 16) * 180 - 90); // -90度〜+90度
      lines.push({
        id: `v-${i}`,
        type: "vertical",
        angle: angle,
        delay: i * 0.08,
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
      {/* ネオングリッド - 奥行き強調版（控えめに） */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          perspective: "800px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* 床面グリッドコンテナ - 傾けて奥行き出す */}
        <div
          className="absolute inset-0"
          style={{
            transform: "rotateX(60deg) translateY(-20%)",
            transformOrigin: "center bottom",
          }}
        >
          {gridLines.map((line) =>
            line.type === "horizontal" ? (
              <div
                key={line.id}
                className="absolute w-full"
                style={{
                  top: `${line.position}%`,
                  height: "2px",
                  background: `linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 0, 128, ${line.opacity || 0.6}), 
                    rgba(0, 255, 255, ${line.opacity || 0.6}), 
                    transparent
                  )`,
                  animation: `gridPulse ${3 + line.delay}s ease-in-out infinite`,
                  boxShadow: `0 0 10px rgba(0, 255, 255, ${(line.opacity || 0.6) * 0.5})`,
                }}
              />
            ) : (
              <div
                key={line.id}
                className="absolute h-[200%]"
                style={{
                  left: "50%",
                  top: "-50%",
                  width: "2px",
                  background: `linear-gradient(to bottom, 
                    transparent 0%, 
                    rgba(255, 0, 128, 0.8) 30%, 
                    rgba(0, 255, 255, 0.8) 50%, 
                    rgba(255, 0, 128, 0.8) 70%, 
                    transparent 100%
                  )`,
                  transformOrigin: "center center",
                  transform: `rotateZ(${line.angle}deg) translateY(-30%)`,
                  animation: `gridPulse ${2.5 + line.delay}s ease-in-out infinite`,
                  boxShadow: "0 0 8px rgba(255, 0, 128, 0.4)",
                }}
              />
            )
          )}
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
