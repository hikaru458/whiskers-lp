"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { damp, dampE } from "maath/easing";

const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#60a5fa" },
  { id: "creator", label: "Creator", color: "#22d3ee" },
  { id: "contest", label: "Contest", color: "#a78bfa" },
  { id: "product", label: "Product", color: "#fbbf24" },
  { id: "faq", label: "FAQ", color: "#34d399" },
  { id: "contact", label: "Contact", color: "#f87171" },
];

// 統一された螺旋パラメータ
const HELIX_RADIUS = 10;
const HELIX_HEIGHT_SPAN = 20;
const HELIX_TURNS = 2.5;

// ============================================
// Crystal Helix - モニターと同じ半径を使用
// ============================================
function CrystalHelix({ scrollOffset }: { scrollOffset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 3;

  const helixCurves = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const pts = [];
      const phase = (i * Math.PI * 2) / count;
      for (let j = 0; j <= 200; j++) {
        const t = (j / 200) * Math.PI * 2 * HELIX_TURNS;
        const x = Math.cos(t + phase) * (HELIX_RADIUS * 0.5);
        const y = (t / (Math.PI * 2)) * HELIX_HEIGHT_SPAN - HELIX_HEIGHT_SPAN / 2;
        const z = Math.sin(t + phase) * (HELIX_RADIUS * 0.5);
        pts.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(pts);
    });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // スクロールに連動して螺旋を回転
      const rotation = scrollOffset * Math.PI * 2;
      damp(groupRef.current.rotation, "y", rotation, 0.05, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {helixCurves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 100, 0.06, 8, false]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={1.0}
            ior={1.5}
            thickness={0.2}
            roughness={0.05}
            emissive="#ffffff"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      <pointLight intensity={8} distance={25} color="#ffffff" />
    </group>
  );
}

// ============================================
// Glass Monitor - 螺旋と同じ計算式を使用
// ============================================
function GlassMonitor({ 
  index, 
  label, 
  color, 
  isActive, 
  scrollOffset 
}: { 
  index: number; 
  label: string; 
  color: string; 
  isActive: boolean; 
  scrollOffset: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512; 
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    
    ctx.fillStyle = "rgba(2, 6, 15, 0.4)";
    ctx.fillRect(0, 0, 512, 256);
    
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, color);
    grad.addColorStop(0.5, "#fff");
    grad.addColorStop(1, color);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 492, 236);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 40px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.fillText(label.toUpperCase(), 256, 128);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 螺旋上の位置を計算（モニターは螺旋の外側に配置）
    const baseAngle = (index / SECTIONS.length) * Math.PI * 2;
    const scrollAngle = scrollOffset * Math.PI * 2 * HELIX_TURNS;
    const currentAngle = baseAngle + scrollAngle;
    
    // 螺旋の外側に配置（HELIX_RADIUSの0.9倍）
    const x = Math.cos(currentAngle) * (HELIX_RADIUS * 0.9);
    const z = Math.sin(currentAngle) * (HELIX_RADIUS * 0.9);
    const y = ((index / SECTIONS.length) - 0.5) * HELIX_HEIGHT_SPAN * 0.8;

    damp(meshRef.current.position, "x", x, 0.08, delta);
    damp(meshRef.current.position, "y", y, 0.08, delta);
    damp(meshRef.current.position, "z", z, 0.08, delta);

    if (isActive) {
      // アクティブ時はカメラを向く
      const dummy = new THREE.Object3D();
      dummy.position.copy(meshRef.current.position);
      dummy.lookAt(camera.position);
      dampE(meshRef.current.rotation, dummy.rotation, 0.06, delta);
      
      // アクティブ時は前に出る
      damp(meshRef.current.position, "z", z + 3, 0.06, delta);
    } else {
      // 非アクティブ時は螺旋に沿った角度
      const targetRotationY = -currentAngle + Math.PI / 2;
      const dummy = new THREE.Object3D();
      dummy.rotation.set(0, targetRotationY, 0);
      dampE(meshRef.current.rotation, dummy.rotation, 0.1, delta);
    }

    // スケール
    damp(meshRef.current.scale, "x", isActive ? 1.15 : 0.85, 0.1, delta);
    damp(meshRef.current.scale, "y", isActive ? 1.15 : 0.85, 0.1, delta);
    damp(meshRef.current.scale, "z", isActive ? 1.15 : 0.85, 0.1, delta);
  });

  return (
    <group ref={meshRef}>
      <RoundedBox args={[3.5, 2, 0.02]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial 
          color="#020617"
          transmission={0.9}
          thickness={0.5}
          ior={1.2}
          transparent
          opacity={isActive ? 0.9 : 0.5}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[3.3, 1.8]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          opacity={isActive ? 1 : 0.6} 
          toneMapped={false} 
        />
      </mesh>
      {/* エッジグロー */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[3.6, 2.1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 0.3 : 0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ============================================
// メインエクスポート
// ============================================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000208]">
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 35 }}
        dpr={[1, 1.5]}
      >
        <ScrollControls pages={5} damping={0.08}>
          <SceneContent />
          <Environment preset="city" />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

function SceneContent() {
  const scroll = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);

  useFrame(() => {
    if (!scroll) return;
    const current = Math.round(scroll.offset * (SECTIONS.length - 1));
    if (current !== activeIndex) setActiveIndex(current);
  });

  return (
    <>
      <color attach="background" args={["#000208"]} />
      <fog attach="fog" args={["#000208", 15, 50]} />
      
      <ambientLight intensity={0.15} />
      <spotLight position={[0, 20, 15]} intensity={15} angle={0.4} penumbra={0.5} color="#ffffff" />
      <spotLight position={[15, 5, 10]} intensity={5} angle={0.5} penumbra={0.8} color="#60a5fa" />
      <spotLight position={[-15, -5, 10]} intensity={4} angle={0.5} penumbra={0.8} color="#c084fc" />

      <CrystalHelix scrollOffset={scroll?.offset || 0} />
      
      {SECTIONS.map((s, i) => (
        <GlassMonitor
          key={s.id}
          index={i}
          label={s.label}
          color={s.color}
          isActive={i === activeIndex}
          scrollOffset={scroll?.offset || 0}
        />
      ))}
    </>
  );
}
