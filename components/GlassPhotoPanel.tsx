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
function PhotoLayer({ imageSrc }: { imageSrc: string }) {
  const texture = useTexture(imageSrc);

  const { width, height } = useMemo(() => {
    const img = texture.image as HTMLImageElement;
    if (!img || !img.width || !img.height) {
      return { width: 1, height: 1 };
    }
    const aspect = img.height / img.width;
    // 横幅を1.8程度に固定し、アスペクト比に応じて高さを調整
    const baseWidth = 1.8;
    return { width: baseWidth, height: baseWidth * aspect };
  }, [texture]);

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
function FrontGlass({ imageSrc }: { imageSrc: string }) {
  const texture = useTexture(imageSrc);

  const { width, height } = useMemo(() => {
    const img = texture.image as HTMLImageElement;
    if (!img || !img.width || !img.height) {
      return { width: 1, height: 1 };
    }
    const aspect = img.height / img.width;
    const baseWidth = 1.8;
    return { width: baseWidth, height: baseWidth * aspect };
  }, [texture]);

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
function GlassPanelScene({ imageSrc }: { imageSrc: string }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <PhotoLayer imageSrc={imageSrc} />
      <FrontGlass imageSrc={imageSrc} />
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
        {/* 写真（Three.js・auto-fit） */}
        <div
          className={`relative w-full h-auto ${
            isImageLeft ? "order-1" : "order-2"
          }`}
        >
          <Canvas
            camera={{ position: [0, 0, 2], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-auto"
            style={{ height: "auto" }}
          >
            <GlassPanelScene imageSrc={imageSrc} />
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
