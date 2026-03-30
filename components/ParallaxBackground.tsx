'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Studio.Design風のパララックス背景
export function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* 大きなグラデーションオーブ */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 to-[#ff8f5c]/10 blur-3xl" />
      </motion.div>
      
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ecdc4]/20 to-[#5dddd5]/10 blur-3xl" />
      </motion.div>
      
      <motion.div 
        style={{ y: y3, opacity }}
        className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/10 to-transparent blur-3xl" />
      </motion.div>

      {/* グリッドパターン */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,26,46,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,46,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* ノイズテクスチャ */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
