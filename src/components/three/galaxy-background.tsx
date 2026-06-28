'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useObservatoryStore } from '@/lib/store';

/**
 * GalaxyBackground — large BackSide sphere (radius 500) with a custom shader.
 *
 * Base: deep navy (#0A1530) → slightly elevated (#0F1B3D) gradient with
 * subtle nebula dust noise.
 *
 * Galaxy emergence: reads scrollProgress from the Zustand store via
 * `subscribe` (NOT React state — avoids re-renders) and passes it as a
 * `uScroll` uniform. The galaxy core only emerges once scrollProgress
 * crosses 0.55, growing to full intensity by scrollProgress = 1.0. The
 * core is sunset orange (#FF6B35) fading to ivory (#F5F0E1) at the edges,
 * with two logarithmic spiral arm hints driven by noise.
 */
export function GalaxyBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scrollProgressRef = useRef(0);

  // Subscribe to scrollProgress without triggering React re-renders.
  useEffect(() => {
    return useObservatoryStore.subscribe((state) => {
      scrollProgressRef.current = state.scrollProgress;
    });
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uDeep: { value: new THREE.Color('#0A1530') },
      uElevated: { value: new THREE.Color('#0F1B3D') },
      uCore: { value: new THREE.Color('#FF6B35') },
      uEdge: { value: new THREE.Color('#F5F0E1') },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.02;
      // Smoothly approach the target scroll progress (eases the emergence).
      const cur = materialRef.current.uniforms.uScroll.value as number;
      materialRef.current.uniforms.uScroll.value =
        cur + (scrollProgressRef.current - cur) * 0.05;
    }
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <sphereGeometry args={[500, 48, 48]} />
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
          uniform float uScroll;
          uniform vec3 uDeep;
          uniform vec3 uElevated;
          uniform vec3 uCore;
          uniform vec3 uEdge;

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
              mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
                  mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
              mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
                  mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
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
            // Base deep-space gradient.
            float upT = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
            vec3 base = mix(uDeep, uElevated, upT * 0.6);
            // Subtle nebula dust.
            float n = fbm(dir * 2.5 + vec3(uTime * 0.5, uTime * 0.2, 0.0));
            base = mix(base, uElevated, n * 0.4);

            // Galaxy emergence — only after scrollProgress > 0.55.
            float emerge = smoothstep(0.55, 1.0, uScroll);
            if (emerge > 0.001) {
              // Galactic center lies along the -Z axis (the travel direction).
              float d = length(dir.xy);
              float angle = atan(dir.y, dir.x);
              // Bright core.
              float core = 1.0 - smoothstep(0.0, 0.35, d);
              // Two logarithmic spiral arms winding outward.
              float arm = 0.5 + 0.5 * sin(angle * 2.0 - d * 14.0 + uTime * 0.2);
              arm *= (1.0 - smoothstep(0.05, 0.55, d));
              float galaxy = clamp(core * 0.9 + arm * 0.6, 0.0, 1.0);
              // Core = sunset orange, edges fade to ivory.
              vec3 galaxyColor = mix(uCore, uEdge, smoothstep(0.0, 0.45, d));
              base = mix(base, galaxyColor, galaxy * emerge * 0.8);
            }

            gl_FragColor = vec4(base, 1.0);
          }
        `}
      />
    </mesh>
  );
}
