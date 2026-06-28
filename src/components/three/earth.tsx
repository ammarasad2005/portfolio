'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Fixed sun direction — matches the scene's directionalLight so the lit
// hemisphere of the procedural Earth reads warm and consistent.
const SUN_DIRECTION = new THREE.Vector3(20, 10, 15).normalize();

/**
 * Earth — procedural blue-green sphere at the origin (0,0,0).
 * The visual anchor of the scene; shrinks as the camera travels outward.
 *
 * Built from a custom ShaderMaterial: 3-octave value noise generates
 * continents (green/brown) over oceans (deep blue), with a manual diffuse
 * term lit by a fixed sun direction so the lit hemisphere reads warm.
 * A second BackSide sphere adds a fresnel atmosphere glow.
 */
export function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmoRef = useRef<THREE.Mesh>(null);

  const earthMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uOcean: { value: new THREE.Color('#1B4F8C') },
          uLand1: { value: new THREE.Color('#3A5F3A') },
          uLand2: { value: new THREE.Color('#5C4A3A') },
          uIce: { value: new THREE.Color('#E8EDF2') },
          uSunDir: { value: SUN_DIRECTION.clone() },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vPos;
          uniform float uTime;
          uniform vec3 uOcean;
          uniform vec3 uLand1;
          uniform vec3 uLand2;
          uniform vec3 uIce;
          uniform vec3 uSunDir;

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
            for (int i = 0; i < 4; i++) {
              v += a * noise(p);
              p *= 2.0;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec3 dir = normalize(vPos);
            // Continents from 3D noise sampled on the sphere surface.
            float n = fbm(dir * 1.8);
            float coast = smoothstep(0.48, 0.55, n);
            // Secondary noise for landmass color variation.
            float landMix = fbm(dir * 4.0 + 11.3);
            vec3 land = mix(uLand1, uLand2, landMix);
            vec3 surface = mix(uOcean, land, coast);
            // Polar ice caps near the poles.
            float pole = smoothstep(0.78, 0.92, abs(dir.y));
            surface = mix(surface, uIce, pole);

            // Manual diffuse lighting from the fixed sun direction.
            vec3 N = normalize(vNormal);
            float diff = max(dot(N, uSunDir), 0.0);
            float ambient = 0.18;
            vec3 lit = surface * (ambient + diff * 0.9);
            // Subtle warm terminator (sunset tint along day/night boundary).
            float term = 1.0 - abs(dot(N, uSunDir));
            lit += vec3(0.15, 0.08, 0.03) * pow(term, 4.0) * coast;

            gl_FragColor = vec4(lit, 1.0);
          }
        `,
      }),
    [],
  );

  const atmoMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color('#4A90E2') },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          uniform vec3 uColor;
          void main() {
            // BackSide fresnel: glow is strongest at the silhouette edge.
            float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.0);
            gl_FragColor = vec4(uColor, f * 0.9);
          }
        `,
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.02;
    }
    if (atmoRef.current) {
      atmoRef.current.rotation.y += delta * 0.01;
    }
    if (earthMaterial.uniforms.uTime) {
      earthMaterial.uniforms.uTime.value += delta;
    }
  });

  return (
    <group>
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[5, 64, 64]} />
      </mesh>
      <mesh ref={atmoRef} material={atmoMaterial}>
        <sphereGeometry args={[5.15, 48, 48]} />
      </mesh>
    </group>
  );
}
