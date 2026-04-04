// lib/utils.ts - TypeScriptユーティリティ

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 型安全なクラス名結合
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
