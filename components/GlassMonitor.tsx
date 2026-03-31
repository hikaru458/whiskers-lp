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
            gl_FragColor = vec4(uColor * fres * 2.8, fres);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [color]
  );
}

export default function GlassMonitor({ label, z, scrollFactor }: { label: string; z: number; scrollFactor: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const fresnel = useFresnel("#ffffff");

  const isPC = typeof window !== "undefined" && window.innerWidth > 1024;

  // 横長（16:10）＋ PC で大きく
  const baseHeight = isPC ? 6.5 : 5.2;
  const baseWidth = baseHeight * 1.6;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = scrollFactor * 0.25;
  });

  return (
    <group ref={groupRef} position={[0, 0.4, z]}>
      {/* ガラス本体 */}
      <RoundedBox args={[baseWidth, baseHeight, 0.22]} radius={0.45} smoothness={16}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
          roughness={0.06}
          metalness={0.25}
          transmission={0.92}
          thickness={2.4}
          envMapIntensity={2.4}
        />
      </RoundedBox>

      {/* Fresnel */}
      <mesh>
        <planeGeometry args={[baseWidth + 0.35, baseHeight + 0.35]} />
        <primitive object={fresnel} />
      </mesh>

      {/* 擬似シャドウ */}
      <mesh position={[0, -baseHeight / 2 - 0.5, 0]}>
        <planeGeometry args={[baseWidth * 0.85, baseHeight * 0.18]} />
        <meshBasicMaterial color="black" transparent opacity={0.12} />
      </mesh>

      {/* アイコン（角丸 4〜6px） */}
      <group position={[-baseWidth * 0.22, 0.15, 0.08]}>
        <RoundedBox args={[1.1, 1.1, 0.02]} radius={0.25} smoothness={10}>
          <meshBasicMaterial color="#e5e7eb" transparent opacity={0.9} wireframe />
        </RoundedBox>
      </group>

      {/* テキスト */}
      <Text
        position={[0.5, 0, 0.1]}
        fontSize={0.75}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}
