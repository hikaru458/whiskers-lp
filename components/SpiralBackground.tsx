"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { damp, dampE } from "maath/easing";

// 6つのセクション定義
const SECTIONS = [
  { id: "gallery", label: "Gallery", color: "#3b82f6" },
  { id: "creator", label: "Creator", color: "#06b6d4" },
  { id: "contest", label: "Contest", color: "#8b5cf6" },
  { id: "product", label: "Product", color: "#f59e0b" },
  { id: "faq", label: "FAQ", color: "#10b981" },
  { id: "contact", label: "Contact", color: "#ef4444" },
];

// ネットワークグリッドテクスチャ生成
function createNetworkGridTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // 透明背景
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, 1024, 1024);

  // グリッドライン
  ctx.strokeStyle = "rgba(100, 149, 237, 0.3)";
  ctx.lineWidth = 1;
  
  const gridSize = 64;
  for (let i = 0; i <= 1024; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 1024);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1024, i);
    ctx.stroke();
  }

  // ノード（接続点）
  const nodes: [number, number][] = [];
  for (let x = gridSize; x < 1024; x += gridSize * 2) {
    for (let y = gridSize; y < 1024; y += gridSize * 2) {
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      const nodeX = x + offsetX;
      const nodeY = y + offsetY;
      nodes.push([nodeX, nodeY]);
      
      // ノードの描画
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100, 200, 255, 0.6)";
      ctx.fill();
    }
  }

  // ノード間の接続線
  ctx.strokeStyle = "rgba(100, 200, 255, 0.15)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1]);
      if (dist < 200 && Math.random() > 0.7) {
        ctx.beginPath();
        ctx.moveTo(nodes[i][0], nodes[i][1]);
        ctx.lineTo(nodes[j][0], nodes[j][1]);
        ctx.stroke();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// CanvasTextureでセクション名を描画（高密度データ空間版）
function createLabelTexture(text: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 600;
  const ctx = canvas.getContext("2d")!;

  // 深いアッシュグレーの背景
  ctx.fillStyle = "#050508";
  ctx.fillRect(0, 0, 1024, 600);

  // タイムコード
  const timecode = `00:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
  ctx.fillStyle = "#64748b";
  ctx.font = "16px 'Courier New', monospace";
  ctx.fillText(`TC ${timecode}`, 30, 30);

  // 座標データ
  const coords = `X:${(Math.random() * 1000).toFixed(4)} Y:${(Math.random() * 1000).toFixed(4)} Z:${(Math.random() * 1000).toFixed(4)}`;
  ctx.fillStyle = "#475569";
  ctx.font = "12px 'Courier New', monospace";
  ctx.fillText(coords, 30, 570);

  // 右上のID
  ctx.fillStyle = "#64748b";
  ctx.font = "14px 'Courier New', monospace";
  ctx.fillText(`ID:${text.toUpperCase().substring(0, 3)}-${Math.floor(Math.random() * 9999)}`, 900, 30);

  // グラデーションボーダー
  const gradient = ctx.createLinearGradient(0, 0, 1024, 600);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.5, "#ffffff");
  gradient.addColorStop(1, color);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 4;
  ctx.strokeRect(15, 15, 994, 570);

  // 内側の細いライン
  ctx.strokeStyle = `${color}40`;
  ctx.lineWidth = 1;
  ctx.strokeRect(25, 25, 974, 550);

  // メインテキスト（小さく）
  ctx.fillStyle = "#f1f5f9";
  ctx.font = "bold 36px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.fillText(text.toUpperCase(), 512, 280);
  ctx.shadowBlur = 0;

  // サブテキスト
  ctx.fillStyle = color;
  ctx.font = "18px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("SECTOR", 512, 330);

  // 装飾ライン（小さく）
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(462, 360);
  ctx.lineTo(562, 360);
  ctx.stroke();

  // 周囲の細かいデータポイント
  ctx.font = "10px 'Courier New', monospace";
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `rgba(100, 116, 139, ${0.3 + Math.random() * 0.4})`;
    const x = 50 + Math.random() * 924;
    const y = 450 + Math.random() * 100;
    ctx.fillText(`${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}`, x, y);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ブラウザスクロール位置を取得するフック
function useBrowserScroll() {
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollY(progress);
      scrollRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollRef };
}

// Bio-Cyber Floral Core コンポーネント
function BioCyberFloralCore({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const coreRef = useRef<THREE.Group>(null);
  const outerKnotRef = useRef<THREE.Mesh>(null);
  const innerKnotRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const stamensRef = useRef<THREE.Group>(null);

  // ネットワークグリッドテクスチャ
  const networkTexture = useMemo(() => createNetworkGridTexture(), []);

  useFrame((state, delta) => {
    if (!coreRef.current || !outerKnotRef.current || !innerKnotRef.current || !glowRef.current || !stamensRef.current) return;

    const scrollOffset = scrollProgress.current;
    const time = state.clock.elapsedTime;
    
    // スクロールに応じた逆方向回転
    const rotationY = scrollOffset * Math.PI * 2.5; 
    const rotationX = Math.sin(time * 0.15) * 0.15 + scrollOffset * Math.PI * 0.3;
    
    dampE(coreRef.current.rotation, new THREE.Euler(rotationX, -rotationY, 0), 0.03, delta);
    
    // 個別の回転アニメーション
    outerKnotRef.current.rotation.z += delta * 0.08;
    outerKnotRef.current.rotation.y += delta * 0.03;
    innerKnotRef.current.rotation.x += delta * 0.12;
    innerKnotRef.current.rotation.z -= delta * 0.08;
    
    // コアの脈動
    const pulse = 1 + Math.sin(time * 1.2) * 0.03;
    glowRef.current.scale.setScalar(pulse);

    // 雄しびの呼吸アニメーション
    const breathe = 1 + Math.sin(time * 0.8) * 0.1;
    stamensRef.current.scale.setScalar(breathe);
    stamensRef.current.rotation.y -= delta * 0.05;
  });

  // 雄しび（ゴールドシリンダー + マイクロチップ）の生成
  const stamens = useMemo(() => {
    const items = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.6 + Math.random() * 0.3;
      const height = 1.2 + Math.random() * 0.5;
      items.push({ angle, radius, height, delay: i * 0.2 });
    }
    return items;
  }, []);

  return (
    <group ref={coreRef}>
      {/* 外側のフロストガラスシェル - ネットワークが透けて見える */}
      <mesh ref={outerKnotRef}>
        <torusKnotGeometry args={[1.6, 0.5, 256, 48, 5, 8]} />
        <meshPhysicalMaterial
          color="#e8e8f0"
          emissive="#4f46e5"
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.1}
          transmission={1.0}
          thickness={2.0}
          ior={1.5}
          transparent
          opacity={0.9}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1.5}
          map={networkTexture}
        />
      </mesh>
      
      {/* 内側の有機的シェル */}
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <torusKnotGeometry args={[1.2, 0.3, 200, 32, 4, 6]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          metalness={0.4}
          roughness={0.15}
          transmission={0.6}
          thickness={1.5}
          transparent
          opacity={0.8}
          clearcoat={0.9}
          clearcoatRoughness={0.05}
          ior={1.4}
        />
      </mesh>
      
      {/* 最内層の発光コア */}
      <mesh ref={innerKnotRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusKnotGeometry args={[0.8, 0.2, 128, 24, 3, 4]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#22d3ee"
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.05}
          transmission={0.3}
          thickness={0.8}
          transparent
          opacity={0.95}
          clearcoat={1}
        />
      </mesh>

      {/* 中央の発光コア球体 */}
      <mesh>
        <sphereGeometry args={[0.3, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3}
          metalness={0}
          roughness={0}
        />
      </mesh>
      
      {/* コアのグロー効果 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 雄しび（ゴールドシリンダー + マイクロチップ） */}
      <group ref={stamensRef}>
        {stamens.map((stamen, i) => {
          const x = Math.cos(stamen.angle) * stamen.radius;
          const z = Math.sin(stamen.angle) * stamen.radius;
          return (
            <group key={i}>
              {/* 極細シリンダー */}
              <mesh position={[x * 0.5, 0, z * 0.5]} rotation={[Math.PI / 2 - 0.3, 0, -stamen.angle]}>
                <cylinderGeometry args={[0.015, 0.01, stamen.height, 8]} />
                <meshPhysicalMaterial
                  color="#ffd700"
                  metalness={1.0}
                  roughness={0.1}
                  emissive="#ffaa00"
                  emissiveIntensity={0.3}
                />
              </mesh>
              {/* マイクロチップ（先端のBox） */}
              <mesh position={[x, stamen.height * 0.4, z]} rotation={[0, stamen.angle, 0]}>
                <boxGeometry args={[0.06, 0.08, 0.02]} />
                <meshPhysicalMaterial
                  color="#ffd700"
                  metalness={1.0}
                  roughness={0.2}
                  emissive="#ffaa00"
                  emissiveIntensity={0.5}
                  clearcoat={1}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 強力な中央ライティング */}
      <pointLight color="#ffffff" intensity={20} distance={20} decay={0.8} position={[0, 0, 0]} />
      <pointLight color="#6366f1" intensity={12} distance={15} decay={1} position={[4, 4, 4]} />
      <pointLight color="#22d3ee" intensity={10} distance={12} decay={1.2} position={[-4, -4, 4]} />
      <pointLight color="#ffd700" intensity={8} distance={10} decay={1} position={[0, -5, 3]} />
      <pointLight color="#ec4899" intensity={6} distance={8} decay={1.2} position={[3, -3, -3]} />
      
      {/* スポットライト */}
      <spotLight
        color="#ffffff"
        intensity={8}
        distance={25}
        angle={Math.PI / 1.5}
        penumbra={0.9}
        decay={0.8}
        position={[0, 10, 10]}
        target-position={[0, 0, 0]}
      />
    </group>
  );
}

// 浮遊する3Dテキストラベル
function FloatingLabel({
  text,
  position,
  color,
  scrollProgress,
}: {
  text: string;
  position: [number, number, number];
  color: string;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!textRef.current) return;
    
    const scrollOffset = scrollProgress.current;
    const time = state.clock.elapsedTime;
    
    const floatY = Math.sin(time * 0.6 + position[0]) * 0.08;
    const floatZ = Math.cos(time * 0.5 + position[1]) * 0.04;
    
    const rotY = scrollOffset * Math.PI * 0.3;
    
    dampE(textRef.current.rotation, new THREE.Euler(0, rotY, 0), 0.04, delta);
    textRef.current.position.y = position[1] + floatY;
    textRef.current.position.z = position[2] + floatZ;
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </Text>
    </group>
  );
}

// 外科的にリファインされたモニターコンポーネント
function HelixMonitor({
  index,
  total,
  label,
  color,
  radius,
  heightStep,
  scrollProgress,
}: {
  index: number;
  total: number;
  label: string;
  color: string;
  radius: number;
  heightStep: number;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  const baseY = useMemo(() => index * heightStep - (total * heightStep) / 2, [index, total, heightStep]);
  const texture = useMemo(() => createLabelTexture(label, color), [label, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const scrollOffset = scrollProgress.current;
    const spiralRotation = scrollOffset * Math.PI * 4;
    const currentAngle = baseAngle + spiralRotation;
    
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius;
    const scrollY = scrollOffset * total * heightStep * 1.5;
    const targetY = baseY - scrollY;

    damp(meshRef.current.position, "x", targetX, 0.08, delta);
    damp(meshRef.current.position, "y", targetY, 0.08, delta);
    damp(meshRef.current.position, "z", targetZ, 0.08, delta);

    const targetLookAt = new THREE.Vector3(0, targetY, 0);
    const dummyObj = new THREE.Object3D();
    dummyObj.position.copy(meshRef.current.position);
    dummyObj.lookAt(targetLookAt);
    
    dampE(meshRef.current.rotation, dummyObj.rotation, 0.06, delta);
  });

  return (
    <group ref={meshRef}>
      {/* ワイヤーフレーム枠 */}
      <mesh>
        <boxGeometry args={[2.4, 1.5, 0.12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      
      {/* ガラスパネル - フレーム */}
      <RoundedBox args={[2.2, 1.3, 0.08]} radius={0.02} smoothness={4}>
        <meshPhysicalMaterial
          color="#020408"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
          transparent
          opacity={0.7}
          transmission={0.5}
          thickness={0.1}
          clearcoat={1}
          depthTest={true}
          depthWrite={true}
        />
      </RoundedBox>

      {/* スクリーン表面 */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[2, 1.1]} />
        <meshBasicMaterial 
          map={texture} 
          toneMapped={false} 
          transparent 
          opacity={0.95}
          depthTest={true}
          depthWrite={false}
        />
      </mesh>

      {/* エミッシブ効果 */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.1, 1.2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      {/* 背面発光 */}
      <pointLight color={color} intensity={3} distance={5} decay={2} position={[0, 0, -0.3]} />
      
      {/* コーナーマーカー */}
      {[[-1, -0.55], [1, -0.55], [-1, 0.55], [1, 0.55]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.05]}>
          <circleGeometry args={[0.03, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ノイズシェーダー（フィルムグレイン）
function NoiseOverlay() {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uNoiseIntensity: { value: 0.03 },
  }), []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uNoiseIntensity;
    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      float noise = snoise(vec3(vUv * 400.0, uTime * 0.5));
      float grain = (noise * 0.5 + 0.5) * uNoiseIntensity;
      gl_FragColor = vec4(vec3(grain), grain);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, 0.1]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        blending={THREE.OverlayBlending}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// 螺旋シーン
function HelixScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollRef } = useBrowserScroll();
  const smoothScroll = useRef(0);
  
  const radius = 6;
  const heightStep = 4;

  useFrame((state, delta) => {
    damp(smoothScroll, "current", scrollRef.current, 0.05, delta);
  });

  return (
    <>
      <color attach="background" args={["#020408"]} />
      <fogExp2 attach="fog" args={["#020408", 0.015]} />

      <ambientLight intensity={0.05} color="#334155" />
      <directionalLight position={[10, 20, 10]} intensity={0.3} color="#e2e8f0" />
      <directionalLight position={[-10, -10, -5]} intensity={0.15} color="#3b82f6" />
      
      <pointLight color="#8b5cf6" intensity={1} distance={30} position={[20, 15, -15]} />
      <pointLight color="#ec4899" intensity={1} distance={30} position={[-20, -15, -15]} />

      <BioCyberFloralCore scrollProgress={smoothScroll} />

      <FloatingLabel text="GALLERY" position={[0, 9, 0]} color="#3b82f6" scrollProgress={smoothScroll} />
      <FloatingLabel text="CREATOR" position={[0, -9, 0]} color="#06b6d4" scrollProgress={smoothScroll} />

      <group ref={groupRef}>
        {SECTIONS.map((section, index) => (
          <HelixMonitor
            key={section.id}
            index={index}
            total={SECTIONS.length}
            label={section.label}
            color={section.color}
            radius={radius}
            heightStep={heightStep}
            scrollProgress={smoothScroll}
          />
        ))}
      </group>

      <NoiseOverlay />
      <Environment preset="city" />
    </>
  );
}

export function SpiralBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 42, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <HelixScene />
      </Canvas>
    </div>
  );
}
