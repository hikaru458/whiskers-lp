// lib/utils.ts - TypeScriptユーティリティ

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 型安全なクラス名結合
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// デザイントークンを型安全に適用
export function applyTypography(
  type: 'display' | 'heading' | 'body' | 'caption',
  options?: {
    letterSpacing?: 'tight' | 'normal' | 'wide' | 'display';
    lineHeight?: 'tight' | 'normal' | 'relaxed' | 'display';
  }
) {
  const baseClasses = {
    display: 'text-4xl sm:text-5xl lg:text-6xl font-bold',
    heading: 'text-2xl sm:text-3xl font-bold',
    body: 'text-base leading-relaxed',
    caption: 'text-sm text-gray-600',
  };

  const letterSpacingClasses = {
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    display: 'tracking-[0.15em]',
  };

  const lineHeightClasses = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    display: 'leading-[1.5]',
  };

  return cn(
    baseClasses[type],
    options?.letterSpacing && letterSpacingClasses[options.letterSpacing],
    options?.lineHeight && lineHeightClasses[options.lineHeight]
  );
}

// アニメーションバリアントを型安全に生成
export function createAnimationVariant(
  type: 'fadeIn' | 'slideUp' | 'scale' | 'reveal',
  config?: {
    duration?: number;
    delay?: number;
    easing?: [number, number, number, number];
  }
) {
  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    },
    reveal: {
      initial: { clipPath: 'inset(0 100% 0 0)' },
      animate: { clipPath: 'inset(0 0% 0 0)' },
    },
  };

  return {
    ...variants[type],
    transition: {
      duration: config?.duration ?? 0.6,
      delay: config?.delay ?? 0,
      ease: config?.easing ?? [0.25, 1, 0.5, 1],
    },
  };
}
