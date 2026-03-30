'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// 高級感あるホバーエフェクト（TypeScript型安全）
interface ElegantHoverProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  lift?: boolean;
}

export function ElegantHover({ 
  children, 
  className = '', 
  scale = 1.02,
  lift = true 
}: ElegantHoverProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale,
        y: lift ? -4 : 0,
        transition: {
          duration: 0.4,
          ease: [0.25, 1, 0.5, 1]
        }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

// グラデーションボーダーエフェクト
interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

export function GradientBorder({ 
  children, 
  className = '',
  gradient = 'from-[#ff6b35] to-[#4ecdc4]'
}: GradientBorderProps) {
  return (
    <div className={`relative p-[1px] rounded-2xl bg-gradient-to-r ${gradient} ${className}`}>
      <div className="bg-white rounded-2xl h-full">
        {children}
      </div>
    </div>
  );
}

// マグネットボタン効果
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ 
  children, 
  className = '', 
  strength = 0.3 
}: MagneticButtonProps) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
    >
      {children}
    </motion.button>
  );
}

// グリッチテキストエフェクト
interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.span
        variants={{
          initial: { x: 0 },
          hover: { 
            x: [-2, 2, -2, 0],
            transition: { duration: 0.3 }
          }
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
