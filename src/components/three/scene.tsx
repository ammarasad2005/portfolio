'use client';

import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useObservatoryStore } from '@/lib/store';
import { CameraRig } from './camera-rig';
import { Starfield } from './starfield';
import { GalaxyBackground } from './galaxy-background';
import { Earth } from './earth';
import { Satellites } from './satellites';
import { Moon } from './moon';
import { CuriosityPlanets } from './curiosity-planets';

/**
 * Scene — root R3F scene for the space journey.
 *
 * A continuous camera progression: Earth → satellite belt → Moon →
 * inner solar system → galaxy. The 3D is backdrop; text content is foreground.
 *
 * Canvas is shadow-disabled (emissive + point lights only), DPR capped at 2
 * (mobile-friendly). Frameloop="always" because we have continuous animations
 * (orbit, twinkle, status-light pulse, shader drift).
 *
 * Lazy-loaded with next/dynamic + ssr:false from page.tsx.
 */
export function Scene() {
  const isTouch = useObservatoryStore((s) => s.isTouch);

  const starCount = useMemo(() => (isTouch ? 120 : 200), [isTouch]);

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
      camera={{ fov: 50, near: 0.1, far: 2000, position: [0, 0, 8] }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('#0A1530'));
      }}
    >
      {/* Lighting — soft ambient + hemisphere + a warm "sun" directional. */}
      <ambientLight intensity={0.25} color="#1A2547" />
      <hemisphereLight args={['#0F1B3D', '#050818', 0.3]} />
      <directionalLight position={[20, 10, 15]} intensity={0.8} color="#F5F0E1" />

      <GalaxyBackground />
      <Starfield count={starCount} />
      <Earth />
      <Satellites />
      <Moon />
      <CuriosityPlanets />

      <CameraRig />
    </Canvas>
  );
}
