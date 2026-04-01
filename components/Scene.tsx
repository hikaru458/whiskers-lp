"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

// 猫の顔ワイヤーフレーム（1匹目 - 丸顔でかわいい系）
function createCatFaceGeometry1(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];

  // 顔の輪郭（楕円）
  const faceRadiusX = 0.8;
  const faceRadiusY = 0.7;
  const segments = 24;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * faceRadiusX,
        Math.sin(angle) * faceRadiusY,
        0
      )
    );
  }

  // 左耳（丸みを帯びた三角形）
  points.push(new THREE.Vector3(-0.5, 0.5, 0));
  points.push(new THREE.Vector3(-0.7, 0.8, 0));
  points.push(new THREE.Vector3(-0.3, 0.75, 0));
  points.push(new THREE.Vector3(-0.5, 0.5, 0));

  // 右耳（丸みを帯びた三角形）
  points.push(new THREE.Vector3(0.5, 0.5, 0));
  points.push(new THREE.Vector3(0.7, 0.8, 0));
  points.push(new THREE.Vector3(0.3, 0.75, 0));
  points.push(new THREE.Vector3(0.5, 0.5, 0));

  // 目（大きな丸）- 左目
  const eyeRadius = 0.12;
  const eyeSegments = 12;
  for (let i = 0; i <= eyeSegments; i++) {
    const angle = (i / eyeSegments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        -0.3 + Math.cos(angle) * eyeRadius,
        0.1 + Math.sin(angle) * eyeRadius,
        0
      )
    );
  }

  // 目（大きな丸）- 右目
  for (let i = 0; i <= eyeSegments; i++) {
    const angle = (i / eyeSegments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        0.3 + Math.cos(angle) * eyeRadius,
        0.1 + Math.sin(angle) * eyeRadius,
        0
      )
    );
  }

  // 鼻（小さな三角形）
  points.push(new THREE.Vector3(0, -0.15, 0));
  points.push(new THREE.Vector3(-0.08, -0.05, 0));
  points.push(new THREE.Vector3(0.08, -0.05, 0));
  points.push(new THREE.Vector3(0, -0.15, 0));

  // 口（Wのような形）
  points.push(new THREE.Vector3(-0.15, -0.25, 0));
  points.push(new THREE.Vector3(-0.05, -0.35, 0));
  points.push(new THREE.Vector3(0, -0.3, 0));
  points.push(new THREE.Vector3(0.05, -0.35, 0));
  points.push(new THREE.Vector3(0.15, -0.25, 0));

  // ヒゲ - 左
  points.push(new THREE.Vector3(-0.5, 0, 0));
  points.push(new THREE.Vector3(-0.9, 0.1, 0));
  points.push(new THREE.Vector3(-0.5, -0.1, 0));
  points.push(new THREE.Vector3(-0.9, -0.1, 0));
  points.push(new THREE.Vector3(-0.5, -0.2, 0));
  points.push(new THREE.Vector3(-0.85, -0.3, 0));

  // ヒゲ - 右
  points.push(new THREE.Vector3(0.5, 0, 0));
  points.push(new THREE.Vector3(0.9, 0.1, 0));
  points.push(new THREE.Vector3(0.5, -0.1, 0));
  points.push(new THREE.Vector3(0.9, -0.1, 0));
  points.push(new THREE.Vector3(0.5, -0.2, 0));
  points.push(new THREE.Vector3(0.85, -0.3, 0));

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  return geometry;
}

// 猫の顔ワイヤーフレーム（2匹目 - シャープでクール系）
function createCatFaceGeometry2(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];

  // 顔の輪郭（少し細長め）
  const faceRadiusX = 0.7;
  const faceRadiusY = 0.85;
  const segments = 24;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * faceRadiusX,
        Math.sin(angle) * faceRadiusY,
        0
      )
    );
  }

  // 左耳（尖った三角形）
  points.push(new THREE.Vector3(-0.4, 0.6, 0));
  points.push(new THREE.Vector3(-0.65, 0.95, 0));
  points.push(new THREE.Vector3(-0.2, 0.8, 0));
  points.push(new THREE.Vector3(-0.4, 0.6, 0));

  // 右耳（尖った三角形）
  points.push(new THREE.Vector3(0.4, 0.6, 0));
  points.push(new THREE.Vector3(0.65, 0.95, 0));
  points.push(new THREE.Vector3(0.2, 0.8, 0));
  points.push(new THREE.Vector3(0.4, 0.6, 0));

  // 目（細長いアーモンド型）- 左目
  const eyeCenterX = -0.25;
  const eyeCenterY = 0.15;
  const eyeRadiusX = 0.18;
  const eyeRadiusY = 0.1;
  for (let i = 0; i <= 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        eyeCenterX + Math.cos(angle) * eyeRadiusX,
        eyeCenterY + Math.sin(angle) * eyeRadiusY,
        0
      )
    );
  }

  // 目（細長いアーモンド型）- 右目
  for (let i = 0; i <= 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        -eyeCenterX + Math.cos(angle) * eyeRadiusX,
        eyeCenterY + Math.sin(angle) * eyeRadiusY,
        0
      )
    );
  }

  // 鼻（小さなハート型）
  points.push(new THREE.Vector3(0, -0.1, 0));
  points.push(new THREE.Vector3(-0.06, -0.02, 0));
  points.push(new THREE.Vector3(0, 0.02, 0));
  points.push(new THREE.Vector3(0.06, -0.02, 0));
  points.push(new THREE.Vector3(0, -0.1, 0));

  // 口（横長の線）
  points.push(new THREE.Vector3(-0.2, -0.25, 0));
  points.push(new THREE.Vector3(0.2, -0.25, 0));

  // ヒゲ - 長め
  points.push(new THREE.Vector3(-0.45, 0.05, 0));
  points.push(new THREE.Vector3(-1.0, 0.15, 0));
  points.push(new THREE.Vector3(-0.45, -0.05, 0));
  points.push(new THREE.Vector3(-1.0, -0.05, 0));
  points.push(new THREE.Vector3(-0.45, -0.15, 0));
  points.push(new THREE.Vector3(-0.95, -0.25, 0));

  points.push(new THREE.Vector3(0.45, 0.05, 0));
  points.push(new THREE.Vector3(1.0, 0.15, 0));
  points.push(new THREE.Vector3(0.45, -0.05, 0));
  points.push(new THREE.Vector3(1.0, -0.05, 0));
  points.push(new THREE.Vector3(0.45, -0.15, 0));
  points.push(new THREE.Vector3(0.95, -0.25, 0));

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  return geometry;
}

