"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, RoundedBox, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { damp, dampE } from "maath/easing";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#60a5fa" },
  { id: "creator", label: "Creator", color: "#22d3ee" },
  { id: "contest", label: "Contest", color: "#a78bfa" },
  { id: "product", label: "Product", color: "#fbbf24" },
  { id: "faq", label: "FAQ", color: "#34d399" },
  { id: "contact", label: "Contact", color: "#f87171" },
];

// ============================================
// Crystal Monitor（螺旋廃止・高精度クリスタル）
// ============================================
function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 512);
    ctx.strokeStyle = color; ctx.lineWidth = 15;
    ctx.strokeRect(40, 40, 944, 432);
    ctx.fillStyle = "#ffffff";
    ctx.font = "lighter 100px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.shadowColor = color; ctx.shadowBlur = 40;
    ctx.fillText(label.toUpperCase(), 512, 256);
    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // 現在のスクロール位置に基づくインデックスの小数値
    const currentPos = scrollOffset * (SECTIONS.length - 1);
    const distance = index - currentPos;

    // 配置ロジック：中央に近づくほど大きく、正面に
    // y軸は垂直に並べる（螺旋をやめてシンプルに）
    const targetY = -distance * 12; 
    const targetZ = isActive ? 0 : -10 - Math.abs(distance) * 5; // 非アクティブは奥へ
    const targetX = distance * 2; // わずかに斜めに並べて奥行きを出す

    damp(meshRef.current.position, "x", targetX, 0.15, delta);
    damp(meshRef.current.position, "y", targetY, 0.15, delta);
    damp(meshRef.current.position, "z", targetZ, 0.15, delta);

    // 回転：アクティブなら正面、それ以外は少し傾ける
    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(meshRef.current.position);
      dummy.lookAt(camera.position);
      dampE(meshRef.current.rotation, dummy.rotation, 0.1, delta);
    } else {
      damp(meshRef.current.rotation, "y", distance * 0.5, 0.1, delta);
    }

    const s = isActive ? 1.2 : 0.6;
    damp(meshRef.current.scale, "x", s, 0.1, delta);
    damp(meshRef.current.scale, "y", s, 0.1, delta);
  });

  return (
    <group ref={meshRef}>
      <Float speed={isActive ? 1.5 : 0} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* 厚みと屈折を最大化したクリスタルボディ */}
        <RoundedBox args={[6, 3.5, 0.5]} radius={0.15} smoothness={8}>
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={1.0}
            thickness={3.0}
            ior={2.4} 
            roughness={0.02}
            clearcoat={1}
            envMapIntensity={5} // 螺旋がない分、環境の映り込みを強くして質感を出す
            transparent
            opacity={isActive ? 1 : 0.2}
            attenuationColor={color}
            attenuationDistance={2}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.26]}>
          <planeGeometry args={[5.6, 3.1]} />
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
      
      <Canvas camera={{ position: [0, 0, 25], fov: 35 }}>
        <ScrollControls pages={6} damping={0.2}>
          <SceneContent />
          {/* presetを"city"にすることで、クリスタルのエッジに綺麗なビル群の光が映り込みます */}
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
    <EffectComposer multisampling={4}>
      <Bloom intensity={1.2} luminanceThreshold={1.1} mipmapBlur />
      <Vignette darkness={0.7} />
    </EffectComposer>
  );
}
