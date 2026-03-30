"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { damp, dampE } from "maath/easing";

// 6つのセクション定義
const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#3b82f6" },
  { id: "creator", label: "Creator", color: "#06b6d4" },
  { id: "contest", label: "Contest", color: "#8b5cf6" },
  { id: "product", label: "Product", color: "#f59e0b" },
  { id: "faq", label: "FAQ", color: "#10b981" },
  { id: "contact", label: "Contact", color: "#ef4444" },
];

// CanvasTextureでセクション名を描画
function createLabelTexture(text: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  // 深いアッシュグレーの背景
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, 512, 256);

  // グラデーションボーダー
  const gradient = ctx.createLinearGradient(0, 0, 512, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "#ffffff");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 496, 240);

  // メインテキスト
  ctx.fillStyle = "#f1f5f9";
  ctx.font = "bold 72px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.fillText(text, 256, 100);
  ctx.shadowBlur = 0;

  // サブテキスト
  ctx.fillStyle = color;
  ctx.font = "28px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("SECTION", 256, 170);

  // 装飾ライン
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(180, 200);
  ctx.lineTo(332, 200);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ブラウザスクロール位置を取得するフック
function useBrowserScroll() {
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollY(progress);
      scrollRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初期値

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollRef };
}

// 個別のモニターコンポーネント
function HelixMonitor({
  index,
  total,
  label,
  color,
  radius,
  heightStep,
  scrollProgress,
}: {
  index: number;
  total: number;
  label: string;
  color: string;
  radius: number;
  heightStep: number;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  // 螺旋上の基準角度（360°をtotal等分）
  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  
  // 基準Y位置
  const baseY = useMemo(() => index * heightStep - (total * heightStep) / 2, [index, total, heightStep]);
  
  // CanvasTexture生成
  const texture = useMemo(() => createLabelTexture(label, color), [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const scrollOffset = scrollProgress.current;
    
    // スクロールに応じた螺旋全体の回転（2周分）
    const spiralRotation = scrollOffset * Math.PI * 4;
    
    // 現在の角度 = 基準角度 + スクロール回転
    const currentAngle = baseAngle + spiralRotation;
    
    // 螺旋の計算：Y軸を中心に回転しながら上下も移動
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius;
    
    // スクロールに応じたY位置の変化（螺旋が上下に移動）
    const scrollY = scrollOffset * total * heightStep * 1.5;
    const targetY = baseY - scrollY;

    // dampを使用して滑らかに位置を追従（重厚な慣性）
    damp(meshRef.current.position, "x", targetX, 0.08, delta);
    damp(meshRef.current.position, "y", targetY, 0.08, delta);
    damp(meshRef.current.position, "z", targetZ, 0.08, delta);

    // モニターが常に中央のY軸（0, targetY, 0）を向くように制御
    const targetLookAt = new THREE.Vector3(0, targetY, 0);
    const dummyObj = new THREE.Object3D();
    dummyObj.position.copy(meshRef.current.position);
    dummyObj.lookAt(targetLookAt);
    
    // dampEで回転を滑らかに追従
    dampE(meshRef.current.rotation, dummyObj.rotation, 0.06, delta);
  });

  return (
    <group ref={meshRef}>
      {/* モニターフレーム - RoundedBoxで薄い板 */}
      <RoundedBox args={[2.2, 1.3, 0.08]} radius={0.04} smoothness={8}>
        <meshStandardMaterial
          color="#0f0f1a"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* スクリーン表面 */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2, 1.1]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* エミッシブ効果 - 色の発光 */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.1, 1.2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 背面の発光 - 遠くまで届く */}
      <pointLight color={color} intensity={3} distance={5} decay={2} position={[0, 0, -0.3]} />
      
      {/* 縁の発光 */}
      <mesh position={[0, 0, -0.02]}>
        <ringGeometry args={[1.0, 1.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// 螺旋シーン
function HelixScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollRef } = useBrowserScroll();
  const smoothScroll = useRef(0);
  
  const radius = 5;
  const heightStep = 3;

  useFrame((state, delta) => {
    // スクロール値を重厚な慣性で追従
    damp(smoothScroll, "current", scrollRef.current, 0.05, delta);
  });

  return (
    <>
      {/* 背景色 - 深いアッシュグレー */}
      <color attach="background" args={["#1a1a2e"]} />
      
      {/* FogExp2 - 遠くのモニターが暗闇に消える */}
      <fogExp2 attach="fog" args={["#1a1a2e", 0.025]} />

      {/* 環境照明 */}
      <ambientLight intensity={0.2} color="#4a5568" />
      <directionalLight position={[10, 20, 10]} intensity={0.8} color="#e2e8f0" />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#3b82f6" />

      {/* 螺旋グループ */}
      <group ref={groupRef}>
        {SECTIONS.map((section, index) => (
          <HelixMonitor
            key={section.id}
            index={index}
            total={SECTIONS.length}
            label={section.label}
            color={section.color}
            radius={radius}
            heightStep={heightStep}
            scrollProgress={smoothScroll}
          />
        ))}
      </group>

      {/* 環境マップ - リアルな反射 */}
      <Environment preset="city" />
    </>
  );
}

// メインコンポーネント
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <HelixScene />
      </Canvas>
    </div>
  );
}
