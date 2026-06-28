'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectPositions } from '@/data/projects';
import { PILLAR_COLORS } from '../scene-constants';

/**
 * GcrFetchComet — bright sphere + particle trail.
 * Per phase12_project_presentation.md §7.1.
 *
 * 200 particles trail behind, fading over 2 seconds.
 * Color: ivory fading to transparent amber.
 */
const TRAIL_COUNT = 200;

export function GcrFetchComet() {
  const groupRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Points>(null);
  const trailMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const [x, y, z] = projectPositions['gcr-resources-fetch'];

  // Persistent per-particle age + offset, accumulated over frames.
  const trailData = useMemo(() => {
    const positions = new Float32Array(TRAIL_COUNT * 3);
    const ages = new Float32Array(TRAIL_COUNT);
    const seeds = new Float32Array(TRAIL_COUNT);
    for (let i = 0; i < TRAIL_COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      // Stagger ages so the trail is populated from frame 0.
      ages[i] = (i / TRAIL_COUNT) * 2.0;
      seeds[i] = Math.random();
    }
    return { positions, ages, seeds };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    uniforms.uTime.value += dt;

    if (groupRef.current) {
      // Slow drift along an arc.
      const t = uniforms.uTime.value;
      groupRef.current.position.x = x + Math.sin(t * 0.4) * 0.5;
      groupRef.current.position.y = y + Math.cos(t * 0.3) * 0.3;
      groupRef.current.position.z = z + Math.sin(t * 0.2) * 0.4;
    }

    // Advance trail particle ages, recycle at 2s.
    for (let i = 0; i < TRAIL_COUNT; i++) {
      trailData.ages[i] += dt;
      if (trailData.ages[i] > 2.0) {
        trailData.ages[i] -= 2.0;
        // Reset this particle to the comet's current position.
        trailData.positions[i * 3] = 0;
        trailData.positions[i * 3 + 1] = 0;
        trailData.positions[i * 3 + 2] = 0;
      } else {
        // Drift slightly backwards + sideways (trail effect).
        const seed = trailData.seeds[i];
        trailData.positions[i * 3] -= dt * (0.4 + seed * 0.3);
        trailData.positions[i * 3 + 1] +=
          dt * (Math.sin(uniforms.uTime.value * 1.5 + seed * 6.28) * 0.15);
        trailData.positions[i * 3 + 2] += dt * (seed - 0.5) * 0.2;
      }
    }
    if (trailRef.current) {
      const attr = trailRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Comet head — bright sphere */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color={PILLAR_COLORS.web}
          emissive={PILLAR_COLORS.amber}
          emissiveIntensity={1.5}
          roughness={0.3}
        />
      </mesh>

      {/* Particle trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailData.positions, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={trailMaterialRef}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={/* glsl */ `
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = 6.0 * (40.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={/* glsl */ `
            uniform float uTime;
            void main() {
              vec2 c = gl_PointCoord - 0.5;
              float d = length(c);
              if (d > 0.5) discard;
              // Ivory fading to amber at edges.
              vec3 core = vec3(0.96, 0.94, 0.88);
              vec3 edge = vec3(0.96, 0.42, 0.21);
              float t = d * 2.0;
              vec3 col = mix(core, edge, t);
              float a = smoothstep(0.5, 0.0, d) * 0.55;
              gl_FragColor = vec4(col, a);
            }
          `}
        />
      </points>

      {/* Pillar key light — Web pillar: ivory */}
      <pointLight
        color={PILLAR_COLORS.web}
        intensity={1.0}
        distance={10}
        decay={2}
      />
    </group>
  );
}
