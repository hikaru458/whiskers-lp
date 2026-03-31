"use client";

import { RoundedBox, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";

export default function GlassMonitor({
  label,
  z,
  scrollFactor,
  images = [],
  glassTheme = "blue",
}: {
  label: string;
  z: number;
  scrollFactor: number;
  images?: string[];
  glassTheme?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // 6色テーマ（Active Theory 風）
  const themes: Record<string, { color: string; attenuationColor: string }> = {
    blue:   { color: "#d0f4ff", attenuationColor: "#a0e8ff" },
    red:    { color: "#ffd0d0", attenuationColor: "#ffb3b3" },
    green:  { color: "#d4ffe7", attenuationColor: "#b2f5ea" },
    purple: { color: "#f3d9ff", attenuationColor: "#e0b3ff" },
    yellow: { color: "#fff3b0", attenuationColor: "#ffe08a" },
    pink:   { color: "#ffd6f5", attenuationColor: "#ffb3eb" },
  };

  const theme = themes[glassTheme] ?? themes.blue;

  // 画像
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const texture = useTexture(images[currentImageIndex] || "/placeholder.png");

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const isPC = typeof window !== "undefined" && window.innerWidth > 1024;
  const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth <= 1024;

  // モバイルファースト：縦長比率を固定（4.2 x 6.8）
  const baseWidth = 4.2;
  const baseHeight = 6.8;

  // スケール制御（モバイル基準 = 1.0）
  const scale = isPC ? 1.5 : (isTablet ? 1.2 : 1.0);

  // モバイル最適角度（厚みが自然に見える）
  const rotation = [0.12, -0.22, 0] as [number, number, number];

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = scrollFactor * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, z]} rotation={rotation} scale={scale}>

      {/* === ④ メインガラス（ガラスの塊感） === */}
      <RoundedBox
        args={[baseWidth, baseHeight, 0.12]}
        radius={0.05}
        smoothness={10}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color={theme.color}
          attenuationColor={theme.attenuationColor}
          attenuationDistance={3.0}
          roughness={0.03}
          metalness={0.15}
          transmission={0.78}
          thickness={0.3}
          ior={1.52}
          envMapIntensity={2.5}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          transparent
          opacity={0.22}
        />
      </RoundedBox>

      {/* === ③ 前面ガラス（本体より 3% 小さく） === */}
      <RoundedBox
        args={[baseWidth * 0.97, baseHeight * 0.97, 0.03]}
        radius={0.04}
        smoothness={10}
        position={[0, 0, 0.05]}
      >
        <meshPhysicalMaterial
          color={theme.color}
          roughness={0.04}
          metalness={0.05}
          transmission={0.82}
          thickness={0.06}
          ior={1.45}
          envMapIntensity={1.8}
          clearcoat={1.0}
          clearcoatRoughness={0.005}
          transparent
          opacity={0.12}
        />
      </RoundedBox>

      {/* === ② 反射レイヤー（残像ゼロ設定） === */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[baseWidth * 0.97, baseHeight * 0.97]} />
        <meshPhysicalMaterial
          color={theme.color}
          metalness={1.0}
          roughness={0.03}
          envMapIntensity={5.0}
          transparent
          opacity={0.025}
        />
      </mesh>

      {/* === ① 画像（ガラス内部に浮かせる 70% ルール） === */}
      {images.length > 0 && (
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[baseWidth * 0.7, baseHeight * 0.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}

      {/* シャドウ */}
      <mesh position={[0, -baseHeight / 2 - 0.3, -0.1]}>
        <planeGeometry args={[baseWidth * 0.8, baseHeight * 0.12]} />
        <meshBasicMaterial color="black" transparent opacity={0.2} />
      </mesh>

      {/* ラベルテキスト */}
      <Text
        position={[0.4, -baseHeight / 2 - 0.6, 0.15]}
        fontSize={0.5}
        color="#e0f2fe"
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}
