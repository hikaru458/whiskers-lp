'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// スクロール連動アニメーション - Studio.Design風のパララックス
export function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div 
      ref={ref}
      style={{ y, opacity, scale }}
      className="absolute inset-0"
    >
      {/* 背景要素 */}
    </motion.div>
  );
}

// マスクアニメーション（テキスト reveal）
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 1, 0.5, 1]
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}

// 水平スクロールセクション（キャンバス風）
export function HorizontalScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {/* カード群 */}
        </motion.div>
      </div>
    </div>
  );
}
