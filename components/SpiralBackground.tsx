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

function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 512);
    // 枠線をより繊細に
    ctx.strokeStyle = color; ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 964, 452);
    ctx.fillStyle = "#ffffff";
    ctx.font = "lighter 90px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(label.toUpperCase(), 512, 256);
    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const currentPos = scrollOffset * (SECTIONS.length - 1);
    const distance = index - currentPos;

    // --- ギャラリー配置ロジック ---
    // 1. Y軸：アクティブは0、それ以外は距離に応じて上下へ大きく配置
    const targetY = -distance * 18; 
    
    // 2. Z軸：アクティブは手前(5)、非アクティブは奥(-20)へ。
    // これにより重なり（チカチカ）が物理的に発生しなくなります。
    const targetZ = isActive ? 5 : -20;

    damp(meshRef.current.position, "y", targetY, 0.2, delta);
    damp(meshRef.current.position, "z", targetZ, 0.3, delta);

    // 回転：アクティブな時だけカメラに正対
    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.set(0, 0, 20); // カメラ位置を想定
      dummy.lookAt(0, 0, 0);
      dampE(meshRef.current.rotation, [0, 0, 0], 0.1, delta);
    } else {
      // 非アクティブは少し傾けて「並んでいる感」を出す
      damp(meshRef.current.rotation, "x", distance * 0.2, 0.1, delta);
    }

    // スケール
    const s = isActive ? 1.0 : 0.5;
    damp(meshRef.current.scale, "x", s, 0.2, delta);
    damp(meshRef.current.scale, "y", s, 0.2, delta);
    
    // 完全に画面外なら非表示
    meshRef.current.visible = Math.abs(distance) < 1.5;
  });

  return (
    <group ref={meshRef}>
      <Float speed={isActive ? 1.5 : 0} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* 透明度と屈折を活かしたクリスタルボディ */}
        <RoundedBox args={[7, 4, 0.3]} radius={0.1}>
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={1.0}
            thickness={2.0}
            ior={1.8} 
            roughness={0.01}
            envMapIntensity={2.5}
            transparent
            opacity={isActive ? 0.95 : 0.0} // 非アクティブは描画しない（チカチカ対策）
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[6.6, 3.6]} />
          <meshBasicMaterial map={texture} transparent opacity={isActive ? 1 : 0} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000000]">
      <style jsx global>{`
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* ユーザー向けの視覚的ナビゲーション */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
        {SECTIONS.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
        ))}
      </div>

      <Canvas camera={{ position: [0, 0, 20], fov: 35 }}>
        <ScrollControls pages={SECTIONS.length} damping={0.2}>
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
    <EffectComposer multisampling={4}>
      <Bloom intensity={1.5} luminanceThreshold={1.2} mipmapBlur />
      <Vignette darkness={0.8} />
    </EffectComposer>
  );
}
