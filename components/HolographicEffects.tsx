"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

// 猫の足跡カーソル（丸み帯びた可愛い感じ、薄い茶色）
export const catPawCursor = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSJub25lIj48ZWxsaXBzZSBjeD0iMTYiIGN5PSIyMSIgcng9IjUiIHJ5PSI2LjUiIGZpbGw9IiNmZjhiN2EiLz48ZWxsaXBzZSBjeD0iMTEiIGN5PSI5IiByeD0iMi41IiByeT0iMy41IiBmaWxsPSIjZmY4YjdhIi8+PGVsbGlwc2UgY3g9IjE2IiBjeT0iNy41IiByeD0iMi41IiByeT0iMy41IiBmaWxsPSIjZmY4YjdhIi8+PGVsbGlwc2UgY3g9IjIxIiBjeT0iOSIgcng9IjIuNSIgcnk9IjMuNSIgZmlsbD0iI2ZmOGI3YSIvPjxlbGxpcHNlIGN4PSIxNiIgY3k9IjEzIiByeD0iMiIgcnk9IjIuNSIgZmlsbD0iI2ZmOGI3YSIvPjwvc3ZnPg=='), auto";

interface HolographicButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function HolographicButton({ children, className = "", onClick }: HolographicButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-[#ff8f5c] opacity-100 group-hover:opacity-90 transition-opacity" />
      
      {/* Holographic shine effect - slower */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 60%)",
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
      
      {/* Rainbow shimmer - slower */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-30"
        style={{
          background: "linear-gradient(90deg, #ff6b35, #4ecdc4, #ff8f5c, #4ecdc4, #ff6b35)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          duration: 3.5,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

interface HolographicTextProps {
  text: string;
  className?: string;
}

export function HolographicText({ text, className = "" }: HolographicTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, #ff6b35, #4ecdc4, #ff8f5c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        animate={{
          backgroundPosition: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

interface HolographicBorderProps {
  children: ReactNode;
  className?: string;
}

export function HolographicBorder({ children, className = "" }: HolographicBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated border */}
      <motion.div
        className="absolute -inset-[1px] rounded-lg z-0"
        style={{
          background: "linear-gradient(90deg, #ff6b35, #4ecdc4, #ff8f5c, #4ecdc4, #ff6b35)",
          backgroundSize: "300% 100%",
        }}
        animate={{
          backgroundPosition: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 4,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      {/* Inner content */}
      <div className="relative z-10 bg-[#1a1a2e] rounded-lg p-[1px]">
        {children}
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-40 blur-xl z-[-1]"
        style={{
          background: "linear-gradient(90deg, #ff6b35, #4ecdc4)",
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
