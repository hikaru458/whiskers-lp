"use client";

import { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture, Text } from "@react-three/drei";

function LogoPlane() {
  try {
    const logoTexture = useTexture("/whiskers-logo.png");
    return (
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[3, 1]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          opacity={0.9}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  } catch {
    // ロゴ画像がない場合はテキスト表示
    return (
      <Text
        position={[0, 0, -1]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Whiskers
      </Text>
    );
  }
}

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  // キューブ1のジオメトリ
  const cube1Geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(2, 2, 2);
    return new THREE.EdgesGeometry(box);
  }, []);

  // キューブ2のジオメトリ
  const cube2Geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    return new THREE.EdgesGeometry(box);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // グループ全体をゆっくり回転
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;

    // 個別の回転も追加
    const cube1 = groupRef.current.children[0] as THREE.LineSegments;
    const cube2 = groupRef.current.children[1] as THREE.LineSegments;

    if (cube1) {
      cube1.rotation.x = t * 0.2;
      cube1.rotation.z = t * 0.15;
    }
    if (cube2) {
      cube2.rotation.y = -t * 0.25;
      cube2.rotation.x = Math.cos(t * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* キューブ1 - 大きい方 */}
      <lineSegments geometry={cube1Geometry} position={[-2, 0, -3]}>
        <lineBasicMaterial color="#7fd4ff" transparent opacity={0.25} />
      </lineSegments>

      {/* キューブ2 - 小さい方 */}
      <lineSegments geometry={cube2Geometry} position={[2, 1, -4]}>
        <lineBasicMaterial color="#c7baff" transparent opacity={0.2} />
      </lineSegments>

      {/* ロゴまたはテキスト */}
      <Suspense fallback={null}>
        <LogoPlane />
      </Suspense>
    </group>
  );
}
