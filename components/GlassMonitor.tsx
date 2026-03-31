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
            float fres = pow(vEdge, 2.2);
            gl_FragColor = vec4(uColor * fres * 2.6, fres);
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
  const fresnel = useFresnel("#ffffff");

  const isPC = typeof window !== "undefined" && window.innerWidth > 1024;

  // 小さめにして画面に収める
  const baseHeight = isPC ? 3.5 : 3.0;
  const baseWidth = baseHeight * 1.6;

  useFrame(() => {
    if (!groupRef.current) return;
    // 軽い浮遊アニメーションのみ（下方向への移動を防ぐ）
    groupRef.current.position.y = scrollFactor * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, z]}>
      {/* ガラス本体 */}
      <RoundedBox args={[baseWidth, baseHeight, 0.15]} radius={0.3} smoothness={12}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          roughness={0.08}
          metalness={0.2}
          transmission={0.9}
          thickness={2.0}
          envMapIntensity={2.0}
        />
      </RoundedBox>

      {/* Fresnel エッジ */}
      <mesh>
        <planeGeometry args={[baseWidth + 0.25, baseHeight + 0.25]} />
        <primitive object={fresnel} />
      </mesh>

      {/* 擬似シャドウ */}
      <mesh position={[0, -baseHeight / 2 - 0.3, 0]}>
        <planeGeometry args={[baseWidth * 0.8, baseHeight * 0.12]} />
        <meshBasicMaterial color="black" transparent opacity={0.14} />
      </mesh>

      {/* アイコン枠 */}
      <group position={[-baseWidth * 0.25, 0, 0.08]}>
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
      >
        {label}
      </Text>
    </group>
  );
}
