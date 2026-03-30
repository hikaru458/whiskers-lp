"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  Text,
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
  ctx.fillStyle = "#0a0a14";
  ctx.fillRect(0, 0, 512, 256);

  // グラデーションボーダー
  const gradient = ctx.createLinearGradient(0, 0, 512, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "#ffffff");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 496, 240);

  // メインテキスト
  ctx.fillStyle = "#f1f5f9";
  ctx.font = "bold 72px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 30;
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

// 神々しい中央の螺旋コアコンポーネント
function DivineSpiralCore({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const coreRef = useRef<THREE.Group>(null);
  const outerKnotRef = useRef<THREE.Mesh>(null);
  const innerKnotRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!coreRef.current || !outerKnotRef.current || !innerKnotRef.current || !glowRef.current) return;

    const scrollOffset = scrollProgress.current;
    const time = state.clock.elapsedTime;
    
    // スクロールに応じた逆方向回転（視差効果）
    const rotationY = scrollOffset * Math.PI * 3; 
    const rotationX = Math.sin(time * 0.2) * 0.2 + scrollOffset * Math.PI * 0.5;
    
    dampE(coreRef.current.rotation, new THREE.Euler(rotationX, -rotationY, 0), 0.03, delta);
    
    // 個別の回転アニメーション
    outerKnotRef.current.rotation.z += delta * 0.15;
    outerKnotRef.current.rotation.y += delta * 0.05;
    innerKnotRef.current.rotation.x += delta * 0.2;
    innerKnotRef.current.rotation.z -= delta * 0.1;
    
    // コアの脈動
    const pulse = 1 + Math.sin(time * 1.5) * 0.05;
    glowRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={coreRef}>
      {/* 外側の黄金のトーラスノット - 神々しいオーラ */}
      <mesh ref={outerKnotRef}>
        <torusKnotGeometry args={[1.5, 0.4, 200, 32, 4, 7]} />
        <meshPhysicalMaterial
          color="#ffd700"
          emissive="#ffaa00"
          emissiveIntensity={0.8}
          metalness={1.0}
          roughness={0.1}
          transmission={0.2}
          thickness={1}
          transparent
          opacity={0.95}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* 中間層のガラス質トーラスノット */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusKnotGeometry args={[1.1, 0.25, 150, 24, 3, 5]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.05}
          transmission={0.8}
          thickness={2}
          transparent
          opacity={0.7}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.5}
        />
      </mesh>
      
      {/* 内側の小さなトーラスノット - 反対方向に回転 */}
      <mesh ref={innerKnotRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusKnotGeometry args={[0.7, 0.15, 100, 16, 2, 3]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#22d3ee"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.1}
          transmission={0.3}
          thickness={0.5}
          transparent
          opacity={0.9}
          clearcoat={1}
        />
      </mesh>

      {/* 中央の発光コア球体 - 神聖な光 */}
      <mesh>
        <sphereGeometry args={[0.35, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          metalness={0}
          roughness={0}
          transmission={0}
          clearcoat={0}
        />
      </mesh>
      
      {/* コアのグロー効果 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 強力な中央ライティング - 神々しい輝き */}
      <pointLight color="#ffd700" intensity={15} distance={15} decay={1} position={[0, 0, 0]} />
      <pointLight color="#3b82f6" intensity={10} distance={12} decay={1.5} position={[3, 3, 3]} />
      <pointLight color="#06b6d4" intensity={8} distance={10} decay={1.5} position={[-3, -3, 3]} />
      <pointLight color="#ffaa00" intensity={5} distance={8} decay={1} position={[0, -4, 2]} />
      
      {/* スポットライト - モニター方向へ */}
      <spotLight
        color="#ffffff"
        intensity={5}
        distance={20}
        angle={Math.PI / 2}
        penumbra={0.8}
        decay={1}
        position={[0, 8, 8]}
        target-position={[0, 0, 0]}
      />
    </group>
  );
}

// 浮遊する3Dテキストラベル
function FloatingLabel({
  text,
  position,
  color,
  scrollProgress,
}: {
  text: string;
  position: [number, number, number];
  color: string;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!textRef.current) return;
    
    const scrollOffset = scrollProgress.current;
    const time = state.clock.elapsedTime;
    
    // 浮遊アニメーション
    const floatY = Math.sin(time * 0.8 + position[0]) * 0.1;
    const floatZ = Math.cos(time * 0.6 + position[1]) * 0.05;
    
    // スクロールに応じた回転
    const rotY = scrollOffset * Math.PI * 0.5;
    
    dampE(textRef.current.rotation, new THREE.Euler(0, rotY, 0), 0.05, delta);
    textRef.current.position.y = position[1] + floatY;
    textRef.current.position.z = position[2] + floatZ;
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {text}
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Text>
    </group>
  );
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
      {/* モニターフレーム - RoundedBoxで薄い板 - 透明化とdepth設定 */}
      <RoundedBox args={[2.2, 1.3, 0.08]} radius={0.04} smoothness={8}>
        <meshPhysicalMaterial
          color="#0a0a14"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1}
          transparent
          opacity={0.6}
          transmission={0.4}
          thickness={0.08}
          clearcoat={0.9}
          depthTest={true}
          depthWrite={true}
        />
      </RoundedBox>

      {/* スクリーン表面 - より透明に */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2, 1.1]} />
        <meshBasicMaterial 
          map={texture} 
          toneMapped={false} 
          transparent 
          opacity={0.9}
          depthTest={true}
          depthWrite={false}
        />
      </mesh>

      {/* エミッシブ効果 - 色の発光 */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.1, 1.2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      {/* 背面の発光 - 遠くまで届く */}
      <pointLight color={color} intensity={4} distance={6} decay={2} position={[0, 0, -0.3]} />
      
      {/* 縁の発光 */}
      <mesh position={[0, 0, -0.02]}>
        <ringGeometry args={[1.0, 1.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} depthTest={true} />
      </mesh>
    </group>
  );
}

// 螺旋シーン
function HelixScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollRef } = useBrowserScroll();
  const smoothScroll = useRef(0);
  
  const radius = 5.5;
  const heightStep = 3.5;

  useFrame((state, delta) => {
    // スクロール値を重厚な慣性で追従
    damp(smoothScroll, "current", scrollRef.current, 0.05, delta);
  });

  return (
    <>
      {/* 背景色 - 深いアッシュグレー */}
      <color attach="background" args={["#0a0a14"]} />
      
      {/* FogExp2 - 遠くのモニターが暗闇に消える */}
      <fogExp2 attach="fog" args={["#0a0a14", 0.02]} />

      {/* 環境照明 - Active Theory風の劇的なライティング */}
      <ambientLight intensity={0.08} color="#4a5568" />
      <directionalLight position={[10, 20, 10]} intensity={0.4} color="#e2e8f0" />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#3b82f6" />
      
      {/* 追加の雰囲気ライト */}
      <pointLight color="#8b5cf6" intensity={1.5} distance={25} position={[15, 10, -10]} />
      <pointLight color="#ec4899" intensity={1.5} distance={25} position={[-15, -10, -10]} />

      {/* 神々しい中央の螺旋コア - モニターより先に描画 */}
      <DivineSpiralCore scrollProgress={smoothScroll} />

      {/* 浮遊する3Dナビゲーションラベル */}
      <FloatingLabel text="Gallery" position={[0, 8, 0]} color="#3b82f6" scrollProgress={smoothScroll} />
      <FloatingLabel text="Creator" position={[0, -8, 0]} color="#06b6d4" scrollProgress={smoothScroll} />

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
        camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 100 }}
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
