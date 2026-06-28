'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Telescope — procedural refracting telescope prop, built entirely from
 * Three.js primitives (no external models).
 *
 * Visible during Beats 1, 2, 3, 6, 8 (whenever we're "inside the
 * observatory"). The camera looks through it during Beat 3 (Exploration).
 *
 * Animation:
 *  - Slow Y-axis scan (~0.05 rad/s) — "scanning the sky".
 *  - Finder scope emissive pulses (sine wave, 4s period) to draw the eye.
 *
 * All animation in useFrame — no React re-renders during the frame loop.
 *
 * Poly budget: ~3.5k tris total — well under the 10k observatory cap.
 *
 * Per task spec: observatory-3d-structures.
 */
export function Telescope() {
  const scanRef = useRef<THREE.Group>(null);

  // --- Shared materials (memoised so all meshes share GPU resources) ---
  const darkMetalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1A2547'),
        roughness: 0.6,
        metalness: 1.0,
      }),
    [],
  );

  const brassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#B8860B'),
        roughness: 0.3,
        metalness: 1.0,
        emissive: new THREE.Color('#B8860B'),
        emissiveIntensity: 0.1,
      }),
    [],
  );

  // Finder scope gets its own material so its emissive can pulse independently
  // of the other brass parts (which stay at a steady 0.1 intensity).
  const finderMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#B8860B'),
        roughness: 0.3,
        metalness: 1.0,
        emissive: new THREE.Color('#B8860B'),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#F5F0E1'),
        roughness: 0.05,
        metalness: 0.0,
        transmission: 1.0,
        ior: 1.5,
        transparent: true,
        opacity: 0.25,
        thickness: 0.1,
      }),
    [],
  );

  // --- Shared geometries ---
  const barrelGeo = useMemo(
    () => new THREE.CylinderGeometry(0.22, 0.28, 3.5, 24), // tapered toward front
    [],
  );
  const eyepieceGeo = useMemo(
    () => new THREE.CylinderGeometry(0.12, 0.12, 0.5, 16),
    [],
  );
  const finderGeo = useMemo(
    () => new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16),
    [],
  );
  const lensGeo = useMemo(
    () => new THREE.CylinderGeometry(0.22, 0.22, 0.04, 24),
    [],
  );
  const focusWheelGeo = useMemo(
    () => new THREE.CylinderGeometry(0.1, 0.1, 0.06, 16),
    [],
  );
  const mountHeadGeo = useMemo(
    () => new THREE.CylinderGeometry(0.18, 0.18, 0.4, 16),
    [],
  );
  const postGeo = useMemo(
    () => new THREE.CylinderGeometry(0.08, 0.08, 0.5, 12),
    [],
  );
  const legGeo = useMemo(
    () => new THREE.CylinderGeometry(0.05, 0.06, 2, 10),
    [],
  );
  const knobGeo = useMemo(
    () => new THREE.SphereGeometry(0.07, 16, 12),
    [],
  );

  // Tripod leg transforms — 3 legs, 120° apart, splayed 20° from vertical.
  // Each leg is 2 units long; we pre-compute the center position + quaternion
  // that aligns the cylinder's default +Y axis with the leg direction.
  const legTransforms = useMemo(() => {
    const splay = (20 * Math.PI) / 180;
    const halfLen = 1; // legs are 2 units long
    const up = new THREE.Vector3(0, 1, 0);
    return [0, 1, 2].map((i) => {
      const angle = (i * 2 * Math.PI) / 3;
      const dir = new THREE.Vector3(
        Math.sin(splay) * Math.cos(angle),
        -Math.cos(splay),
        Math.sin(splay) * Math.sin(angle),
      ).normalize();
      const center = dir.clone().multiplyScalar(halfLen);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
      return { center, quat };
    });
  }, []);

  // --- Animation: slow Y scan + finder scope pulse ---
  useFrame((state, delta) => {
    if (scanRef.current) {
      // ~0.05 rad/s — very slow scan.
      scanRef.current.rotation.y += delta * 0.05;
    }
    const t = state.clock.elapsedTime;
    // Sine wave, 4s period. Oscillates between 0.05 and 0.35.
    finderMat.emissiveIntensity = 0.2 + 0.15 * Math.sin((t * Math.PI * 2) / 4);
  });

  // Barrel pivot is at the back (eyepiece end); barrel extends +Z.
  // Tilt up 30° from horizontal: rotate -π/6 around X (front of barrel rises).
  const tilt = -Math.PI / 6;
  const mountTopY = 0.5; // top of post / centre of mount head

  return (
    <group position={[0, -1, 5]}>
      <group ref={scanRef}>
        {/* === Tripod (3 splayed legs) === */}
        {legTransforms.map((lt, i) => (
          <mesh
            key={`leg-${i}`}
            position={lt.center}
            quaternion={lt.quat}
            geometry={legGeo}
            material={darkMetalMat}
          />
        ))}

        {/* === Post (vertical cylinder from tripod to mount head) === */}
        <mesh
          position={[0, mountTopY - 0.25, 0]}
          geometry={postGeo}
          material={darkMetalMat}
        />

        {/* === Mount head (horizontal cylinder, axis along X — the tilt head) === */}
        <mesh
          position={[0, mountTopY, 0]}
          rotation={[0, 0, Math.PI / 2]}
          geometry={mountHeadGeo}
          material={darkMetalMat}
        />

        {/*
         * === Tilted barrel assembly ===
         * Pivot at the mount head. Tilt -30° around X so the barrel points
         * up-and-forward (toward the sky / projects). All barrel sub-parts
         * are children of this tilt group so they inherit the tilt.
         *
         * Local convention inside this group:
         *   +Z = forward (toward the front lens / sky)
         *   +Y = up (toward the finder scope)
         *   +X = side (toward the focus wheel)
         *
         * Cylinder geometry default axis is +Y, so to align with +Z we
         * rotate +π/2 around X (takes +Y -> +Z).
         */}
        <group position={[0, mountTopY, 0]} rotation={[tilt, 0, 0]}>
          {/* Main barrel — centered at z = 1.75 (half of 3.5). */}
          <mesh
            position={[0, 0, 1.75]}
            rotation={[Math.PI / 2, 0, 0]}
            geometry={barrelGeo}
            material={darkMetalMat}
          />

          {/* Front lens — thin disc at z = 3.5 (front of barrel). */}
          <mesh
            position={[0, 0, 3.5]}
            rotation={[Math.PI / 2, 0, 0]}
            geometry={lensGeo}
            material={glassMat}
          />

          {/*
           * Eyepiece — at the back (z = -0.25), angled slightly downward.
           * Rotate -π/2 around X to point along -Z, then subtract a small
           * angle (0.15 rad ≈ 8.6°) so the eyepiece droops downward.
           */}
          <mesh
            position={[0, 0, -0.25]}
            rotation={[-Math.PI / 2 - 0.15, 0, 0]}
            geometry={eyepieceGeo}
            material={brassMat}
          />

          {/*
           * Finder scope — mounted on top of the barrel, parallel to it.
           * Offset in +Y by barrel radius (0.28 at the back) + finder radius
           * (0.08) ≈ 0.36. Centered at z = 2.4 (mid-barrel).
           */}
          <mesh
            position={[0, 0.36, 2.4]}
            rotation={[Math.PI / 2, 0, 0]}
            geometry={finderGeo}
            material={finderMat}
          />

          {/*
           * Focus wheel — small disc on the +X side of the barrel.
           * Cylinder axis aligned with +X (radial from barrel) by rotating
           * -π/2 around Z. Positioned just outside the barrel surface.
           */}
          <mesh
            position={[0.31, 0, 0.9]}
            rotation={[0, 0, -Math.PI / 2]}
            geometry={focusWheelGeo}
            material={brassMat}
          />

          {/* Adjustment knobs — 2 small brass spheres where the barrel
              meets the mount (the tilt head junction). */}
          <mesh position={[0.13, 0, 0.1]} geometry={knobGeo} material={brassMat} />
          <mesh position={[-0.13, 0, 0.1]} geometry={knobGeo} material={brassMat} />
        </group>
      </group>
    </group>
  );
}
