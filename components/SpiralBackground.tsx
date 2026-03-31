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
// Crystal Monitor（斜めスライド・高精度クリスタル）
// ============================================
function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 512);
    
    // ガラスのエッジを強調する枠線
    ctx.strokeStyle = color; ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 964, 452);

    ctx.fillStyle = "#ffffff";
    ctx.font = "lighter 100px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    // 文字にわずかな光彩を付与
    ctx.shadowColor = color; ctx.shadowBlur = 30;
    ctx.fillText(label.toUpperCase(), 512, 256);
    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const currentPos = scrollOffset * (SECTIONS.length - 1);
    const distance = index - currentPos;

    // --- 立体的な横スライド・ロジック ---
    
    // 1. X軸：横に並べる（間隔を広めに取る）
    const targetX = distance * 18; 
    
    // 2. Y軸：垂直方向は固定（微細な揺れはFloatコンポーネントに任せる）
    const targetY = 0; 
    
    // 3. Z軸：中央（distance=0）に来るほど手前に飛び出す
    const targetZ = isActive ? 10 : -10 - Math.abs(distance) * 8;

    damp(meshRef.current.position, "x", targetX, 0.2, delta);
    damp(meshRef.current.position, "y", targetY, 0.2, delta);
    damp(meshRef.current.position, "z", targetZ, 0.2, delta);

    // 4. 回転：ここが「ダサくない」斜め演出の肝
    // 左右にいるときは中央を向くようにY軸を回転させ、わずかに前傾(X軸)させる
    const targetRotY = -distance * 0.4; 
    const targetRotX = 0.15; // 常に少し前傾させて立体感を出す

    damp(meshRef.current.rotation, "y", targetRotY, 0.15, delta);
    damp(meshRef.current.rotation, "x", targetRotX, 0.15, delta);

    // スケール：非アクティブは小さくして奥行きを強調
    const s = isActive ? 1.0 : 0.5;
    damp(meshRef.current.scale, "x", s, 0.2, delta);
    damp(meshRef.current.scale, "y", s, 0.2, delta);
    
    // 画面外のものは描画をスキップして負荷軽減
    meshRef.current.visible = Math.abs(distance) < 2.2;
  });

  return (
    <group ref={meshRef}>
      <Float speed={isActive ? 2 : 0} rotationIntensity={0.1} floatIntensity={0.4}>
        {/* 厚みと屈折を極限まで高めたクリスタルボディ */}
        <RoundedBox args={[7, 4, 0.4]} radius={0.12} smoothness={8}>
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={1.0}      // 100%透過
            thickness={3.0}         // 屈折の深さ
            ior={2.4}               // ダイヤモンド級の屈折率
            roughness={0.01}        // 鏡面仕上げ
            clearcoat={1}           // 表面光沢
            envMapIntensity={4}     // 周囲の映り込みを強く
            transparent
            opacity={isActive ? 0.98 : 0.1} // 非アクティブはゴーストのように
          />
        </RoundedBox>
        
        {/* テクスチャ（文字と枠線）をガラスのわずか手前に配置 */}
        <mesh position={[0, 0, 0.21]}>
          <planeGeometry args={[6.6, 3.6]} />
          <meshBasicMaterial 
            map={texture} 
            transparent 
            opacity={isActive ? 1 : 0.1} 
            toneMapped={false} 
          />
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
      {/* ブラウザのスクロールバーを消去 */}
      <style jsx global>{`
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <Canvas camera={{ position: [0, 0, 25], fov: 35 }} gl={{ antialias: true }}>
        <ScrollControls pages={SECTIONS.length} damping={0.25}>
          <SceneContent />
          {/* クリスタルのエッジに都会的な反射を入れる */}
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
    // スクロール位置から現在のアクティブなインデックスを特定
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
    </>
  );
}

function PostProcessing() {
  return (
    <EffectComposer multisampling={8}>
      <Bloom 
        intensity={1.5} 
        luminanceThreshold={1.2} 
        mipmapBlur 
      />
      <Vignette darkness={0.8} />
    </EffectComposer>
  );
}
