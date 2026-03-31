"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { damp, dampE } from "maath/easing";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";

const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#60a5fa", subtitle: "01" },
  { id: "creator", label: "Creator", color: "#22d3ee", subtitle: "02" },
  { id: "contest", label: "Contest", color: "#a78bfa", subtitle: "03" },
  { id: "product", label: "Product", color: "#fbbf24", subtitle: "04" },
  { id: "faq", label: "FAQ", color: "#34d399", subtitle: "05" },
  { id: "contact", label: "Contact", color: "#f87171", subtitle: "06" },
];

// =======================
// ガラスリボン螺旋
// =======================
function GlassRibbonHelix() {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const curves = useMemo(() => {
    const ribbonCount = 5;
    const pointsPerRibbon = 200;
    const turns = 2.5;
    const radius = 8;
    const heightSpan = 25;

    const cs: THREE.CatmullRomCurve3[] = [];

    for (let r = 0; r < ribbonCount; r++) {
      const points: THREE.Vector3[] = [];
      const phase = (r / ribbonCount) * Math.PI * 2;
      const ribbonRadius = radius + r * 1.5;

      for (let i = 0; i <= pointsPerRibbon; i++) {
        const t = i / pointsPerRibbon;
        const angle = t * Math.PI * 2 * turns + phase;

        const petalWave = Math.sin(t * Math.PI * 6 + phase) * 0.5;
        const x = Math.cos(angle) * (ribbonRadius + petalWave);
        const z = Math.sin(angle) * (ribbonRadius + petalWave);
        const y = (t - 0.5) * heightSpan + Math.sin(angle * 2) * 2;

        points.push(new THREE.Vector3(x, y, z));
      }
      cs.push(new THREE.CatmullRomCurve3(points));
    }

    return cs;
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const GlassShaderMaterial = {
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#ffffff") },
      uFresnelColor: { value: new THREE.Color("#60a5fa") },
      uOpacity: { value: 0.25 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform vec3 uFresnelColor;
      uniform float uOpacity;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 3.0);
        float iridescence = sin(fresnel * 10.0 + uTime * 0.5) * 0.5 + 0.5;
        vec3 rainbow = vec3(
          sin(iridescence * 6.28) * 0.5 + 0.5,
          sin(iridescence * 6.28 + 2.09) * 0.5 + 0.5,
          sin(iridescence * 6.28 + 4.18) * 0.5 + 0.5
        );
        vec3 finalColor = mix(uColor, rainbow * uFresnelColor, fresnel * 0.6);
        float alpha = mix(uOpacity, 0.85, fresnel);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  } as any;

  return (
    <group ref={meshRef}>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 150, 0.08, 16, false]} />
          <shaderMaterial
            ref={i === 0 ? materialRef : undefined}
            {...GlassShaderMaterial}
            uniforms={{
              ...GlassShaderMaterial.uniforms,
              uFresnelColor: { value: new THREE.Color(SECTIONS[i % SECTIONS.length].color) },
            }}
          />
        </mesh>
      ))}

      {/* 中心コア */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.5}
          transmission={0.9}
          thickness={2}
          roughness={0}
        />
      </mesh>

      <pointLight intensity={10} distance={35} color="#ffffff" position={[0, 0, 0]} />
      <pointLight intensity={5} distance={25} color="#60a5fa" position={[10, 10, 10]} />
      <pointLight intensity={4} distance={25} color="#c084fc" position={[-10, -10, 10]} />
    </group>
  );
}

// =======================
// 中央メインモニター
// =======================
function MainMonitor() {
  return (
    <group position={[0, 0, 8]}>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.25}>
        {/* 外枠グロー */}
        <mesh>
          <planeGeometry args={[7.2, 4.2]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* メインパネル */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[6.8, 3.8]} />
          <meshPhysicalMaterial
            color="#020617"
            metalness={0.2}
            roughness={0.2}
            transmission={0.85}
            thickness={2}
            ior={1.5}
            transparent
            opacity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* タイトル */}
        <Text
          position={[-2.4, 1.1, 0.1]}
          fontSize={0.55}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.08}
        >
          Gallery
        </Text>

        {/* サブ情報 */}
        <Text
          position={[-2.4, 0.4, 0.1]}
          fontSize={0.22}
          color="#9ca3af"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          DATA LINK RESULT ID: GAL-9999
        </Text>
        <Text
          position={[-2.4, -0.0, 0.1]}
          fontSize={0.2}
          color="#6b7280"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.04}
        >
          TC: 001:45Z   TC: 009:14:52   TC: 061:43:2
        </Text>

        {/* 右側ラベル */}
        <Text
          position={[2.6, 0.9, 0.1]}
          fontSize={0.22}
          color="#60a5fa"
          anchorX="right"
          anchorY="middle"
          letterSpacing={0.12}
        >
          ACTIVE NODE
        </Text>
      </Float>
    </group>
  );
}

// =======================
// ガラスモニター（周囲に螺旋配置）
// =======================
interface GlassMonitorProps {
  index: number;
  label: string;
  subtitle: string;
  color: string;
  scrollProgress: number;
  isActive: boolean;
}

