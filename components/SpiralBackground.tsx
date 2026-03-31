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

const SPACING = 20;
const FLOW_SPEED = 50;

// ============================================
// Particle Background (Active Theory style)
// ============================================
function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 200;

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
    }
    return { positions };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.y = time * 0.1;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
    </instancedMesh>
  );
}

// ============================================
// Camera Tilt (Active Theory angle)
// ============================================
function CameraTilt() {
  const { camera } = useThree();

  useFrame(() => {
    camera.rotation.x = -0.42;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
  });

  return null;
}
// ============================================
function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 512);
    
    // Glass edge border
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 964, 452);

    // Text with glow
    ctx.fillStyle = "#ffffff";
    ctx.font = "lighter 100px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 40;
    ctx.fillText(label.toUpperCase(), 512, 256);
    
    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Current position based on scroll
    const currentPos = scrollOffset * (SECTIONS.length - 1);
    const distance = index - currentPos;

    // 1. Horizontal movement (Active Theory style)
    const targetX = index * SPACING - scrollOffset * FLOW_SPEED;
    
    // 2. Fixed Y position
    const targetY = 0;
    
    // 3. Non-linear Z depth
    const depth = Math.abs(distance);
    const targetZ = -Math.pow(depth, 1.6) * 12;

    // Apply positions with damping
    damp(meshRef.current.position, "x", targetX, 0.15, delta);
    damp(meshRef.current.position, "y", targetY, 0.15, delta);
    damp(meshRef.current.position, "z", targetZ, 0.15, delta);

    // 4. Rotation: look at camera + forward tilt
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
      meshRef.current.rotation.x += 0.2; // Forward tilt for Active Theory style
    }

    // 5. Scale based on distance
    const s = isActive ? 1.0 : 0.5;
    damp(meshRef.current.scale, "x", s, 0.2, delta);
    damp(meshRef.current.scale, "y", s, 0.2, delta);

    // 6. Visibility culling
    meshRef.current.visible = Math.abs(distance) < 3;
  });

  // Calculate opacity based on distance
  const currentPos = scrollOffset * (SECTIONS.length - 1);
  const distance = Math.abs(index - currentPos);
  const opacity = THREE.MathUtils.mapLinear(distance, 0, 2, 1.0, 0.05);

  return (
    <group ref={meshRef}>
      <Float speed={isActive ? 1.5 : 0} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Crystal body with high refraction */}
        <RoundedBox args={[6.5, 3.8, 0.4]} radius={0.15} smoothness={8}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={1.0}
            thickness={5.0}
            ior={2.1}
            roughness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={6}
            transparent
            opacity={opacity}
            attenuationColor={new THREE.Color(color)}
            attenuationDistance={0.8}
          />
        </RoundedBox>
        
        {/* Fresnel edge glow - Vision Pro style */}
        <mesh>
          <planeGeometry args={[6.7, 4.0]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isActive ? 0.15 : 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Label slightly in front */}
        <mesh position={[0, 0, 0.21]}>
          <planeGeometry args={[6.1, 3.4]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={isActive ? 1 : opacity * 0.5}
            toneMapped={false}
          />
        </mesh>
      </Float>
    </group>
  );
}

// ============================================
// Main Component (Active Theory Camera Style)
// ============================================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000000]">
      {/* Hide scrollbar */}
      <style jsx global>{`
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <Canvas 
        camera={{ 
          position: [0, 12, 28], 
          fov: 35
        }} 
        gl={{ antialias: true }}
      >
        <CameraTilt />
        <ScrollControls pages={SECTIONS.length} damping={0.2}>
          <SceneContent />
          <Particles />
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
        intensity={1.4} 
        luminanceThreshold={0.85}
        luminanceSmoothing={0.2}
        mipmapBlur 
      />
      <ChromaticAberration offset={new THREE.Vector2(0.0015, 0.0015)} />
      <Vignette darkness={0.75} />
    </EffectComposer>
  );
}
