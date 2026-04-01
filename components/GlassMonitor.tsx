"use client";

import { useTexture, RoundedBox } from "@react-three/drei";
import { useMemo, useState, useEffect } from "react";

export default function GlassMonitor({
  isActive,
  images = [],
}: {
  isActive: boolean;
  images: string[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // デバイス判定
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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
  const { w, h } = useMemo(() => {
    return isMobile
      ? { w: 4.2, h: 6.8 } // スマホ：縦長
      : { w: 6.8, h: 4.2 }; // PC：横長
  }, [isMobile]);

  // スケール
  const scale = isMobile ? 1 : 1.5;

  return (
    <group scale={scale}>
      {/* メインガラス（2レイヤー軽量版） */}
      <RoundedBox args={[w, h, 0.12]} radius={0.05} smoothness={10}>
        <meshPhysicalMaterial
          color="#a8c8ff"
          attenuationColor="#a8c8ff"
          attenuationDistance={1.8}
          roughness={0.05}
          metalness={0.15}
          transmission={isMobile ? 0.5 : 0.78}
          thickness={0.35}
          ior={1.52}
          envMapIntensity={2.5}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          transparent
          opacity={0.32}
        />
      </RoundedBox>

      {/* 内部の画像（浮かせる） */}
      {isActive && images.length > 0 && (
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[w * 0.7, h * 0.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}
