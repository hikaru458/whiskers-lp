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
// Glass Monitor（究極の透明感 + 中心ピックアップ）
// ============================================
function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 512);
    
    // ボーダーを細く、より繊細に
    ctx.strokeStyle = color; ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 944, 432);

    ctx.fillStyle = "#fff";
    ctx.font = "lighter 80px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(label.toUpperCase(), 512, 256);
    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const t = (index / SECTIONS.length) * Math.PI * 2 * SPIRAL_TURNS + (scrollOffset * 8);
    
    // 基本の位置計算
    let targetX = Math.cos(t) * RADIUS;
    let targetZ = Math.sin(t) * RADIUS;
    // アクティブなものは中心(0)へ、それ以外は螺旋の高さへ
    let targetY = isActive ? 0 : (t / (Math.PI * 2)) * HEIGHT_STEP * 5 - 18;

    // --- チカチカ防止ロジック ---
    // Z軸が奥（正の方向）にある、またはアクティブから遠すぎる場合は非表示に近づける
    const isBehind = targetZ > 5; 
    meshRef.current.visible = !isBehind || isActive;

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

    const s = isActive ? 1.2 : 0.6;
    damp(meshRef.current.scale, "x", s, 0.1, delta);
    damp(meshRef.current.scale, "y", s, 0.1, delta);
  });

  return (
    <group ref={meshRef}>
      <Float speed={isActive ? 2 : 0} rotationIntensity={0.1} floatIntensity={0.2}>
        <RoundedBox args={[14, 8, 0.05]} radius={0.2}>
          <meshPhysicalMaterial 
            transmission={1.0} // 100%透過
            thickness={0.5} 
            ior={1.1} // 屈折を下げて「空気感」を出す
            roughness={0.02}
            transparent
            opacity={isActive ? 0.4 : 0.02} // 非アクティブはほぼ消す
            envMapIntensity={2}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[13, 7]} />
          <meshBasicMaterial map={texture} transparent opacity={isActive ? 1 : 0.05} toneMapped={false} />
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
      {/* スクロールバーを完全に消去するグローバルCSS */}
      <style jsx global>{`
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <Canvas camera={{ position: [0, 0, 28], fov: 30 }} gl={{ antialias: true }}>
        {/* ScrollControlsのstyleを空にすることで挙動を安定させる */}
        <ScrollControls pages={6} damping={0.2}>
          <ambientLight intensity={0.1} />
          
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
    // 6枚のモニターのうち、現在のスクロール位置に最も近いインデックスを計算
    const current = Math.round(scroll.offset * (SECTIONS.length - 1));
    if (current !== active) setActive(current);
  });

  return (
    <>
      {SECTIONS.map((s, i) => (
        <GlassMonitor 
          key={s.id} 
          index={i} 
          {...s} 
          isActive={i === active} 
          scrollOffset={scroll.offset} 
        />
      ))}
      {/* 螺旋リボン（前回のコードを流用し、scroll.offsetを渡す） */}
      {/* <CrystalHelix scrollOffset={scroll.offset} /> */}
    </>
  );
}

function PostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom intensity={1.2} luminanceThreshold={1.2} mipmapBlur />
      <Vignette darkness={0.8} />
    </EffectComposer>
  );
}
