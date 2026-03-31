"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  RoundedBox,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { damp, dampE } from "maath/easing";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";

// SECTIONS定義
const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#3b82f6" },
  { id: "creator", label: "Creator", color: "#06b6d4" },
  { id: "contest", label: "Contest", color: "#8b5cf6" },
  { id: "product", label: "Product", color: "#f59e0b" },
  { id: "faq", label: "FAQ", color: "#10b981" },
  { id: "contact", label: "Contact", color: "#ef4444" },
];

// ============================================
// Crystal Core（ダイヤモンドガラス）
// ============================================
function CrystalCore() {
  const coreRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!coreRef.current || !glowRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    // マウスに反応して優雅に泳ぐ
    const targetRotationX = mouseY * 0.15 + Math.sin(time * 0.15) * 0.08;
    const targetRotationY = mouseX * 0.15 + time * 0.03;

    dampE(
      coreRef.current.rotation,
      new THREE.Euler(targetRotationX, targetRotationY, time * 0.02),
      0.02,
      delta
    );

    // 脈動
    const pulse = 1 + Math.sin(time * 0.8) * 0.03;
    glowRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={coreRef}>
      {/* メインクリスタル - 複雑な糸が絡まった形状 (p=7, q=8) */}
      <mesh>
        <torusKnotGeometry args={[1.8, 0.25, 300, 32, 7, 8]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.0}
          roughness={0}
          transmission={1.0}
          thickness={5}
          ior={2.4}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={2}
          attenuationColor="#ffffff"
          attenuationDistance={2}
        />
      </mesh>

      {/* 内側レイヤー - 反対方向に回転 */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <torusKnotGeometry args={[1.3, 0.15, 200, 24, 5, 6]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          thickness={3}
          ior={1.9}
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          clearcoat={1}
        />
      </mesh>

      {/* 中央発光コア */}
      <mesh>
        <sphereGeometry args={[0.4, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={4}
          metalness={0}
          roughness={0}
        />
      </mesh>

      {/* グロー効果 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ライティング */}
      <pointLight color="#ffffff" intensity={8} distance={20} decay={0.8} position={[0, 0, 0]} />
      <pointLight color="#60a5fa" intensity={4} distance={15} decay={1} position={[5, 5, 5]} />
      <pointLight color="#f472b6" intensity={3} distance={15} decay={1} position={[-5, -5, 5]} />
    </group>
  );
}

// ============================================
// Helix Monitor with Z-based Selection Governance
// ============================================
interface HelixMonitorProps {
  index: number;
  total: number;
  label: string;
  color: string;
  radius: number;
  heightStep: number;
  isActive: boolean;
  onActivate: () => void;
}

function HelixMonitor({
  index,
  total,
  label,
  color,
  radius,
  heightStep,
  isActive,
  onActivate,
}: HelixMonitorProps) {
  const meshRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const neonEdgeRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();
  const scroll = useScroll();

  // 螺旋上の位置計算
  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  const baseY = useMemo(
    () => index * heightStep - (total * heightStep) / 2,
    [index, total, heightStep]
  );

  // CanvasTexture生成
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // 背景
    ctx.fillStyle = "rgba(5, 5, 16, 0.85)";
    ctx.fillRect(0, 0, 1024, 512);

    // データ装飾
    ctx.fillStyle = "rgba(100, 149, 237, 0.6)";
    ctx.font = "14px 'Courier New', monospace";
    ctx.fillText(`TC 00:${String(index * 14).padStart(2, "0")}:52`, 30, 30);
    ctx.fillText(`ID:${label.substring(0, 3).toUpperCase()}-${1000 + index * 111}`, 900, 30);

    const coords = `X:${(Math.random() * 1000).toFixed(4)} Y:${(Math.random() * 1000).toFixed(4)}`;
    ctx.fillText(coords, 30, 480);

    // ネオンボーダー
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, color);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, 1000, 488);

    // メインテキスト
    ctx.fillStyle = "#f1f5f9";
    ctx.font = "bold 56px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 40;
    ctx.fillText(label.toUpperCase(), 512, 240);
    ctx.shadowBlur = 0;

    // サブテキスト
    ctx.fillStyle = color;
    ctx.font = "18px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("SECTOR", 512, 310);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [label, color, index]);

  // Governance: スケールと発光の状態管理
  const targetScaleNum = useMemo(() => (isActive ? 1.15 : 0.8), [isActive]);
  const targetGlowOpacity = useMemo(() => (isActive ? 0.8 : 0.1), [isActive]);
  const targetNeonIntensity = useMemo(() => (isActive ? 1.5 : 0.2), [isActive]);

  useFrame((state, delta) => {
    if (!meshRef.current || !frameRef.current || !glowRef.current || !neonEdgeRef.current) return;

    const scrollOffset = scroll.offset;
    const spiralRotation = scrollOffset * Math.PI * 3;
    const currentAngle = baseAngle + spiralRotation;

    // 螺旋位置計算
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius * 0.7;
    const totalScrollY = scrollOffset * total * heightStep * 0.8;
    const targetY = baseY - totalScrollY;

    damp(meshRef.current.position, "x", targetX, 0.06, delta);
    damp(meshRef.current.position, "y", targetY, 0.06, delta);
    damp(meshRef.current.position, "z", targetZ, 0.06, delta);

    // Governance: カメラに対して完全に正対
    const dummy = new THREE.Object3D();
    dummy.position.copy(meshRef.current.position);
    dummy.lookAt(camera.position);
    dampE(meshRef.current.rotation, dummy.rotation, 0.05, delta);

    // Governance: スケールのdamp補完
    damp(meshRef.current.scale, "x", targetScaleNum, 0.08, delta);
    damp(meshRef.current.scale, "y", targetScaleNum, 0.08, delta);
    damp(meshRef.current.scale, "z", targetScaleNum, 0.08, delta);

    // ネオンエッジの発光
    const frameMaterial = frameRef.current.material as THREE.MeshBasicMaterial;
    damp(frameMaterial, "opacity", targetNeonIntensity, 0.1, delta);

    // グロー効果
    const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
    damp(glowMaterial, "opacity", targetGlowOpacity, 0.1, delta);

    // ネオンエッジ
    const neonMaterial = neonEdgeRef.current.material as THREE.MeshBasicMaterial;
    neonMaterial.opacity = isActive ? 0.8 : 0.1;
  });

  return (
    <group ref={meshRef} onClick={onActivate}>
      {/* ネオンエッジ枠 */}
      <mesh ref={neonEdgeRef}>
        <boxGeometry args={[2.7, 1.7, 0.2]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      {/* ワイヤーフレーム枠 */}
      <mesh ref={frameRef}>
        <boxGeometry args={[2.6, 1.6, 0.18]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} wireframe />
      </mesh>

      {/* 厚みのあるガラスパネル - transmission 0.9 */}
      <RoundedBox args={[2.5, 1.5, 0.15]} radius={0.04} smoothness={4}>
        <meshPhysicalMaterial
          color="#020408"
          metalness={0.2}
          roughness={0.05}
          envMapIntensity={3}
          transparent
          opacity={0.3}
          transmission={0.9}
          thickness={0.5}
          ior={1.8}
          clearcoat={1}
          clearcoatRoughness={0}
          depthTest={true}
          depthWrite={true}
        />
      </RoundedBox>

      {/* スクリーン表面 */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2.3, 1.3]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent
          opacity={0.95}
          depthTest={true}
          depthWrite={false}
        />
      </mesh>

      {/* エミッシブグロー */}
      <mesh ref={glowRef} position={[0, 0, 0.09]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      {/* ポイントライト - ネオン効果 */}
      <pointLight
        color={color}
        intensity={isActive ? 5 : 1}
        distance={8}
        decay={1.5}
        position={[0, 0, -0.8]}
      />
    </group>
  );
}

// ============================================
// メインシーン
// ============================================
function HelixScene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scroll = useScroll();
  const { camera } = useThree();

  // Z-based Governance
  useFrame(() => {
    if (!scroll) return;

    const scrollOffset = scroll.offset;
    const scrollIndex = Math.round(scrollOffset * (SECTIONS.length - 1));
    const clampedIndex = Math.max(0, Math.min(scrollIndex, SECTIONS.length - 1));

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  // 再設計された螺旋パラメータ
  const radius = 8;
  const heightStep = 2.5;

  return (
    <>
      {/* 深い紺色から黒へのグラデーション背景 */}
      <color attach="background" args={["#020617"]} />
      <fogExp2 attach="fog" args={["#020617", 0.035]} />

      {/* 環境照明 */}
      <ambientLight intensity={0.05} color="#1e293b" />
      <directionalLight position={[10, 20, 10]} intensity={0.2} color="#e2e8f0" />

      <pointLight color="#3b82f6" intensity={0.8} distance={40} position={[20, 10, -10]} />
      <pointLight color="#ec4899" intensity={0.6} distance={40} position={[-20, -10, -10]} />

      {/* Crystal Core */}
      <CrystalCore />

      {/* 再設計された螺旋モニター群 */}
      {SECTIONS.map((section, index) => (
        <HelixMonitor
          key={section.id}
          index={index}
          total={SECTIONS.length}
          label={section.label}
          color={section.color}
          radius={radius}
          heightStep={heightStep}
          isActive={index === activeIndex}
          onActivate={() => setActiveIndex(index)}
        />
      ))}

      {/* 環境マップ */}
      <Environment preset="city" />
    </>
  );
}

// ============================================
// Post-processing Effects
// ============================================
function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.8}
        height={300}
        mipmapBlur
      />
      <ChromaticAberration offset={[0.0015, 0.001]} />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
    </EffectComposer>
  );
}

// ============================================
// メインコンポーネント
// ============================================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 38, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={6} damping={0.08}>
          <HelixScene />
          <PostProcessing />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
