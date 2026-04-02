"use client";

import { useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

interface GlassPhotoPanelProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  imagePosition?: "left" | "right";
}

/* -------------------------------------------------------
   Layer 1: Photo（auto-fit・シンプル）
------------------------------------------------------- */
function PhotoLayer({ imageSrc, width, height }: { imageSrc: string; width: number; height: number }) {
  const texture = useTexture(imageSrc);

  return (
    <mesh position={[0, 0, 0]} renderOrder={1}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/* -------------------------------------------------------
   Layer 2: Front Glass（透明グレーパネル）
------------------------------------------------------- */
function FrontGlass({ width, height }: { width: number; height: number }) {
  return (
    <mesh position={[0, 0, 0.05]} renderOrder={2}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.15}
        roughness={0.2}
        metalness={0}
        transmission={0}
        thickness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* -------------------------------------------------------
   Combined Scene（2レイヤー・4/5固定）
------------------------------------------------------- */
function GlassPanelScene({ imageSrc }: { imageSrc: string }) {
  const { camera } = useThree();
  const texture = useTexture(imageSrc);

  // 固定サイズ: 幅1.8、高さは4/5アスペクト比
  const FIXED_WIDTH = 1.8;
  const FIXED_HEIGHT = FIXED_WIDTH * (4 / 5); // 1.44

  // カメラ距離を自動調整
  useMemo(() => {
    camera.position.z = FIXED_HEIGHT * 1.2;
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <PhotoLayer imageSrc={imageSrc} width={FIXED_WIDTH} height={FIXED_HEIGHT} />
      <FrontGlass width={FIXED_WIDTH} height={FIXED_HEIGHT} />
    </>
  );
}

export default function GlassPhotoPanel({
  imageSrc,
  title,
  description,
  linkText = "→ 詳細",
  linkHref = "#",
  imagePosition = "left",
}: GlassPhotoPanelProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* PC版 */}
      <div className="hidden md:grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
        {/* 写真（Three.js・4/5固定） */}
        <div
          className={`relative aspect-[4/5] overflow-hidden ${
            isImageLeft ? "order-1" : "order-2"
          }`}
        >
          <Canvas
            camera={{ position: [0, 0, 2], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="absolute inset-0"
          >
            <GlassPanelScene imageSrc={imageSrc} />
          </Canvas>
        </div>

        {/* テキストパネル */}
        <div
          className={`relative flex flex-col justify-center ${
            isImageLeft ? "order-2" : "order-1"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.30) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* 独立した文字背景パネル - 透明度を下げて読みやすく */}
          <div
            className="m-8 p-8 rounded-xl"
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(0,0,0,0.2)",
            }}
          >
            <div className="space-y-4" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
              <h2 className="text-3xl font-light text-white tracking-wide">
                {title}
              </h2>
              <p className="text-base text-white/95 leading-relaxed">
                {description}
              </p>
              <a
                href={linkHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-2"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
              >
                {linkText}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* スマホ版 */}
      <div className="md:hidden rounded-2xl overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div
          className="p-6 relative"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* 背景調光オーバーレイ */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-b-2xl"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
            }}
          />
          <div className="relative space-y-3" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.7)" }}>
            <h3 className="text-xl font-light text-white tracking-wide">
              {title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">{description}</p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-1"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
