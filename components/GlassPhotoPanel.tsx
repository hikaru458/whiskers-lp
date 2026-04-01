"use client";

import { useMemo, useState, useEffect } from "react";
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

// 画像のアスペクト比を取得するフック
function useImageAspect(imageSrc: string) {
  const [aspect, setAspect] = useState(4 / 5); // デフォルト

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setAspect(img.height / img.width);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  return aspect;
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
   Combined Scene（2レイヤー・auto-fit）
------------------------------------------------------- */
function GlassPanelScene({ imageSrc, baseWidth }: { imageSrc: string; baseWidth: number }) {
  const { camera } = useThree();
  const texture = useTexture(imageSrc);

  const { width, height } = useMemo(() => {
    const img = texture.image as HTMLImageElement;
    if (!img || !img.width || !img.height) {
      return { width: baseWidth, height: baseWidth };
    }
    const aspect = img.height / img.width;
    return { width: baseWidth, height: baseWidth * aspect };
  }, [texture, baseWidth]);

  // カメラ距離を自動調整
  useMemo(() => {
    camera.position.z = height * 1.2;
  }, [camera, height]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <PhotoLayer imageSrc={imageSrc} width={width} height={height} />
      <FrontGlass width={width} height={height} />
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
  const aspect = useImageAspect(imageSrc);
  
  // コンテナの高さを画像のアスペクト比に基づいて計算
  // 幅はグリッドに合わせて100%、高さはアスペクト比で決定
  const containerHeight = useMemo(() => {
    // コンテナの幅に対する比率で高さを計算
    // PC版はgrid-cols-2なので、コンテナ幅はmax-w-4xlの半分程度
    return `${aspect * 100}%`;
  }, [aspect]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* PC版 */}
      <div className="hidden md:grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
        {/* 写真（Three.js・auto-fit） */}
        <div
          className={`relative w-full ${
            isImageLeft ? "order-1" : "order-2"
          }`}
          style={{ aspectRatio: `1 / ${aspect}` }}
        >
          <Canvas
            camera={{ position: [0, 0, 2], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="absolute inset-0"
          >
            <GlassPanelScene imageSrc={imageSrc} baseWidth={1.8} />
          </Canvas>
        </div>

        {/* テキストパネル */}
        <div
          className={`relative flex flex-col justify-center p-8 ${
            isImageLeft ? "order-2" : "order-1"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.30) 100%)",
            backdropFilter: "blur(20px)",
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
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.30) 100%)",
            backdropFilter: "blur(15px)",
          }}
        >
          <div className="space-y-3">
            <h3 className="text-xl font-light text-white tracking-wide">
              {title}
            </h3>
            <p className="text-sm text-white leading-relaxed">{description}</p>
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
