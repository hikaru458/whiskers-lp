"use client";

import { RoundedBox, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";

// ガラス内部のミストパーティクル
function GlassMist({ baseWidth, baseHeight }: { baseWidth: number; baseHeight: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, speeds } = useMemo(() => {
    const count = 30;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * (baseWidth - 0.5);
      positions[i * 3 + 1] = (Math.random() - 0.5) * (baseHeight - 0.5);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      speeds[i] = 0.0005 + Math.random() * 0.001;
    }
    
    return { positions, speeds };
  }, [baseWidth, baseHeight]);
  
  useFrame(() => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < 30; i++) {
      positions[i * 3 + 1] += speeds[i];
      if (positions[i * 3 + 1] > baseHeight / 2 - 0.2) {
        positions[i * 3 + 1] = -baseHeight / 2 + 0.2;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7dd3fc"
        size={0.15}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Fresnel エッジ発光シェーダー
function useFresnel(color: string, intensity = 2.5) {
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
            gl_FragColor = vec4(uColor * fres * ${intensity.toFixed(1)}, fres * 0.6);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [color, intensity]
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
  const fresnel = useFresnel("#7dd3fc", 2.5);

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
      
      {/* === ⑦ 背景空間（SpiralBackgroundで実装済み） === */}
      
      {/* === ⑥ 背面ガラス（裏側の反射層） === */}
      <RoundedBox 
        args={[baseWidth - 0.1, baseHeight - 0.1, 0.15]} 
        radius={0.14} 
        smoothness={10} 
        position={[0, 0, -0.25]}
      >
        <meshPhysicalMaterial
          color="#0a2540"
          roughness={0.1}
          metalness={0.15}
          transmission={0.6}
          thickness={1.5}
          ior={1.5}
          envMapIntensity={1.5}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* === ⑤ コンテンツ（画像・動画）- ガラスの中 === */}
      {images.length > 0 && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[baseWidth - 0.3, baseHeight - 0.3]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}

      {/* === ④ メインガラス本体（透明にして画像が見える） === */}
      <RoundedBox 
        args={[baseWidth, baseHeight, 0.5]} 
        radius={0.15} 
        smoothness={10}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.02}
          metalness={0.1}
          transmission={0.85}
          thickness={3.0}
          ior={1.5}
          envMapIntensity={3.0}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      {/* === ミストエフェクト - ガラス内部を漂う霧 === */}
      <GlassMist baseWidth={baseWidth} baseHeight={baseHeight} />

      {/* === ③ 中間層（内部反射フェイク層）- 超重要 === */}
      <mesh position={[0, 0, 0]}>
        <RoundedBox 
          args={[baseWidth - 0.15, baseHeight - 0.15, 0.02]} 
          radius={0.13} 
          smoothness={8}
        >
          <meshPhysicalMaterial
            color="#a5f3fc"
            roughness={0.2}
            metalness={0.3}
            transmission={0.4}
            transparent
            opacity={0.15}
            envMapIntensity={1.8}
          />
        </RoundedBox>
      </mesh>

      {/* === ② 前面ガラス（薄い透明層） === */}
      <RoundedBox 
        args={[baseWidth + 0.02, baseHeight + 0.02, 0.08]} 
        radius={0.16} 
        smoothness={10}
        position={[0, 0, 0.12]}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.01}
          metalness={0.05}
          transmission={0.95}
          thickness={0.2}
          ior={1.45}
          envMapIntensity={4.0}
          clearcoat={1.0}
          clearcoatRoughness={0.005}
        />
      </RoundedBox>

      {/* === ⑧ 前面反射専用レイヤー - Active Theory スタイル === */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[baseWidth, baseHeight]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={1.0}
          roughness={0.05}
          envMapIntensity={6.0}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* === ① Fresnel（縁の光） === */}
      <mesh scale={[baseWidth + 0.12, baseHeight + 0.12, 0.15]} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <primitive object={fresnel} />
      </mesh>

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
        rotation={isMobile ? [0, 0, -Math.PI / 2] : [0, 0, 0]}
      >
        {label}
      </Text>
    </group>
  );
}
