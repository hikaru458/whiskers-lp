"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uBeat;
  uniform vec2 uResolution;

  // ノイズ関数
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // FBM（フラクタルブラウン運動）
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // 回転関数
  vec2 rotate(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
  }

  void main() {
    vec2 uv = vUv;
    
    // ★ FBMノイズ（有機的なゆらぎ）
    float liquid = fbm(uv * 3.0 + vec2(uTime * 0.03, 0.0));
    float liquid2 = fbm(uv * 5.0 - vec2(0.0, uTime * 0.05));
    
    // ★ 光の指向性（左上が明るく、右下が暗い）
    vec2 lightDir = normalize(vec2(-1.0, -1.0));
    float light = dot(normalize(uv - 0.5), lightDir) * 0.5 + 0.5;
    light = pow(light, 0.7);
    
    // ★ カラーパレット
    // 鮮烈なビビッドレッド
    vec3 vividRed = vec3(0.95, 0.1, 0.15);
    // 深いターコイズブルー（シアン）
    vec3 turquoise = vec3(0.05, 0.75, 0.85);
    // ソフトホワイト（光が透過したような）
    vec3 softWhite = vec3(0.95, 0.95, 1.0);
    // ラベンダーパープル（中間色）
    vec3 lavender = vec3(0.7, 0.55, 0.9);
    
    // ★ カラーブレンド
    float redMask = smoothstep(0.3, 0.7, uv.y + liquid * 0.15);
    float cyanMask = 1.0 - redMask;
    
    // 対角線ベースのグラデーション - ノイズを均等に適用
    float diagonalGrad = (uv.x + (1.0 - uv.y)) * 0.5;
    // 全領域でノイズを強制的に適用（右下でもピンクにならないよう調整）
    float noiseBlend = liquid * 0.45 + 0.5; // 0.35〜0.65の範囲に正規化（3倍強化）
    diagonalGrad = mix(diagonalGrad, noiseBlend, 0.4);
    
    // メインカラーミックス
    vec3 color = mix(vividRed, turquoise, diagonalGrad);
    
    // ラベンダーアクセント（中央から左上）
    float lavenderMask = smoothstep(0.4, 0.8, 1.0 - uv.x + uv.y * 0.5);
    color = mix(color, lavender, lavenderMask * liquid * 0.3);
    
    // ソフトホワイトハイライト（左上）
    float whiteMask = smoothstep(0.8, 1.0, (1.0 - uv.x) * uv.y + liquid2 * 0.15);
    color = mix(color, softWhite, whiteMask * 0.0); // 白ハイライトを完全に消す
    
    // ★ 光の輝き（左上から）- 控えめに
    float glow = smoothstep(0.6, 0.0, length(uv - vec2(0.15, 0.85)));
    color += softWhite * glow * 0.03; // glowの白を弱くする
    
    // ★ 暗部の引き締め（コントラスト強調）
    color = pow(color, vec3(1.3));
    
    // ★ デジタルノイズ感（わずかに）
    float digitalNoise = hash(uv * 1000.0 + uTime) * 0.03;
    color += digitalNoise;
    
    // ★ 最終調整
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WhiskersBackground() {
  const { camera, viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -10]);

  // ★ 1.02倍だけ大きくする（2%拡大）
  const SAFE_WIDTH = width * 1.02;
  const SAFE_HEIGHT = height * 1.02;

  return (
    <mesh scale={[SAFE_WIDTH, SAFE_HEIGHT, 1]} position={[0, 0, -10]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={false}
      />
    </mesh>
  );
}
