"use client";

import { useRef, useMemo, useState } from "react";
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
// Crystal Helix Core（虹色螺旋クリスタル）
// ============================================
function CrystalHelixCore() {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!coreRef.current || !innerRef.current || !glowRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.5;

    // 優雅な泳ぎ
    dampE(
      coreRef.current.rotation,
      new THREE.Euler(
        mouseY * 0.3 + Math.sin(time * 0.2) * 0.1,
        time * 0.1 + mouseX * 0.3,
        Math.cos(time * 0.15) * 0.05
      ),
      0.03,
      delta
    );

    // 内側逆回転
    dampE(
      innerRef.current.rotation,
      new THREE.Euler(
        -mouseY * 0.2,
        -time * 0.15,
        0
      ),
      0.03,
      delta
    );

    // 脈動
    const pulse = 1 + Math.sin(time * 0.8) * 0.02;
    glowRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={coreRef}>
      {/* メイン螺旋 - ガラスリボン */}
      <mesh>
        <torusKnotGeometry args={[3, 0.08, 200, 32, 3, 5]} />
        <meshPhysicalMaterial
          color="#f0f9ff"
          metalness={0}
          roughness={0}
          transmission={1.0}
          thickness={3}
          ior={1.7}
          iridescence={1.0}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={2}
          attenuationColor="#e0f2fe"
          attenuationDistance={1}
        />
      </mesh>

      {/* 内側螺旋 - 逆方向 */}
      <mesh ref={innerRef}>
        <torusKnotGeometry args={[2.2, 0.06, 150, 24, 2, 4]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          metalness={0}
          roughness={0.02}
          transmission={0.95}
          thickness={2}
          ior={1.6}
          iridescence={0.9}
          iridescenceIOR={1.25}
          emissive="#60a5fa"
          emissiveIntensity={0.15}
          clearcoat={1}
        />
      </mesh>

      {/* 外側フレームリング */}
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <torusKnotGeometry args={[4, 0.04, 120, 20, 4, 3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={1.0}
          thickness={2.5}
          ior={1.8}
          iridescence={1.0}
          iridescenceIOR={1.35}
          clearcoat={1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* 中央白い発光花 */}
      <mesh>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={5}
          metalness={0}
          roughness={0}
          transmission={0.3}
          thickness={1}
        />
      </mesh>

      {/* グロー */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ライティング */}
      <pointLight color="#ffffff" intensity={10} distance={20} decay={0.5} position={[0, 0, 0]} />
      <pointLight color="#60a5fa" intensity={5} distance={15} decay={0.7} position={[3, 3, 3]} />
      <pointLight color="#c084fc" intensity={4} distance={15} decay={0.7} position={[-3, -3, 3]} />
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

  const targetScale = useMemo(() => (isActive ? 1.1 : 0.85), [isActive]);
  const targetGlow = useMemo(() => (isActive ? 0.9 : 0.15), [isActive]);

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

    // カメラに向く
    const dummy = new THREE.Object3D();
    dummy.position.copy(meshRef.current.position);
    dummy.lookAt(camera.position);
    dampE(meshRef.current.rotation, dummy.rotation, 0.06, delta);

    // スケール
    damp(meshRef.current.scale, "x", targetScale, 0.08, delta);
    damp(meshRef.current.scale, "y", targetScale, 0.08, delta);
    damp(meshRef.current.scale, "z", targetScale, 0.08, delta);

    // エッジ発光
    const edgeMat = edgeRef.current.material as THREE.MeshBasicMaterial;
    damp(edgeMat, "opacity", targetGlow, 0.08, delta);
  });

  return (
    <group ref={meshRef} onClick={onActivate}>
      {/* 虹色エッジ */}
      <mesh ref={edgeRef} position={[0, 0, 0.12]}>
        <roundedBoxGeometry args={[2.8, 1.8, 0.02, 4, 0.02]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>

      {/* ガラスフレーム */}
      <RoundedBox args={[2.7, 1.7, 0.1]} radius={0.03} smoothness={4}>
        <meshPhysicalMaterial
          color="#020617"
          metalness={0.1}
          roughness={0.05}
          envMapIntensity={3}
          transparent
          opacity={0.2}
          transmission={0.92}
          thickness={0.6}
          ior={1.7}
          iridescence={0.8}
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

      {/* トップライト */}
      <spotLight
        color="#e0f2fe"
        intensity={10}
        distance={50}
        angle={Math.PI / 4}
        penumbra={0.6}
        decay={0.4}
        position={[0, 25, 5]}
        target-position={[0, 0, 0]}
      />

      {/* リムライト */}
      <spotLight color="#60a5fa" intensity={4} distance={40} angle={Math.PI / 5} penumbra={0.7} decay={0.5} position={[12, 5, 8]} target-position={[0, 0, 0]} />
      <spotLight color="#c084fc" intensity={3} distance={40} angle={Math.PI / 5} penumbra={0.7} decay={0.5} position={[-12, -5, 8]} target-position={[0, 0, 0]} />

      {/* 環境光 */}
      <ambientLight intensity={0.02} color="#0f172a" />
      <pointLight color="#94a3b8" intensity={0.5} distance={30} position={[0, -15, 10]} />

      {/* クリスタル螺旋コア */}
      <CrystalHelixCore />

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
      <Bloom intensity={2} luminanceThreshold={0.8} luminanceSmoothing={0.5} height={500} mipmapBlur />
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
