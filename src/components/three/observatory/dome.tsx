'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useObservatoryStore } from '@/lib/store';

/**
 * Dome — procedural observatory dome made of 8 articulated panels.
 *
 * Articulation timeline (mapped from `scrollProgress` in the Zustand store):
 *   0.00 – 0.05  : fully closed (page top — Beat 1 arrival).
 *   0.05 – 0.12  : dome opens (Beat 1 entry).
 *   0.12 – 0.85  : stays open (Beats 2 – 7).
 *   0.85 – 0.95  : dome closes (Beat 8 finale).
 *   0.95 – 1.00  : fully closed.
 *
 * Each panel is a wedge of a sphere (1/8 of the upper hemisphere), hinged at
 * its base edge (the equator). When open, panels rotate outward and upward
 * around the hinge axis (the tangent to the equator at the panel's midpoint).
 *
 * Performance: one shared sphere-wedge geometry, two shared materials
 * (exterior FrontSide + interior BackSide), and 8 hinge groups. The exterior
 * and interior meshes use opposite `side` flags so at any viewpoint only one
 * of them renders per face — no z-fighting, no need for scale offsets.
 *
 * All animation in useFrame — no React re-renders during the frame loop.
 *
 * Per task spec: observatory-3d-structures.
 */

const PANEL_COUNT = 8;
const DOME_RADIUS = 9; // within spec's 8–10 range; comfortably contains the telescope.
const DOME_CENTER_Y = 2; // "slightly above origin" per spec.
const OPEN_ANGLE_MAX = Math.PI / 2; // panels rotate 90° when fully open.

// Scroll-progress breakpoints for the open/close timeline.
const BREAK_OPEN_START = 0.05;
const BREAK_OPEN_END = 0.12;
const BREAK_CLOSE_START = 0.85;
const BREAK_CLOSE_END = 0.95;

