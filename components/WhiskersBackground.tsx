"use client";

import * as THREE from "three";
import { useMemo } from "react";
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
  
  vec3 blend(vec3 a, vec3 b, float t) {
    return mix(a, b, smoothstep(0.0, 1.0, t));
  }
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // ---- 色定義（スマホ壁紙の忠実再現）----
    // 中心：深く濃い赤 #C4002E ~ #E0003A
    vec3 centerRed = vec3(0.878, 0.0, 0.227);   // #E0003A
    // 赤 #C4002E
    vec3 midRed = vec3(0.769, 0.0, 0.180);      // #C4002E
    // マゼンタ
    vec3 midMagenta = vec3(0.831, 0.0, 0.431);  // #D4006E
    // パープル
    vec3 outerPurple = vec3(0.616, 0.306, 0.933); // #9D4EDD
    // 紫
    vec3 deepPurple = vec3(0.486, 0.227, 0.929);  // #7C3AED
    // 青紫
    vec3 blueViolet = vec3(0.310, 0.275, 0.898);  // #4F46E5
    // 外周：深い青 #1A33F2 ~ #1E2BFF
    vec3 deepBlue = vec3(0.102, 0.200, 0.949);  // #1A33F2
    
    // 中心から外側へのグラデーション
    vec3 color = centerRed;
    color = blend(color, midRed, smoothstep(0.0, 0.12, dist));
    color = blend(color, midMagenta, smoothstep(0.12, 0.28, dist));
    color = blend(color, outerPurple, smoothstep(0.28, 0.48, dist));
    color = blend(color, deepPurple, smoothstep(0.48, 0.65, dist));
    color = blend(color, blueViolet, smoothstep(0.65, 0.80, dist));
    color = blend(color, deepBlue, smoothstep(0.80, 0.98, dist));
    
    // 左上→右下の薄い線形グラデーション（方向性と奥行き）
    float angleGradient = (vUv.x + vUv.y) * 0.5;
    vec3 linearTint = mix(
      vec3(1.0, 0.231, 0.361),  // 赤系
      vec3(0.416, 0.231, 1.0), // 紫系
      smoothstep(0.3, 0.7, angleGradient)
    );
    color = mix(color, linearTint, 0.08); // 8%程度のミックス
    
    // 奥行きの霧感（5-8%）
    float fog = smoothstep(0.35, 1.0, dist) * 0.07;
    color += fog;
    
    // 外側に向かうほど彩度と明度をわずかに落とす
    float desaturation = smoothstep(0.6, 1.0, dist) * 0.08;
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(luminance), desaturation * 0.3);
    
    // sRGB出力
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WhiskersBackground() {
  const { viewport } = useThree();
  
  const uniforms = useMemo(() => ({
    uResolution: new THREE.Vector2(viewport.width, viewport.height),
  }), [viewport]);

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
