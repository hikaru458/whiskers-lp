"use client";

interface WhiskersLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function WhiskersLogo({ className = "", size = "md" }: WhiskersLogoProps) {
  const sizeClasses = {
    sm: "w-32",
    md: "w-48 md:w-64",
    lg: "w-64 md:w-80",
  };

  return (
    <div className={`relative inline-block select-none ${sizeClasses[size]} ${className}`}>
      {/* Base layer - SVG shape */}
      <img 
        src="/logo-base.svg" 
        alt="Whiskers" 
        className="relative z-10 w-full h-auto"
      />
      
      {/* Highlight layer - with mix-blend-screen */}
      <img
        src="/logo-highlight.svg"
        alt=""
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none"
      />
      
      {/* Additional glow effect */}
      <div 
        className="absolute inset-0 opacity-30 blur-md pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)"
        }}
      />
    </div>
  );
}
