'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { projects, type Project } from '@/data/projects';
import { useObservatoryStore } from '@/lib/store';

/** Orbit parameters per satellite (one per project, in display order). */
const SATELLITE_ORBITS = [
  { id: 'exam-table', radius: 9, inclination: 0.1, speed: 0.3, phase: 0 },
  { id: 'drama-ghar', radius: 10, inclination: -0.15, speed: 0.25, phase: 1.2 },
  { id: 'hamara-rozgar', radius: 11, inclination: 0.2, speed: 0.2, phase: 2.4 },
  { id: 'glucoguard-plus', radius: 12, inclination: -0.1, speed: 0.18, phase: 3.6 },
  { id: 'internship-finder', radius: 13, inclination: 0.15, speed: 0.15, phase: 4.8 },
  { id: 'gcr-resources-fetch', radius: 14, inclination: -0.2, speed: 0.12, phase: 6.0 },
  { id: 'wayfinder', radius: 9.5, inclination: 0.25, speed: 0.28, phase: 7.2 },
] as const;

/** Pillar color for the status light + point light of each satellite. */
function pillarColorHex(pillar: Project['pillar']): string {
  if (pillar === 'web') return '#F5F0E1';
  if (pillar === 'ai') return '#FF6B35';
  return '#4DD0E1'; // mobile → cool cyan
}

/**
 * Procedural solar-cell texture: dark blue cells with a subtle iridescent
 * gradient, bus bars, and visible gold grid lines between cells. Drawn to a
 * 256×160 canvas (matches the 0.8 × 0.5 panel aspect ratio so cells stay
 * roughly square — 4 cols × 3 rows).
 */
function makeSolarCellTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 160;
  const ctx = canvas.getContext('2d')!;
  // Gold grid base — visible as the thin lines between cells.
  ctx.fillStyle = '#D4A017';
  ctx.fillRect(0, 0, 256, 160);
  const cols = 4;
  const rows = 3;
  const pad = 3;
  const cellW = (256 - pad * (cols + 1)) / cols;
  const cellH = (160 - pad * (rows + 1)) / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = pad + c * (cellW + pad);
      const y = pad + r * (cellH + pad);
      // Iridescent blue cell — diagonal gradient.
      const grad = ctx.createLinearGradient(x, y, x + cellW, y + cellH);
      grad.addColorStop(0, '#1B2A4E');
      grad.addColorStop(0.5, '#2E4576');
      grad.addColorStop(1, '#162547');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, cellW, cellH);
      // Bus bars — thin lighter vertical lines inside each cell.
      ctx.strokeStyle = '#4A6FA5';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + cellW * 0.3, y);
      ctx.lineTo(x + cellW * 0.3, y + cellH);
      ctx.moveTo(x + cellW * 0.7, y);
      ctx.lineTo(x + cellW * 0.7, y + cellH);
      ctx.stroke();
      // Top edge highlight — fake specular.
      ctx.fillStyle = 'rgba(120, 150, 200, 0.18)';
      ctx.fillRect(x, y, cellW, 2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Procedural MLI blanket texture — wrinkled gold/silver multi-layer
 * insulation. Drawn as a base gold field with random darker gold streaks
 * and lighter highlights to simulate crinkled foil. Used as both map and
 * bumpMap for the bus material.
 */
function makeMLITexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  // Base gold.
  ctx.fillStyle = '#B8860B';
  ctx.fillRect(0, 0, 128, 128);
  // Wrinkle streaks — darker gold.
  ctx.strokeStyle = '#8B6914';
  ctx.lineWidth = 1;
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const len = 5 + Math.random() * 16;
    const ang = Math.random() * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.stroke();
  }
  // Lighter highlights — specular glints on the foil.
  ctx.fillStyle = 'rgba(255, 220, 120, 0.28)';
  for (let i = 0; i < 45; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const s = 1 + Math.random() * 2;
    ctx.fillRect(x, y, s, s);
  }
  // A few darker patches for depth.
  ctx.fillStyle = 'rgba(60, 40, 0, 0.2)';
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const s = 2 + Math.random() * 4;
    ctx.fillRect(x, y, s, s);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  return tex;
}

