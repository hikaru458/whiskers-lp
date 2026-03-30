"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
}

export function TiltCard({ 
  children, 
  className = "", 
  tiltAmount = 8,
  glareEnabled = true 
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    x.set(normalizedX * 0.5);
    y.set(normalizedY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden z-20"
          style={{
            opacity: isHovered ? 0.12 : 0,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.5) 0%, transparent 55%)`,
          }}
          transition={{ opacity: { duration: 0.4 } }}
        />
      )}
    </motion.div>
  );
}

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard3D({ children, className = "" }: TiltCard3DProps) {
  return (
    <div className="group perspective-1000">
      <motion.div
        className={`relative ${className}`}
        whileHover={{
          rotateY: 5,
          rotateX: -5,
          scale: 1.05,
          transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit pointer-events-none" />
        {children}
      </motion.div>
    </div>
  );
}
