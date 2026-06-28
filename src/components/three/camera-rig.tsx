'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useObservatoryStore } from '@/lib/store';
import { sampleCameraPath } from './scene-constants';

/**
 * CameraRig — binds scroll progress (from Zustand) to camera position along
 * a Catmull-Rom spline through 14 control points (8 beats; Beat 4 = 7 sub-points).
 *
 * Adds idle drift (subtle sine wave) when scroll is paused for >2s.
 * Per phase10_3d_experience.md §2.3 + §2.1.
 */
export function CameraRig() {
  const { camera, size } = useThree();
  const scrollProgressRef = useRef(0);
  const lastScrollRef = useRef(0);
  const lastScrollChangeTimeRef = useRef(performance.now());
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  // Subscribe to the store without triggering React re-renders.
  useEffect(() => {
    return useObservatoryStore.subscribe((state) => {
      scrollProgressRef.current = state.scrollProgress;
    });
  }, []);

  // Ensure camera is perspective + reasonable aspect on mount.
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);

  useFrame((state, delta) => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const progress = scrollProgressRef.current;
    if (Math.abs(progress - lastScrollRef.current) > 0.0005) {
      lastScrollRef.current = progress;
      lastScrollChangeTimeRef.current = performance.now();
    }

    const { position, lookAt, fov } = sampleCameraPath(progress);

    // Idle drift: subtle sine wave when scroll has been paused >2s.
    const idleMs = performance.now() - lastScrollChangeTimeRef.current;
    const idleAmount = idleMs > 2000 ? Math.min(1, (idleMs - 2000) / 1500) : 0;
    const t = state.clock.elapsedTime;
    const driftX = idleAmount * Math.sin(t * 0.6) * 0.3;
    const driftY = idleAmount * Math.sin(t * 0.4 + 1.2) * 0.15;

    // Smoothly ease camera toward target position (frame-rate independent).
    const ease = 1 - Math.pow(0.001, delta); // ~power3.inOut over a few frames
    camera.position.x += (position.x + driftX - camera.position.x) * ease;
    camera.position.y += (position.y + driftY - camera.position.y) * ease;
    camera.position.z += (position.z - camera.position.z) * ease;

    targetLookAtRef.current.set(
      lookAt.x + driftX * 0.3,
      lookAt.y + driftY * 0.3,
      lookAt.z,
    );
    currentLookAtRef.current.lerp(targetLookAtRef.current, ease);

    camera.lookAt(currentLookAtRef.current);

    // FOV lerp
    if (Math.abs(camera.fov - fov) > 0.05) {
      camera.fov += (fov - camera.fov) * ease;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
