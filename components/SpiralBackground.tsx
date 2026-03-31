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
// Crystal Ribbon Core（虹色光輝のクリスタルリボン）
// ============================================
function CrystalRibbonCore() {
  const coreRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!coreRef.current || !glowRef.current || !innerGlowRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    // 優雅な泳ぎ
    const targetRotationX = mouseY * 0.08 + Math.sin(time * 0.1) * 0.05;
    const targetRotationY = mouseX * 0.08 + time * 0.02;

    dampE(
      coreRef.current.rotation,
      new THREE.Euler(targetRotationX, targetRotationY, time * 0.01),
      0.015,
      delta
    );

    // 脈動
    const pulse = 1 + Math.sin(time * 0.5) * 0.015;
    glowRef.current.scale.setScalar(pulse);
    innerGlowRef.current.scale.setScalar(pulse * 0.8);
  });

  return (
    <group ref={coreRef}>
      {/* メインクリスタルリボン - 極細の虹色リボン (p=2, q=3) */}
      <mesh>
        <torusKnotGeometry args={[2.5, 0.03, 200, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={1.0}
          thickness={2.0}
          ior={1.5}
          iridescence={1.0}
          iridescenceIOR={1.3}
          iridescenceThickness={400}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={3}
        />
      </mesh>

      {/* 内側レイヤー - 逆方向にゆったり回転 */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusKnotGeometry args={[1.8, 0.025, 150, 24, 3, 2]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          metalness={0}
          roughness={0.02}
          transmission={0.95}
          thickness={1.5}
          ior={1.4}
          iridescence={0.8}
          iridescenceIOR={1.2}
          iridescenceThickness={300}
          emissive="#60a5fa"
          emissiveIntensity={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* 外側フレーム - より大きなリボン */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <torusKnotGeometry args={[3.2, 0.02, 180, 28, 2, 5]} />
        <meshPhysicalMaterial
          color="#f0f9ff"
          metalness={0}
          roughness={0}
          transmission={1.0}
          thickness={1.8}
          ior={1.45}
          iridescence={1.0}
          iridescenceIOR={1.25}
          iridescenceThickness={500}
          clearcoat={1}
        />
      </mesh>

      {/* 中央発光コア - 白い花のような光 */}
      <mesh>
        <sphereGeometry args={[0.3, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={8}
          metalness={0}
          roughness={0}
        />
      </mesh>

      {/* 内側グロー */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 外側グロー */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ライティング */}
      <pointLight color="#ffffff" intensity={15} distance={30} decay={0.5} position={[0, 0, 0]} />
      <pointLight color="#60a5fa" intensity={6} distance={25} decay={0.7} position={[4, 4, 4]} />
      <pointLight color="#c084fc" intensity={4} distance={25} decay={0.7} position={[-4, -4, 4]} />
    </group>
  );
}

// ============================================
// ノイズテクスチャ生成
// ============================================
function createNoiseTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const imageData = ctx.createImageData(512, 512);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = Math.random() * 255;
    imageData.data[i] = noise;
    imageData.data[i + 1] = noise;
    imageData.data[i + 2] = noise;
    imageData.data[i + 3] = 30;
  }
  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// ============================================
// Prism Glass Monitor（虹色縁取りガラス）
// ============================================
interface PrismMonitorProps {
  index: number;
  label: string;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  isActive: boolean;
  onActivate: () => void;
}

function PrismMonitor({
  index,
  label,
  color,
  position,
  rotation,
  scale,
  isActive,
  onActivate,
}: PrismMonitorProps) {
  const meshRef = useRef<THREE.Group>(null);
  const edgeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const noiseRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();
  const noiseTexture = useMemo(() => createNoiseTexture(), []);

  // CanvasTexture生成
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "rgba(2, 4, 8, 0.9)";
    ctx.fillRect(0, 0, 1024, 512);

    // ノイズ背景
    ctx.fillStyle = "rgba(100, 149, 237, 0.03)";
    for (let i = 0; i < 100; i++) {
      ctx.fillRect(Math.random() * 1024, Math.random() * 512, 2, 2);
    }

    // データ装飾
    ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
    ctx.font = "12px 'Courier New', monospace";
    ctx.fillText(`TC:00:${String(index * 14).padStart(2, "0")}:52`, 25, 25);
    ctx.fillText(`ID:${label.substring(0, 3).toUpperCase()}-${1000 + index * 111}`, 920, 25);
    ctx.fillText(`X:${(Math.random() * 999).toFixed(3)} Y:${(Math.random() * 999).toFixed(3)}`, 25, 490);

    // 虹色ボーダー
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.3, "#ffffff");
    gradient.addColorStop(0.5, "#60a5fa");
    gradient.addColorStop(0.7, "#c084fc");
    gradient.addColorStop(1, color);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, 1004, 492);

    // メインテキスト
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 64px 'Playfair Display', 'Georgia', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 60;
    ctx.fillText(label.toUpperCase(), 512, 256);
    ctx.shadowBlur = 0;

    // サブテキスト
    ctx.fillStyle = color;
    ctx.font = "16px 'Segoe UI', sans-serif";
    ctx.fillText("SECTOR", 512, 340);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [label, color, index]);

  const targetScale = useMemo(() => (isActive ? scale * 1.15 : scale * 0.85), [isActive, scale]);
  const targetGlow = useMemo(() => (isActive ? 0.8 : 0.1), [isActive]);

  useFrame((state, delta) => {
    if (!meshRef.current || !edgeRef.current || !glowRef.current || !noiseRef.current) return;

    // アクティブ時のみカメラに正対
    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(meshRef.current.position);
      dummy.lookAt(camera.position);
      dampE(meshRef.current.rotation, dummy.rotation, 0.04, delta);
    }

    // スケール補完
    damp(meshRef.current.scale, "x", targetScale, 0.05, delta);
    damp(meshRef.current.scale, "y", targetScale, 0.05, delta);
    damp(meshRef.current.scale, "z", targetScale, 0.05, delta);

    // 虹色エッジ発光
    const edgeMaterial = edgeRef.current.material as THREE.MeshBasicMaterial;
    damp(edgeMaterial, "opacity", isActive ? 1.0 : 0.3, 0.06, delta);

    // グロー
    const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
    damp(glowMaterial, "opacity", targetGlow, 0.06, delta);

    // ノイズアニメーション
    noiseTexture.offset.x += delta * 0.02;
    noiseTexture.offset.y += delta * 0.01;
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={onActivate}
    >
      {/* 虹色縁取り - エミッシブ */}
      <mesh ref={edgeRef} position={[0, 0, 0.12]}>
        <roundedBoxGeometry args={[2.7, 1.7, 0.02, 4, 0.02]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 虹色縁取りライン */}
      <mesh position={[0, 0, 0.13]}>
        <roundedBoxGeometry args={[2.65, 1.65, 0.01, 4, 0.01]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0}
          roughness={0}
          transmission={0.5}
          thickness={0.1}
          iridescence={1.0}
          iridescenceIOR={1.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* ガラスパネル - プリズムエフェクト */}
      <RoundedBox args={[2.6, 1.6, 0.12]} radius={0.02} smoothness={4}>
        <meshPhysicalMaterial
          color="#020408"
          metalness={0.1}
          roughness={0.1}
          envMapIntensity={4}
          transparent
          opacity={0.15}
          transmission={0.9}
          thickness={0.8}
          ior={1.6}
          iridescence={0.5}
          iridescenceIOR={1.2}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </RoundedBox>

      {/* ノイズテクスチャ背景 */}
      <mesh ref={noiseRef} position={[0, 0, 0.08]}>
        <planeGeometry args={[2.4, 1.4]} />
        <meshBasicMaterial
          map={noiseTexture}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* メインコンテンツ */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[2.4, 1.4]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent
          opacity={0.98}
        />
      </mesh>

      {/* エミッシブグロー */}
      <mesh ref={glowRef} position={[0, 0, 0.11]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ポイントライト */}
      <pointLight
        color={color}
        intensity={isActive ? 5 : 0.5}
        distance={8}
        decay={1}
        position={[0, 0, -1]}
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

  // スクロールに応じたアクティブインデックス
  useFrame(() => {
    if (!scroll) return;
    const scrollOffset = scroll.offset;
    const newIndex = Math.round(scrollOffset * (SECTIONS.length - 1));
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < SECTIONS.length) {
      setActiveIndex(newIndex);
    }
  });

  // 各モニターの位置と回転を定義（中央大、周囲斜め・横向き・ランダム）
  const monitorConfigs = useMemo(() => [
    // Gallery - 中央・大きく・正面
    {
      position: [0, 0, 4] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: 1.3,
    },
    // Creator - 左上・斜め
    {
      position: [-6, 3.5, 1] as [number, number, number],
      rotation: [0.2, 0.4, -0.1] as [number, number, number],
      scale: 0.9,
    },
    // Contest - 右上・横向き
    {
      position: [6, 2.5, 0] as [number, number, number],
      rotation: [0.1, -0.5, 0.05] as [number, number, number],
      scale: 0.85,
    },
    // Product - 左下・斜め下向き
    {
      position: [-5, -3, 2] as [number, number, number],
      rotation: [-0.15, 0.3, 0.08] as [number, number, number],
      scale: 0.9,
    },
    // FAQ - 右下・横向き
    {
      position: [5.5, -3.5, -1] as [number, number, number],
      rotation: [-0.1, -0.6, -0.05] as [number, number, number],
      scale: 0.85,
    },
    // Contact - 奥・小さく
    {
      position: [0, -5, -3] as [number, number, number],
      rotation: [-0.2, 0, 0] as [number, number, number],
      scale: 0.75,
    },
  ], []);

  return (
    <>
      {/* 背景 - 青白いトップライト演出 */}
      <color attach="background" args={["#000208"]} />
      <fogExp2 attach="fog" args={["#000208", 0.025]} />

      {/* シネマティックライティング */}
      <ambientLight intensity={0.015} color="#0f172a" />

      {/* トップスポットライト（青白い光） */}
      <spotLight
        color="#e0f2fe"
        intensity={8}
        distance={50}
        angle={Math.PI / 3}
        penumbra={0.7}
        decay={0.5}
        position={[0, 20, 10]}
        target-position={[0, 0, 0]}
      />

      {/* リムライト（横からの光） */}
      <spotLight
        color="#60a5fa"
        intensity={4}
        distance={40}
        angle={Math.PI / 4}
        penumbra={0.8}
        decay={0.6}
        position={[15, 5, 5]}
        target-position={[0, 0, 0]}
      />

      <spotLight
        color="#c084fc"
        intensity={3}
        distance={40}
        angle={Math.PI / 4}
        penumbra={0.8}
        decay={0.6}
        position={[-15, -5, 5]}
        target-position={[0, 0, 0]}
      />

      {/* フィルライト（柔らかな補光） */}
      <pointLight color="#94a3b8" intensity={0.8} distance={30} position={[0, -10, 10]} />

      {/* Crystal Ribbon Core */}
      <CrystalRibbonCore />

      {/* レイアウト - 中央大・周囲斜め・ランダム */}
      {SECTIONS.map((section, index) => (
        <PrismMonitor
          key={section.id}
          index={index}
          label={section.label}
          color={section.color}
          position={monitorConfigs[index].position}
          rotation={monitorConfigs[index].rotation}
          scale={monitorConfigs[index].scale}
          isActive={index === activeIndex}
          onActivate={() => setActiveIndex(index)}
        />
      ))}

      <Environment preset="city" />
    </>
  );
}

// ============================================
// Post-processing（エッジのみ光るBloom）
// ============================================
function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={2.5}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.4}
        height={600}
        mipmapBlur
      />
      <ChromaticAberration offset={[0.003, 0.002]} />
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
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
        camera={{ position: [0, 0, 12], fov: 28, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={6} damping={0.04}>
          <HelixScene />
          <PostProcessing />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
