'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectPositions } from '@/data/projects';
import { PILLAR_COLORS } from '../scene-constants';

/**
 * DramaGharBinaryPlanet — two spheres orbiting a common barycenter.
 * Per phase12_project_presentation.md §3.1.
 * Ivory tint with subtle green veins (the green is approximated via a second
 * emissive material overlay so we don't need a texture).
 */
export function DramaGharBinaryPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetARef = useRef<THREE.Mesh>(null);
  const planetBRef = useRef<THREE.Mesh>(null);
  const [x, y, z] = projectPositions['drama-ghar'];

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
    if (planetARef.current) planetARef.current.rotation.y += delta * 0.15;
    if (planetBRef.current) planetBRef.current.rotation.y += delta * 0.18;
  });

  const ivoryColor = PILLAR_COLORS.web;
  const greenVein = new THREE.Color('#4A6B3A');

  return (
    <group position={[x, y, z]}>
      <group ref={groupRef}>
        {/* Planet A — slightly larger, primary */}
        <group position={[0.9, 0, 0]}>
          <mesh ref={planetARef}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial
              color={ivoryColor}
              roughness={0.7}
              metalness={0.05}
              emissive={greenVein}
              emissiveIntensity={0.08}
            />
          </mesh>
        </group>

        {/* Planet B — smaller, secondary */}
        <group position={[-0.9, 0, 0]}>
          <mesh ref={planetBRef}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshStandardMaterial
              color={ivoryColor}
              roughness={0.7}
              metalness={0.05}
              emissive={greenVein}
              emissiveIntensity={0.06}
            />
          </mesh>
        </group>

        {/* Connection — a faint line between the two (the teaming bond) */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 1.8, 8]} />
          <meshBasicMaterial
            color={greenVein}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>

      {/* Pillar key light */}
      <pointLight
        color={PILLAR_COLORS.web}
        intensity={1.2}
        distance={15}
        decay={2}
      />

      {/* Haze */}
      <mesh>
        <sphereGeometry args={[2.0, 24, 24]} />
        <meshBasicMaterial
          color={ivoryColor}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
