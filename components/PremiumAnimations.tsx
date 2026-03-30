"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { useRef, useEffect, ReactNode, useState } from "react";

// ============================================
// 1. 3D Perspective Card with Mouse Tracking
// ============================================
interface PerspectiveCardProps {
  children: ReactNode;
  className?: string;
}

export function PerspectiveCard({ children, className = "" }: PerspectiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// 2. Gradient Mesh Background Animation
// ============================================
export function GradientMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(78,205,196,0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 30%, rgba(255,107,53,0.15) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(78,205,196,0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(78,205,196,0.12) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// ============================================
// 3. Text Reveal Animation (Character by Character)
// ============================================
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const characters = text.split("");
  
  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================
// 4. Magnetic Button Effect
// ============================================
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ============================================
// 5. Parallax Scroll Container
// ============================================
interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxContainer({ children, speed = 0.5, className = "" }: ParallaxContainerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// 6. Floating Animation
// ============================================
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function FloatingElement({ 
  children, 
  className = "", 
  duration = 6,
  distance = 20 
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// 7. Glow Effect on Hover
// ============================================
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className = "", glowColor = "#ff6b35" }: GlowCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered 
          ? `0 0 60px ${glowColor}40, 0 0 100px ${glowColor}20` 
          : "0 0 0px transparent",
      }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// 8. Staggered Grid Animation
// ============================================
interface StaggeredGridProps {
  children: ReactNode | ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function StaggeredGrid({ children, className = "", staggerDelay = 0.1 }: StaggeredGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const childrenArray = Array.isArray(children) ? children : [children];
  
  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// 9. Liquid Gradient Button
// ============================================
interface LiquidButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LiquidButton({ children, className = "", onClick }: LiquidButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(45deg, #ff6b35, #4ecdc4, #ff6b35)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// ============================================
// 10. Scroll Progress Indicator
// ============================================
export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b35] to-[#4ecdc4] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

// ============================================
// 11. Reveal on Scroll with Skew
// ============================================
interface SkewRevealProps {
  children: ReactNode;
  className?: string;
}

export function SkewReveal({ children, className = "" }: SkewRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, skewY: 5, y: 50 }}
      animate={isInView ? { opacity: 1, skewY: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// 12. Particle Background Effect (Subtle)
// ============================================
export function ParticleBackground() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#ff6b35]/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
