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
    
    // ★ 対角線の動き（左下→右上）
    vec2 diagonal = rotate(uv - 0.5, 0.785); // 45度回転
    
    // ★ モーションブラー効果
    float blur = sin(diagonal.x * 8.0 + uTime * 0.5) * 0.5 + 0.5;
    blur = pow(blur, 2.0);
    
    // ★ 自己完結型の鼓動（2〜3秒周期でゆったり「呼吸」）
    float autoBeat = sin(uTime * 0.5) * 0.5 + 0.5;
    float beatPulse = 1.0 + autoBeat * 0.1; // 変化幅を抑える（1.1倍程度）
    
    // ★ 液体が混ざり合うようなFBMノイズ（環境音レベルの動き）
    float liquid = fbm(uv * 3.0 * beatPulse + vec2(uTime * 0.03, 0.0));
    float liquid2 = fbm(uv * 5.0 * beatPulse - vec2(0.0, uTime * 0.05));
    
    // ★ 光の指向性（左上が明るく、右下が暗い）
    vec2 lightDir = normalize(vec2(-1.0, -1.0));
    float light = dot(normalize(uv - 0.5), lightDir) * 0.5 + 0.5;
    light = pow(light, 0.7);
    
    // ★ カラーパレット（スマホ壁紙の忠実再現）
    // 鮮烈なビビッドレッド
    vec3 vividRed = vec3(0.95, 0.1, 0.15);
    // マゼンタ
    vec3 magenta = vec3(0.95, 0.25, 0.55);
    // パープル
    vec3 purple = vec3(0.50, 0.25, 0.95);
    // 深い青
    vec3 deepBlue = vec3(0.10, 0.25, 0.95);
    // ソフトホワイト（光が透過したような）
    vec3 softWhite = vec3(0.95, 0.95, 1.0);
    
    // ★ カラーブレンド（赤→マゼンタ→紫→青）
    float grad = (uv.x + (1.0 - uv.y)) * 0.5;
    grad += liquid * 0.2;
    
    vec3 color;
    if (grad < 0.33) {
      color = mix(vividRed, magenta, grad / 0.33);
    } else if (grad < 0.66) {
      color = mix(magenta, purple, (grad - 0.33) / 0.33);
    } else {
      color = mix(purple, deepBlue, (grad - 1.0) / 0.34);
    }
    
    // ソフトホワイトハイライト（左上）
    float whiteMask = smoothstep(0.8, 1.0, (1.0 - uv.x) * uv.y + liquid2 * 0.3);
    color = mix(color, softWhite, whiteMask * 0.5);
    
    // ★ モーションブラー効果を追加
    float motionBlur = sin(uv.x * 20.0 + uTime * 2.0) * 0.5 + 0.5;
    motionBlur *= sin(uv.y * 15.0 - uTime * 1.5) * 0.5 + 0.5;
    color += liquid * 0.15;
    
    // ★ 光の輝き（左上から）- 控えめに
    float glow = smoothstep(0.6, 0.0, length(uv - vec2(0.15, 0.85)));
    color += softWhite * glow * 0.15;
    
    // ★ 暗部の引き締め（コントラスト強調）
    color = pow(color, vec3(1.3));
    
    // ★ 色収差（RGB Shift）- 「デジタルな空気感」として常時微細な揺らぎ
    float rgbShift = 0.003 + sin(uTime * 0.2) * 0.002; // 固定〜ゆっくり変化
    vec2 shiftDir = normalize(vec2(1.0, -0.5)); // 斜め方向にシフト
    
    // 赤チャンネルを少しずらす
    float redCyanGrad = ((uv + shiftDir * rgbShift).x + (1.0 - (uv + shiftDir * rgbShift).y)) * 0.5;
    redCyanGrad += liquid * 0.2;
    vec3 colorR;
    if (redCyanGrad < 0.33) {
      colorR = mix(vividRed, magenta, redCyanGrad / 0.33);
    } else if (redCyanGrad < 0.66) {
      colorR = mix(magenta, purple, (redCyanGrad - 0.33) / 0.33);
    } else {
      colorR = mix(purple, deepBlue, (redCyanGrad - 0.33) / 0.34);
    }
    
    // 青チャンネルを逆方向にずらす
    float blueCyanGrad = ((uv - shiftDir * rgbShift).x + (1.0 - (uv - shiftDir * rgbShift).y)) * 0.5;
    blueCyanGrad += liquid * 0.2;
    vec3 colorB;
    if (blueCyanGrad < 0.33) {
      colorB = mix(vividRed, magenta, blueCyanGrad / 0.33);
    } else if (blueCyanGrad < 0.66) {
      colorB = mix(magenta, purple, (blueCyanGrad - 0.33) / 0.33);
    } else {
      colorB = mix(purple, deepBlue, (blueCyanGrad - 0.33) / 0.34);
    }
    
    // RGBチャンネルを合成
    color = vec3(colorR.r, color.g, colorB.b);
    
    // ★ デジタルノイズ感（わずかに）
    float digitalNoise = hash(uv * 1000.0 + uTime) * 0.03;
    color += digitalNoise;
    
    // ★ 最終調整
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WhiskersBackground() {
  const { size, viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width * 2, viewport.height * 2, 1]} position={[0, 0, -10]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
