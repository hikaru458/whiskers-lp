"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

interface GlassPhotoPanelProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  imagePosition?: "left" | "right";
}

// Layer 1: Front Glass with meshPhysicalMaterial
function FrontGlass({ width, height }: { width: number; height: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0, 0, 0.5]}>
      <planeGeometry args={[width, height, 32, 32]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={0.9}
        opacity={0.3}
        transparent
        roughness={0.1}
        metalness={0}
        ior={1.11}
        thickness={0.3}
        clearcoat={0.05}
        clearcoatRoughness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Layer 2: Water Ripple Mask (edges only)
function WaterRippleMask({ width, height }: { width: number; height: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
    }),
    [width, height]
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simple noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv;
      
      // Distance from center (0 at center, 1 at corners)
      float dist = length(uv - 0.5) * 2.0;
      
      // Edge mask: only affect 15-20% from edges
      float edgeMask = smoothstep(0.0, 0.3, dist) * smoothstep(1.0, 0.7, dist);
      
      // Animated noise
      float n1 = noise(uv * 8.0 + uTime * 0.15);
      float n2 = noise(uv * 16.0 - uTime * 0.1);
      float ripple = (n1 + n2 * 0.5) / 1.5;
      
      // Apply only to edges
      float intensity = ripple * edgeMask * 0.15;
      
      gl_FragColor = vec4(vec3(0.95, 0.97, 1.0), intensity);
    }
  `;

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.4]}>
      <planeGeometry args={[width, height, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Layer 3: Photo with subtle ripple
function PhotoLayer({
  imageSrc,
  width,
  height,
}: {
  imageSrc: string;
  width: number;
  height: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageSrc);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
    }),
    [texture, width, height]
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simple noise
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv;
      
      // Subtle ripple for entire photo
      float n1 = noise(uv * 6.0 + uTime * 0.12);
      float n2 = noise(uv * 12.0 - uTime * 0.08);
      vec2 ripple = vec2(n1, n2) * 0.003; // Very subtle 3-5px offset
      
      vec4 texColor = texture2D(uTexture, uv + ripple);
      
      gl_FragColor = texColor;
    }
  `;

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[width, height, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

// Combined Three.js Scene
function GlassPanelScene({ imageSrc }: { imageSrc: string }) {
  const { viewport } = useThree();
  const aspect = 4 / 5; // aspect-[4/5]
  const width = Math.min(viewport.width * 0.9, 4);
  const height = width / aspect;

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <PhotoLayer imageSrc={imageSrc} width={width} height={height} />
      <WaterRippleMask width={width} height={height} />
      <FrontGlass width={width} height={height} />
    </>
  );
}

export default function GlassPhotoPanel({
  imageSrc,
  title,
  description,
  linkText = "→ 詳細",
  linkHref = "#",
  imagePosition = "left",
}: GlassPhotoPanelProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* PC版: 横並びレイアウト - 写真とガラスパネル */}
      <div className="hidden md:grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
        {/* 写真側（Three.js水入りガラス） */}
        <div
          className={`relative aspect-[4/5] overflow-hidden ${isImageLeft ? "order-1" : "order-2"}`}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="absolute inset-0"
          >
            <GlassPanelScene imageSrc={imageSrc} />
          </Canvas>
        </div>

        {/* テキストパネル側 */}
        <div
          className={`relative flex flex-col justify-center p-8 ${isImageLeft ? "order-2" : "order-1"}`}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.30) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-white tracking-wide">
              {title}
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              {description}
            </p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-2"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>

      {/* スマホ版: 縦並び（既存のシンプル版） */}
      <div className="md:hidden rounded-2xl overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div
          className="p-6"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.30) 100%)",
            backdropFilter: "blur(15px)",
          }}
        >
          <div className="space-y-3">
            <h3 className="text-xl font-light text-white tracking-wide">
              {title}
            </h3>
            <p className="text-sm text-white leading-relaxed">{description}</p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-1"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
