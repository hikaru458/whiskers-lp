// lib/animations.ts - TypeScriptで型安全なアニメーション設定

export type EasingType = 
  | 'easeOutQuart' 
  | 'easeOutExpo' 
  | 'easeInOutQuart' 
  | 'easeOutCubic';

export interface AnimationConfig {
  duration: number; // ms
  easing: EasingType;
  delay?: number;
  stagger?: number;
}

export interface ScrollRevealConfig extends AnimationConfig {
  threshold?: number;
  rootMargin?: string;
}

// Studio.Design風の高級感あるイージング
export const PREMIUM_EASINGS: Record<EasingType, string> = {
  easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
};

// 型安全なアニメーションバリアント
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, easing: PREMIUM_EASINGS.easeOutQuart }
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, easing: PREMIUM_EASINGS.easeOutExpo }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, easing: PREMIUM_EASINGS.easeOutQuart }
  },
  letterSpacing: {
    initial: { letterSpacing: '0em' },
    animate: { letterSpacing: '0.2em' },
    transition: { duration: 1.2, easing: PREMIUM_EASINGS.easeOutExpo }
  }
} as const;

export type AnimationVariant = keyof typeof ANIMATION_VARIANTS;
