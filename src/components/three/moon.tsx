'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Moon — simple grey sphere positioned at (-5, 0, 30).
 * Slowly rotates. Reached by the camera around Beat 6.
 */
export function Moon() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <mesh ref={ref} position={[-5, 0, 30]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#C4C4C8" roughness={0.95} metalness={0.0} />
    </mesh>
  );
}
