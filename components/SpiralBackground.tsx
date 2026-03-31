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
// Crystal Core（高密度 torusKnot p=7, q=11）
// ============================================
function CrystalCore() {
  const coreRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coordTextureRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  // 座標/数式テクスチャ生成
  const coordTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, 1024, 1024);

    const symbols = ["Σ", "∫", "∂", "∇", "∞", "π", "√", "≈", "≠", "≤", "≥"];
    const coords = ["X:", "Y:", "Z:", "TC:", "ID:", "Q:", "R:"];

    ctx.font = "10px 'Courier New', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const coord = coords[Math.floor(Math.random() * coords.length)];
      const num = (Math.random() * 1000).toFixed(4);
      ctx.fillText(`${symbol}${coord}${num}`, x, y);
    }

    ctx.strokeStyle = "rgba(100, 149, 237, 0.15)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 1024; i += 48) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!coreRef.current || !glowRef.current || !coordTextureRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    const targetRotationX = mouseY * 0.12 + Math.sin(time * 0.12) * 0.06;
    const targetRotationY = mouseX * 0.12 + time * 0.025;

    dampE(
      coreRef.current.rotation,
      new THREE.Euler(targetRotationX, targetRotationY, time * 0.015),
      0.02,
      delta
    );

    coordTextureRef.current.rotation.y = time * 0.04;
    coordTextureRef.current.rotation.x = Math.sin(time * 0.08) * 0.08;

    const pulse = 1 + Math.sin(time * 0.6) * 0.02;
    glowRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={coreRef}>
      {/* メインクリスタル - 高密度 torusKnot (p=7, q=11) */}
      <mesh>
        <torusKnotGeometry args={[2.2, 0.18, 400, 48, 7, 11]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={1.0}
          thickness={5.0}
          ior={2.4}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={2.5}
          attenuationColor="#ffffff"
          attenuationDistance={1.5}
        />
      </mesh>

      {/* 座標テクスチャを表面に投影 */}
      <mesh ref={coordTextureRef} scale={[4.5, 4.5, 4.5]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          map={coordTexture}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 内側レイヤー */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <torusKnotGeometry args={[1.6, 0.12, 300, 36, 5, 8]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          metalness={0.05}
          roughness={0.02}
          transmission={0.95}
          thickness={2.5}
          ior={1.9}
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          clearcoat={1}
        />
      </mesh>

      {/* 中央発光球体 - 強烈な白い光 */}
      <mesh>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={6}
          metalness={0}
          roughness={0}
        />
      </mesh>

      {/* グロー効果 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ライティング */}
      <pointLight color="#ffffff" intensity={12} distance={25} decay={0.6} position={[0, 0, 0]} />
      <pointLight color="#60a5fa" intensity={5} distance={20} decay={0.8} position={[6, 6, 6]} />
      <pointLight color="#f472b6" intensity={4} distance={20} decay={0.8} position={[-6, -6, 6]} />
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
  globalScrollOffset: number;
  onPositionUpdate: (index: number, position: THREE.Vector3) => void;
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
  globalScrollOffset,
  onPositionUpdate,
}: HelixMonitorProps) {
  const meshRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const neonEdgeRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();

  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  const baseY = useMemo(
    () => index * heightStep - (total * heightStep) / 2,
    [index, total, heightStep]
  );

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "rgba(5, 5, 16, 0.85)";
    ctx.fillRect(0, 0, 1024, 512);

    ctx.fillStyle = "rgba(100, 149, 237, 0.6)";
    ctx.font = "14px 'Courier New', monospace";
    ctx.fillText(`TC 00:${String(index * 14).padStart(2, "0")}:52`, 30, 30);
    ctx.fillText(`ID:${label.substring(0, 3).toUpperCase()}-${1000 + index * 111}`, 900, 30);

    const coords = `X:${(Math.random() * 1000).toFixed(4)} Y:${(Math.random() * 1000).toFixed(4)}`;
    ctx.fillText(coords, 30, 480);

    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, color);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, 1000, 488);

    ctx.fillStyle = "#f1f5f9";
    ctx.font = "bold 56px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 40;
    ctx.fillText(label.toUpperCase(), 512, 240);
    ctx.shadowBlur = 0;

    ctx.fillStyle = color;
    ctx.font = "18px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("SECTOR", 512, 310);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [label, color, index]);

  const targetScaleNum = useMemo(() => (isActive ? 1.2 : 0.7), [isActive]);
  const targetGlowOpacity = useMemo(() => (isActive ? 0.95 : 0.03), [isActive]);
  const targetNeonIntensity = useMemo(() => (isActive ? 2.5 : 0.2), [isActive]);

  useFrame((state, delta) => {
    if (!meshRef.current || !frameRef.current || !glowRef.current || !neonEdgeRef.current) return;

    const scrollOffset = globalScrollOffset;
    const spiralRotation = scrollOffset * Math.PI * 2;
    const currentAngle = baseAngle + spiralRotation;

    // 螺旋位置計算 - 奥から手前へ
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius * 0.5;
    const totalScrollY = scrollOffset * total * heightStep * 0.5;
    const targetY = baseY - totalScrollY;

    damp(meshRef.current.position, "x", targetX, 0.03, delta);
    damp(meshRef.current.position, "y", targetY, 0.03, delta);
    damp(meshRef.current.position, "z", targetZ, 0.03, delta);

    // 位置を親に報告（Z-based Governance用）
    onPositionUpdate(index, meshRef.current.position.clone());

    // Governance: アクティブ時のみカメラに正対、非アクティブは螺旋の傾き
    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(meshRef.current.position);
      dummy.lookAt(camera.position);
      dampE(meshRef.current.rotation, dummy.rotation, 0.04, delta);
    } else {
      const targetRotation = new THREE.Euler(
        0,
        -currentAngle + Math.PI / 2,
        0
      );
      const dummy = new THREE.Object3D();
      dummy.rotation.copy(targetRotation);
      dampE(meshRef.current.rotation, dummy.rotation, 0.06, delta);
    }

    damp(meshRef.current.scale, "x", targetScaleNum, 0.05, delta);
    damp(meshRef.current.scale, "y", targetScaleNum, 0.05, delta);
    damp(meshRef.current.scale, "z", targetScaleNum, 0.05, delta);

    const frameMaterial = frameRef.current.material as THREE.MeshBasicMaterial;
    damp(frameMaterial, "opacity", targetNeonIntensity, 0.06, delta);

    const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
    damp(glowMaterial, "opacity", targetGlowOpacity, 0.06, delta);

    const neonMaterial = neonEdgeRef.current.material as THREE.MeshBasicMaterial;
    neonMaterial.opacity = isActive ? 0.95 : 0.1;
  });

  return (
    <group ref={meshRef} onClick={onActivate}>
      <mesh ref={neonEdgeRef}>
        <boxGeometry args={[2.7, 1.7, 0.2]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      <mesh ref={frameRef}>
        <boxGeometry args={[2.6, 1.6, 0.18]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} wireframe />
      </mesh>

      <RoundedBox args={[2.5, 1.5, 0.15]} radius={0.04} smoothness={4}>
        <meshPhysicalMaterial
          color="#020408"
          metalness={0.2}
          roughness={0.05}
          envMapIntensity={3}
          transparent
          opacity={0.2}
          transmission={0.9}
          thickness={0.5}
          ior={1.8}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2.3, 1.3]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent
          opacity={0.95}
        />
      </mesh>

      <mesh ref={glowRef} position={[0, 0, 0.09]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight
        color={color}
        intensity={isActive ? 8 : 0.8}
        distance={12}
        decay={1}
        position={[0, 0, -1]}
      />
    </group>
  );
}

