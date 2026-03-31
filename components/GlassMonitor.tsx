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
  glassTheme = "blue",
}: {
  label: string;
  z: number;
  scrollFactor: number;
  images?: string[];
  glassTheme?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const fresnel = useFresnel("#7dd3fc", 2.5);

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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // 元のサイズに戻す
  const baseHeight = isPC ? 3.5 : (isMobile ? 3.0 : 3.0);
  const baseWidth = isPC ? 5.6 : (isMobile ? 5.3 : 4.8);

  useFrame(() => {
    if (!groupRef.current) return;
    // 軽い浮遊アニメーションのみ（下方向への移動を防ぐ）
    groupRef.current.position.y = scrollFactor * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, z]} rotation={isMobile ? [0.1, -0.2, Math.PI / 2] : [0.15, -0.25, 0]}>

      {/* === ① 画像（前面） === */}
      {images.length > 0 && (
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[baseWidth - 0.25, baseHeight - 0.25]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}

      {/* === ② メインガラス（屈折 + 色） === */}
      <RoundedBox 
        args={[baseWidth, baseHeight, 0.05]} 
        radius={0.05} 
        smoothness={10}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color={theme.color}
          attenuationColor={theme.attenuationColor}
          attenuationDistance={4.0}
          roughness={0.05}
          metalness={0.1}
          transmission={0.78}
          thickness={0.2}
          ior={1.5}
          envMapIntensity={2.0}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          transparent
          opacity={0.22}
        />
      </RoundedBox>

      {/* === ③ 前面ガラス（薄い透明層） === */}
      <RoundedBox 
        args={[baseWidth - 0.02, baseHeight - 0.02, 0.02]} 
        radius={0.04} 
        smoothness={10}
        position={[0, 0, 0.03]}
      >
        <meshPhysicalMaterial
          color={theme.color}
          roughness={0.1}
          metalness={0.05}
          transmission={0.85}
          thickness={0.05}
          ior={1.45}
          envMapIntensity={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
        />
      </RoundedBox>

      {/* === ④ 反射レイヤー（薄い膜） === */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[baseWidth - 0.02, baseHeight - 0.02]} />
        <meshPhysicalMaterial
          color={theme.color}
          metalness={1.0}
          roughness={0.2}
          envMapIntensity={4.0}
          transparent
          opacity={0.03}
        />
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
