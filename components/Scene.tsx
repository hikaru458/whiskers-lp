"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

// 優雅な猫のワイヤーフレームジオメトリを生成
function createCatGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];

  // 猫の頭（円）
  const headRadius = 0.4;
  const headSegments = 16;
  for (let i = 0; i <= headSegments; i++) {
    const angle = (i / headSegments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * headRadius,
        Math.sin(angle) * headRadius + 0.3,
        0
      )
    );
  }

  // 猫の耳（左）
  points.push(new THREE.Vector3(-0.25, 0.6, 0));
  points.push(new THREE.Vector3(-0.35, 0.8, 0));
  points.push(new THREE.Vector3(-0.15, 0.7, 0));
  points.push(new THREE.Vector3(-0.25, 0.6, 0));

  // 猫の耳（右）
  points.push(new THREE.Vector3(0.25, 0.6, 0));
  points.push(new THREE.Vector3(0.35, 0.8, 0));
  points.push(new THREE.Vector3(0.15, 0.7, 0));
  points.push(new THREE.Vector3(0.25, 0.6, 0));

  // 猫の体（楕円）
  const bodyWidth = 0.5;
  const bodyHeight = 0.6;
  const bodySegments = 12;
  for (let i = 0; i <= bodySegments; i++) {
    const angle = (i / bodySegments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * bodyWidth,
        Math.sin(angle) * bodyHeight - 0.4,
        0
      )
    );
  }

  // 猫の尻尾（優雅なカーブ）
  const tailPoints = 8;
  for (let i = 0; i <= tailPoints; i++) {
    const t = i / tailPoints;
    const x = 0.3 + t * 0.4;
    const y = -0.5 + Math.sin(t * Math.PI) * 0.3;
    points.push(new THREE.Vector3(x, y, 0));
  }

  // 猫の前足（左）
  points.push(new THREE.Vector3(-0.2, -0.7, 0));
  points.push(new THREE.Vector3(-0.2, -0.9, 0));

  // 猫の前足（右）
  points.push(new THREE.Vector3(0.2, -0.7, 0));
  points.push(new THREE.Vector3(0.2, -0.9, 0));

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  return geometry;
}

export default function Scene() {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);

  // キューブ1のジオメトリ（透明ワイヤーフレーム）
  const cube1Geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    return new THREE.EdgesGeometry(box);
  }, []);

  // 猫のジオメトリ
  const catGeometry = useMemo(() => createCatGeometry(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // グループ1（キューブ＋発光テキスト）をゆっくり回転
    if (group1Ref.current) {
      group1Ref.current.rotation.y = t * 0.15;
      group1Ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }

    // グループ2（猫）を優雅に浮遊
    if (group2Ref.current) {
      group2Ref.current.rotation.y = -t * 0.12;
      group2Ref.current.position.y = Math.sin(t * 0.3) * 0.2;
      group2Ref.current.position.x = Math.cos(t * 0.2) * 0.1;
    }

    // テキストの発光アニメーション
    if (textRef.current) {
      const material = textRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        // 脈打つような発光
        const glowIntensity = 0.8 + Math.sin(t * 2) * 0.2;
        material.opacity = glowIntensity;
      }
    }
  });

  return (
    <>
      {/* グループ1: 透明キューブの中に発光Whiskers */}
      <group ref={group1Ref} position={[-2.5, 0, -3]}>
        {/* 透明ワイヤーフレームキューブ */}
        <lineSegments geometry={cube1Geometry}>
          <lineBasicMaterial color="#7fd4ff" transparent opacity={0.15} />
        </lineSegments>

        {/* 発光するWhiskersテキスト */}
        <Text
          ref={textRef}
          position={[0, 0, 0]}
          fontSize={0.6}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Whiskers
          <meshBasicMaterial
            color="#7fd4ff"
            transparent
            opacity={1}
          />
        </Text>

        {/* 発光エフェクト（外側の光） */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2, 0.8]} />
          <meshBasicMaterial
            color="#7fd4ff"
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* グループ2: 優雅な猫のワイヤーフレーム */}
      <group ref={group2Ref} position={[2.5, 0, -4]}>
        {/* 猫のワイヤーフレーム（白い線） */}
        <lineSegments geometry={catGeometry}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </lineSegments>

        {/* 猫の優雅な光のオーラ */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[1.5, 2]} />
          <meshBasicMaterial
            color="#c7baff"
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>
    </>
  );
}