// ============================================
// メインシーン with Z-based Governance
// ============================================
function HelixScene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scroll = useScroll();
  const { camera } = useThree();

  const monitorPositions = useRef<Map<number, THREE.Vector3>>(new Map());

  // Z-based Governance: カメラに最も近いモニターを自動選択
  useFrame(() => {
    if (!scroll) return;

    let closestIndex = 0;
    let closestZ = -Infinity;

    monitorPositions.current.forEach((position, index) => {
      const z = position.z;
      if (z > closestZ) {
        closestZ = z;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < SECTIONS.length) {
      setActiveIndex(closestIndex);
    }
  });

  // 再設計された螺旋パラメータ
  const radius = 14;
  const heightStep = 1.2;

  const updatePosition = useCallback((index: number, position: THREE.Vector3) => {
    monitorPositions.current.set(index, position);
  }, []);

  return (
    <>
      <color attach="background" args={["#01040f"]} />
      <fogExp2 attach="fog" args={["#01040f", 0.04]} />

      <ambientLight intensity={0.02} color="#0f172a" />
      <directionalLight position={[10, 20, 10]} intensity={0.1} color="#e2e8f0" />

      <pointLight color="#3b82f6" intensity={0.5} distance={60} position={[30, 20, -20]} />
      <pointLight color="#ec4899" intensity={0.4} distance={60} position={[-30, -20, -20]} />

      <CrystalCore />

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
          globalScrollOffset={scroll?.offset || 0}
          onPositionUpdate={updatePosition}
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
      <Bloom
        intensity={2}
        luminanceThreshold={1.2}
        luminanceSmoothing={0.5}
        height={500}
        mipmapBlur
      />
      <ChromaticAberration offset={[0.0025, 0.0018]} />
      <Vignette eskil={false} offset={0.2} darkness={0.8} />
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
        camera={{ position: [0, 0, 18], fov: 30, near: 0.1, far: 100 }}
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
