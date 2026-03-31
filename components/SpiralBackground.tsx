"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
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

// ============================================
// カスタムシェーダー: ガラス + Fresnel
// ============================================
const GlassShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#ffffff") },
    uFresnelColor: { value: new THREE.Color("#60a5fa") },
    uOpacity: { value: 0.3 },
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
      
      // Fresnel効果
      float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 3.0);
      
      // 虹色の干渉
      float iridescence = sin(fresnel * 10.0 + uTime * 0.5) * 0.5 + 0.5;
      vec3 rainbow = vec3(
        sin(iridescence * 6.28) * 0.5 + 0.5,
        sin(iridescence * 6.28 + 2.09) * 0.5 + 0.5,
        sin(iridescence * 6.28 + 4.18) * 0.5 + 0.5
      );
      
      vec3 finalColor = mix(uColor, rainbow * uFresnelColor, fresnel * 0.6);
      
      float alpha = mix(uOpacity, 0.8, fresnel);
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
};

// ============================================
// Glass Ribbon Helix（透明な花びらリボン）
// ============================================
function GlassRibbonHelix() {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { curves, geometry } = useMemo(() => {
    const ribbonCount = 5;
    const pointsPerRibbon = 200;
    const turns = 2.5;
    const radius = 8;
    const heightSpan = 25;

    const curves: THREE.CatmullRomCurve3[] = [];

    for (let r = 0; r < ribbonCount; r++) {
      const points: THREE.Vector3[] = [];
      const phase = (r / ribbonCount) * Math.PI * 2;
      const ribbonRadius = radius + r * 1.5;

      for (let i = 0; i <= pointsPerRibbon; i++) {
        const t = i / pointsPerRibbon;
        const angle = t * Math.PI * 2 * turns + phase;
        
        // 花びらのような波形を追加
        const petalWave = Math.sin(t * Math.PI * 6 + phase) * 0.5;
        const x = Math.cos(angle) * (ribbonRadius + petalWave);
        const z = Math.sin(angle) * (ribbonRadius + petalWave);
        const y = (t - 0.5) * heightSpan + Math.sin(angle * 2) * 2;
        
        points.push(new THREE.Vector3(x, y, z));
      }
      curves.push(new THREE.CatmullRomCurve3(points));
    }

    return { curves, geometry: null };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 150, 0.08, 12, false]} />
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
      
      {/* 中心の発光コア */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          transmission={0.8}
          thickness={2}
          roughness={0}
        />
      </mesh>
      
      <pointLight intensity={8} distance={30} color="#ffffff" position={[0, 0, 0]} />
      <pointLight intensity={4} distance={20} color="#60a5fa" position={[10, 10, 10]} />
      <pointLight intensity={3} distance={20} color="#c084fc" position={[-10, -10, 10]} />
    </group>
  );
}

// ============================================
// Glass Monitor（ガラスモニター）
// ============================================
interface GlassMonitorProps {
  index: number;
  label: string;
  subtitle: string;
  color: string;
  scrollProgress: number;
  isActive: boolean;
  zDepth: number;
}

