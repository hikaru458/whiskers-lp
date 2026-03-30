"use client";

interface CatLogoProps {
  className?: string;
}

export function CatLogo({ className = "" }: CatLogoProps) {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cat head outline - rounder face */}
      <path 
        d="M50 12C38 12 25 18 18 30C12 42 12 58 18 70C25 82 38 88 50 88C62 88 75 82 82 70C88 58 88 42 82 30C75 18 62 12 50 12Z" 
        fill="white"
        stroke="#d1d5db"
        strokeWidth="2"
      />
      
      {/* Left ear */}
      <path 
        d="M20 30L15 15L30 22" 
        fill="white"
        stroke="#d1d5db"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Right ear */}
      <path 
        d="M80 30L85 15L70 22" 
        fill="white"
        stroke="#d1d5db"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Left whiskers - Colored like BrandLogo */}
      <path d="M35 55C25 52 15 48 10 45" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 60C25 58 18 55 12 52" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 65C25 64 20 62 15 60" stroke="#4ecdc4" strokeWidth="3" strokeLinecap="round" />
      
      {/* Right whiskers - Colored like BrandLogo */}
      <path d="M65 55C75 52 85 48 90 45" stroke="#4ecdc4" strokeWidth="3" strokeLinecap="round" />
      <path d="M65 60C75 58 82 55 88 52" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round" />
      <path d="M65 65C75 64 80 62 85 60" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
      
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="4" ry="3" fill="#d4a574" />
    </svg>
  );
}
