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

  vec3 blend(vec3 a, vec3 b, float t) {
    return mix(a, b, smoothstep(0.0, 1.0, t));
  }

  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);

    // ---- 色定義（スマホ壁紙の忠実再現） ----
    vec3 centerRed   = vec3(0.85, 0.0, 0.15);  // #D90026
    vec3 midMagenta  = vec3(0.95, 0.2, 0.55);  // #F2368C
    vec3 outerPurple = vec3(0.45, 0.2, 0.95);  // #7333F2
    vec3 deepBlue    = vec3(0.10, 0.20, 0.95); // #1A33F2

    vec3 color = centerRed;
    color = blend(color, midMagenta,  smoothstep(0.05, 0.25, dist));
    color = blend(color, outerPurple, smoothstep(0.25, 0.55, dist));
    color = blend(color, deepBlue,    smoothstep(0.55, 0.95, dist));

    // 奥行きの霧感
    float fog = smoothstep(0.3, 1.0, dist) * 0.15;
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
    <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, -1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
