"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  side: "left" | "right";
}

export function CatPawPrints() {
  const [paws, setPaws] = useState<PawPrint[]>([]);
  const [pawId, setPawId] = useState(0);

  useEffect(() => {
    // 猫の足跡を生成する間隔（ミリ秒）
    const interval = setInterval(() => {
      setPawId((prev) => {
        const newId = prev + 1;
        
        // 足跡の位置をランダムに決定（画面の左右に沿って）
        const side = Math.random() > 0.5 ? "left" : "right";
        const baseX = side === "left" 
          ? Math.random() * 15 + 5 // 左側 5-20%
          : Math.random() * 15 + 80; // 右側 80-95%
        
        const baseY = Math.random() * 60 + 20; // 20-80%の高さ
        
        // 左右の足跡を交互に配置（歩行パターン）
        const newPaws: PawPrint[] = [];
        const steps = 4; // 一歩ごとに表示する足跡の数
        
        for (let i = 0; i < steps; i++) {
          const stepSide: "left" | "right" = i % 2 === 0 ? side : (side === "left" ? "right" : "left");
          const offsetX = stepSide === "left" ? -20 : 20;
          const offsetY = i * 25; // 下方向に進む
          
          newPaws.push({
            id: newId * 10 + i,
            x: baseX + offsetX * (i * 0.3),
            y: baseY + offsetY,
            rotation: stepSide === "left" ? -15 : 15,
            scale: 1.0 + Math.random() * 0.4,
            opacity: 0.4 + Math.random() * 0.3,
            side: stepSide,
          });
        }
        
        setPaws((current) => [...current.slice(-20), ...newPaws]);
        
        return newId;
      });
    }, 3000); // 3秒ごとに新しい足跡セット

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            className="absolute"
            style={{
              left: `${paw.x}%`,
              top: `${paw.y}%`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotate: paw.rotation - 30,
            }}
            animate={{ 
              opacity: paw.opacity, 
              scale: paw.scale,
              rotate: paw.rotation,
            }}
            exit={{ 
              opacity: 0,
              scale: paw.scale * 0.5,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {/* 猫の足跡 SVG */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#ff6b35]/30"
            >
              {/* 肉球（中央大きいパッド） */}
              <ellipse
                cx="16"
                cy="20"
                rx="6"
                ry="8"
                fill="currentColor"
              />
              {/* 肉球（上の4つ小さいパッド） */}
              <ellipse cx="10" cy="8" rx="3" ry="4" fill="currentColor" />
              <ellipse cx="16" cy="6" rx="3" ry="4" fill="currentColor" />
              <ellipse cx="22" cy="8" rx="3" ry="4" fill="currentColor" />
              <ellipse cx="16" cy="12" rx="2.5" ry="3" fill="currentColor" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