/**
 * Parabolic dish geometry via LatheGeometry. The dish is concave-up: rim at
 * y=0, deepest point at y=-depth. Parabolic profile y = -depth * (1 - t²).
 */
function buildParabolicDish(
  radius: number,
  depth: number,
  profileSegments = 12,
  radialSegments = 32,
): THREE.LatheGeometry {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= profileSegments; i++) {
    const t = i / profileSegments;
    const r = radius * t;
    const y = -depth * (1 - t * t);
    points.push(new THREE.Vector2(r, y));
  }
  return new THREE.LatheGeometry(points, radialSegments);
}

/** A single feed-support strut transform (position + quaternion). */
interface StrutTransform {
  position: [number, number, number];
  quaternion: [number, number, number, number];
}

/**
 * Compute 3 feed-support strut transforms forming a tripod from the dish
 * rim to the feed-horn top. Each strut orients the default +Y cylinder axis
 * toward the feed top.
 */
function computeStrutTransforms(
  dishRimY: number,
  dishR: number,
  feedTopY: number,
): StrutTransform[] {
  const up = new THREE.Vector3(0, 1, 0);
  const top = new THREE.Vector3(0, feedTopY, 0);
  const results: StrutTransform[] = [];
  for (let i = 0; i < 3; i++) {
    const angle = (i * 2 * Math.PI) / 3;
    const rim = new THREE.Vector3(
      dishR * Math.cos(angle),
      dishRimY,
      dishR * Math.sin(angle),
    );
    const dir = top.clone().sub(rim);
    const mid = rim.clone().add(top).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      up,
      dir.clone().normalize(),
    );
    results.push({
      position: [mid.x, mid.y, mid.z],
      quaternion: [quat.x, quat.y, quat.z, quat.w],
    });
  }
  return results;
}

/** A single attitude thruster placement (position + rotation). */
interface ThrusterPlacement {
  position: [number, number, number];
  rotation: [number, number, number];
}

/** 8 thrusters at the bottom edges of the bus, apex pointing outward. */
function buildThrusterPlacements(): ThrusterPlacement[] {
  const y = -0.3;
  return [
    // +X face — apex points +X
    { position: [0.37, y, 0.1], rotation: [0, 0, -Math.PI / 2] },
    { position: [0.37, y, -0.1], rotation: [0, 0, -Math.PI / 2] },
    // -X face — apex points -X
    { position: [-0.37, y, 0.1], rotation: [0, 0, Math.PI / 2] },
    { position: [-0.37, y, -0.1], rotation: [0, 0, Math.PI / 2] },
    // +Z face — apex points +Z
    { position: [0.1, y, 0.37], rotation: [Math.PI / 2, 0, 0] },
    { position: [-0.1, y, 0.37], rotation: [Math.PI / 2, 0, 0] },
    // -Z face — apex points -Z
    { position: [0.1, y, -0.37], rotation: [-Math.PI / 2, 0, 0] },
    { position: [-0.1, y, -0.37], rotation: [-Math.PI / 2, 0, 0] },
  ];
}