export function Dome() {
  // Refs for each panel's rotating inner group (the open/close hinge).
  const panelRefs = useRef<Array<THREE.Group | null>>(
    new Array(PANEL_COUNT).fill(null),
  );
  const currentOpenRef = useRef(0);

  // Subscribe to the store without triggering React re-renders.
  // (Same pattern as camera-rig.tsx — read scrollProgress into a ref.)
  const scrollProgressRef = useRef(0);
  useEffect(() => {
    // Initialise from the current store state (in case the visitor lands
    // mid-scroll, e.g. on refresh).
    scrollProgressRef.current = useObservatoryStore.getState().scrollProgress;
    return useObservatoryStore.subscribe((state) => {
      scrollProgressRef.current = state.scrollProgress;
    });
  }, []);

  // --- Shared geometry: one wedge of the upper hemisphere (1/8 of the dome).
  // Built once, reused by all 8 panels via the `geometry` prop. ---
  const panelGeo = useMemo(() => {
    const deltaPhi = (2 * Math.PI) / PANEL_COUNT;
    // SphereGeometry's `phi` is the azimuthal angle around +Y, with phi=0 at
    // the -X direction at the equator. phi=π corresponds to +X — which is the
    // hinge direction in each panel's local frame (see panelTransforms below).
    // So centering the wedge on phi=π places its equator midpoint at local +X,
    // i.e. at the hinge point.
    return new THREE.SphereGeometry(
      DOME_RADIUS,
      32, // widthSegments — wedge gets 32/8 = 4 segments.
      16, // heightSegments — polar range [0, π/2] gets 16/2 = 8 segments.
      Math.PI - deltaPhi / 2, // phiStart — centered on +X.
      deltaPhi, // phiLength — one eighth of the azimuth.
      0, // thetaStart — north pole.
      Math.PI / 2, // thetaLength — down to the equator.
    );
  }, []);

  // --- Shared materials ---
  const exteriorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1A2547'),
        roughness: 0.7,
        metalness: 0.8,
        side: THREE.FrontSide,
      }),
    [],
  );

  const interiorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0F1B3D'),
        roughness: 0.9,
        metalness: 0.3,
        side: THREE.BackSide,
      }),
    [],
  );

  const hingeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#B8860B'),
        roughness: 0.3,
        metalness: 1.0,
        emissive: new THREE.Color('#B8860B'),
        emissiveIntensity: 0.15,
      }),
    [],
  );

  // Hinge accent geometry — thin brass cylinder, axis aligned with local +Z
  // (the hinge axis) via rotation. Length matches the panel's base arc width.
  const hingeGeo = useMemo(() => {
    const deltaPhi = (2 * Math.PI) / PANEL_COUNT;
    const hingeLength = DOME_RADIUS * deltaPhi; // arc length ≈ chord for small angles
    return new THREE.CylinderGeometry(0.06, 0.06, hingeLength, 8);
  }, []);

  // --- Pre-compute each panel's hinge placement (position + Y rotation).
  // Panel i sits at azimuth φ_i = i * (2π/8). Its hinge group is positioned
  // at (R cos φ_i, 0, R sin φ_i) and rotated by -φ_i around Y, which makes
  // the local +Z axis point in the tangent direction (the hinge axis). ---
  const panelTransforms = useMemo(() => {
    const deltaPhi = (2 * Math.PI) / PANEL_COUNT;
    return Array.from({ length: PANEL_COUNT }, (_, i) => {
      const phi = i * deltaPhi;
      return {
        position: [
          DOME_RADIUS * Math.cos(phi),
          0,
          DOME_RADIUS * Math.sin(phi),
        ] as [number, number, number],
        rotation: [0, -phi, 0] as [number, number, number],
      };
    });
  }, []);

  // --- Animation: lerp the open amount toward the scroll-driven target,
  // then apply the rotation to each panel. ---
  useFrame((_, delta) => {
    const progress = scrollProgressRef.current;

    // Map scroll progress → target open amount (0 = closed, 1 = open).
    let target: number;
    if (progress < BREAK_OPEN_START) {
      target = 0;
    } else if (progress < BREAK_OPEN_END) {
      target = (progress - BREAK_OPEN_START) / (BREAK_OPEN_END - BREAK_OPEN_START);
    } else if (progress < BREAK_CLOSE_START) {
      target = 1;
    } else if (progress < BREAK_CLOSE_END) {
      target = 1 - (progress - BREAK_CLOSE_START) / (BREAK_CLOSE_END - BREAK_CLOSE_START);
    } else {
      target = 0;
    }

    // Frame-rate-independent lerp (~0.05 per frame at 60fps).
    // The lerp factor is `1 - exp(-delta * 3)` ≈ 0.0488 at 60fps, matching
    // the spec's "lerp factor 0.05 for smooth catching-up".
    const lerp = 1 - Math.exp(-delta * 3);
    currentOpenRef.current += (target - currentOpenRef.current) * lerp;

    // Negative rotation = panels swing outward and upward (verified: the apex
    // of each panel moves outward and initially rises above the closed height).
    const angle = -currentOpenRef.current * OPEN_ANGLE_MAX;
    for (const panel of panelRefs.current) {
      if (panel) panel.rotation.z = angle;
    }
  });

  return (
    <group position={[0, DOME_CENTER_Y, 0]}>
      {panelTransforms.map((t, i) => (
        <group key={`panel-${i}`} position={t.position} rotation={t.rotation}>
          {/*
           * Hinge accent — fixed (does not rotate with the panel).
           * Cylinder's default axis is +Y; rotate +π/2 around X to align
           * with local +Z (the hinge axis).
           */}
          <mesh
            geometry={hingeGeo}
            material={hingeMat}
            rotation={[Math.PI / 2, 0, 0]}
          />

          {/*
           * Rotating panel — the open/close hinge. Rotation around local +Z
           * (the hinge axis) is applied each frame in useFrame.
           */}
          <group
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
          >
            {/*
             * Exterior panel — sphere wedge offset so its hinge edge sits at
             * the local origin. FrontSide renders only the outside face.
             */}
            <mesh
              position={[-DOME_RADIUS, 0, 0]}
              geometry={panelGeo}
              material={exteriorMat}
            />
            {/*
             * Interior panel — same wedge, BackSide renders only the inside
             * face. Because FrontSide + BackSide render disjoint face sets
             * (front vs back), the two meshes never compete for the same
             * pixel — no z-fighting, no scale offset required.
             */}
            <mesh
              position={[-DOME_RADIUS, 0, 0]}
              geometry={panelGeo}
              material={interiorMat}
            />
          </group>
        </group>
      ))}
    </group>
  );
}
