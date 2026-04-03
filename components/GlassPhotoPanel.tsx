"use client";

import { useMemo, memo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useTexture, Preload } from "@react-three/drei";
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
   Layer 1: Photo（memo化・軽量化）
------------------------------------------------------- */
const PhotoLayer = memo(function PhotoLayer({ 
  texture, 
  width, 
  height 
}: { 
  texture: THREE.Texture; 
  width: number; 
  height: number 
}) {
  return (
    <mesh position={[0, 0, 0]} renderOrder={1}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} alphaTest={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
});

/* -------------------------------------------------------
   Layer 2: Front Glass（memo化）
------------------------------------------------------- */
const FrontGlass = memo(function FrontGlass({ 
  width, 
  height 
}: { 
  width: number; 
  height: number 
}) {
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.15,
      roughness: 0.2,
      metalness: 0,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <mesh position={[0, 0, 0.05]} renderOrder={2} material={material}>
      <planeGeometry args={[width, height]} />
    </mesh>
  );
});

/* -------------------------------------------------------
   Combined Scene（軽量化・メモ化）
------------------------------------------------------- */
const GlassPanelScene = memo(function GlassPanelScene({ 
  imageSrc 
}: { 
  imageSrc: string 
}) {
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
      <ambientLight intensity={0.5} />
      <PhotoLayer texture={texture} width={FIXED_WIDTH} height={FIXED_HEIGHT} />
      <Preload all />
    </>
  );
});

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
            gl={{ 
              antialias: false, 
              powerPreference: "high-performance",
            }}
            frameloop="demand"
            dpr={[1, 1.5]}
            className="absolute inset-0"
          >
            <GlassPanelScene imageSrc={imageSrc} />
          </Canvas>
        </div>

        {/* テキストパネル - 引き算の美学 */}
        <div
          className={`relative flex flex-col justify-center p-8 ${
            isImageLeft ? "order-2" : "order-1"
          }`}
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-white tracking-wide">
              {title}
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              {description}
            </p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-2"
            >
              {linkText}
            </a>
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
          className="p-6"
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="space-y-3">
            <h3 className="text-xl font-light text-white tracking-wide">
              {title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">{description}</p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-1"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