/** Shared geometries + materials — created once, reused across all 7 satellites. */
interface SharedResources {
  // Bus + top deck
  busGeo: THREE.CylinderGeometry;
  busMat: THREE.MeshStandardMaterial;
  topDeckGeo: THREE.CylinderGeometry;
  topDeckMat: THREE.MeshStandardMaterial;
  // Instrument cutouts + radiator
  instrumentGeo: THREE.BoxGeometry;
  instrumentMat: THREE.MeshStandardMaterial;
  radiatorGeo: THREE.BoxGeometry;
  radiatorMat: THREE.MeshStandardMaterial;
  // Solar array
  boomGeo: THREE.CylinderGeometry;
  hingeGeo: THREE.CylinderGeometry;
  hingeMat: THREE.MeshStandardMaterial;
  panelGeo: THREE.BoxGeometry;
  panelMaterials: THREE.Material[];
  // Antenna (main + high-gain)
  dishGeo: THREE.LatheGeometry;
  hgDishGeo: THREE.LatheGeometry;
  dishMat: THREE.MeshStandardMaterial;
  feedGeo: THREE.CylinderGeometry;
  feedTopGeo: THREE.SphereGeometry;
  feedMat: THREE.MeshStandardMaterial;
  strutGeo: THREE.CylinderGeometry;
  strutMat: THREE.MeshStandardMaterial;
  // Magnetometer boom + sensor
  magBoomGeo: THREE.CylinderGeometry;
  magSensorGeo: THREE.SphereGeometry;
  magSensorMat: THREE.MeshStandardMaterial;
  // Thrusters
  thrusterGeo: THREE.ConeGeometry;
  thrusterMat: THREE.MeshStandardMaterial;
  // Lights (geometry only — material is per-satellite for color/blink)
  statusGeo: THREE.SphereGeometry;
  navGeo: THREE.SphereGeometry;
  // Precomputed static transforms (identical across all satellites)
  strutTransforms: StrutTransform[];
  thrusterPlacements: ThrusterPlacement[];
}

/**
 * Satellites — 7 data-driven satellites orbiting Earth, each built from a
 * full anatomy: octagonal gold-MLI bus with radiator + instrument cutouts,
 * dual two-panel solar arrays with a procedural cell texture and deployment
 * booms/hinges, a parabolic main dish with feed horn + tripod support, a
 * side-mounted high-gain antenna, a magnetometer boom, 8 attitude thrusters,
 * a pulsing pillar-colored status light, and red/green blinking nav lights.
 *
 * Geometry + materials are shared across all satellites for performance.
 */
