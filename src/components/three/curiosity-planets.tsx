'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetSpec {
  color: string;
  position: [number, number, number];
  radius: number;
  speed: number;
}

const PLANETS: PlanetSpec[] = [
  { color: '#C1440E', position: [8, 0, 38], radius: 1.5, speed: 0.05 }, // Mars-like
  { color: '#E8C8A0', position: [-6, 2, 40], radius: 1.5, speed: 0.04 }, // Venus-like
  { color: '#4DD0E1', position: [4, -3, 42], radius: 1.5, speed: 0.06 }, // Ice giant
];

/**
 * CuriosityPlanets — 3 small planets for the curiosities beat (Beat 7).
 * Each rotates at a slightly different speed. Slight emissive so they read
 * even in the deep-space lighting.
 */
export function CuriosityPlanets() {
  return (
    <group>
      {PLANETS.map((p, i) => (
        <Planet key={i} spec={p} />
      ))}
    </group>
  );
}

function Planet({ spec }: { spec: PlanetSpec }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * spec.speed;
    }
  });

  return (
    <mesh ref={ref} position={spec.position}>
      <sphereGeometry args={[spec.radius, 32, 32]} />
      <meshStandardMaterial
        color={spec.color}
        roughness={0.7}
        metalness={0.1}
        emissive={spec.color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}
