"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

// =============================
// ガラスモニター用データ
// =============================
const PANELS = [
  { label: "Gallery", z: 0 },
  { label: "Creator", z: -0.3 },
  { label: "Contest", z: -0.6 },
];

// =============================
// Fresnel マテリアル（白系ガラス用）
// =============================
function useFresnel(color: string) {
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
            float fres = pow(vEdge, 2.0);
            gl_FragColor = vec4(uColor * fres * 1.8, fres);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [color]
  );
}

// =============================
// ガラスモニター本体（9:16 / 画面の 70〜80%）
// =============================
function GlassMonitor({
  label,
  z,
  scrollFactor,
}: {
  label: string;
  z: number;
  scrollFactor: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const fresnel = useFresnel("#ffffff");

  // 9:16 比率（縦長）をベースにサイズ調整
  const baseHeight = 6; // 全体スケール
  const baseWidth = (9 / 16) * baseHeight;

  useFrame(() => {
    if (!groupRef.current) return;
    // 軽量パララックス：スクロールに応じてわずかに上下
    groupRef.current.position.y = scrollFactor * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, z]}>
      {/* ガラス本体 */}
      <RoundedBox
        args={[baseWidth, baseHeight, 0.12]}
        radius={0.3}
        smoothness={12}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.22}
          roughness={0.1}
          metalness={0.2}
          transmission={0.9}
          thickness={1.5}
          envMapIntensity={1.8}
        />
      </RoundedBox>

      {/* Fresnel エッジ */}
      <mesh>
        <planeGeometry args={[baseWidth + 0.25, baseHeight + 0.25]} />
        <primitive object={fresnel} />
      </mesh>

      {/* 擬似シャドウ（下に薄い影） */}
      <mesh position={[0, -baseHeight / 2 - 0.4, 0]}>
        <planeGeometry args={[baseWidth * 0.7, baseHeight * 0.12]} />
        <meshBasicMaterial
          color="black"
          transparent
          opacity={0.14}
        />
      </mesh>

      {/* アイコン（R3F 内：太めライン 2.5px 相当のシンプル形状） */}
      <group position={[-baseWidth * 0.18, 0.1, 0.08]}>
        {/* 角丸っぽい枠（Gallery などに合う汎用ラベルアイコン） */}
        <RoundedBox args={[0.9, 0.9, 0.02]} radius={0.18} smoothness={8}>
          <meshBasicMaterial
            color="#e5e7eb"
            transparent
            opacity={0.9}
            wireframe
          />
        </RoundedBox>
      </group>

      {/* テキスト */}
      <Text
        position={[0.3, 0, 0.1]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// =============================
// セクションごとの R3F ラッパー
// =============================
function GlassSection({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number];
  index: number;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // セクションごとに少しずつスクロール係数を変える
  const scrollFactor = scrollY * 0.01 * (index + 1);

  return (
    <section className="h-[120vh] flex items-center justify-center">
      <div className="w-full max-w-5xl h-[70vh]">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 32 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 8]} intensity={1.2} />
          <GlassMonitor
            label={panel.label}
            z={panel.z}
            scrollFactor={scrollFactor}
          />
        </Canvas>
      </div>
    </section>
  );
}

// =============================
// ページ全体レイアウト
// =============================
export default function SpiralBackground() {
  return (
    <main className="min-h-screen bg-[#050814] text-white">
      {/* 背景：ミストグラデーション + ノイズっぽい質感 */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_0%_80%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_100%_80%,rgba(129,140,248,0.16),transparent_55%)] opacity-90" />
      <div className="fixed inset-0 -z-10 mix-blend-soft-light bg-[url('/noise.png')]" style={{ opacity: 0.18 }} />

      {/* ヘッダー */}
      <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* ロゴアイコン + テキスト */}
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-slate-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-sm tracking-[0.25em] uppercase text-slate-300">
            Whiskers
          </span>
        </div>
        <nav className="flex gap-6 text-xs text-slate-300">
          <span>Gallery</span>
          <span>Creator</span>
          <span>Contest</span>
        </nav>
      </header>

      {/* ハローページ / Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-3xl space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
            Hello, Creator
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-slate-50">
            Glass-like vertical monitors
            <br />
            for a misty, cinematic interface.
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            9:16 white glass panels, floating in a soft midnight mist.
            Vertical scroll, minimal motion, maximum depth.
          </p>
        </div>
      </section>

      {/* ガラスモニターセクション（縦に積む / 120vh 間隔） */}
      {PANELS.map((panel, i) => (
        <GlassSection key={panel.label} panel={panel} index={i} />
      ))}

      {/* フッター */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-10 text-xs text-slate-500 flex justify-between">
        <span>© {new Date().getFullYear()} Whiskers</span>
        <span>Designed for vertical glass narratives.</span>
      </footer>
    </main>
  );
}
