// Shared 3D scene constants — camera control points, project body positions,
// pillar color tokens (mirrored from CSS for the GL context).
import * as THREE from 'three';
import { projectPositions } from '@/data/projects';

export const PILLAR_COLORS = {
  web: new THREE.Color('#F5F0E1'),
  ai: new THREE.Color('#FF6B35'),
  mobileWarm: new THREE.Color('#FF6B35'),
  mobileCool: new THREE.Color('#4DD0E1'),
  amber: new THREE.Color('#F59E0B'),
} as const;

export interface CameraControlPoint {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

// Beat 1, 2, 3 = control points 0, 1, 2
// Beat 4 = control points 3..9 (one per project)
// Beat 5, 6, 7, 8 = control points 10, 11, 12, 13
//
// We compute the per-project camera position by offsetting the project body
// position by a small viewing offset.
function projectCameraPos(projectId: string): [number, number, number] {
  const [px, py, pz] = projectPositions[projectId] ?? [0, 0, 0];
  // Position camera in front of and slightly above the project body.
  return [px * 0.6, py + 1.6, pz + 7];
}

export const CAMERA_CONTROL_POINTS: CameraControlPoint[] = [
  // Beat 1 — Arrival (far back, dome closes)
  { position: [0, 0, 30], lookAt: [0, 0, 0], fov: 50 },
  // Beat 2 — Introduction (inside dome, eye-level)
  { position: [0, 2, 15], lookAt: [0, 1, 0], fov: 45 },
  // Beat 3 — Exploration (looking through lens)
  { position: [0, 4, 10], lookAt: [0, 2, 0], fov: 50 },
  // Beat 4 — Projects (7 control points, one per project)
  {
    position: projectCameraPos('exam-table'),
    lookAt: projectPositions['exam-table'],
    fov: 35,
  },
  {
    position: projectCameraPos('drama-ghar'),
    lookAt: projectPositions['drama-ghar'],
    fov: 35,
  },
  {
    position: projectCameraPos('hamara-rozgar'),
    lookAt: projectPositions['hamara-rozgar'],
    fov: 35,
  },
  {
    position: projectCameraPos('glucoguard-plus'),
    lookAt: projectPositions['glucoguard-plus'],
    fov: 35,
  },
  {
    position: projectCameraPos('internship-finder'),
    lookAt: projectPositions['internship-finder'],
    fov: 35,
  },
  {
    position: projectCameraPos('gcr-resources-fetch'),
    lookAt: projectPositions['gcr-resources-fetch'],
    fov: 35,
  },
  {
    position: projectCameraPos('wayfinder'),
    lookAt: projectPositions['wayfinder'],
    fov: 50,
  },
  // Beat 5 — Technical (pulled way back, wide FOV)
  { position: [0, 8, 25], lookAt: [0, 4, 0], fov: 70 },
  // Beat 6 — Personality (back inside observatory)
  { position: [0, 2, 12], lookAt: [0, 1, 0], fov: 45 },
  // Beat 7 — Future (looking outward at distant sky)
  { position: [0, 6, 35], lookAt: [0, 4, -10], fov: 60 },
  // Beat 8 — Contact (same as Beat 1, dawn light)
  { position: [0, 0, 30], lookAt: [0, 0, 0], fov: 50 },
];

/** Total scroll screens (matches use-scroll.ts TOTAL_SCREENS). */
export const TOTAL_SCREENS = 14;

/**
 * Sample the camera path at scroll progress 0..1.
 * Returns a smooth interpolation along the control point spline.
 */
export function sampleCameraPath(progress: number): {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
} {
  const n = CAMERA_CONTROL_POINTS.length;
  const t = Math.min(1, Math.max(0, progress)) * (n - 1);
  const i = Math.floor(t);
  const f = t - i;

  // Catmull-Rom-ish: use 4 surrounding points for smoother curves.
  const p0 = CAMERA_CONTROL_POINTS[Math.max(0, i - 1)];
  const p1 = CAMERA_CONTROL_POINTS[i];
  const p2 = CAMERA_CONTROL_POINTS[Math.min(n - 1, i + 1)];
  const p3 = CAMERA_CONTROL_POINTS[Math.min(n - 1, i + 2)];

  const catmull = (a: number, b: number, c: number, d: number, t: number) => {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (
      2 * b +
      (-a + c) * t +
      (2 * a - 5 * b + 4 * c - d) * t2 +
      (-a + 3 * b - 3 * c + d) * t3
    );
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Use Catmull-Rom for position to avoid overshooting through project bodies.
  const pos = new THREE.Vector3(
    catmull(p0.position[0], p1.position[0], p2.position[0], p3.position[0], f),
    catmull(p0.position[1], p1.position[1], p2.position[1], p3.position[1], f),
    catmull(p0.position[2], p1.position[2], p2.position[2], p3.position[2], f),
  );

  // For lookAt we use Catmull-Rom too — it keeps the camera target smooth.
  const look = new THREE.Vector3(
    catmull(p0.lookAt[0], p1.lookAt[0], p2.lookAt[0], p3.lookAt[0], f),
    catmull(p0.lookAt[1], p1.lookAt[1], p2.lookAt[1], p3.lookAt[1], f),
    catmull(p0.lookAt[2], p1.lookAt[2], p2.lookAt[2], p3.lookAt[2], f),
  );

  const fov = lerp(p1.fov, p2.fov, f);

  return { position: pos, lookAt: look, fov };
}