// 柔らかい桜の花びらジオメトリ
function createSoftCherryBlossomGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const petalCount = 5;
  const petalLength = 1.0;
  const petalWidth = 0.6;

  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const nextAngle = ((i + 1) / petalCount) * Math.PI * 2;

    // 花びらの先端（より柔らかいカーブ）
    const tipX = Math.cos(angle) * petalLength;
    const tipY = Math.sin(angle) * petalLength;
    
    // 花びらの側面点（ベジェ曲線風）
    const sideAngle1 = angle - 0.5;
    const sideAngle2 = angle + 0.5;
    const sideRadius = petalWidth * 0.8;
    const sideX1 = Math.cos(angle - 0.25) * sideRadius;
    const sideY1 = Math.sin(angle - 0.25) * sideRadius;
    const sideX2 = Math.cos(angle + 0.25) * sideRadius;
    const sideY2 = Math.sin(angle + 0.25) * sideRadius;

    // 中心
    const center = new THREE.Vector3(0, 0, 0);

    // 柔らかい花びらの輪郭（ベジェ風カーブ）
    const tip = new THREE.Vector3(tipX, tipY, 0);
    const side1 = new THREE.Vector3(sideX1, sideY1, 0);
    const side2 = new THREE.Vector3(sideX2, sideY2, 0);

    // より滑らかな曲線
    const mid1 = new THREE.Vector3(
      center.x + (tip.x - center.x) * 0.3 + (side1.x - center.x) * 0.3,
      center.y + (tip.y - center.y) * 0.3 + (side1.y - center.y) * 0.3,
      0
    );
    const mid2 = new THREE.Vector3(
      center.x + (tip.x - center.x) * 0.7 + (side1.x - center.x) * 0.15,
      center.y + (tip.y - center.y) * 0.7 + (side1.y - center.y) * 0.15,
      0
    );

    // 花びらの線
    points.push(center, side1);
    points.push(side1, mid1);
    points.push(mid1, mid2);
    points.push(mid2, tip);

    // 反対側も同様に
    const mid3 = new THREE.Vector3(
      center.x + (tip.x - center.x) * 0.7 + (side2.x - center.x) * 0.15,
      center.y + (tip.y - center.y) * 0.7 + (side2.y - center.y) * 0.15,
      0
    );
    const mid4 = new THREE.Vector3(
      center.x + (tip.x - center.x) * 0.3 + (side2.x - center.x) * 0.3,
      center.y + (tip.y - center.y) * 0.3 + (side2.y - center.y) * 0.3,
      0
    );

    points.push(center, side2);
    points.push(side2, mid4);
    points.push(mid4, mid3);
    points.push(mid3, tip);

    // 花びらの内側の筋
    const innerPoint = new THREE.Vector3(tipX * 0.6, tipY * 0.6, 0);
    points.push(center, innerPoint);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  return geometry;
}

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  // 猫の顔1
  const catFace1Geometry = useMemo(() => createCatFaceGeometry1(), []);

  // 猫の顔2
  const catFace2Geometry = useMemo(() => createCatFaceGeometry2(), []);

  // 柔らかい桜の花びら
  const cherryGeometry = useMemo(() => createSoftCherryBlossomGeometry(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // グループ全体をゆっくり回転
    groupRef.current.rotation.y = t * 0.1;

    // 個別のアニメーション
    const cat1 = groupRef.current.children[0] as THREE.LineSegments;
    const cherry = groupRef.current.children[1] as THREE.LineSegments;
    const cat2 = groupRef.current.children[2] as THREE.LineSegments;

    if (cat1) {
      cat1.rotation.y = t * 0.2;
      cat1.rotation.z = Math.sin(t * 0.3) * 0.05;
    }
    if (cherry) {
      cherry.rotation.y = -t * 0.15;
      cherry.rotation.x = Math.cos(t * 0.2) * 0.05;
    }
    if (cat2) {
      cat2.rotation.y = -t * 0.25;
      cat2.rotation.x = Math.cos(t * 0.25) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1つ目: 猫の顔1（丸顔かわいい系） */}
      <lineSegments geometry={catFace1Geometry} position={[-3.5, 0, -3]}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </lineSegments>

      {/* 2つ目: 柔らかい桜（ピンク） */}
      <lineSegments geometry={cherryGeometry} position={[0, 0, -2]}>
        <lineBasicMaterial color="#ffb7c5" transparent opacity={0.6} />
      </lineSegments>

      {/* 3つ目: 猫の顔2（シャープクール系） */}
      <lineSegments geometry={catFace2Geometry} position={[3.5, 0, -3]}>
        <lineBasicMaterial color="#e8d4ff" transparent opacity={0.7} />
      </lineSegments>

      {/* 3Dテキストロゴ */}
      <Text
        position={[0, 0, -1]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Whiskers
      </Text>
    </group>
  );
}
