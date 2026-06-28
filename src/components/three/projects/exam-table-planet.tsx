'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectPositions } from '@/data/projects';
import { PILLAR_COLORS } from '../scene-constants';

/**
 * ExamTablePlanet — a sphere with a thin tilted ring.
 * Per phase12_project_presentation.md §2.1.
 * Ivory material, amber-tinted ring at 30% opacity, 15° tilt.
 * Slow rotation (0.1 rad/s).
 */
export function ExamTablePlanet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [x, y, z] = projectPositions['exam-table'];

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.1;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.02;
  });

  return (
    <group position={[x, y, z]}>
      {/* Planet body */}
      <mesh ref={planetRef} castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial
          color={PILLAR_COLORS.web}
          roughness={0.65}
          metalness={0.05}
          emissive={new THREE.Color('#3A2D1A')}
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Ring (tilted 15°) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2 - 0.262, 0, 0]}>
        <ringGeometry args={[1.7, 2.0, 96]} />
        <meshBasicMaterial
          color={PILLAR_COLORS.amber}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pillar key light — Web pillar: ivory, intensity 1.2, distance 15 */}
      <pointLight
        color={PILLAR_COLORS.web}
        intensity={1.2}
        distance={15}
        decay={2}
      />

      {/* Faint atmospheric haze */}
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial
          color={PILLAR_COLORS.web}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
