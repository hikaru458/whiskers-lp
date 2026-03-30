'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { PREMIUM_EASINGS, AnimationVariant, ANIMATION_VARIANTS } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  className?: string;
  once?: boolean;
}

// TypeScriptで型安全なアニメーションコンポーネント
export function AnimatedSection({ 
  children, 
  variant = 'fadeInUp', 
  delay = 0, 
  className = '',
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });
  
  const selectedVariant = ANIMATION_VARIANTS[variant];
  
  const variants: Variants = {
    hidden: selectedVariant.initial,
    visible: {
      ...selectedVariant.animate,
      transition: {
        ...selectedVariant.transition,
        delay: delay,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 文字単位のアニメーション（高級感）
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  staggerChildren = 0.03 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      }
    }
  };
  
  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1], // easeOutQuart
      }
    }
  };

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
      aria-label={text}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// パララックスエフェクト
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: speed * -50 }}
      transition={{ 
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
      }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  );
}