function GlassMonitor({ index, label, subtitle, color, scrollProgress, isActive, zDepth }: GlassMonitorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // 螺旋パラメータ
  const spiralConfig = useMemo(() => ({
    radius: 14,
    heightStep: 4,
    turns: 2,
    baseAngle: (index / SECTIONS.length) * Math.PI * 2,
  }), [index]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const { radius, heightStep, turns, baseAngle } = spiralConfig;
    
    // スクロールに応じた螺旋上の位置計算
    const scrollOffset = scrollProgress * turns * Math.PI * 2;
    const currentAngle = baseAngle + scrollOffset;
    const spiralT = (index / SECTIONS.length) + scrollProgress * 0.5;
    
    // 目標位置
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius;
    const targetY = (spiralT - 0.5) * heightStep * SECTIONS.length * 0.8;

    // アクティブ時はZを手前に寄せる
    const targetZDepth = isActive ? zDepth + 8 : zDepth;

    // スムーズ補間
    damp(groupRef.current.position, "x", targetX, 0.08, delta);
    damp(groupRef.current.position, "y", targetY, 0.08, delta);
    damp(groupRef.current.position, "z", targetZ + targetZDepth, 0.08, delta);

    // 回転: アクティブ時はカメラを向く
    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(groupRef.current.position);
      dummy.lookAt(camera.position);
      dampE(groupRef.current.rotation, dummy.rotation, 0.06, delta);
      
      // アクティブ時はスケールアップ
      damp(groupRef.current.scale, "x", 1.15, 0.1, delta);
      damp(groupRef.current.scale, "y", 1.15, 0.1, delta);
      damp(groupRef.current.scale, "z", 1.15, 0.1, delta);
    } else {
      // 非アクティブ: 螺旋のカーブに沿った傾き
      const tiltX = Math.sin(currentAngle) * 0.1;
      const tiltY = -currentAngle + Math.PI / 2;
      const tiltZ = Math.cos(currentAngle) * 0.05;
      
      const dummy = new THREE.Object3D();
      dummy.rotation.set(tiltX, tiltY, tiltZ);
      dampE(groupRef.current.rotation, dummy.rotation, 0.1, delta);
      
      // 非アクティブ: スケールダウン
      damp(groupRef.current.scale, "x", 0.85, 0.1, delta);
      damp(groupRef.current.scale, "y", 0.85, 0.1, delta);
      damp(groupRef.current.scale, "z", 0.85, 0.1, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* ガラスパネル */}
        <mesh>
          <planeGeometry args={[4, 2.5]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.1}
            roughness={0.05}
            transmission={0.95}
            thickness={1.5}
            ior={1.5}
            transparent
            opacity={isActive ? 0.15 : 0.35}
            clearcoat={1}
            clearcoatRoughness={0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* エッジ発光 */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[4.1, 2.6]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isActive ? 0.6 : 0.15}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* テキストラベル */}
        <Text
          position={[0, 0.3, 0.05]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/PlayfairDisplay-Bold.ttf"
          letterSpacing={0.1}
        >
          {label}
        </Text>

        {/* サブタイトル番号 */}
        <Text
          position={[0, -0.5, 0.05]}
          fontSize={0.25}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Light.ttf"
          letterSpacing={0.2}
        >
          {subtitle}
        </Text>

        {/* ポイントライト */}
        <pointLight
          color={color}
          intensity={isActive ? 3 : 0.5}
          distance={8}
          decay={1.5}
          position={[0, 0, -1]}
        />
      </Float>
    </group>
  );
}

// ============================================
// シーンコンテンツ
// ============================================
function SceneContent() {
  const scroll = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const monitorZDepths = useRef<number[]>(new Array(SECTIONS.length).fill(0));

  // Z深度に基づいてアクティブモニターを判定
  useFrame(() => {
    if (!scroll) return;
    const scrollProgress = scroll.offset;

    // 各モニターのZ深度を計算（簡易版）
    SECTIONS.forEach((_, i) => {
      const baseAngle = (i / SECTIONS.length) * Math.PI * 2;
      const scrollOffset = scrollProgress * 2 * Math.PI * 2;
      const currentAngle = baseAngle + scrollOffset;
      
      // Z深度計算（カメラからの距離）
      const z = Math.sin(currentAngle) * 14;
      monitorZDepths.current[i] = z;
    });

    // Zが最大（カメラに最も近い）モニターをアクティブに
    let maxZ = -Infinity;
    let newActiveIndex = 0;
    monitorZDepths.current.forEach((z, i) => {
      if (z > maxZ) {
        maxZ = z;
        newActiveIndex = i;
      }
    });

    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  });

  return (
    <>
      {/* 環境 */}
      <color attach="background" args={["#000000"]} />
      <fogExp2 attach="fog" args={["#000000", 0.02]} />
      
      <ambientLight intensity={0.05} />
      
      {/* メインスポットライト */}
      <spotLight
        position={[0, 20, 20]}
        intensity={15}
        angle={0.4}
        penumbra={0.6}
        decay={0.4}
        color="#ffffff"
      />
      
      {/* リムライト */}
      <spotLight
        position={[15, 5, 10]}
        intensity={5}
        angle={0.5}
        penumbra={0.8}
        decay={0.5}
        color="#60a5fa"
      />
      
      <spotLight
        position={[-15, -5, 10]}
        intensity={4}
        angle={0.5}
        penumbra={0.8}
        decay={0.5}
        color="#c084fc"
      />

      {/* ガラスリボン螺旋 */}
      <GlassRibbonHelix />

      {/* ガラスモニター群 */}
      {SECTIONS.map((section, i) => (
        <GlassMonitor
          key={section.id}
          index={i}
          label={section.label}
          subtitle={section.subtitle}
          color={section.color}
          scrollProgress={scroll?.offset || 0}
          isActive={i === activeIndex}
          zDepth={monitorZDepths.current[i]}
        />
      ))}
    </>
  );
}

// ============================================
// ポストプロセス
// ============================================
function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.05}
        bokehScale={3}
        height={480}
      />
      <Vignette darkness={0.7} offset={0.3} />
    </EffectComposer>
  );
}

// ============================================
// メインエクスポート
// ============================================
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
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={4} damping={0.08}>
          <SceneContent />
          <PostProcessing />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
