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

const RADIUS = 16;
const HEIGHT_STEP = 5.0; 
const SPIRAL_TURNS = 1.2;

// ============================================
// Crystal Helix Core（背景の光の糸）
// ============================================
function CrystalHelix({ scrollOffset }: { scrollOffset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 2;
  const points = 1000;
  
  const helixCurves = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const pts = [];
      const phase = (i * Math.PI);
      for (let j = 0; j <= points; j++) {
        const t = (j / points) * Math.PI * 2 * SPIRAL_TURNS;
        const x = Math.cos(t + phase) * (RADIUS * 0.6);
        const y = (t / (Math.PI * 2)) * HEIGHT_STEP * 4 - 15;
        const z = Math.sin(t + phase) * (RADIUS * 0.6);
        pts.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(pts);
    });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      damp(groupRef.current.rotation, "y", scrollOffset * Math.PI * 2, 0.05, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {helixCurves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 800, 0.01, 8, false]} />
          <meshPhysicalMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// Crystal Monitor（クリスタル質感 + センター吸着）
// ============================================
function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 512);
    ctx.strokeStyle = color; ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 984, 472);
    ctx.fillStyle = "#fff";
    ctx.font = "lighter 100px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.shadowColor = color; ctx.shadowBlur = 30;
    ctx.fillText(label.toUpperCase(), 512, 256);
    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // パネルごとの基準位置（t）を計算
    const sectionRatio = index / (SECTIONS.length - 1);
    const t = (sectionRatio * Math.PI * 2 * SPIRAL_TURNS) + (scrollOffset * 8);

    // X, Z は螺旋軌道
    const targetX = Math.cos(t) * RADIUS;
    const targetZ = Math.sin(t) * RADIUS;
    
    // Y の修正：自分の番（scroll.offset）が来たら強制的に 0（中央）へ
    const currentScrollPos = scrollOffset * (SECTIONS.length - 1);
    const distanceFromActive = Math.abs(currentScrollPos - index);
    const spiralY = (t / (Math.PI * 2)) * HEIGHT_STEP * 5 - 18;
    
    // アクティブなほど中央(0)に吸い寄せられるロジック
    const influence = Math.max(0, 1 - distanceFromActive); 
    const targetY = THREE.MathUtils.lerp(spiralY, 0, influence);

    // チカチカ防止（真後ろにいる時は消す）
    meshRef.current.visible = targetZ < 10;

    damp(meshRef.current.position, "x", targetX, 0.15, delta);
    damp(meshRef.current.position, "y", targetY, 0.15, delta);
    damp(meshRef.current.position, "z", targetZ, 0.15, delta);

    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(meshRef.current.position);
      dummy.lookAt(camera.position);
      dampE(meshRef.current.rotation, dummy.rotation, 0.1, delta);
    } else {
      meshRef.current.rotation.y = -t + Math.PI / 2;
    }

    damp(meshRef.current.scale, "x", isActive ? 1.0 : 0.5, 0.1, delta);
    damp(meshRef.current.scale, "y", isActive ? 1.0 : 0.5, 0.1, delta);
  });

  return (
    <group ref={meshRef}>
      <Float speed={isActive ? 2 : 0} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* 厚み(0.2)を持たせてクリスタル感を出す */}
        <RoundedBox args={[5, 3, 0.2]} radius={0.05} smoothness={4}>
          <meshPhysicalMaterial 
            transmission={1.0} 
            thickness={2.0} // 屈折の深さ
            ior={2.4}       // ダイヤモンドに近い屈折率
            roughness={0.01}
            clearcoat={1}
            transparent
            opacity={isActive ? 0.9 : 0.1}
            envMapIntensity={3} // 映り込みを強く
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[4.8, 2.8]} />
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
    <div className="fixed inset-0 z-0 bg-[#000000]">
      <style jsx global>{`
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <Canvas camera={{ position: [0, 0, 28], fov: 30 }}>
        <ScrollControls pages={6} damping={0.2}>
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
      <CrystalHelix scrollOffset={scroll.offset} />
    </>
  );
}

function PostProcessing() {
  return (
    <EffectComposer multisampling={8}>
      <Bloom intensity={1.5} luminanceThreshold={1.2} mipmapBlur />
      <Vignette darkness={0.8} />
    </EffectComposer>
  );
}
