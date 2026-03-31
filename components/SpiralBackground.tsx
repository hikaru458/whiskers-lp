"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { damp } from "maath/easing";
import { useSwipeable } from "react-swipeable";

// =============================
// パネルデータ
// =============================
const PANELS = [
  { label: "Gallery", color: "#60a5fa" },
  { label: "Creator", color: "#22d3ee" },
  { label: "Contest", color: "#a78bfa" },
  { label: "Product", color: "#fbbf24" },
  { label: "FAQ", color: "#34d399" },
  { label: "Contact", color: "#f87171" },
];

// =============================
// レスポンシブ設定 + スマホ判定
// =============================
function useResponsiveSettings() {
  const [settings, setSettings] = useState({
    panelWidth: 6,
    panelHeight: 4,
    spacing: 8,
    cameraZ: 12,
    labelSize: 0.5,
    isMobile: false,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 640) {
        // スマホ（縦長パネル）
        setSettings({
          panelWidth: 2.6,
          panelHeight: 4.2,
          spacing: 4.2,
          cameraZ: 12,
          labelSize: 0.32,
          isMobile: true,
        });
      } else if (w < 1024) {
        // タブレット
        setSettings({
          panelWidth: 5,
          panelHeight: 3.2,
          spacing: 6.5,
          cameraZ: 10,
          labelSize: 0.45,
          isMobile: false,
        });
      } else {
        // PC
        setSettings({
          panelWidth: 6,
          panelHeight: 4,
          spacing: 8,
          cameraZ: 12,
          labelSize: 0.5,
          isMobile: false,
        });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return settings;
}

// =============================
// Fresnel Material
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
            float fres = pow(vEdge, 2.5);
            gl_FragColor = vec4(uColor * fres * 1.4, fres);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [color]
  );
}

// =============================
// Glass Panel
// =============================
function GlassPanel({ index, activeIndex, offset, color, label, settings }: any) {
  const ref = useRef<THREE.Group>(null);
  const fresnel = useFresnel(color);

  useFrame((_, delta) => {
    if (!ref.current) return;

    const targetX = (index - activeIndex) * settings.spacing + offset;
    const targetScale = index === activeIndex ? 1.2 : 0.7;

    damp(ref.current.position, "x", targetX, 0.15, delta);
    damp(ref.current.scale, "x", targetScale, 0.2, delta);
    damp(ref.current.scale, "y", targetScale, 0.2, delta);

    // スマホではパネルを縦向きに回転
    if (settings.isMobile) {
      ref.current.rotation.z = Math.PI / 2;
    } else {
      ref.current.rotation.z = 0;
    }
  });

  return (
    <group ref={ref}>
      <RoundedBox
        args={[settings.panelWidth, settings.panelHeight, 0.12]}
        radius={0.2}
        smoothness={10}
      >
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.2}
          transmission={0.9}
          thickness={1.5}
          envMapIntensity={2.0}
        />
      </RoundedBox>

      <mesh>
        <planeGeometry
          args={[settings.panelWidth + 0.2, settings.panelHeight + 0.2]}
        />
        <primitive object={fresnel} />
      </mesh>

      <Text
        position={[0, 0, 0.2]}
        fontSize={settings.labelSize}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, settings.isMobile ? -Math.PI / 2 : 0]}
      >
        {label}
      </Text>
    </group>
  );
}

// =============================
// Main Scene
// =============================
export function SpiralBackground() {
  const [active, setActive] = useState(0);
  const settings = useResponsiveSettings();

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(-active * settings.spacing);
  }, [active, settings.spacing]);

  // PC：ホイール + ドラッグ
  useEffect(() => {
    let isDragging = false;
    let lastX = 0;

    const handleWheel = (e: WheelEvent) => {
      setOffset((o) => o - e.deltaY * 0.01);
    };

    const handleDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
    };

    const handleMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - lastX;
      lastX = e.clientX;
      setOffset((o) => o + delta * 0.02);
    };

    const handleUp = () => {
      isDragging = false;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  // スマホ：横スワイプのみ
  const handlers = useSwipeable({
    onSwipedLeft: () => setActive((a) => Math.min(a + 1, PANELS.length - 1)),
    onSwipedRight: () => setActive((a) => Math.max(a - 1, 0)),
    trackMouse: false,
  });

  return (
    <div {...handlers} className="fixed inset-0 bg-black">
      <Canvas camera={{ position: [0, 0, settings.cameraZ], fov: 32 }}>
        {PANELS.map((p, i) => (
          <GlassPanel
            key={i}
            index={i}
            activeIndex={active}
            offset={offset}
            color={p.color}
            label={p.label}
            settings={settings}
          />
        ))}
      </Canvas>
    </div>
  );
}
