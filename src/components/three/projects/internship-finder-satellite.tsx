'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectPositions } from '@/data/projects';
import { PILLAR_COLORS } from '../scene-constants';

/**
 * InternshipFinderSatellite — small box mesh + blinking light.
 * Per phase12_project_presentation.md §6.1.
 *
 * Blink pattern: light opacity 1 → 0 → 1 every 2s (active dev signal).
 * Drifts slowly along its orbit.
 */
export function InternshipFinderSatellite() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.Mesh>(null);
  const [x, y, z] = projectPositions['internship-finder'];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Slow orbit drift.
      groupRef.current.position.x = x + Math.sin(t * 0.15) * 0.6;
      groupRef.current.position.y = y + Math.cos(t * 0.15) * 0.4;
      groupRef.current.rotation.y = t * 0.4;
    }
    if (lightRef.current) {
      // Blink every 2s: 1s on, 1s off. Square pulse.
      const phase = (t % 2.0) / 2.0;
      const on = phase < 0.5 ? 1.0 : 0.1;
      const mat = lightRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = on;
      const scale = 1 + on * 0.4;
      lightRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Body — small box (satellite) */}
      <mesh>
        <boxGeometry args={[0.5, 0.3, 0.5]} />
        <meshStandardMaterial
          color={new THREE.Color('#1A2547')}
          roughness={0.6}
          metalness={0.4}
          emissive={new THREE.Color('#0A1530')}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Solar panels — two thin boxes on either side */}
      <mesh position={[0.55, 0, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.3]} />
        <meshStandardMaterial
          color={new THREE.Color('#0F1B3D')}
          emissive={PILLAR_COLORS.ai}
          emissiveIntensity={0.15}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[-0.55, 0, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.3]} />
        <meshStandardMaterial
          color={new THREE.Color('#0F1B3D')}
          emissive={PILLAR_COLORS.ai}
          emissiveIntensity={0.15}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Blinking light */}
      <mesh ref={lightRef} position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial
          color={PILLAR_COLORS.ai}
          transparent
          opacity={1.0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Pillar key light — AI: sunset orange */}
      <pointLight
        color={PILLAR_COLORS.ai}
        intensity={1.2}
        distance={10}
        decay={2}
      />
    </group>
  );
}
