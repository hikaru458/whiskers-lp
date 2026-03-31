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

// --- 黄金比に基づいた空間設計 ---
const RADIUS = 16;       // 螺旋の半径（大きく広げて余白を作る）
const HEIGHT_STEP = 4.5;  // 垂直の間隔（ゆったりとした昇降）
const SPIRAL_TURNS = 1.4; // 回転数を落として「線」を強調

// ============================================
// Crystal Helix Core（繊細な光の繊維）
// ============================================
function CrystalHelix() {
  const count = 2; // 本数を絞り、重なりを上品にする
  const points = 1000;
  
  const helixCurves = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const pts = [];
      const phase = (i * Math.PI); // 180度対角に配置
      const rOffset = i * 2;       // 各線の半径をわずかに変えて奥行きを出す
      
      for (let j = 0; j <= points; j++) {
        const t = (j / points) * Math.PI * 2 * SPIRAL_TURNS;
        const x = Math.cos(t + phase) * (RADIUS * 0.5 + rOffset);
        const y = (t / (Math.PI * 2)) * HEIGHT_STEP * 4 - 15;
        const z = Math.sin(t + phase) * (RADIUS * 0.5 + rOffset);
        pts.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(pts);
    });
  }, []);

  return (
    <group>
      {helixCurves.map((curve, i) => (
        <mesh key={i}>
          {/* 極細の 0.005 で「光の糸」を再現 */}
          <tubeGeometry args={[curve, 800, 0.005, 12, false]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={1.0}
            ior={1.8}
            thickness={0.5}
            roughness={0.05}
            iridescence={1.0}        // 虹色の干渉を最大化
            iridescenceIOR={1.9}
            emissive="#ffffff"
            emissiveIntensity={0.5}  // 自発光を強めて鋭い光に
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// Glass Monitor（フローティング・パネル）
// ============================================
function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 512); // 完全透明背景
    
    // 鋭いネオンボーダー
    ctx.strokeStyle = color; ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, 944, 432);

    ctx.fillStyle = "#fff";
    ctx.font = "lighter 90px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.shadowColor = color; ctx.shadowBlur = 20;
    ctx.fillText(label.toUpperCase(), 512, 256);
    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // スクロールに同期した螺旋移動
    const t = (index / SECTIONS.length) * Math.PI * 2 * SPIRAL_TURNS + (scrollOffset * 8);
    const targetX = Math.cos(t) * RADIUS;
    const targetZ = Math.sin(t) * RADIUS;
    const targetY = (t / (Math.PI * 2)) * HEIGHT_STEP * 5 - 18;

    damp(meshRef.current.position, "x", targetX, 0.1, delta);
    damp(meshRef.current.position, "y", targetY, 0.1, delta);
    damp(meshRef.current.position, "z", targetZ, 0.1, delta);

    if (isActive) {
      // 常にカメラを向く（正対）
      const dummy = new THREE.Object3D();
      dummy.position.copy(meshRef.current.position);
      dummy.lookAt(camera.position);
      dampE(meshRef.current.rotation, dummy.rotation, 0.05, delta);
      damp(meshRef.current.scale, "x", 1.1, 0.1, delta);
    } else {
      meshRef.current.rotation.y = -t + Math.PI / 2;
      damp(meshRef.current.scale, "x", 0.6, 0.1, delta);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <RoundedBox args={[4.5, 2.5, 0.005]} radius={0.02}>
          <meshPhysicalMaterial 
            transmission={0.99} 
            thickness={0.5} 
            ior={1.1} 
            transparent 
            opacity={isActive ? 0.8 : 0.05} // 非アクティブはほぼ消す
            roughness={0}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[4.3, 2.3]} />
          <meshBasicMaterial map={texture} transparent opacity={isActive ? 1 : 0.1} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

// ============================================
// メインコンポーネント
// ============================================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000000]"> {/* 完全な黒背景 */}
      <Canvas camera={{ position: [0, 0, 28], fov: 30 }}>
        <ScrollControls pages={6} damping={0.15}>
          <ambientLight intensity={0.05} />
          <pointLight position={[10, 10, 10]} intensity={15} color="#fff" />
          
          <CrystalHelix />
          <SceneContent />
          
          <Environment preset="night" />
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
    <EffectComposer>
      {/* 鋭いハイライトだけを光らせる調整 */}
      <Bloom intensity={2.0} luminanceThreshold={1.4} mipmapBlur />
      <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
      <Vignette darkness={0.8} />
    </EffectComposer>
  );
}
