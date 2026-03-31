"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  RoundedBox,
  Text,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { damp, dampE } from "maath/easing";

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
// STEP 2: Bio-Cyber Floral Core
// ============================================
function BioCyberFloralCore() {
  const coreRef = useRef<THREE.Group>(null);
  const innerKnotRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  // ゴールドの雄しび生成
  const stamens = useMemo(() => {
    const items = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.3;
      const height = 0.8 + Math.random() * 0.4;
      items.push({ angle, radius, height });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (!coreRef.current || !innerKnotRef.current || !glowRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    // マウスに反応して優雅に泳ぐ
    const targetRotationX = mouseY * 0.1 + Math.sin(time * 0.2) * 0.1;
    const targetRotationY = mouseX * 0.1 + time * 0.05;

    dampE(
      coreRef.current.rotation,
      new THREE.Euler(targetRotationX, targetRotationY, 0),
      0.03,
      delta
    );

    // 個別回転
    innerKnotRef.current.rotation.x += delta * 0.1;
    innerKnotRef.current.rotation.z -= delta * 0.08;

    // 脈動
    const pulse = 1 + Math.sin(time * 1.2) * 0.05;
    glowRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={coreRef}>
      {/* 外側フロストガラスシェル */}
      <mesh>
        <torusKnotGeometry args={[1.4, 0.4, 200, 32, 5, 8]} />
        <meshPhysicalMaterial
          color="#e8e8f0"
          emissive="#4f46e5"
          emissiveIntensity={0.2}
          metalness={0.1}
          roughness={0.05}
          transmission={1.0}
          thickness={2.0}
          ior={1.5}
          transparent
          opacity={0.9}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* 中間層 */}
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <torusKnotGeometry args={[1.0, 0.25, 128, 24, 4, 6]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.1}
          transmission={0.6}
          thickness={1.5}
          transparent
          opacity={0.8}
          clearcoat={0.9}
          ior={1.4}
        />
      </mesh>

      {/* 内側発光コア */}
      <mesh ref={innerKnotRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.15, 100, 16, 3, 4]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#22d3ee"
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.05}
          transmission={0.3}
          thickness={0.8}
          transparent
          opacity={0.95}
          clearcoat={1}
        />
      </mesh>

      {/* 中央発光球体 */}
      <mesh>
        <sphereGeometry args={[0.25, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3}
          metalness={0}
          roughness={0}
        />
      </mesh>

      {/* グロー効果 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ゴールド雄しび */}
      {stamens.map((stamen, i) => {
        const x = Math.cos(stamen.angle) * stamen.radius;
        const z = Math.sin(stamen.angle) * stamen.radius;
        return (
          <group key={i}>
            <mesh
              position={[x * 0.5, 0, z * 0.5]}
              rotation={[Math.PI / 2 - 0.3, 0, -stamen.angle]}
            >
              <cylinderGeometry args={[0.012, 0.008, stamen.height, 8]} />
              <meshPhysicalMaterial
                color="#ffd700"
                metalness={1.0}
                roughness={0.1}
                emissive="#ffaa00"
                emissiveIntensity={0.3}
              />
            </mesh>
            <mesh
              position={[x, stamen.height * 0.4, z]}
              rotation={[0, stamen.angle, 0]}
            >
              <boxGeometry args={[0.05, 0.06, 0.02]} />
              <meshPhysicalMaterial
                color="#ffd700"
                metalness={1.0}
                roughness={0.2}
                emissive="#ffaa00"
                emissiveIntensity={0.4}
                clearcoat={1}
              />
            </mesh>
          </group>
        );
      })}

      {/* ライティング */}
      <pointLight color="#6366f1" intensity={10} distance={15} decay={1} position={[0, 0, 0]} />
      <pointLight color="#22d3ee" intensity={6} distance={12} decay={1.5} position={[3, 3, 3]} />
      <pointLight color="#ffd700" intensity={4} distance={8} decay={1} position={[0, -4, 2]} />
      <spotLight
        color="#ffffff"
        intensity={5}
        distance={20}
        angle={Math.PI / 1.5}
        penumbra={0.9}
        decay={0.8}
        position={[0, 8, 8]}
        target-position={[0, 0, 0]}
      />
    </group>
  );
}

// ============================================
// STEP 1 & 3: Helix Monitor with Selection Governance
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

  const { camera } = useThree();

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
    ctx.fillStyle = "rgba(5, 5, 16, 0.9)";
    ctx.fillRect(0, 0, 1024, 512);

    // データ装飾
    ctx.fillStyle = "rgba(100, 149, 237, 0.5)";
    ctx.font = "14px 'Courier New', monospace";
    ctx.fillText(`TC 00:${String(index * 14).padStart(2, "0")}:52`, 30, 30);
    ctx.fillText(`ID:${label.substring(0, 3).toUpperCase()}-${1000 + index * 111}`, 900, 30);

    const coords = `X:${(Math.random() * 1000).toFixed(4)} Y:${(Math.random() * 1000).toFixed(4)}`;
    ctx.fillText(coords, 30, 480);

    // ボーダー
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, color);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.strokeRect(15, 15, 994, 482);

    // メインテキスト
    ctx.fillStyle = "#f1f5f9";
    ctx.font = "bold 48px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 30;
    ctx.fillText(label.toUpperCase(), 512, 240);
    ctx.shadowBlur = 0;

    // サブテキスト
    ctx.fillStyle = color;
    ctx.font = "16px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("SECTOR", 512, 300);

    // データポイント
    ctx.font = "10px 'Courier New', monospace";
    for (let i = 0; i < 15; i++) {
      ctx.fillStyle = `rgba(100, 116, 139, ${0.3 + Math.random() * 0.4})`;
      ctx.fillText(
        `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}`,
        50 + Math.random() * 924,
        350 + Math.random() * 100
      );
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [label, color, index]);

  // Governance: スケールと発光の状態管理
  const targetScale = useMemo(() => (isActive ? 1.2 : 0.85), [isActive]);
  const targetGlowOpacity = useMemo(() => (isActive ? 0.6 : 0.15), [isActive]);
  const targetEdgeIntensity = useMemo(() => (isActive ? 2.0 : 0.5), [isActive]);

  useFrame((state, delta) => {
    if (!meshRef.current || !frameRef.current || !glowRef.current) return;

    const scroll = state.scroll?.offset || 0;
    const spiralRotation = scroll * Math.PI * 4;
    const currentAngle = baseAngle + spiralRotation;

    // 螺旋位置計算
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius;
    const scrollY = scroll * total * heightStep * 1.5;
    const targetY = baseY - scrollY;

    // 位置のdamp補完
    damp(meshRef.current.position, "x", targetX, 0.08, delta);
    damp(meshRef.current.position, "y", targetY, 0.08, delta);
    damp(meshRef.current.position, "z", targetZ, 0.08, delta);

    // Governance: アクティブ時はカメラを向く、非アクティブは軸を向く
    const lookAtTarget = isActive
      ? camera.position.clone()
      : new THREE.Vector3(0, targetY, 0);

    const dummy = new THREE.Object3D();
    dummy.position.copy(meshRef.current.position);
    dummy.lookAt(lookAtTarget);
    dampE(meshRef.current.rotation, dummy.rotation, 0.06, delta);

    // Governance: スケールのdamp補完
    const currentScale = meshRef.current.scale.x;
    const newScale = damp(currentScale, targetScale, 0.1, delta);
    meshRef.current.scale.setScalar(newScale);

    // Governance: 発光エッジの強度変化
    if (frameRef.current.material instanceof THREE.MeshBasicMaterial) {
      frameRef.current.material.opacity = targetEdgeIntensity * 0.3;
    }

    // グロー効果
    glowRef.current.material.opacity = targetGlowOpacity;
  });

  return (
    <group ref={meshRef} onClick={onActivate}>
      {/* ワイヤーフレーム枠 - Governance: 発光エッジ */}
      <mesh ref={frameRef}>
        <boxGeometry args={[2.6, 1.6, 0.15]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* ガラスパネルフレーム */}
      <RoundedBox args={[2.4, 1.4, 0.1]} radius={0.03} smoothness={4}>
        <meshPhysicalMaterial
          color="#020408"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
          transparent
          opacity={0.7}
          transmission={0.5}
          thickness={0.1}
          clearcoat={1}
          depthTest={true}
          depthWrite={true}
        />
      </RoundedBox>

      {/* スクリーン */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.2, 1.2]} />
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
      <mesh ref={glowRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[2.4, 1.4]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      {/* コーナーマーカー */}
      {[[-1.1, -0.65], [1.1, -0.65], [-1.1, 0.65], [1.1, 0.65]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.06]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color={color} transparent opacity={isActive ? 0.8 : 0.4} />
        </mesh>
      ))}

      {/* ポイントライト */}
      <pointLight
        color={color}
        intensity={isActive ? 4 : 2}
        distance={6}
        decay={2}
        position={[0, 0, -0.5]}
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

  // スクロールに応じてアクティブインデックスを更新
  useFrame(() => {
    if (!scroll) return;
    const scrollOffset = scroll.offset;
    const newIndex = Math.floor(scrollOffset * (SECTIONS.length - 1));
    const clampedIndex = Math.max(0, Math.min(newIndex, SECTIONS.length - 1));
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  const radius = 5;
  const heightStep = 4;

  return (
    <>
      {/* 背景グラデーション */}
      <color attach="background" args={["#0a0a1a"]} />
      <fogExp2 attach="fog" args={["#0a0a1a", 0.02]} />

      {/* 環境照明 */}
      <ambientLight intensity={0.1} color="#1e293b" />
      <directionalLight position={[10, 20, 10]} intensity={0.4} color="#e2e8f0" />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#3b82f6" />

      <pointLight color="#8b5cf6" intensity={1} distance={30} position={[15, 10, -10]} />
      <pointLight color="#ec4899" intensity={1} distance={30} position={[-15, -10, -10]} />

      {/* Bio-Cyber Floral Core */}
      <BioCyberFloralCore />

      {/* 螺旋モニター群 */}
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
// メインコンポーネント
// ============================================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 42, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={6} damping={0.1}>
          <HelixScene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
