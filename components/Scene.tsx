"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import GlassMonitor from "./GlassMonitor";
import * as THREE from "three";

export default function Scene({
  isActive,
  images,
}: {
  isActive: boolean;
  images: string[];
}) {
  const planes = useRef<THREE.Mesh[]>([]);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!isActive) return;

    const t = state.clock.getElapsedTime();

    // 背景トンネルの奥行きアニメーション
    planes.current.forEach((plane, i) => {
      if (plane) {
        plane.position.z = -i * 4 + (t * 0.6) % 4;
      }
    });

    // ガラスの微揺れ（UPP 風）
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.03;
      group.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* 背景トンネル - 光の板 */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) planes.current[i] = el;
          }}
          position={[0, 0, -i * 4]}
        >
          <planeGeometry args={[12, 20]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}

      {/* 中央のガラスモニター */}
      <group ref={group} position={[0, 0, 0]}>
        <GlassMonitor isActive={isActive} images={images} />
      </group>
    </group>
  );
}
