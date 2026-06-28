'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
  count?: number;
}

/**
 * Starfield — 200 (120 on touch) point sprites in a large sphere shell.
 *
 * Single draw call via THREE.Points. Custom shader: soft per-star twinkle
 * (random phase, sine wave opacity 0.7–1.0), size attenuation, 5% sunset tint.
 */
export function Starfield({ count = 200 }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, sizes, phases, periods } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const periods = new Float32Array(count);

    const ivory = new THREE.Color('#F5F0E1');
    const sunset = new THREE.Color('#FF6B35');

    for (let i = 0; i < count; i++) {
      // Distribute in a large sphere shell (radius 300–800).
      const r = 300 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      // 5% sunset tint.
      const tinted = Math.random() < 0.05;
      const c = tinted ? sunset : ivory;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Size 0.5–2.0, varying.
      sizes[i] = 0.5 + Math.random() * 1.5;

      // Random twinkle phase + period (5–10s, soft).
      phases[i] = Math.random() * Math.PI * 2;
      periods[i] = 5 + Math.random() * 5;
    }
    return { positions, colors, sizes, phases, periods };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    // Very slow rotation of the whole starfield — adds depth.
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.002;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-phase"
          args={[phases, 1]}
        />
        <bufferAttribute
          attach="attributes-period"
          args={[periods, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        vertexShader={/* glsl */ `
          attribute float size;
          attribute float phase;
          attribute float period;
          attribute vec3 color;
          uniform float uTime;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = color;
            // Soft twinkle — opacity oscillates 0.7–1.0.
            float twinkle = 0.85 + 0.15 * sin(uTime * 6.28318 / period + phase);
            vAlpha = twinkle;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            // Size attenuation based on distance.
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={/* glsl */ `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            // Soft circular falloff.
            float a = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(vColor, a);
          }
        `}
      />
    </points>
  );
}
