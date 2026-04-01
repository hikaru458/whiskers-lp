"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text3D, Center } from "@react-three/drei";

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const logoRef = useRef<THREE.Group>(null);

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

    // ロゴの浮遊アニメーション
    if (logoRef.current) {
      logoRef.current.position.y = Math.sin(t * 0.5) * 0.1;
      logoRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
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

      {/* 3D立体ワイヤーフレームロゴ */}
      <Center position={[0, 0, -1]}>
        <group ref={logoRef}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            WHISKERS
            <meshBasicMaterial color="#a8c5ff" transparent opacity={0.6} />
          </Text3D>
          {/* ワイヤーフレームエッジ */}
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            WHISKERS
            <meshBasicMaterial color="#7fd4ff" transparent opacity={0.8} wireframe />
          </Text3D>
        </group>
      </Center>
    </group>
  );
}
