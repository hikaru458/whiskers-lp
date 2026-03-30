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

// 中央の大きな屈折ガラスモノリス
function CentralMonolith() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  const materialProps = useMemo(
    () => ({
      color: new THREE.Color("#60a5fa"),
      attenuationColor: new THREE.Color("#1e40af"),
      transmission: 0.9,
      opacity: 1,
      roughness: 0.02,
      thickness: 2,
      ior: 1.5,
      chromaticAberration: 0.3,
      anisotropy: 0.2,
      distortion: 0.2,
      distortionScale: 0.3,
      temporalDistortion: 0.1,
      attenuationDistance: 3,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      emissive: new THREE.Color("#3b82f6"),
      emissiveIntensity: 0.2,
    }),
    []
  );

  return (
    <mesh ref={mesh} position={[0, 0, -2]} scale={[3, 4, 0.6]}>
      <boxGeometry args={[1, 1, 1, 16, 16, 16]} />
      <MeshTransmissionMaterial {...materialProps} />
    </mesh>
  );
}

// 周囲を浮遊するリキッドクローム球体 - 複数配置
function FloatingChromeSpheres() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const spheres = [
    { pos: [3, 1, -2], size: 0.6, speed: 0.3 },
    { pos: [-2.5, -0.5, -4], size: 0.4, speed: 0.5 },
    { pos: [1.5, -2, -5], size: 0.5, speed: 0.4 },
    { pos: [-3, 2, -3], size: 0.3, speed: 0.6 },
  ];

  return (
    <group ref={group}>
      {spheres.map((s, i) => (
        <FloatingSphere key={i} {...s} />
      ))}
    </group>
  );
}

function FloatingSphere({ pos, size, speed }: { pos: number[]; size: number; speed: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.elapsedTime * speed;
      mesh.current.position.y = pos[1] + Math.sin(t) * 0.3;
      mesh.current.position.x = pos[0] + Math.cos(t * 0.7) * 0.2;
      mesh.current.rotation.x = t * 0.5;
      mesh.current.rotation.y = t * 0.3;
    }
  });

  return (
    <mesh ref={mesh} position={pos as [number, number, number]}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial
        color="#06b6d4"
        metalness={0.9}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        emissive="#0891b2"
        emissiveIntensity={0.2}
        envMapIntensity={1.5}
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

// パーティクルフィールド - 多数の小さな光
function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 150;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 4;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      siz[i] = Math.random() * 0.05 + 0.01;
    }

    return [pos, siz];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
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
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        uniforms={{
          color1: { value: new THREE.Color("#3b82f6") },
          color2: { value: new THREE.Color("#06b6d4") },
        }}
        vertexShader={`
          attribute float size;
          varying float vSize;
          void main() {
            vSize = size;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 300.0 / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color1;
          uniform vec3 color2;
          varying float vSize;
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5));
            if (r > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.5, r);
            vec3 color = mix(color1, color2, vSize * 20.0);
            gl_FragColor = vec4(color, alpha * 0.8);
          }
        `}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ダイナミックライティング
function DynamicLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (light1.current) {
      light1.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 4;
      light1.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 4 + 2;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(state.clock.elapsedTime * 0.2) * 3;
      light2.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 3;
    }
  });

  return (
    <>
      <pointLight ref={light1} color="#3b82f6" intensity={2} distance={10} />
      <pointLight ref={light2} color="#06b6d4" intensity={1.5} distance={8} />
      <ambientLight intensity={0.1} />
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
      <CentralMonolith />
      <FloatingChromeSpheres />
      <ParticleField />
      <DynamicLights />
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
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <ArtisticScene />
      </Canvas>
      {/* ノイズオーバーレイ - より強めに */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* グラデントオーバーレイ - 深みを追加 */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0f172a]/30 via-transparent to-[#0f172a]/50" />
    </div>
  );
}
