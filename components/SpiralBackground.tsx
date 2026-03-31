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
  { id: "gallery", label: "Gallery", color: "#60a5fa" },
  { id: "creator", label: "Creator", color: "#22d3ee" },
  { id: "contest", label: "Contest", color: "#a78bfa" },
  { id: "product", label: "Product", color: "#fbbf24" },
  { id: "faq", label: "FAQ", color: "#34d399" },
  { id: "contact", label: "Contact", color: "#f87171" },
];

// ============================================
// Crystal Ribbon Core（極細光の糸・薄膜干渉）
// ============================================
function CrystalRibbonCore() {
  const coreRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!coreRef.current || !glowRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseX = state.pointer.x * 0.3;
    const mouseY = state.pointer.y * 0.3;

    // 優雅な泳ぎ
    dampE(
      coreRef.current.rotation,
      new THREE.Euler(
        mouseY * 0.2 + Math.sin(time * 0.3) * 0.08,
        time * 0.15 + mouseX * 0.2,
        Math.cos(time * 0.2) * 0.05
      ),
      0.02,
      delta
    );

    // 脈動
    const pulse = 1 + Math.sin(time * 0.8) * 0.03;
    glowRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={coreRef}>
      {/* メインリボン - 極細光の糸 [1.5, 0.02, 800, 64, 2, 3] */}
      <mesh>
        <torusKnotGeometry args={[1.5, 0.02, 800, 64, 2, 3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0.02}
          transmission={1.0}
          thickness={1.0}
          ior={1.5}
          iridescence={1.0}
          iridescenceIOR={1.8}
          iridescenceThicknessRange={[100, 400]}
          reflectivity={1.0}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={3}
          attenuationColor="#e0f2fe"
          attenuationDistance={0.5}
        />
      </mesh>

      {/* 内側リボン - 逆方向回転 */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusKnotGeometry args={[1.2, 0.015, 600, 48, 3, 2]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          metalness={0}
          roughness={0.02}
          transmission={1.0}
          thickness={0.8}
          ior={1.5}
          iridescence={1.0}
          iridescenceIOR={1.7}
          reflectivity={1.0}
          emissive="#60a5fa"
          emissiveIntensity={0.1}
          clearcoat={1}
        />
      </mesh>

      {/* 外側フレーム */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <torusKnotGeometry args={[2, 0.01, 400, 32, 2, 5]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={1.0}
          thickness={0.5}
          ior={1.5}
          iridescence={1.0}
          iridescenceIOR={1.8}
          reflectivity={1.0}
          clearcoat={1}
          envMapIntensity={2}
        />
      </mesh>

      {/* 中央発光コア */}
      <mesh>
        <sphereGeometry args={[0.25, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={8}
          metalness={0}
          roughness={0}
        />
      </mesh>

      {/* グロー */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ライティング */}
      <pointLight color="#ffffff" intensity={12} distance={20} decay={0.5} position={[0, 0, 0]} />
      <pointLight color="#60a5fa" intensity={5} distance={15} decay={0.7} position={[2, 2, 2]} />
      <pointLight color="#c084fc" intensity={4} distance={15} decay={0.7} position={[-2, -2, 2]} />
    </group>
  );
}

// ============================================
// Glass Monitor（虹色縁取りガラスパネル）
// ============================================
interface GlassMonitorProps {
  index: number;
  label: string;
  color: string;
  radius: number;
  heightStep: number;
  total: number;
  isActive: boolean;
  onActivate: () => void;
  scrollOffset: number;
}

function GlassMonitor({
  index,
  label,
  color,
  radius,
  heightStep,
  total,
  isActive,
  onActivate,
  scrollOffset,
}: GlassMonitorProps) {
  const meshRef = useRef<THREE.Group>(null);
  const edgeRef = useRef<THREE.Mesh>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();

  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  const baseY = useMemo(
    () => index * heightStep - (total * heightStep) / 2,
    [index, total, heightStep]
  );

  // CanvasTexture with data
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // 背景
    ctx.fillStyle = "rgba(2, 6, 15, 0.85)";
    ctx.fillRect(0, 0, 1024, 512);

    // データ表示
    ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
    ctx.font = "11px 'Courier New', monospace";
    ctx.fillText(`TC 00:${String(index * 14 + 52).padStart(2, "0")}`, 20, 25);
    ctx.fillText(`ID:${label.substring(0, 3).toUpperCase()}-${1000 + index * 111}`, 900, 25);
    ctx.fillText(`X:${(Math.random() * 1000).toFixed(3)} Y:${(Math.random() * 1000).toFixed(3)}`, 20, 495);

    // 虹色ボーダー
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, color);
    grad.addColorStop(0.3, "#ffffff");
    grad.addColorStop(0.5, "#60a5fa");
    grad.addColorStop(0.7, "#c084fc");
    grad.addColorStop(1, color);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 1008, 496);

    // メインテキスト
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 52px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 50;
    ctx.fillText(label.toUpperCase(), 512, 256);
    ctx.shadowBlur = 0;

    // サブテキスト
    ctx.fillStyle = color;
    ctx.font = "14px 'Segoe UI', sans-serif";
    ctx.fillText("SECTOR", 512, 330);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [label, color, index]);

  const targetScale = useMemo(() => (isActive ? 1.1 : 0.8), [isActive]);
  const targetGlow = useMemo(() => (isActive ? 0.9 : 0.2), [isActive]);
  const targetOpacity = useMemo(() => (isActive ? 0.98 : 0.2), [isActive]);

  useFrame((state, delta) => {
    if (!meshRef.current || !edgeRef.current || !screenRef.current) return;

    const spiralRotation = scrollOffset * Math.PI * 3;
    const currentAngle = baseAngle + spiralRotation;

    // 螺旋配置
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius * 0.6;
    const scrollY = scrollOffset * total * heightStep * 0.7;
    const targetY = baseY - scrollY;

    damp(meshRef.current.position, "x", targetX, 0.05, delta);
    damp(meshRef.current.position, "y", targetY, 0.05, delta);
    damp(meshRef.current.position, "z", targetZ, 0.05, delta);

    // Governance: アクティブ時のみカメラに正対、非アクティブは螺旋カーブに沿って回転
    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(meshRef.current.position);
      dummy.lookAt(camera.position);
      dampE(meshRef.current.rotation, dummy.rotation, 0.04, delta);
    } else {
      // 非アクティブ: 螺旋のカーブに沿った傾き（浮遊感）
      const spiralTilt = new THREE.Euler(
        Math.sin(currentAngle) * 0.15,
        -currentAngle + Math.PI / 2,
        Math.cos(currentAngle) * 0.1
      );
      const dummy = new THREE.Object3D();
      dummy.rotation.copy(spiralTilt);
      dampE(meshRef.current.rotation, dummy.rotation, 0.08, delta);
    }

    // スケール
    damp(meshRef.current.scale, "x", targetScale, 0.08, delta);
    damp(meshRef.current.scale, "y", targetScale, 0.08, delta);
    damp(meshRef.current.scale, "z", targetScale, 0.08, delta);

    // エッジ発光
    const edgeMat = edgeRef.current.material as THREE.MeshBasicMaterial;
    damp(edgeMat, "opacity", targetGlow, 0.08, delta);

    // スクリーンopacity - 非アクティブ時は0.2
    const screenMat = screenRef.current.material as THREE.MeshBasicMaterial;
    damp(screenMat, "opacity", targetOpacity, 0.06, delta);
  });

  return (
    <group ref={meshRef} onClick={onActivate}>
      {/* 虹色エッジ */}
      <RoundedBox args={[2.8, 1.8, 0.02]} radius={0.02} smoothness={2} position={[0, 0, 0.12]}>
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </RoundedBox>

      {/* ガラスフレーム - 背景が屈折して透けるプリズム */}
      <RoundedBox args={[2.7, 1.7, 0.12]} radius={0.03} smoothness={4}>
        <meshPhysicalMaterial
          color="#020617"
          metalness={0}
          roughness={0.1}
          envMapIntensity={3}
          transparent
          opacity={0.15}
          transmission={0.95}
          thickness={2.5}
          ior={1.6}
          iridescence={0.6}
          iridescenceIOR={1.3}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </RoundedBox>

      {/* スクリーン */}
      <mesh ref={screenRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0.98} />
      </mesh>

      {/* エミッシブグロー */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2.7, 1.7]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ライト */}
      <pointLight color={color} intensity={isActive ? 4 : 1} distance={6} decay={1.2} position={[0, 0, -0.5]} />
    </group>
  );
}

// ============================================
// メインシーン
// ============================================
function HelixScene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scroll = useScroll();

  useFrame(() => {
    if (!scroll) return;
    const idx = Math.round(scroll.offset * (SECTIONS.length - 1));
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  const radius = 6;
  const heightStep = 3.5;

  return (
    <>
      {/* 背景 */}
      <color attach="background" args={["#000106"]} />
      <fogExp2 attach="fog" args={["#000106", 0.03]} />

      {/* トップスポットライト - 一筋の光 */}
      <spotLight
        color="#ffffff"
        intensity={15}
        distance={60}
        angle={Math.PI / 6}
        penumbra={0.4}
        decay={0.3}
        position={[0, 20, 8]}
        target-position={[0, 0, 0]}
      />

      {/* リムライト */}
      <spotLight color="#60a5fa" intensity={4} distance={40} angle={Math.PI / 5} penumbra={0.7} decay={0.5} position={[12, 5, 8]} target-position={[0, 0, 0]} />
      <spotLight color="#c084fc" intensity={3} distance={40} angle={Math.PI / 5} penumbra={0.7} decay={0.5} position={[-12, -5, 8]} target-position={[0, 0, 0]} />

      {/* 環境光 - 暗め */}
      <ambientLight intensity={0.05} color="#0f172a" />
      <pointLight color="#94a3b8" intensity={0.5} distance={30} position={[0, -15, 10]} />

      {/* クリスタルリボンコア */}
      <CrystalRibbonCore />

      {/* ガラスモニター群 */}
      {SECTIONS.map((section, index) => (
        <GlassMonitor
          key={section.id}
          index={index}
          label={section.label}
          color={section.color}
          radius={radius}
          heightStep={heightStep}
          total={SECTIONS.length}
          isActive={index === activeIndex}
          onActivate={() => setActiveIndex(index)}
          scrollOffset={scroll?.offset || 0}
        />
      ))}

      <Environment preset="city" />
    </>
  );
}

// ============================================
// Post-processing
// ============================================
function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom intensity={2.0} luminanceThreshold={1.2} luminanceSmoothing={0.4} height={500} mipmapBlur />
      <ChromaticAberration offset={[0.002, 0.0015]} />
      <Vignette eskil={false} offset={0.3} darkness={0.8} />
    </EffectComposer>
  );
}

// ============================================
// メインエクスポート
// ============================================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 32, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={6} damping={0.05}>
          <HelixScene />
          <PostProcessing />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
