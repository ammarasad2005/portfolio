'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectPositions } from '@/data/projects';
import { PILLAR_COLORS } from '../scene-constants';

/**
 * WayFinderSpeck — a tiny dim point, barely visible.
 * Per phase12_project_presentation.md §8.1.
 *
 * Mobile pillar → dual-light (sunset orange + cyan), intensity 1.0 each,
 * distance 12. But because this is a "barely visible" speck, we use a low-
 * intensity point sphere and dual-tinted point lights to convey the
 * mobile pillar blend subtly.
 */
export function WayFinderSpeck() {
  const speckRef = useRef<THREE.Mesh>(null);
  const [x, y, z] = projectPositions['wayfinder'];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (speckRef.current) {
      // Very subtle twinkle.
      const s = 1 + 0.2 * Math.sin(t * 0.8);
      speckRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[x, y, z]}>
      <mesh ref={speckRef}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color={PILLAR_COLORS.mobileCool}
          emissive={PILLAR_COLORS.mobileCool}
          emissiveIntensity={0.4}
          roughness={0.5}
        />
      </mesh>

      {/* Mobile pillar → dual-light (sunset orange + cyan), intensity 1.0 each */}
      <pointLight
        color={PILLAR_COLORS.mobileWarm}
        intensity={1.0}
        distance={12}
        decay={2}
        position={[0.5, 0, 0]}
      />
      <pointLight
        color={PILLAR_COLORS.mobileCool}
        intensity={1.0}
        distance={12}
        decay={2}
        position={[-0.5, 0, 0]}
      />
    </group>
  );
}
