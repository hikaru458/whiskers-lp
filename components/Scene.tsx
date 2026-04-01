"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

// 3D立体猫ワイヤーフレーム（薄紫色）
function create3DCatGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const depth = 0.25; // 奥行き（厚み）

  // === 前面の猫顔 ===
  // 顔の輪郭（楕円）
  const faceRadiusX = 0.9;
  const faceRadiusY = 0.8;
  const segments = 32;
  const frontFacePoints: THREE.Vector3[] = [];
  const backFacePoints: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * faceRadiusX;
    const y = Math.sin(angle) * faceRadiusY;
    frontFacePoints.push(new THREE.Vector3(x, y, depth));
    backFacePoints.push(new THREE.Vector3(x * 0.85, y * 0.85, -depth));
  }

  // 前面の輪郭線
  for (let i = 0; i < frontFacePoints.length - 1; i++) {
    points.push(frontFacePoints[i], frontFacePoints[i + 1]);
  }

  // 後面の輪郭線
  for (let i = 0; i < backFacePoints.length - 1; i++) {
    points.push(backFacePoints[i], backFacePoints[i + 1]);
  }

  // 前後をつなぐ線（奥行きの表現）
  for (let i = 0; i < frontFacePoints.length; i += 4) {
    points.push(frontFacePoints[i], backFacePoints[i]);
  }

  // === 左耳（立体）===
  const leftEarFront = [
    new THREE.Vector3(-0.6, 0.5, depth),
    new THREE.Vector3(-0.85, 0.95, depth * 0.5),
    new THREE.Vector3(-0.35, 0.8, depth),
    new THREE.Vector3(-0.6, 0.5, depth),
  ];
  const leftEarBack = [
    new THREE.Vector3(-0.55, 0.5, -depth),
    new THREE.Vector3(-0.75, 0.85, -depth * 0.5),
    new THREE.Vector3(-0.35, 0.75, -depth),
    new THREE.Vector3(-0.55, 0.5, -depth),
  ];

  for (let i = 0; i < leftEarFront.length - 1; i++) {
    points.push(leftEarFront[i], leftEarFront[i + 1]);
    points.push(leftEarBack[i], leftEarBack[i + 1]);
  }
  // 耳の奥行き
  for (let i = 0; i < leftEarFront.length; i++) {
    points.push(leftEarFront[i], leftEarBack[i]);
  }

  // === 右耳（立体）===
  const rightEarFront = [
    new THREE.Vector3(0.6, 0.5, depth),
    new THREE.Vector3(0.85, 0.95, depth * 0.5),
    new THREE.Vector3(0.35, 0.8, depth),
    new THREE.Vector3(0.6, 0.5, depth),
  ];
  const rightEarBack = [
    new THREE.Vector3(0.55, 0.5, -depth),
    new THREE.Vector3(0.75, 0.85, -depth * 0.5),
    new THREE.Vector3(0.35, 0.75, -depth),
    new THREE.Vector3(0.55, 0.5, -depth),
  ];

  for (let i = 0; i < rightEarFront.length - 1; i++) {
    points.push(rightEarFront[i], rightEarFront[i + 1]);
    points.push(rightEarBack[i], rightEarBack[i + 1]);
  }
  for (let i = 0; i < rightEarFront.length; i++) {
    points.push(rightEarFront[i], rightEarBack[i]);
  }

  // === 目（立体）===
  const eyeRadius = 0.15;
  const eyeSegments = 16;
  const leftEyeCenter = { x: -0.35, y: 0.1 };
  const rightEyeCenter = { x: 0.35, y: 0.1 };

  // 左目 - 前面と後面
  for (let i = 0; i <= eyeSegments; i++) {
    const angle = (i / eyeSegments) * Math.PI * 2;
    const x = leftEyeCenter.x + Math.cos(angle) * eyeRadius;
    const y = leftEyeCenter.y + Math.sin(angle) * eyeRadius;
    if (i < eyeSegments) {
      const nextAngle = ((i + 1) / eyeSegments) * Math.PI * 2;
      const nextX = leftEyeCenter.x + Math.cos(nextAngle) * eyeRadius;
      const nextY = leftEyeCenter.y + Math.sin(nextAngle) * eyeRadius;
      points.push(new THREE.Vector3(x, y, depth), new THREE.Vector3(nextX, nextY, depth));
      points.push(new THREE.Vector3(x, y, -depth * 0.5), new THREE.Vector3(nextX, nextY, -depth * 0.5));
    }
  }

  // 右目 - 前面と後面
  for (let i = 0; i <= eyeSegments; i++) {
    const angle = (i / eyeSegments) * Math.PI * 2;
    const x = rightEyeCenter.x + Math.cos(angle) * eyeRadius;
    const y = rightEyeCenter.y + Math.sin(angle) * eyeRadius;
    if (i < eyeSegments) {
      const nextAngle = ((i + 1) / eyeSegments) * Math.PI * 2;
      const nextX = rightEyeCenter.x + Math.cos(nextAngle) * eyeRadius;
      const nextY = rightEyeCenter.y + Math.sin(nextAngle) * eyeRadius;
      points.push(new THREE.Vector3(x, y, depth), new THREE.Vector3(nextX, nextY, depth));
      points.push(new THREE.Vector3(x, y, -depth * 0.5), new THREE.Vector3(nextX, nextY, -depth * 0.5));
    }
  }

  // === 鼻（立体）===
  const noseFront = [
    new THREE.Vector3(0, -0.15, depth),
    new THREE.Vector3(-0.1, -0.05, depth),
    new THREE.Vector3(0.1, -0.05, depth),
    new THREE.Vector3(0, -0.15, depth),
  ];
  const noseBack = [
    new THREE.Vector3(0, -0.12, 0),
    new THREE.Vector3(-0.08, -0.04, 0),
    new THREE.Vector3(0.08, -0.04, 0),
    new THREE.Vector3(0, -0.12, 0),
  ];
  for (let i = 0; i < noseFront.length - 1; i++) {
    points.push(noseFront[i], noseFront[i + 1]);
    points.push(noseBack[i], noseBack[i + 1]);
  }
  for (let i = 0; i < noseFront.length; i++) {
    points.push(noseFront[i], noseBack[i]);
  }

  // === 口（立体・W型）===
  const mouthFront = [
    new THREE.Vector3(-0.18, -0.28, depth),
    new THREE.Vector3(-0.06, -0.4, depth),
    new THREE.Vector3(0, -0.32, depth),
    new THREE.Vector3(0.06, -0.4, depth),
    new THREE.Vector3(0.18, -0.28, depth),
  ];
  const mouthBack = [
    new THREE.Vector3(-0.15, -0.25, depth * 0.5),
    new THREE.Vector3(-0.05, -0.35, depth * 0.5),
    new THREE.Vector3(0, -0.28, depth * 0.5),
    new THREE.Vector3(0.05, -0.35, depth * 0.5),
    new THREE.Vector3(0.15, -0.25, depth * 0.5),
  ];
  for (let i = 0; i < mouthFront.length - 1; i++) {
    points.push(mouthFront[i], mouthFront[i + 1]);
    points.push(mouthBack[i], mouthBack[i + 1]);
  }
  for (let i = 0; i < mouthFront.length; i++) {
    points.push(mouthFront[i], mouthBack[i]);
  }

  // === ヒゲ（立体）===
  const whiskersFront = [
    new THREE.Vector3(-0.6, 0, depth), new THREE.Vector3(-1.1, 0.1, depth),
    new THREE.Vector3(-0.6, -0.12, depth), new THREE.Vector3(-1.05, -0.12, depth),
    new THREE.Vector3(-0.6, -0.24, depth), new THREE.Vector3(-1.0, -0.35, depth),
  ];
  const whiskersBack = [
    new THREE.Vector3(-0.55, 0, -depth * 0.5), new THREE.Vector3(-0.95, 0.08, -depth),
    new THREE.Vector3(-0.55, -0.1, -depth * 0.5), new THREE.Vector3(-0.9, -0.1, -depth),
    new THREE.Vector3(-0.55, -0.2, -depth * 0.5), new THREE.Vector3(-0.88, -0.3, -depth),
  ];
  for (let i = 0; i < whiskersFront.length; i += 2) {
    points.push(whiskersFront[i], whiskersFront[i + 1]);
    points.push(whiskersBack[i], whiskersBack[i + 1]);
    points.push(whiskersFront[i], whiskersBack[i]);
  }

  // 右ヒゲ
  const rWhiskersFront = [
    new THREE.Vector3(0.6, 0, depth), new THREE.Vector3(1.1, 0.1, depth),
    new THREE.Vector3(0.6, -0.12, depth), new THREE.Vector3(1.05, -0.12, depth),
    new THREE.Vector3(0.6, -0.24, depth), new THREE.Vector3(1.0, -0.35, depth),
  ];
  const rWhiskersBack = [
    new THREE.Vector3(0.55, 0, -depth * 0.5), new THREE.Vector3(0.95, 0.08, -depth),
    new THREE.Vector3(0.55, -0.1, -depth * 0.5), new THREE.Vector3(0.9, -0.1, -depth),
    new THREE.Vector3(0.55, -0.2, -depth * 0.5), new THREE.Vector3(0.88, -0.3, -depth),
  ];
  for (let i = 0; i < rWhiskersFront.length; i += 2) {
    points.push(rWhiskersFront[i], rWhiskersFront[i + 1]);
    points.push(rWhiskersBack[i], rWhiskersBack[i + 1]);
    points.push(rWhiskersFront[i], rWhiskersBack[i]);
  }

  // === 顔の内側の補助線（より立体的に見せる）===
  // 中心から顔の輪郭への線（前面）
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x = Math.cos(angle) * faceRadiusX * 0.7;
    const y = Math.sin(angle) * faceRadiusY * 0.7;
    points.push(new THREE.Vector3(0, 0, depth), new THREE.Vector3(x, y, depth));
  }

  // 縦横の補助線（球体メッシュ風）
  for (let i = -3; i <= 3; i++) {
    const offset = i * 0.25;
    // 横線
    points.push(
      new THREE.Vector3(-faceRadiusX * 0.8, offset, depth * 0.8),
      new THREE.Vector3(faceRadiusX * 0.8, offset, depth * 0.8)
    );
    // 縦線
    points.push(
      new THREE.Vector3(offset, -faceRadiusY * 0.7, depth * 0.8),
      new THREE.Vector3(offset, faceRadiusY * 0.7, depth * 0.8)
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  return geometry;
}

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const catRef = useRef<THREE.LineSegments>(null);
  const textRef = useRef<THREE.Mesh>(null);

  // 3D立体猫
  const catGeometry = useMemo(() => create3DCatGeometry(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 猫をゆっくり回転（立体が見えるように）
    if (catRef.current) {
      catRef.current.rotation.y = t * 0.15;
      catRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
      catRef.current.rotation.z = Math.sin(t * 0.05) * 0.05;
      
      // 猫の浮遊動作（前後左右に漂う）
      catRef.current.position.y = Math.sin(t * 0.3) * 0.2;
      catRef.current.position.x = -2 + Math.cos(t * 0.2) * 0.15;
    }

    // Whiskersテキストのアニメーション
    if (textRef.current) {
      textRef.current.position.y = Math.sin(t * 0.5) * 0.15;
      textRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      // 発光効果（脈打つ）
      const material = textRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 0.7 + Math.sin(t * 2) * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D立体猫（薄紫色）- 中央配置 */}
      <lineSegments ref={catRef} geometry={catGeometry} position={[-2, 0, -3]}>
        <lineBasicMaterial color="#d8c4ff" transparent opacity={0.75} />
      </lineSegments>

      {/* 3Dテキストロゴ */}
      <Text
        ref={textRef}
        position={[0, 0, -1]}
        fontSize={0.8}
        color="#d8c4ff"
        anchorX="center"
        anchorY="middle"
      >
        Whiskers
      </Text>
    </group>
  );
}
