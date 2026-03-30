"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  RoundedBox,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { damp } from "maath/easing";

// セクションデータ
const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#3b82f6" },
  { id: "creator", label: "Creator", color: "#06b6d4" },
  { id: "contest", label: "Contest", color: "#8b5cf6" },
  { id: "product", label: "Product", color: "#f59e0b" },
  { id: "faq", label: "FAQ", color: "#10b981" },
  { id: "contact", label: "Contact", color: "#ef4444" },
];

// CanvasTextureを作成するヘルパー関数
function createLabelTexture(text: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  // 背景
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, 512, 256);

  // ボーダー
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 504, 248);

  // テキスト
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 256, 128);

  // サブテキスト
  ctx.fillStyle = color;
  ctx.font = "24px Arial";
  ctx.fillText("SECTION", 256, 190);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 個別のモニター
function Monitor({
  index,
  total,
  label,
  color,
  radius,
  heightStep,
}: {
  index: number;
  total: number;
  label: string;
  color: string;
  radius: number;
  heightStep: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const scroll = useScroll();

  // らせんの計算
  const angle = (index / total) * Math.PI * 2;
  const yPos = index * heightStep - (total * heightStep) / 2;

  // 目標位置を計算
  const targetPos = useMemo(() => {
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      yPos,
      Math.sin(angle) * radius
    );
  }, [angle, radius, yPos]);

  // CanvasTexture
  const texture = useMemo(() => createLabelTexture(label, color), [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // スクロール値を取得 (0 ~ 1)
    const scrollOffset = scroll.offset;

    // スクロールに応じてY軸を移動
    const scrollY = scrollOffset * total * heightStep * 2;
    const currentY = yPos - scrollY;

    // 減衰を適用して現在位置を目標位置に近づける
    damp(meshRef.current.position, "x", targetPos.x, 0.1, delta);
    damp(meshRef.current.position, "y", currentY, 0.1, delta);
    damp(meshRef.current.position, "z", targetPos.z, 0.1, delta);

    // カメラの方向を向く（Billboard効果）
    meshRef.current.lookAt(camera.position);
  });

  return (
    <group ref={meshRef} position={[targetPos.x, yPos, targetPos.z]}>
      {/* モニターフレーム */}
      <RoundedBox args={[2, 1.2, 0.05]} radius={0.02} smoothness={4}>
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      {/* スクリーン */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1.8, 1]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* 発光エッジ */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.9, 1.1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 背面の発光 */}
      <pointLight color={color} intensity={2} distance={3} position={[0, 0, -0.5]} />
    </group>
  );
}

// らせん状モニターのシーン
function SpiralMonitors() {
  const radius = 4;
  const heightStep = 2.5;

  return (
    <>
      {/* 背景とフォグ */}
      <color attach="background" args={["#050505"]} />
      <fogExp2 attach="fog" args={["#050505", 0.03]} />

      {/* 環境光 */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />

      {/* 6つのモニターをらせん状に配置 */}
      {SECTIONS.map((section, index) => (
        <Monitor
          key={section.id}
          index={index}
          total={SECTIONS.length}
          label={section.label}
          color={section.color}
          radius={radius}
          heightStep={heightStep}
        />
      ))}

      {/* 環境マップ */}
      <Environment preset="city" />
    </>
  );
}

// メインコンポーネント
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ScrollControls pages={6} damping={0.1}>
          <SpiralMonitors />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
