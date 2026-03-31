"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { damp } from "maath/easing";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";

const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#60a5fa" },
  { id: "creator", label: "Creator", color: "#22d3ee" },
  { id: "contest", label: "Contest", color: "#a78bfa" },
  { id: "product", label: "Product", color: "#fbbf24" },
  { id: "faq", label: "FAQ", color: "#34d399" },
  { id: "contact", label: "Contact", color: "#f87171" },
];

const SPACING = 22;
const FLOW_SPEED = 60;

// =============================
// Particle Background
// =============================
function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 120;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60 - 40;
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, count, dummy]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.y = time * 0.1;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} renderOrder={10}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#bbbbff" transparent opacity={0.25} depthWrite={false} />
    </instancedMesh>
  );
}

// =============================
// Background Noise
// =============================
function BackgroundNoise() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;

        float noise(vec2 p){
          return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          float n = noise(vUv * 8.0 + uTime * 0.05);
          float gradient = smoothstep(0.0, 1.0, vUv.y);

          vec3 color = mix(
            vec3(0.02, 0.02, 0.05),
            vec3(0.05, 0.07, 0.12),
            gradient
          );

          color += n * 0.05;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      scale={[2, 2, 1]}
      position={[0, 0, -50]}
      renderOrder={0}
    >
      <planeGeometry args={[50, 50]} />
      <primitive object={material} />
    </mesh>
  );
}

// =============================
// Camera Tilt
// =============================
function CameraTilt() {
  const { camera } = useThree();

  useFrame(() => {
    camera.rotation.x = -0.42;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
  });

  return null;
}

// =============================
// Fresnel Material Helper
// =============================
function createFresnelMaterial(color: string) {
  return new THREE.ShaderMaterial({
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
        float fres = pow(vEdge, 3.0);
        gl_FragColor = vec4(uColor * fres * 1.5, fres);
      }
    `,
    transparent: true,
    depthWrite: false,
  });
}

// =============================
// Glass Monitor
// =============================
function GlassMonitor({ index, label, color, isActive, scrollOffset }: any) {
  const meshRef = useRef<THREE.Group>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 512);

    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 964, 452);

    ctx.fillStyle = "#ffffff";
    ctx.font = "lighter 100px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 40;
    ctx.fillText(label.toUpperCase(), 512, 256);

    return new THREE.CanvasTexture(canvas);
  }, [label, color]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const currentPos = scrollOffset * (SECTIONS.length - 1);
    const distance = index - currentPos;

    const targetX = index * SPACING - scrollOffset * FLOW_SPEED;
    const targetY = 0;

    const depth = Math.abs(distance);
    const targetZ = -Math.pow(depth, 1.8) * 14;

    damp(meshRef.current.position, "x", targetX, 0.15, delta);
    damp(meshRef.current.position, "y", targetY, 0.15, delta);
    damp(meshRef.current.position, "z", targetZ, 0.15, delta);

    const s = isActive ? 1.0 : 0.5;
    damp(meshRef.current.scale, "x", s, 0.2, delta);
    damp(meshRef.current.scale, "y", s, 0.2, delta);

    meshRef.current.visible = Math.abs(distance) < 3;
  });

  const currentPos = scrollOffset * (SECTIONS.length - 1);
  const distance = Math.abs(index - currentPos);
  const opacity = THREE.MathUtils.mapLinear(distance, 0, 2, 1.0, 0.05);

  const fresnelMat = useMemo(() => createFresnelMaterial(color), [color]);

  return (
    <group
      ref={meshRef}
      frustumCulled={false}
      rotation={[-0.18, 0.32, 0]}
      renderOrder={100}
    >
      <RoundedBox
        args={[9, 5, 0.15]}
        radius={0.2}
        smoothness={12}
        renderOrder={101}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1.0}
          thickness={7.0}
          ior={2.0}
          roughness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={1.0}
          transparent
          opacity={opacity}
          depthWrite={false}
          side={THREE.DoubleSide}
          attenuationColor={new THREE.Color(color)}
          attenuationDistance={0.6}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.11]} renderOrder={102}>
        <planeGeometry args={[8.4, 4.6]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={isActive ? 1 : opacity * 0.5}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <mesh renderOrder={103}>
        <planeGeometry args={[9.2, 5.2]} />
        <primitive object={fresnelMat} />
      </mesh>
    </group>
  );
}

// =============================
// Main
// =============================
export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000000]">
      <style jsx global>{`
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Canvas
        camera={{
          position: [0, 12, 28],
          fov: 35,
        }}
        gl={{ antialias: true }}
      >
        <CameraTilt />
        <ScrollControls pages={SECTIONS.length} damping={0.2}>
          <SceneContent />
          <BackgroundNoise />
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
        intensity={0.8}
        luminanceThreshold={0.92}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
      <ChromaticAberration offset={new THREE.Vector2(0.0015, 0.0015)} />
      <Vignette darkness={0.75} />
    </EffectComposer>
  );
}
