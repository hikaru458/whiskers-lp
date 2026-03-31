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
            float fres = pow(vEdge, 2.0);
            gl_FragColor = vec4(uColor * fres * 1.8, fres);
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

  const baseHeight = 6;
  const baseWidth = (9 / 16) * baseHeight;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = scrollFactor * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, z]}>
      {/* ガラス本体 */}
      <RoundedBox args={[baseWidth, baseHeight, 0.12]} radius={0.3} smoothness={12}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.22}
          roughness={0.1}
          metalness={0.2}
          transmission={0.9}
          thickness={1.5}
          envMapIntensity={1.8}
        />
      </RoundedBox>

      {/* Fresnel */}
      <mesh>
        <planeGeometry args={[baseWidth + 0.25, baseHeight + 0.25]} />
        <primitive object={fresnel} />
      </mesh>

      {/* 擬似シャドウ */}
      <mesh position={[0, -baseHeight / 2 - 0.4, 0]}>
        <planeGeometry args={[baseWidth * 0.7, baseHeight * 0.12]} />
        <meshBasicMaterial color="black" transparent opacity={0.14} />
      </mesh>

      {/* アイコン（角丸 4〜6px / 2.5px ライン） */}
      <group position={[-baseWidth * 0.18, 0.1, 0.08]}>
        <RoundedBox args={[0.9, 0.9, 0.02]} radius={0.18} smoothness={8}>
          <meshBasicMaterial
            color="#e5e7eb"
            transparent
            opacity={0.9}
            wireframe
          />
        </RoundedBox>
      </group>

      {/* テキスト */}
      <Text
        position={[0.3, 0, 0.1]}
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
