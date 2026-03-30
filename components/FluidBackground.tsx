"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawFluid = () => {
      time += 0.005;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 有機的なブロブ - シンプルな流体シェイプ
      for (let i = 0; i < 2; i++) {
        const x = canvas.width * (0.2 + i * 0.6);
        const y = canvas.height * (0.3 + Math.sin(time + i) * 0.1);
        const radius = 180 + Math.sin(time * 0.5 + i * 2) * 40;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        
        if (i === 0) {
          gradient.addColorStop(0, "rgba(255, 107, 53, 0.12)");
          gradient.addColorStop(0.5, "rgba(255, 107, 53, 0.04)");
          gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
        } else {
          gradient.addColorStop(0, "rgba(78, 205, 196, 0.10)");
          gradient.addColorStop(0.5, "rgba(78, 205, 196, 0.03)");
          gradient.addColorStop(1, "rgba(78, 205, 196, 0)");
        }

        ctx.beginPath();
        // 有機的な形状
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const distortion = Math.sin(angle * 3 + time + i) * 25 + 
                           Math.sin(angle * 5 + time * 0.7) * 15;
          const r = radius + distortion;
          const px = x + Math.cos(angle) * r;
          const py = y + Math.sin(angle) * r;
          if (angle === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationId = requestAnimationFrame(drawFluid);
    };

    resize();
    window.addEventListener("resize", resize);
    drawFluid();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}
