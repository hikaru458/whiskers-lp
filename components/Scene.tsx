"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

// 星形ワイヤーフレームジオメトリ（立体星）
function createStarGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const vertices: THREE.Vector3[] = [];

  // 星のパラメータ
  const outerRadius = 1.2;
  const innerRadius = 0.5;
  const pointsCount = 5;
  const depth = 0.4;

  // 前面と後面の星の頂点を計算
  for (let i = 0; i < pointsCount * 2; i++) {
    const angle = (i / (pointsCount * 2)) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // 前面の頂点
    vertices.push(new THREE.Vector3(x, y, depth));
    // 後面の頂点
    vertices.push(new THREE.Vector3(x, y, -depth));
  }

  // 前面の星の輪郭線
  for (let i = 0; i < pointsCount * 2; i++) {
    const current = vertices[i * 2];
    const next = vertices[((i + 1) % (pointsCount * 2)) * 2];
    points.push(current, next);
  }

  // 後面の星の輪郭線
  for (let i = 0; i < pointsCount * 2; i++) {
    const current = vertices[i * 2 + 1];
    const next = vertices[((i + 1) % (pointsCount * 2)) * 2 + 1];
    points.push(current, next);
  }

  // 前面と後面をつなぐ線（奥行き）
  for (let i = 0; i < pointsCount * 2; i++) {
    const front = vertices[i * 2];
    const back = vertices[i * 2 + 1];
    points.push(front, back);
  }

  // 中心から各頂点への線（前面）
  for (let i = 0; i < pointsCount * 2; i++) {
    points.push(new THREE.Vector3(0, 0, depth), vertices[i * 2]);
  }

  // 中心から各頂点への線（後面）
  for (let i = 0; i < pointsCount * 2; i++) {
    points.push(new THREE.Vector3(0, 0, -depth), vertices[i * 2 + 1]);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  return geometry;
}

// 桜の花びらワイヤーフレームジオメトリ
function createCherryBlossomGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const petalCount = 5;
  const petalLength = 0.8;
  const petalWidth = 0.4;
  const depth = 0.2;

  // 中心点
  const center = new THREE.Vector3(0, 0, 0);

  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const nextAngle = ((i + 1) / petalCount) * Math.PI * 2;

    // 花びらの先端
    const tipX = Math.cos(angle) * petalLength;
    const tipY = Math.sin(angle) * petalLength;
    
    // 花びらの側面点
    const sideAngle1 = angle - 0.3;
    const sideAngle2 = angle + 0.3;
    const sideX1 = Math.cos(sideAngle1) * petalWidth;
    const sideY1 = Math.sin(sideAngle1) * petalWidth;
    const sideX2 = Math.cos(sideAngle2) * petalWidth;
    const sideY2 = Math.sin(sideAngle2) * petalWidth;

    // 前面の花びら
    const frontTip = new THREE.Vector3(tipX, tipY, depth);
    const frontSide1 = new THREE.Vector3(sideX1, sideY1, depth);
    const frontSide2 = new THREE.Vector3(sideX2, sideY2, depth);
    const frontCenter = new THREE.Vector3(0, 0, depth);

    // 後面の花びら
    const backTip = new THREE.Vector3(tipX, tipY, -depth);
    const backSide1 = new THREE.Vector3(sideX1, sideY1, -depth);
    const backSide2 = new THREE.Vector3(sideX2, sideY2, -depth);
    const backCenter = new THREE.Vector3(0, 0, -depth);

    // 前面の花びらの輪郭
    points.push(frontCenter, frontSide1);
    points.push(frontSide1, frontTip);
    points.push(frontTip, frontSide2);
    points.push(frontSide2, frontCenter);

    // 後面の花びらの輪郭
    points.push(backCenter, backSide1);
    points.push(backSide1, backTip);
    points.push(backTip, backSide2);
    points.push(backSide2, backCenter);

    // 前後をつなぐ線
    points.push(frontCenter, backCenter);
    points.push(frontTip, backTip);
    points.push(frontSide1, backSide1);
    points.push(frontSide2, backSide2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  return geometry;
}

