"use client";

import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec2 uResolution;

  // ガウス分布
  float gaussian(float d, float intensity) {
    return exp(-d * intensity);
  }

  void main() {
    // ★ 赤の中心は少し上にある（スマホ壁紙の特徴）
    vec2 center = vec2(0.5, 0.42);
    float dist = distance(vUv, center);

    // ---- 色定義（スマホ壁紙の忠実再現） ----
    vec3 red      = vec3(0.90, 0.05, 0.15); // 強い赤
    vec3 magenta  = vec3(0.95, 0.25, 0.55);
    vec3 purple   = vec3(0.50, 0.25, 0.95);
    vec3 blue     = vec3(0.10, 0.25, 0.95);

    // ★ 中心の赤はガウス分布で強く発光
    float redGlow = gaussian(dist * 4.0, 6.0);

    vec3 color = red * redGlow;

    // ★ 赤 → マゼンタ → 紫 → 青 の遷移
    color = mix(color, magenta, smoothstep(0.10, 0.30, dist));
    color = mix(color, purple,  smoothstep(0.30, 0.55, dist));
    color = mix(color, blue,    smoothstep(0.55, 0.95, dist));

    // ★ 青紫の偏り（右下方向に強く）
    float dir = dot(normalize(vUv - center), normalize(vec2(0.4, 0.8)));
    color += blue * max(dir, 0.0) * 0.25;

    // ★ 霧感（奥行き）
    float fog = smoothstep(0.3, 1.0, dist) * 0.12;
    color += fog;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WhiskersBackground() {
  const { size, viewport } = useThree();

  const uniforms = useMemo(() => ({
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
