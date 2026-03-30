// lib/designTokens.ts - Studio.Design風の型安全なデザイントークン

export interface ColorToken {
  hex: string;
  rgb: string;
  usage: string;
}

export interface SpacingToken {
  value: number;
  px: string;
  rem: string;
}

// 高級感あるカラーパレット（Studio.Design参考）
export const COLORS = {
  // プライマリー
  primary: {
    orange: '#ff6b35' as const,
    teal: '#4ecdc4' as const,
    dark: '#1a1a2e' as const,
  },
  // 背景色（ミストブルー系）
  background: {
    mist: '#eaeff5' as const,
    cream: '#faf9f7' as const,
    white: '#ffffff' as const,
  },
  // テキスト
  text: {
    primary: '#1a1a2e' as const,
    secondary: '#4a4a5e' as const,
    muted: '#6b7280' as const,
  },
  // アクセント
  accent: {
    gold: '#c9a961' as const,
    coral: '#ff8f6c' as const,
  }
};

// タイポグラフィ設定
export const TYPOGRAPHY = {
  fontFamily: {
    display: '"Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", serif',
    body: '"Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", serif',
    en: 'var(--font-playfair), serif',
  },
  letterSpacing: {
    tight: '0.02em',
    normal: '0.05em',
    wide: '0.1em',
    display: '0.15em', // Studio.Design風の広い字間
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.6,
    relaxed: 1.8,
    display: 1.5, // 見出し用
  }
};

// スペーシング（8pxベースのグリッド）
export const SPACING = {
  xs: { value: 4, px: '4px', rem: '0.25rem' },
  sm: { value: 8, px: '8px', rem: '0.5rem' },
  md: { value: 16, px: '16px', rem: '1rem' },
  lg: { value: 24, px: '24px', rem: '1.5rem' },
  xl: { value: 32, px: '32px', rem: '2rem' },
  '2xl': { value: 48, px: '48px', rem: '3rem' },
  '3xl': { value: 64, px: '64px', rem: '4rem' },
  '4xl': { value: 96, px: '96px', rem: '6rem' },
} as const;

// シャドウ（高級感）
export const SHADOWS = {
  subtle: '0 2px 8px rgba(26, 26, 46, 0.04)',
  soft: '0 4px 24px rgba(26, 26, 46, 0.06)',
  elegant: '0 8px 32px rgba(26, 26, 46, 0.08)',
  lifted: '0 16px 48px rgba(26, 26, 46, 0.12)',
};

// トランジション
export const TRANSITIONS = {
  fast: '150ms cubic-bezier(0.25, 1, 0.5, 1)',
  normal: '300ms cubic-bezier(0.25, 1, 0.5, 1)',
  slow: '500ms cubic-bezier(0.16, 1, 0.3, 1)',
  premium: '800ms cubic-bezier(0.16, 1, 0.3, 1)',
};