// ミラーボール風ワイヤーフレームジオメトリ（多面体）
function createMirrorBallGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  
  // 二十面体の頂点
  const phi = (1 + Math.sqrt(5)) / 2; // 黄金比
  const vertices: THREE.Vector3[] = [
    new THREE.Vector3(-1, phi, 0),
    new THREE.Vector3(1, phi, 0),
    new THREE.Vector3(-1, -phi, 0),
    new THREE.Vector3(1, -phi, 0),
    new THREE.Vector3(0, -1, phi),
    new THREE.Vector3(0, 1, phi),
    new THREE.Vector3(0, -1, -phi),
    new THREE.Vector3(0, 1, -phi),
    new THREE.Vector3(phi, 0, -1),
    new THREE.Vector3(phi, 0, 1),
    new THREE.Vector3(-phi, 0, -1),
    new THREE.Vector3(-phi, 0, 1),
  ].map(v => v.normalize().multiplyScalar(1.2));

  // 面を形成する頂点インデックス（二十面体の20面）
  const faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
  ];

  // 各面のエッジを描画
  faces.forEach(face => {
    for (let i = 0; i < 3; i++) {
      const v1 = vertices[face[i]];
      const v2 = vertices[face[(i + 1) % 3]];
      points.push(v1, v2);
    }
  });

  // 中心から各頂点への線（ミラーボールの輝き効果）
  vertices.forEach(v => {
    points.push(new THREE.Vector3(0, 0, 0), v);
  });

  // 外側の立方体フレームも追加
  const boxSize = 1.5;
  const boxVertices = [
    new THREE.Vector3(-boxSize, -boxSize, -boxSize),
    new THREE.Vector3(boxSize, -boxSize, -boxSize),
    new THREE.Vector3(boxSize, boxSize, -boxSize),
    new THREE.Vector3(-boxSize, boxSize, -boxSize),
    new THREE.Vector3(-boxSize, -boxSize, boxSize),
    new THREE.Vector3(boxSize, -boxSize, boxSize),
    new THREE.Vector3(boxSize, boxSize, boxSize),
    new THREE.Vector3(-boxSize, boxSize, boxSize),
  ];

  // 立方体のエッジ
  const boxEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // 前面
    [4, 5], [5, 6], [6, 7], [7, 4], // 後面
    [0, 4], [1, 5], [2, 6], [3, 7]  // 奥行き
  ];

  boxEdges.forEach(edge => {
    points.push(boxVertices[edge[0]], boxVertices[edge[1]]);
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  return geometry;
}

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  // 星形ジオメトリ
  const starGeometry = useMemo(() => createStarGeometry(), []);

  // 桜の花びらジオメトリ
  const cherryGeometry = useMemo(() => createCherryBlossomGeometry(), []);

  // ミラーボールジオメトリ
  const mirrorGeometry = useMemo(() => createMirrorBallGeometry(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // グループ全体をゆっくり回転
    groupRef.current.rotation.y = t * 0.1;

    // 個別のアニメーション
    const star = groupRef.current.children[0] as THREE.LineSegments;
    const cherry = groupRef.current.children[1] as THREE.LineSegments;
    const mirror = groupRef.current.children[2] as THREE.LineSegments;

    if (star) {
      star.rotation.y = t * 0.3;
      star.rotation.z = Math.sin(t * 0.2) * 0.1;
    }
    if (cherry) {
      cherry.rotation.y = -t * 0.25;
      cherry.rotation.x = Math.cos(t * 0.15) * 0.1;
    }
    if (mirror) {
      mirror.rotation.x = t * 0.2;
      mirror.rotation.y = t * 0.15;
      // ミラーボールはキラキラ光るように
      const material = mirror.material as THREE.LineBasicMaterial;
      if (material) {
        const pulse = 0.5 + Math.sin(t * 3) * 0.3;
        material.opacity = pulse;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1つ目: 立体星（黄色） */}
      <lineSegments geometry={starGeometry} position={[-3.5, 0.5, -3]}>
        <lineBasicMaterial color="#ffd700" transparent opacity={0.6} />
      </lineSegments>

      {/* 2つ目: 桜の花びら（ピンク） */}
      <lineSegments geometry={cherryGeometry} position={[0, 0, -2]}>
        <lineBasicMaterial color="#ffb7c5" transparent opacity={0.5} />
      </lineSegments>

      {/* 3つ目: ミラーボール風（水色・薄紫の混合） */}
      <lineSegments geometry={mirrorGeometry} position={[3.5, -0.5, -3]}>
        <lineBasicMaterial color="#7fd4ff" transparent opacity={0.4} />
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
