"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, RoundedBox, Environment, Text, Stars } from "@react-three/drei";
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
const SECTION_COUNT = SECTIONS.length;

// ============================================
// Crystal Helix - Scroll連動型螺旋
// ============================================
function CrystalHelix({ scrollOffset }: { scrollOffset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 3;

  const helixCurves = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const pts = [];
      const phase = (i * Math.PI * 2) / count;
      for (let j = 0; j <= 300; j++) {
        const t = (j / 300) * Math.PI * 2 * HELIX_TURNS;
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
// Glass Monitor - Scrollに応じて螺旋上を移動
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
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // スクロール位置に基づく現在のセクション計算
    const totalSections = SECTION_COUNT;
    const rawIndex = (scrollOffset * (totalSections - 1));
    
    // 現在のセクションと次のセクションの間を補間
    const sectionIndex = Math.floor(rawIndex);
    const nextSection = sectionIndex + 1;
    const localProgress = rawIndex - sectionIndex;
    
    // モニターの位置を計算 - 螺旋状に配置
    const baseAngle = (index / totalSections) * Math.PI * 2 * 3; // 3回転
    const scrollAngle = scrollOffset * Math.PI * 2 * HELIX_TURNS;
    const currentAngle = baseAngle - scrollAngle;
    
    // 螺旋の外側に配置
    const radius = HELIX_RADIUS * 0.85;
    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    
    // Y位置はスクロールに応じて移動
    const sectionHeight = 8;
    const baseY = (index - rawIndex) * sectionHeight;
    // 無限スクロール効果
    const loopedY = ((baseY % (sectionHeight * totalSections)) + (sectionHeight * totalSections)) % (sectionHeight * totalSections) - (sectionHeight * totalSections / 2);

    damp(groupRef.current.position, "x", x, 0.08, delta);
    damp(groupRef.current.position, "y", loopedY, 0.08, delta);
    damp(groupRef.current.position, "z", z, 0.08, delta);

    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(groupRef.current.position);
      dummy.lookAt(camera.position);
      dampE(groupRef.current.rotation, dummy.rotation, 0.06, delta);
      damp(groupRef.current.position, "z", z + 4, 0.06, delta);
    } else {
      const targetRotationY = -currentAngle + Math.PI / 2;
      const dummy = new THREE.Object3D();
      dummy.rotation.set(0, targetRotationY, 0);
      dampE(groupRef.current.rotation, dummy.rotation, 0.1, delta);
    }

    damp(groupRef.current.scale, "x", isActive ? 1.2 : 0.75, 0.1, delta);
    damp(groupRef.current.scale, "y", isActive ? 1.2 : 0.75, 0.1, delta);
    damp(groupRef.current.scale, "z", isActive ? 1.2 : 0.75, 0.1, delta);
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[3.5, 2, 0.02]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial 
          color="#020617"
          transmission={0.9}
          thickness={0.5}
          ior={1.2}
          transparent
          opacity={isActive ? 0.95 : 0.4}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>
      
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.45}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        font="/fonts/Inter-Bold.woff"
      >
        {label.toUpperCase()}
      </Text>
      
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[3.6, 2.1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 0.4 : 0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {isActive && (
        <pointLight
          color={color}
          intensity={2}
          distance={8}
          position={[0, 0, -1]}
        />
      )}
    </group>
  );
}

// ============================================
// StarField - 背景の星
// ============================================
function StarField() {
  return (
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={0.5}
    />
  );
}

// ============================================
// メインエクスポート
// ============================================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000208]">
      <Canvas 
        camera={{ position: [0, 0, 22], fov: 40 }}
        dpr={[1, 1.5]}
      >
        <ScrollControls pages={SECTION_COUNT} damping={0.15}>
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
  const prevScrollRef = useRef(0);

  useFrame(() => {
    if (!scroll) return;
    
    const currentScroll = scroll.offset;
    const totalSections = SECTION_COUNT;
    
    // スクロール方向を検出
    const scrollDirection = currentScroll > prevScrollRef.current ? 1 : -1;
    prevScrollRef.current = currentScroll;
    
    // 現在のセクション計算
    const rawIndex = currentScroll * (totalSections - 1);
    const newIndex = Math.round(rawIndex);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < totalSections) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <>
      <color attach="background" args={["#000208"]} />
      <fog attach="fog" args={["#000208", 20, 60]} />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <spotLight position={[0, 20, 10]} intensity={12} angle={0.5} penumbra={0.5} color="#ffffff" />
      <spotLight position={[12, 5, 8]} intensity={4} angle={0.6} penumbra={0.8} color="#60a5fa" />
      <spotLight position={[-12, -5, 8]} intensity={3} angle={0.6} penumbra={0.8} color="#c084fc" />

      <StarField />
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
