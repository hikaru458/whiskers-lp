"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// =========================
// 1. ミスト（ゆっくり動く）
// =========================
function MovingMist() {
  const mistRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mistRef.current) {
      mistRef.current.material.opacity = 0.12 + Math.sin(t * 0.1) * 0.03;
      mistRef.current.position.x = Math.sin(t * 0.05) * 0.3;
      mistRef.current.position.y = Math.cos(t * 0.04) * 0.2;
    }
  });

  return (
    <mesh ref={mistRef} position={[0, 0, -8]}>
      <planeGeometry args={[20, 12]} />
      <meshBasicMaterial
        color="#c7baff"
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

// =========================
// 2. 粒子（前景・背景）
// =========================
function Particles({ count = 200, size = 0.015, depth = -5 }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = t * 0.02;
    }
  });

  return (
    <points ref={points} position={[0, 0, depth]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color="#ffffff"
        transparent
        opacity={0.4}
      />
    </points>
  );
}

// =========================
// 3. メイン Scene
// =========================
export default function Scene() {
  const cubeRef = useRef<THREE.Group>(null);

  // キューブのワイヤーフレーム
  const cubeGeometry = useMemo(() => {
    const box = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    return new THREE.EdgesGeometry(box);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.y = t * 0.15;
      cubeRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <>
      {/* ========================= */}
      {/* Fog（空気の厚み） */}
      {/* ========================= */}
      <fog attach="fog" args={["#0a1a2f", 5, 15]} />

      {/* ========================= */}
      {/* 背景粒子（奥） */}
      {/* ========================= */}
      <Particles count={150} size={0.02} depth={-10} />

      {/* ========================= */}
      {/* ゆっくり動くミスト */}
      {/* ========================= */}
      <MovingMist />

      {/* ========================= */}
      {/* 前景粒子（手前） */}
      {/* ========================= */}
      <Particles count={80} size={0.03} depth={-3} />

      {/* ========================= */}
      {/* 回転キューブ */}
      {/* ========================= */}
      <group ref={cubeRef} position={[0, 0, -5]}>
        <lineSegments geometry={cubeGeometry}>
          <lineBasicMaterial color="#7fd4ff" transparent opacity={0.2} />
        </lineSegments>
      </group>
    </>
  );
}
