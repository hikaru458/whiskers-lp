"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { damp } from "maath/easing";
import { useSwipeable } from "react-swipeable";

const PANELS = [
  { id: "gallery", label: "GALLERY", color: "#60a5fa", subtitle: "01" },
  { id: "creator", label: "CREATOR", color: "#22d3ee", subtitle: "02" },
  { id: "contest", label: "CONTEST", color: "#a78bfa", subtitle: "03" },
  { id: "product", label: "PRODUCT", color: "#fbbf24", subtitle: "04" },
  { id: "faq", label: "FAQ", color: "#34d399", subtitle: "05" },
  { id: "contact", label: "CONTACT", color: "#f87171", subtitle: "06" },
];

const SPACING = 8;
const PANEL_WIDTH = 6;
const PANEL_HEIGHT = 4;
const PANEL_DEPTH = 0.12;

// =============================
// Fresnel Edge Glow Material
// =============================
function useFresnelMaterial(color: string) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
        },
        vertexShader: `
          varying float vEdge;
          void main() {
            vec3 worldNormal = normalize(normalMatrix * normal);
            vec3 viewDir = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
            vEdge = 1.0 - max(dot(worldNormal, viewDir), 0.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vEdge;
          uniform vec3 uColor;
          void main() {
            float fres = pow(vEdge, 2.5) * 1.4;
            gl_FragColor = vec4(uColor * fres, fres * 0.8);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [color]
  );
}

// =============================
// Glass Panel Component
// =============================
function GlassPanel({ index, activeIndex, color, label, subtitle }: any) {
  const ref = useRef<THREE.Group>(null);
  const fresnelMat = useFresnelMaterial(color);
  const isActive = index === activeIndex;
  const offset = index - activeIndex;

  useFrame((_, delta) => {
    if (!ref.current) return;

    const targetX = offset * SPACING;
    const targetZ = isActive ? 2 : -Math.abs(offset) * 1.5;
    const targetScale = isActive ? 1.15 : 0.65;
    const targetOpacity = isActive ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.3);

    damp(ref.current.position, "x", targetX, 0.12, delta);
    damp(ref.current.position, "z", targetZ, 0.15, delta);
    damp(ref.current.scale, "x", targetScale, 0.18, delta);
    damp(ref.current.scale, "y", targetScale, 0.18, delta);
  });

  return (
    <group ref={ref}>
      {/* Main glass body - vibrant color with transparency */}
      <RoundedBox
        args={[PANEL_WIDTH, PANEL_HEIGHT, PANEL_DEPTH]}
        radius={0.2}
        smoothness={10}
      >
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.22}
          roughness={0.08}
          metalness={0.3}
          transmission={0.85}
          thickness={1.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2.5}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      {/* Strong Fresnel edge glow */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[PANEL_WIDTH + 0.15, PANEL_HEIGHT + 0.15]} />
        <primitive object={fresnelMat} />
      </mesh>

      {/* Inner border line */}
      <mesh position={[0, 0, PANEL_DEPTH / 2 + 0.01]}>
        <planeGeometry args={[PANEL_WIDTH - 0.3, PANEL_HEIGHT - 0.3]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Label text */}
      <Text
        position={[0, 0.4, PANEL_DEPTH / 2 + 0.02]}
        fontSize={0.55}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        {label}
      </Text>

      {/* Subtitle number */}
      <Text
        position={[0, -0.6, PANEL_DEPTH / 2 + 0.02]}
        fontSize={0.28}
        color={color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        {subtitle}
      </Text>
    </group>
  );
}

// =============================
// Background Gradient
// =============================
function Background() {
  return (
    <mesh position={[0, 0, -10]} scale={[30, 20, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#0a0a1a" toneMapped={false} />
    </mesh>
  );
}

// =============================
// Main Scene
// =============================
export function SpiralBackground() {
  const [active, setActive] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActive((a) => Math.min(a + 1, PANELS.length - 1)),
    onSwipedRight: () => setActive((a) => Math.max(a - 1, 0)),
    trackMouse: true,
    delta: 50,
  });

  return (
    <div
      {...handlers}
      className="fixed inset-0 z-0"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #050510 100%)",
      }}
    >
      <style jsx global>{`
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Background />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[0, 0, 8]} intensity={0.8} color="#ffffff" />

        {PANELS.map((p, i) => (
          <GlassPanel
            key={p.id}
            index={i}
            activeIndex={active}
            color={p.color}
            label={p.label}
            subtitle={p.subtitle}
          />
        ))}
      </Canvas>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {PANELS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === active ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest z-10">
        SWIPE TO EXPLORE
      </div>
    </div>
  );
}
