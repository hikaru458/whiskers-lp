"use client";

import { RoundedBox, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";

function useFresnel(color: string) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(color) } },
        vertexShader: `
          varying float vEdge;
          void main() {
            vec3 worldNormal = normalize(normalMatrix * normal);
            vec3 viewDir = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
            vEdge = 1.0 - max(dot(worldNormal, viewDir), 0.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vEdge;
          uniform vec3 uColor;
          void main() {
            float fres = pow(vEdge, 2.0);
            gl_FragColor = vec4(uColor * fres * 2.5, fres * 0.6);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [color]
  );
}

export default function GlassMonitor({
  label,
  z,
  scrollFactor,
  images = [],
  slideInterval = 3000,
}: {
  label: string;
  z: number;
  scrollFactor: number;
  images?: string[];
  slideInterval?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const fresnel = useFresnel("#7dd3fc");

  // 画像スライドショー
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const texture = useTexture(images[currentImageIndex] || "/placeholder.png");
  
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, slideInterval);
    return () => clearInterval(interval);
  }, [images, slideInterval]);

  const isPC = typeof window !== "undefined" && window.innerWidth > 1024;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // 1.5倍大きく + スマホは縦長
  const baseHeight = isPC ? 5.25 : (isMobile ? 4.5 : 4.5);
  const baseWidth = isPC ? 8.4 : (isMobile ? 8.0 : 7.2); // スマホ: 9:16 縦長

  useFrame(() => {
    if (!groupRef.current) return;
    // 軽い浮遊アニメーションのみ（下方向への移動を防ぐ）
    groupRef.current.position.y = scrollFactor * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, z]} rotation={isMobile ? [0.1, -0.2, Math.PI / 2] : [0.15, -0.25, 0]}>
      {/* 背面ガラス - 厚みを強調 */}
      <RoundedBox args={[baseWidth, baseHeight, 0.15]} radius={0.15} smoothness={10} position={[0, 0, -0.2]}>
        <meshPhysicalMaterial
          color="#0c4a6e"
          roughness={0.05}
          metalness={0.1}
          transmission={0.95}
          thickness={2.0}
          envMapIntensity={2.0}
        />
      </RoundedBox>

      {/* ガラス本体 - 厚みと色付き */}
      <RoundedBox args={[baseWidth, baseHeight, 0.4]} radius={0.15} smoothness={10}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.02}
          metalness={0.05}
          transmission={0.99}
          thickness={6.0}
          ior={1.5}
          envMapIntensity={3.0}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
        />
      </RoundedBox>

      {/* 白いフレーム枠 - フォトフレーム風 */}
      <RoundedBox args={[baseWidth + 0.1, baseHeight + 0.1, 0.05]} radius={0.18} smoothness={10} position={[0, 0, -0.05]}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.0}
          transmission={0.0}
          envMapIntensity={1.0}
        />
      </RoundedBox>

      {/* 画像/コンテンツレイヤー */}
      {images.length > 0 && (
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[baseWidth - 0.3, baseHeight - 0.3]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}

      {/* 側面エッジ - 厚み強調 */}
      <mesh position={[0, 0, -0.2]}>
        <RoundedBox args={[baseWidth + 0.02, baseHeight + 0.02, 0.4]} radius={0.15} smoothness={10}>
          <meshPhysicalMaterial
            color="#0ea5e9"
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.3}
          />
        </RoundedBox>
      </mesh>

      {/* Fresnel エッジ - より繊細に */}
      <mesh scale={[baseWidth + 0.15, baseHeight + 0.15, 0.15]}>
        <planeGeometry args={[1, 1]} />
        <primitive object={fresnel} />
      </mesh>

      {/* ガラスカバー - 保護フィルム風 */}
      <RoundedBox args={[baseWidth - 0.2, baseHeight - 0.2, 0.02]} radius={0.12} smoothness={8} position={[0, 0, 0.06]}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.01}
          metalness={0.0}
          transmission={0.95}
          thickness={0.5}
          ior={1.4}
          envMapIntensity={2.0}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
        />
      </RoundedBox>

      {/* 擬似シャドウ */}
      <mesh position={[0, -baseHeight / 2 - 0.3, 0]}>
        <planeGeometry args={[baseWidth * 0.8, baseHeight * 0.12]} />
        <meshBasicMaterial color="black" transparent opacity={0.15} />
      </mesh>

      {/* アイコン枠 */}
      <group position={[-baseWidth * 0.25, 0, 0.08]} rotation={isMobile ? [0, 0, -Math.PI / 2] : [0, 0, 0]}>
        <RoundedBox args={[0.8, 0.8, 0.02]} radius={0.2} smoothness={8}>
          <meshBasicMaterial color="#e5e7eb" transparent opacity={0.9} wireframe />
        </RoundedBox>
      </group>

      {/* ラベルテキスト - より明るく */}
      <Text
        position={[0.4, 0, 0.15]}
        fontSize={0.6}
        color="#e0f2fe"
        anchorX="left"
        anchorY="middle"
        rotation={isMobile ? [0, 0, -Math.PI / 2] : [0, 0, 0]}
      >
        {label}
      </Text>
    </group>
  );
}