export function Satellites() {
  const isTouch = useObservatoryStore((s) => s.isTouch);

  const shared = useMemo<SharedResources>(() => {
    // --- Procedural textures (browser-only; this component is client-side) ---
    const cellTex = makeSolarCellTexture();
    const mliTex = makeMLITexture();

    // --- Materials ---
    const busMat = new THREE.MeshStandardMaterial({
      color: '#B8860B',
      map: mliTex,
      bumpMap: mliTex,
      bumpScale: 0.02,
      roughness: 0.5,
      metalness: 0.8,
    });
    const topDeckMat = new THREE.MeshStandardMaterial({
      color: '#6B6B70',
      roughness: 0.4,
      metalness: 0.7,
    });
    const instrumentMat = new THREE.MeshStandardMaterial({
      color: '#0E0E0E',
      roughness: 0.8,
      metalness: 0.3,
    });
    const radiatorMat = new THREE.MeshStandardMaterial({
      color: '#F0F0F0',
      roughness: 0.3,
      metalness: 0.2,
    });
    const hingeMat = new THREE.MeshStandardMaterial({
      color: '#555555',
      roughness: 0.5,
      metalness: 0.7,
    });
    const panelFrontMat = new THREE.MeshStandardMaterial({
      map: cellTex,
      color: '#2A3F6E',
      emissive: '#1A2A4E',
      emissiveIntensity: 0.18,
      roughness: 0.35,
      metalness: 0.55,
    });
    const panelBackMat = new THREE.MeshStandardMaterial({
      color: '#9A9A9A',
      roughness: 0.5,
      metalness: 0.5,
    });
    const panelEdgeMat = new THREE.MeshStandardMaterial({
      color: '#666666',
      roughness: 0.5,
      metalness: 0.6,
    });
    const dishMat = new THREE.MeshStandardMaterial({
      color: '#D0D0D4',
      roughness: 0.4,
      metalness: 0.7,
      side: THREE.DoubleSide,
    });
    const feedMat = new THREE.MeshStandardMaterial({
      color: '#2A2A2A',
      roughness: 0.6,
      metalness: 0.5,
    });
    const strutMat = new THREE.MeshStandardMaterial({
      color: '#888888',
      roughness: 0.4,
      metalness: 0.7,
    });
    const magSensorMat = new THREE.MeshStandardMaterial({
      color: '#3A3A3A',
      emissive: '#222244',
      emissiveIntensity: 0.4,
      roughness: 0.5,
      metalness: 0.4,
    });
    const thrusterMat = new THREE.MeshStandardMaterial({
      color: '#2A2A2A',
      roughness: 0.7,
      metalness: 0.4,
    });

    // BoxGeometry face order in three.js: [+X, -X, +Y, -Y, +Z, -Z].
    // Front face (+Y) gets the cell texture, back face (-Y) gets the silver
    // substrate, the four thin edges share a grey edge material.
    const panelMaterials: THREE.Material[] = [
      panelEdgeMat,
      panelEdgeMat,
      panelFrontMat,
      panelBackMat,
      panelEdgeMat,
      panelEdgeMat,
    ];

    return {
      busGeo: new THREE.CylinderGeometry(0.35, 0.35, 0.7, 8),
      busMat,
      topDeckGeo: new THREE.CylinderGeometry(0.36, 0.36, 0.03, 8),
      topDeckMat,
      instrumentGeo: new THREE.BoxGeometry(0.08, 0.06, 0.02),
      instrumentMat,
      radiatorGeo: new THREE.BoxGeometry(0.3, 0.02, 0.25),
      radiatorMat,
      boomGeo: new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8),
      hingeGeo: new THREE.CylinderGeometry(0.06, 0.06, 0.1, 8),
      hingeMat,
      panelGeo: new THREE.BoxGeometry(0.8, 0.02, 0.5),
      panelMaterials,
      dishGeo: buildParabolicDish(0.3, 0.1, 14, 36),
      hgDishGeo: buildParabolicDish(0.15, 0.05, 10, 24),
      dishMat,
      feedGeo: new THREE.CylinderGeometry(0.04, 0.04, 0.15, 10),
      feedTopGeo: new THREE.SphereGeometry(0.05, 12, 10),
      feedMat,
      // Strut length ≈ sqrt(0.3² + 0.15²) ≈ 0.335 (rim→feed-top distance).
      strutGeo: new THREE.CylinderGeometry(0.008, 0.008, 0.335, 6),
      strutMat,
      magBoomGeo: new THREE.CylinderGeometry(0.012, 0.012, 0.8, 6),
      magSensorGeo: new THREE.SphereGeometry(0.05, 12, 10),
      magSensorMat,
      thrusterGeo: new THREE.ConeGeometry(0.05, 0.1, 8),
      thrusterMat,
      statusGeo: new THREE.SphereGeometry(0.03, 10, 10),
      navGeo: new THREE.SphereGeometry(0.02, 8, 8),
      strutTransforms: computeStrutTransforms(0, 0.3, 0.15),
      thrusterPlacements: buildThrusterPlacements(),
    };
  }, []);

  // Join orbit params with project data (preserving orbit order).
  const satellites = useMemo(() => {
    return SATELLITE_ORBITS.map((orbit) => {
      const project = projects.find((p) => p.id === orbit.id);
      if (!project) return null;
      return { project, orbit };
    }).filter(
      (s): s is { project: Project; orbit: (typeof SATELLITE_ORBITS)[number] } =>
        s !== null,
    );
  }, []);

  return (
    <group>
      {satellites.map(({ project, orbit }, i) => (
        <SatelliteModel
          key={project.id}
          project={project}
          orbit={orbit}
          index={i}
          shared={shared}
          showLight={!isTouch}
        />
      ))}
      {/* Orbit rings — thin annuli in each satellite's orbital plane. */}
      {satellites.map(({ project, orbit }) => (
        <mesh
          key={`ring-${project.id}`}
          rotation={[
            -Math.PI / 2 - Math.atan(orbit.inclination),
            0,
            0,
          ]}
        >
          <ringGeometry
            args={[orbit.radius - 0.02, orbit.radius + 0.02, 128]}
          />
          <meshBasicMaterial
            color={pillarColorHex(project.pillar)}
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

interface SatelliteModelProps {
  project: Project;
  orbit: { radius: number; inclination: number; speed: number; phase: number };
  index: number;
  shared: SharedResources;
  showLight: boolean;
}

function SatelliteModel({
  project,
  orbit,
  index,
  shared,
  showLight,
}: SatelliteModelProps) {
  // Outer group: positioned along the orbit each frame.
  const groupRef = useRef<THREE.Group>(null);
  // Inner group: re-oriented to face Earth (lookAt origin) each frame.
  const innerRef = useRef<THREE.Group>(null);
  // Per-satellite light materials — pulsing/blinking each frame.
  const statusMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const navRedMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const navGreenMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const pillarHex = pillarColorHex(project.pillar);
  // Per-satellite blink phase offset (nav lights).
  const navBlinkOffset = index * 0.13;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = t * orbit.speed + orbit.phase;
    const x = orbit.radius * Math.cos(angle);
    const z = orbit.radius * Math.sin(angle);
    const y = orbit.radius * orbit.inclination * Math.sin(angle);
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
    // Re-orient the satellite so its +Z faces Earth (nadir-pointing).
    if (innerRef.current) {
      innerRef.current.lookAt(0, 0, 0);
    }
    // Status light pulse — 2s period, phase-offset per satellite.
    if (statusMatRef.current) {
      statusMatRef.current.emissiveIntensity = 0.5 + 0.5 * Math.sin(t * 2 + index);
    }
    // Nav lights blink (1s period, offset per satellite) — bright when on,
    // dim floor when off so they remain visible at distance.
    const blinkOn = (t + navBlinkOffset) % 1 < 0.5;
    const navIntensity = blinkOn ? 1.5 : 0.08;
    if (navRedMatRef.current) {
      navRedMatRef.current.emissiveIntensity = navIntensity;
    }
    if (navGreenMatRef.current) {
      navGreenMatRef.current.emissiveIntensity = navIntensity;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        {/* =================== Bus / body =================== */}
        {/* Octagonal prism with wrinkled gold MLI blanket */}
        <mesh geometry={shared.busGeo} material={shared.busMat} />

        {/* Top equipment deck — thin grey disc on top of the bus */}
        <mesh
          geometry={shared.topDeckGeo}
          material={shared.topDeckMat}
          position={[0, 0.365, 0]}
        />

        {/* Thermal radiator — distinct white panel on +Z face */}
        <mesh
          geometry={shared.radiatorGeo}
          material={shared.radiatorMat}
          position={[0, 0.05, 0.36]}
        />

        {/* Instrument cutouts — dark sensor ports on bus sides */}
        <mesh
          geometry={shared.instrumentGeo}
          material={shared.instrumentMat}
          position={[0.36, 0.1, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          geometry={shared.instrumentGeo}
          material={shared.instrumentMat}
          position={[0.36, -0.12, 0.12]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          geometry={shared.instrumentGeo}
          material={shared.instrumentMat}
          position={[0, 0.15, -0.36]}
        />

        {/* =================== Solar array — +X side =================== */}
        {/* Deployment boom — grey cylinder along X */}
        <group position={[0.65, 0, 0]}>
          <mesh
            geometry={shared.boomGeo}
            material={shared.strutMat}
            rotation={[0, 0, Math.PI / 2]}
          />
        </group>
        {/* Hinge + two-panel array */}
        <group position={[0.95, 0, 0]}>
          {/* Hinge mechanism — darker grey cylinder along Z */}
          <mesh
            geometry={shared.hingeGeo}
            material={shared.hingeMat}
            rotation={[Math.PI / 2, 0, 0]}
          />
          {/* Inner panel (closer to bus) */}
          <mesh
            geometry={shared.panelGeo}
            material={shared.panelMaterials}
            position={[0.4, 0, 0]}
          />
          {/* Outer panel (with small hinge gap) */}
          <mesh
            geometry={shared.panelGeo}
            material={shared.panelMaterials}
            position={[1.22, 0, 0]}
          />
          {/* Nav light — red, on +X panel tip */}
          <mesh geometry={shared.navGeo} position={[1.62, 0.012, 0]}>
            <meshStandardMaterial
              ref={navRedMatRef}
              color="#4A0000"
              emissive="#FF0000"
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* =================== Solar array — -X side (mirrored) =================== */}
        <group position={[-0.65, 0, 0]}>
          <mesh
            geometry={shared.boomGeo}
            material={shared.strutMat}
            rotation={[0, 0, Math.PI / 2]}
          />
        </group>
        <group position={[-0.95, 0, 0]}>
          <mesh
            geometry={shared.hingeGeo}
            material={shared.hingeMat}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={shared.panelGeo}
            material={shared.panelMaterials}
            position={[-0.4, 0, 0]}
          />
          <mesh
            geometry={shared.panelGeo}
            material={shared.panelMaterials}
            position={[-1.22, 0, 0]}
          />
          {/* Nav light — green, on -X panel tip */}
          <mesh geometry={shared.navGeo} position={[-1.62, 0.012, 0]}>
            <meshStandardMaterial
              ref={navGreenMatRef}
              color="#003A00"
              emissive="#00FF00"
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* =================== Main antenna — parabolic dish on top =================== */}
        <group position={[0, 0.5, 0]}>
          {/* Dish — concave-up paraboloid (rim at y=0, depth -0.1) */}
          <mesh geometry={shared.dishGeo} material={shared.dishMat} />
          {/* Feed horn — cylinder pointing up from dish center */}
          <mesh
            geometry={shared.feedGeo}
            material={shared.feedMat}
            position={[0, 0.075, 0]}
          />
          {/* Feed horn top — small sphere at the focal point */}
          <mesh
            geometry={shared.feedTopGeo}
            material={shared.feedMat}
            position={[0, 0.15, 0]}
          />
          {/* Feed support struts — tripod from rim to feed top */}
          {shared.strutTransforms.map((s, i) => (
            <mesh
              key={`strut-${i}`}
              geometry={shared.strutGeo}
              material={shared.strutMat}
              position={s.position}
              quaternion={s.quaternion}
            />
          ))}
        </group>

        {/* =================== High-gain antenna — small dish on +X face =================== */}
        {/* Rotate -90° around Z so concave side faces +X (outward). */}
        <group position={[0.35, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh geometry={shared.hgDishGeo} material={shared.dishMat} />
          {/* Small feed horn pointing +X (locally +Y after rotation) */}
          <mesh
            geometry={shared.feedGeo}
            material={shared.feedMat}
            position={[0, 0.08, 0]}
            scale={[0.6, 0.7, 0.6]}
          />
        </group>

        {/* =================== Magnetometer boom + sensor =================== */}
        {/* Offset to +X side of the top deck so it clears the main dish. */}
        <mesh
          geometry={shared.magBoomGeo}
          material={shared.strutMat}
          position={[0.2, 1.0, 0]}
        />
        <mesh
          geometry={shared.magSensorGeo}
          material={shared.magSensorMat}
          position={[0.2, 1.4, 0]}
        />

        {/* =================== Attitude thrusters — 8 cones at bottom edges =================== */}
        {shared.thrusterPlacements.map((p, i) => (
          <mesh
            key={`thruster-${i}`}
            geometry={shared.thrusterGeo}
            material={shared.thrusterMat}
            position={p.position}
            rotation={p.rotation}
          />
        ))}

        {/* =================== Status light — pillar-colored, pulsing =================== */}
        <mesh geometry={shared.statusGeo} position={[0.15, 0.39, 0.15]}>
          <meshStandardMaterial
            ref={statusMatRef}
            color={pillarHex}
            emissive={pillarHex}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>

        {/* =================== Project label (drei Text) =================== */}
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.18}
          color="#F5F0E1"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#0A1530"
          letterSpacing={0.02}
        >
          {project.title}
        </Text>
      </group>

      {/* Per-satellite point light (skipped on touch for performance) */}
      {showLight && (
        <pointLight color={pillarHex} intensity={0.4} distance={3} decay={2} />
      )}
    </group>
  );
}
