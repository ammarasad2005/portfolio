'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * NebulaBackground — large sphere (radius 800) with BackSide rendering.
 * Per phase10_3d_experience.md §4.1.
 *
 * Custom shader: 3-octave value noise (cheap, GLSL-friendly) + radial
 * gradient. Deep navy `#0A1530` to slightly elevated `#0F1B3D` with a faint
 * sunset tint at the edges. Noise slowly drifts over time.
 */
export function NebulaBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#0A1530') },
      uElevated: { value: new THREE.Color('#0F1B3D') },
      uSunset: { value: new THREE.Color('#3A1A2A') },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.02;
    }
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <sphereGeometry args={[800, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          varying vec3 vPos;
          uniform float uTime;
          uniform vec3 uDeep;
          uniform vec3 uElevated;
          uniform vec3 uSunset;

          // Cheap 3-octave value noise — built from hash + smoothstep.
          float hash(vec3 p) {
            p = fract(p * 0.3183099 + 0.1);
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
          }
          float noise(vec3 x) {
            vec3 i = floor(x);
            vec3 f = fract(x);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(
                mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
                f.y),
              mix(
                mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
                f.y),
              f.z);
          }
          float fbm(vec3 p) {
            float v = 0.0;
            float a = 0.5;
            for (int i = 0; i < 3; i++) {
              v += a * noise(p);
              p *= 2.0;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec3 dir = normalize(vPos);
            float n = fbm(dir * 2.5 + vec3(uTime * 0.5, uTime * 0.2, 0.0));
            // Radial gradient: down axis (y = -1) = deep navy, up axis = elevated.
            float upT = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
            vec3 base = mix(uDeep, uElevated, upT);
            // Noise modulates subtle elevation.
            base = mix(base, uElevated, n * 0.6);
            // Faint sunset tint at the horizon (y near 0).
            float horizon = 1.0 - abs(dir.y);
            horizon = pow(horizon, 4.0);
            base = mix(base, uSunset, horizon * 0.35 * (0.7 + 0.3 * n));
            gl_FragColor = vec4(base, 1.0);
          }
        `}
      />
    </mesh>
  );
}
