'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectPositions } from '@/data/projects';
import { PILLAR_COLORS } from '../scene-constants';

/**
 * GlucoGuardStar — bright sphere with a 4-pulse halo.
 * Per phase12_project_presentation.md §5.1.
 *
 * 4-pulse animation cycle (1.2s total, 0.3s per pulse — one per model in the
 * pipeline: Vision → Reasoning → Search → TTS). Sunset orange core, ivory halo.
 */
export function GlucoGuardStar() {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRefs = useRef<Array<THREE.Mesh | null>>([null, null, null, null]);
  const [x, y, z] = projectPositions['glucoguard-plus'];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // 1.2s cycle for 4 pulses.
    const cycle = (t % 1.2) / 1.2;

    if (coreRef.current) {
      // Subtle pulse on the core itself.
      const s = 1 + 0.04 * Math.sin(t * 4);
      coreRef.current.scale.setScalar(s);
    }

    haloRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const slot = i / 4;
      const local = (cycle - slot + 1) % 1;
      // Pulse expands outward and fades.
      const expand = local * 1.5 + 0.5;
      const fade = Math.max(0, 1 - local * 1.4);
      mesh.scale.setScalar(expand);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = fade * 0.5;
    });
  });

  return (
    <group position={[x, y, z]}>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color={PILLAR_COLORS.ai}
          emissive={PILLAR_COLORS.ai}
          emissiveIntensity={2.0}
          roughness={0.3}
        />
      </mesh>

      {/* 4 halo rings (one per model pulse) */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            haloRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.6, 24, 24]} />
          <meshBasicMaterial
            color={PILLAR_COLORS.web}
            transparent
            opacity={0.0}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Pillar key light — AI: sunset orange, intensity 1.5, distance 18 */}
      <pointLight
        color={PILLAR_COLORS.ai}
        intensity={1.5}
        distance={18}
        decay={2}
      />

      {/* Haze */}
      <mesh>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial
          color={PILLAR_COLORS.ai}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
