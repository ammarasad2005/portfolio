// Shared 3D scene constants — space-journey camera control points,
// pillar color tokens (mirrored from CSS for the GL context).
import * as THREE from 'three';

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

// 8 control points — one per beat. The camera progresses continuously:
// Earth low orbit → Full Earth → satellite belt → geostationary →
// Moon → inner solar system → galaxy. The 3D is backdrop; text is foreground.
export const CAMERA_CONTROL_POINTS: CameraControlPoint[] = [
  { position: [0, 0, 8], lookAt: [0, 0, 0], fov: 50 }, // Beat 1: Earth low orbit
  { position: [0, 0, 16], lookAt: [0, 0, 0], fov: 45 }, // Beat 2: Full Earth
  { position: [0, 2, 22], lookAt: [0, 0, 0], fov: 55 }, // Beat 3: Entering satellite belt
  { position: [3, 1, 25], lookAt: [0, 0, 0], fov: 60 }, // Beat 4: At satellite belt
  { position: [0, 5, 30], lookAt: [0, 0, 0], fov: 65 }, // Beat 5: Geostationary
  { position: [-8, 2, 35], lookAt: [-5, 0, 30], fov: 50 }, // Beat 6: Moon
  { position: [0, 8, 45], lookAt: [0, 0, 35], fov: 60 }, // Beat 7: Inner solar system
  { position: [0, 0, 60], lookAt: [0, 0, 0], fov: 75 }, // Beat 8: Galaxy
];

/** Total scroll screens (matches use-scroll.ts TOTAL_SCREENS). */
export const TOTAL_SCREENS = 14;

/**
 * Sample the camera path at scroll progress 0..1.
 * Returns a smooth Catmull-Rom interpolation along the control point spline.
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

  // Catmull-Rom: use 4 surrounding points for smoother curves.
  const p0 = CAMERA_CONTROL_POINTS[Math.max(0, i - 1)];
  const p1 = CAMERA_CONTROL_POINTS[i];
  const p2 = CAMERA_CONTROL_POINTS[Math.min(n - 1, i + 1)];
  const p3 = CAMERA_CONTROL_POINTS[Math.min(n - 1, i + 2)];

  const catmull = (a: number, b: number, c: number, d: number, t: number) => {
    const t2 = t * t;
    const t3 = t2 * t;
    return (
      0.5 *
      (2 * b +
        (-a + c) * t +
        (2 * a - 5 * b + 4 * c - d) * t2 +
        (-a + 3 * b - 3 * c + d) * t3)
    );
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const pos = new THREE.Vector3(
    catmull(p0.position[0], p1.position[0], p2.position[0], p3.position[0], f),
    catmull(p0.position[1], p1.position[1], p2.position[1], p3.position[1], f),
    catmull(p0.position[2], p1.position[2], p2.position[2], p3.position[2], f),
  );

  const look = new THREE.Vector3(
    catmull(p0.lookAt[0], p1.lookAt[0], p2.lookAt[0], p3.lookAt[0], f),
    catmull(p0.lookAt[1], p1.lookAt[1], p2.lookAt[1], p3.lookAt[1], f),
    catmull(p0.lookAt[2], p1.lookAt[2], p2.lookAt[2], p3.lookAt[2], f),
  );

  const fov = lerp(p1.fov, p2.fov, f);

  return { position: pos, lookAt: look, fov };
}
