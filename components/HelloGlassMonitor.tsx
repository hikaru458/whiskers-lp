"use client";

import { Canvas } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

// Hello page specific lightweight glass monitor
function HelloGlassMonitor({
  images = [],
  isActive,
  isPC,
}: {
  images: string[];
  isActive: boolean;
  isPC: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // テーマカラー（青色ベース）
  const theme = {
    color: "#d0f4ff",
    attenuationColor: "#d0f4ff",
  };

  // テクスチャ読み込み（アクティブ時のみ）
  const texture = useTexture(
    isActive && images.length > 0 ? images[currentImageIndex] : "/placeholder.png"
  );

  // 画像スライドショー
  useEffect(() => {
    if (!isActive || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isActive, images]);

  // デバイス別アスペクト比
  const baseWidth = isPC ? 6.8 : 4.2;
  const baseHeight = isPC ? 4.2 : 6.8;

  // PCではスケールアップ
  const scale = isPC ? 1.5 : 1.0;

  // アクティブ時のみアニメーション
  useEffect(() => {
    if (!isActive || !groupRef.current) return;
    // 軽い浮遊アニメーション
    let frameId: number;
    const animate = () => {
      if (!groupRef.current) return;
      const time = Date.now() * 0.001;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isActive]);

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={scale}>
      {/* Layer 1: メインガラス（高級カラーガラス） */}
      <RoundedBox
        args={[baseWidth, baseHeight, 0.12]}
        radius={0.05}
        smoothness={10}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color={theme.color}
          attenuationColor={theme.attenuationColor}
          attenuationDistance={1.8}
          roughness={0.05}
          metalness={0.15}
          transmission={0.78}
          thickness={0.35}
          ior={1.52}
          envMapIntensity={2.5}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          transparent
          opacity={0.32}
        />
      </RoundedBox>

      {/* Layer 2: 画像（ガラス内部に浮かせる） */}
      {isActive && images.length > 0 && (
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[baseWidth * 0.7, baseHeight * 0.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-48 md:w-48 md:h-32 bg-gradient-to-br from-sky-200/20 to-blue-300/20 rounded-lg animate-pulse" />
    </div>
  );
}

// Main export component
export default function HelloGlassMonitorSection({
  images,
  isActive,
}: {
  images: string[];
  isActive: boolean;
}) {
  const isPC = typeof window !== "undefined" && window.innerWidth > 1024;

  // デバイス別カメラ設定
  const cameraPosition: [number, number, number] = isPC ? [0, 0, 17] : [0, 0, 13.5];

  if (!isActive) {
    return <LoadingFallback />;
  }

  return (
    <div className="w-full h-[60vh] md:h-[50vh]">
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 8]} intensity={1.5} />
        <Suspense fallback={null}>
          <HelloGlassMonitor images={images} isActive={isActive} isPC={isPC} />
        </Suspense>
      </Canvas>
    </div>
  );
}
