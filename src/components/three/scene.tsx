'use client';

import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useObservatoryStore } from '@/lib/store';
import { CameraRig } from './camera-rig';
import { Starfield } from './starfield';
import { NebulaBackground } from './nebula-background';
import { ProjectBodies } from './project-bodies';
import { Telescope, Dome } from './observatory';

/**
 * Scene — root R3F scene.
 * Per phase10_3d_experience.md §1 (Scene graph).
 *
 * Canvas is shadow-disabled (we use emissive + point lights only), DPR capped
 * at 2 (mobile-friendly). Frameloop="always" because we have continuous
 * animations (twinkle, drift, particle systems).
 *
 * Lazy-loaded with next/dynamic + ssr:false from page.tsx.
 */
export function Scene() {
  const isTouch = useObservatoryStore((s) => s.isTouch);

  // Touch screens: halve star count, cap DPR at 2.
  const starCount = useMemo(() => (isTouch ? 200 : 300), [isTouch]);

  return (
    <Canvas
      shadows={false}
      dpr={[1, 2]}
      frameloop="always"
      gl={{
        antialias: !isTouch,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      camera={{ fov: 50, near: 0.1, far: 2000, position: [0, 0, 30] }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('#0A1530'));
      }}
    >
      {/* Per phase10 §3.1 + §3.2 */}
      <ambientLight intensity={0.3} color="#1A2547" />
      <hemisphereLight args={['#0F1B3D', '#050818', 0.4]} />

      <NebulaBackground />
      <Starfield count={starCount} />
      <ProjectBodies />

      {/* Observatory structures — telescope (visitor's viewport) + dome
          (architectural frame). Per task spec: observatory-3d-structures. */}
      <Telescope />
      <Dome />

      {/* Interior dome light — warm ivory glow that illuminates the telescope
          and the dome's interior panels. Positioned at the dome center. */}
      <pointLight
        position={[0, 2, 0]}
        color="#F5F0E1"
        intensity={0.5}
        distance={15}
        decay={2}
      />

      <CameraRig />
    </Canvas>
  );
}
