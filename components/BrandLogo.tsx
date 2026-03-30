"use client";

export function BrandLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Logo SVG */}
      <svg 
        width="240" 
        height="70" 
        viewBox="0 0 240 70" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-56 h-auto"
      >
        {/* Left whiskers */}
        <path 
          d="M105 35C85 32 75 28 60 25" 
          stroke="url(#grad1)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        <path 
          d="M105 42C88 40 78 38 63 37" 
          stroke="url(#grad2)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        <path 
          d="M105 49C90 48 82 47 67 46" 
          stroke="url(#grad3)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        
        {/* Right whiskers */}
        <path 
          d="M135 35C155 32 165 28 180 25" 
          stroke="url(#grad4)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        <path 
          d="M135 42C152 40 162 38 177 37" 
          stroke="url(#grad5)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        <path 
          d="M135 49C150 48 158 47 173 46" 
          stroke="url(#grad6)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        
        {/* Nose */}
        <ellipse 
          cx="120" 
          cy="38" 
          rx="7" 
          ry="5" 
          fill="url(#gradNose)"
        />
        
        {/* Text */}
        <text 
          x="120" 
          y="68" 
          textAnchor="middle" 
          fontSize="12" 
          fontWeight="500" 
          fill="#1a1a2e"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Brand
          <tspan fill="#ff6b35"> ・ </tspan>
          <tspan fill="#4ecdc4">Creator</tspan>
          <tspan fill="#1a1a2e"> ・ </tspan>
          <tspan fill="#ff6b35">Potential</tspan>
        </text>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="grad1" x1="50" y1="25" x2="85" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1a1a2e" />
            <stop offset="1" stopColor="#4a4a5e" />
          </linearGradient>
          <linearGradient id="grad2" x1="52" y1="35" x2="85" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff6b35" />
            <stop offset="1" stopColor="#ff8f5c" />
          </linearGradient>
          <linearGradient id="grad3" x1="56" y1="42" x2="85" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4ecdc4" />
            <stop offset="1" stopColor="#6eddd6" />
          </linearGradient>
          <linearGradient id="grad4" x1="115" y1="35" x2="150" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4ecdc4" />
            <stop offset="1" stopColor="#6eddd6" />
          </linearGradient>
          <linearGradient id="grad5" x1="115" y1="40" x2="148" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff6b35" />
            <stop offset="1" stopColor="#ff8f5c" />
          </linearGradient>
          <linearGradient id="grad6" x1="115" y1="45" x2="144" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1a1a2e" />
            <stop offset="1" stopColor="#4a4a5e" />
          </linearGradient>
          <linearGradient id="gradNose" x1="94" y1="34" x2="106" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d4a574" />
            <stop offset="1" stopColor="#c49464" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