function GlassMonitor({ index, label, subtitle, color, scrollProgress, isActive }: GlassMonitorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const spiralConfig = useMemo(
    () => ({
      radius: 13,
      heightSpan: 18,
      turns: 1.8,
      baseAngle: (index / SECTIONS.length) * Math.PI * 2,
    }),
    [index]
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const { radius, heightSpan, turns, baseAngle } = spiralConfig;

    const easedScroll = scrollProgress * scrollProgress * (3 - 2 * scrollProgress); // smoothstep
    const scrollOffset = easedScroll * turns * Math.PI * 2;
    const currentAngle = baseAngle + scrollOffset;
    const t = (index / SECTIONS.length + easedScroll * 0.6) % 1;

    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    const y = (t - 0.5) * heightSpan;

    const baseZ = z - 4; // 全体を少し奥へ
    const frontBoost = isActive ? 10 : 0;

    damp(groupRef.current.position, "x", x, 0.09, delta);
    damp(groupRef.current.position, "y", y, 0.09, delta);
    damp(groupRef.current.position, "z", baseZ + frontBoost, 0.09, delta);

    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(groupRef.current.position);
      dummy.lookAt(camera.position);
      dampE(groupRef.current.rotation, dummy.rotation, 0.08, delta);

      damp(groupRef.current.scale, "x", 1.3, 0.12, delta);
      damp(groupRef.current.scale, "y", 1.3, 0.12, delta);
      damp(groupRef.current.scale, "z", 1.3, 0.12, delta);
    } else {
      const tiltX = Math.sin(currentAngle) * 0.12;
      const tiltY = -currentAngle + Math.PI / 2;
      const tiltZ = Math.cos(currentAngle) * 0.06;

      const dummy = new THREE.Object3D();
      dummy.rotation.set(tiltX, tiltY, tiltZ);
      dampE(groupRef.current.rotation, dummy.rotation, 0.12, delta);

      damp(groupRef.current.scale, "x", 0.9, 0.12, delta);
      damp(groupRef.current.scale, "y", 0.9, 0.12, delta);
      damp(groupRef.current.scale, "z", 0.9, 0.12, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.25}>
        {/* ガラスパネル */}
        <mesh>
          <planeGeometry args={[4.2, 2.6]} />
          <meshPhysicalMaterial
            color="#020617"
            metalness={0.15}
            roughness={0.1}
            transmission={0.9}
            thickness={1.6}
            ior={1.5}
            transparent
            opacity={isActive ? 0.85 : 0.55}
            clearcoat={1}
            clearcoatRoughness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* エッジグロー */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[4.4, 2.8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isActive ? 0.6 : 0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* ラベル */}
        <Text
          position={[0, 0.35, 0.06]}
          fontSize={0.45}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {label}
        </Text>

        {/* サブ番号 */}
        <Text
          position={[0, -0.55, 0.06]}
          fontSize={0.24}
          color={color}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.18}
        >
          {subtitle}
        </Text>

        <pointLight
          color={color}
          intensity={isActive ? 3.2 : 0.7}
          distance={9}
          decay={1.4}
          position={[0, 0, -1]}
        />
      </Float>
    </group>
  );
}

// =======================
// シーン
// =======================
function SceneContent() {
  const scroll = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const zCache = useRef<number[]>(new Array(SECTIONS.length).fill(0));

  useFrame(() => {
    if (!scroll) return;
    const sp = scroll.offset;
    const eased = sp * sp * (3 - 2 * sp);

    SECTIONS.forEach((_, i) => {
      const baseAngle = (i / SECTIONS.length) * Math.PI * 2;
      const turns = 1.8;
      const scrollOffset = eased * turns * Math.PI * 2;
      const currentAngle = baseAngle + scrollOffset;
      const z = Math.sin(currentAngle) * 13 - 4;
      zCache.current[i] = z;
    });

    let maxZ = -Infinity;
    let idx = 0;
    zCache.current.forEach((z, i) => {
      if (z > maxZ) {
        maxZ = z;
        idx = i;
      }
    });
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fogExp2 attach="fog" args={["#020617", 0.03]} />

      <ambientLight intensity={0.08} />
      <spotLight
        position={[0, 20, 20]}
        intensity={18}
        angle={0.4}
        penumbra={0.6}
        decay={0.4}
        color="#ffffff"
      />
      <spotLight
        position={[18, 6, 12]}
        intensity={6}
        angle={0.5}
        penumbra={0.8}
        decay={0.5}
        color="#60a5fa"
      />
      <spotLight
        position={[-18, -6, 12]}
        intensity={5}
        angle={0.5}
        penumbra={0.8}
        decay={0.5}
        color="#c084fc"
      />

      <GlassRibbonHelix />
      <MainMonitor />

      {SECTIONS.map((s, i) => (
        <GlassMonitor
          key={s.id}
          index={i}
          label={s.label}
          subtitle={s.subtitle}
          color={s.color}
          scrollProgress={scroll?.offset || 0}
          isActive={i === activeIndex}
        />
      ))}
    </>
  );
}

// =======================
// ポストプロセス
// =======================
function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom intensity={1.7} luminanceThreshold={0.7} luminanceSmoothing={0.4} mipmapBlur />
      <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} height={480} />
      <Vignette darkness={0.7} offset={0.3} />
    </EffectComposer>
  );
}

// =======================
// メインエクスポート
// =======================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 22], fov: 30, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={4} damping={0.08}>
          <SceneContent />
          <PostProcessing />
        </ScrollControls>
      </Canvas>

      {/* 右側縦メニュー（DOM） */}
      <div className="pointer-events-none fixed right-8 top-1/2 z-10 -translate-y-1/2 text-xs tracking-[0.3em] text-slate-300 space-y-3">
        {SECTIONS.map((s) => (
          <div key={s.id} className="text-right uppercase">
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
