"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";

// 屈折するガラスのモノリス
function RefractiveMonolith() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const materialProps = useMemo(
    () => ({
      color: new THREE.Color("#8ec5fc"),
      attenuationColor: new THREE.Color("#1a1a2e"),
      transmission: 0.95,
      opacity: 1,
      roughness: 0.05,
      thickness: 3,
      ior: 1.8,
      chromaticAberration: 0.4,
      anisotropy: 0.3,
      distortion: 0.2,
      distortionScale: 0.3,
      temporalDistortion: 0.1,
      attenuationDistance: 5,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    }),
    []
  );

  return (
    <mesh ref={mesh} position={[0, 0, -2]} scale={[1.5, 2.5, 0.3]}>
      <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
      <MeshTransmissionMaterial {...materialProps} />
    </mesh>
  );
}

// リキッドクロームの球体
function LiquidChromeSphere() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.elapsedTime;
      mesh.current.position.y = Math.sin(t * 0.5) * 0.2;
      mesh.current.position.x = Math.cos(t * 0.3) * 0.1;
      mesh.current.scale.setScalar(1 + Math.sin(t) * 0.05);
    }
  });

  return (
    <mesh ref={mesh} position={[2, -1, -3]}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshPhysicalMaterial
        color="#c0c0c0"
        metalness={1}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.02}
        reflectivity={1}
        envMapIntensity={2}
      />
    </mesh>
  );
}

// 彫刻的な光の粒子
function SculpturalLight() {
  const points = useRef<THREE.Points>(null);
  const count = 100;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 4 + Math.random() * 2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // 暖かい光の色
      col[i * 3] = 0.9 + Math.random() * 0.1;
      col[i * 3 + 1] = 0.7 + Math.random() * 0.2;
      col[i * 3 + 2] = 0.4 + Math.random() * 0.2;
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ノイズテクスチャの霧
function AtmosphericFog() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]} scale={[10, 10, 1]}>
      <planeGeometry args={[5, 5, 32, 32]} />
      <meshBasicMaterial
        color="#1a1a2e"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ライトシャフト
function LightShafts() {
  return (
    <>
      <Lightformer
        form="rect"
        intensity={8}
        position={[5, 5, 5]}
        scale={[5, 5, 1]}
        color="#8ec5fc"
      />
      <Lightformer
        form="rect"
        intensity={5}
        position={[-5, 5, 5]}
        scale={[3, 3, 1]}
        color="#e0c3fc"
      />
      <Lightformer
        form="rect"
        intensity={3}
        position={[0, -5, 5]}
        scale={[4, 1, 1]}
        color="#ffecd2"
      />
    </>
  );
}

// メインのシーン
function ArtisticScene() {
  return (
    <>
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 8, 20]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <RefractiveMonolith />
      <LiquidChromeSphere />
      <SculpturalLight />
      <AtmosphericFog />
      <LightShafts />
      <Environment resolution={512}>
        <Lightformer
          form="rect"
          intensity={10}
          position={[0, 10, 0]}
          scale={[20, 1, 1]}
          color="#ffffff"
        />
      </Environment>
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />
    </>
  );
}

// メインコンポーネント
export function ArtisticBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <ArtisticScene />
      </Canvas>
      {/* ノイズオーバーレイ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
