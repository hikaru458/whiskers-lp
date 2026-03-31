"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, RoundedBox, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { damp, dampE } from "maath/easing";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";

const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#60a5fa" },
  { id: "creator", label: "Creator", color: "#22d3ee" },
  { id: "contest", label: "Contest", color: "#a78bfa" },
  { id: "product", label: "Product", color: "#fbbf24" },
  { id: "faq", label: "FAQ", color: "#34d399" },
  { id: "contact", label: "Contact", color: "#f87171" },
];

// --- 定数（螺旋の設計図） ---
const RADIUS = 12; // 螺旋の半径（広げることで余白を作る）
const HEIGHT_STEP = 2.0; // 垂直方向の間隔（階段の勾配）
const SPIRAL_TURNS = 3; // 螺旋の回転数

// ============================================
// Crystal Helix Core（数式ベースの無限螺旋）
// ============================================
function CrystalHelix() {
  const count = 3; // 重ねるリボンの数
  const points = 1200; // 滑らかさ
  
  const helixCurves = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const pts = [];
      const phase = (i * Math.PI * 2) / count;
      for (let j = 0; j <= points; j++) {
        const t = (j / points) * Math.PI * 2 * SPIRAL_TURNS;
        const x = Math.cos(t + phase) * (RADIUS * 0.4);
        const y = (t / (Math.PI * 2)) * HEIGHT_STEP * 4 - 10;
        const z = Math.sin(t + phase) * (RADIUS * 0.4);
        pts.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(pts);
    });
  }, []);

  return (
    <group>
      {helixCurves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 1000, 0.005, 8, false]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={1.0}
            ior={1.5}
            thickness={0.2}
            roughness={0.02}
            iridescence={1.0}
            iridescenceIOR={1.8}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      <pointLight intensity={10} distance={20} color="#ffffff" />
    </group>
  );
}

// ============================================
// Glass Monitor（ARホログラム風パネル）
// ============================================
function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "rgba(2, 6, 15, 0.2)"; // 背景をより透明に
    ctx.fillRect(0, 0, 1024, 512);
    
    // 虹色ボーダー
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, color); grad.addColorStop(0.5, "#fff"); grad.addColorStop(1, color);
    ctx.strokeStyle = grad; ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 984, 472);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 80px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.shadowColor = color; ctx.shadowBlur = 30;
    ctx.fillText(label.toUpperCase(), 512, 256);
    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const t = (index / SECTIONS.length) * Math.PI * 2 * SPIRAL_TURNS + (scrollOffset * 10);
    const targetX = Math.cos(t) * RADIUS;
    const targetZ = Math.sin(t) * RADIUS;
    const targetY = (t / (Math.PI * 2)) * HEIGHT_STEP * 6 - 15;

    damp(meshRef.current.position, "x", targetX, 0.1, delta);
    damp(meshRef.current.position, "y", targetY, 0.1, delta);
    damp(meshRef.current.position, "z", targetZ, 0.1, delta);

    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(meshRef.current.position);
      dummy.lookAt(camera.position);
      dampE(meshRef.current.rotation, dummy.rotation, 0.05, delta);
      damp(meshRef.current.scale, "x", 1.2, 0.1, delta);
    } else {
      meshRef.current.rotation.y = -t + Math.PI / 2;
      damp(meshRef.current.scale, "x", 0.7, 0.1, delta);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <RoundedBox args={[4, 2.2, 0.01]} radius={0.05} smoothness={4}>
          <meshPhysicalMaterial 
            transmission={0.98} 
            thickness={1} 
            ior={1.2} 
            transparent 
            opacity={isActive ? 0.9 : 0.1} // 非アクティブ時はほぼ消す
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[3.8, 2]} />
          <meshBasicMaterial map={texture} transparent opacity={isActive ? 1 : 0.2} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

// ============================================
// メインエクスポート
// ============================================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000208]">
      <Canvas camera={{ position: [0, 0, 20], fov: 35 }}>
        <ScrollControls pages={5} damping={0.1}>
          <ambientLight intensity={0.1} />
          <spotLight position={[0, 30, 10]} intensity={20} angle={0.3} penumbra={1} castShadow />
          
          <CrystalHelix />
          
          <SceneContent />
          
          <Environment preset="city" />
          <PostProcessing />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

function SceneContent() {
  const scroll = useScroll();
  const [active, setActive] = useState(0);

  useFrame(() => {
    const current = Math.round(scroll.offset * (SECTIONS.length - 1));
    if (current !== active) setActive(current);
  });

  return (
    <>
      {SECTIONS.map((s, i) => (
        <GlassMonitor key={s.id} index={i} {...s} isActive={i === active} scrollOffset={scroll.offset} />
      ))}
    </>
  );
}

function PostProcessing() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom intensity={1.5} luminanceThreshold={1.3} mipmapBlur />
      <ChromaticAberration offset={new THREE.Vector2(0.0015, 0.0015)} />
      <Vignette darkness={0.7} />
    </EffectComposer>
  );
}
