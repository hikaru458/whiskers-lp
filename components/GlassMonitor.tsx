"use client";

import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

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
            float fres = pow(vEdge, 3.0);
            gl_FragColor = vec4(uColor * fres * 1.5, fres * 0.3);
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
}: {
  label: string;
  z: number;
  scrollFactor: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const fresnel = useFresnel("#1a1a2e");

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
    <group ref={groupRef} position={[0, 0, z]} rotation={isMobile ? [0, 0, Math.PI / 2] : [0, 0, 0]}>
      {/* ガラス本体 */}
      <RoundedBox args={[baseWidth, baseHeight, 0.15]} radius={0.1} smoothness={8}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.02}
          metalness={0.0}
          transmission={1.0}
          thickness={5.0}
          ior={1.5}
          envMapIntensity={2.0}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          attenuationColor="#a8d8ff"
          attenuationDistance={8.0}
        />
      </RoundedBox>

      {/* Fresnel エッジ - より繊細に */}
      <mesh scale={[baseWidth + 0.15, baseHeight + 0.15, 0.15]}>
        <planeGeometry args={[1, 1]} />
        <primitive object={fresnel} />
      </mesh>

      {/* 擬似シャドウ */}
      <mesh position={[0, -baseHeight / 2 - 0.3, 0]}>
        <planeGeometry args={[baseWidth * 0.8, baseHeight * 0.12]} />
        <meshBasicMaterial color="black" transparent opacity={0.08} />
      </mesh>

      {/* アイコン枠 */}
      <group position={[-baseWidth * 0.25, 0, 0.08]} rotation={isMobile ? [0, 0, -Math.PI / 2] : [0, 0, 0]}>
        <RoundedBox args={[0.8, 0.8, 0.02]} radius={0.2} smoothness={8}>
          <meshBasicMaterial color="#e5e7eb" transparent opacity={0.9} wireframe />
        </RoundedBox>
      </group>

      {/* ラベルテキスト */}
      <Text
        position={[0.4, 0, 0.1]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        rotation={isMobile ? [0, 0, -Math.PI / 2] : [0, 0, 0]}
      >
        {label}
      </Text>
    </group>
  );
}
