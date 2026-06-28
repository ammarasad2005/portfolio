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

/** Shared geometries + materials — created once, reused across all 7 satellites. */
interface SharedResources {
  busGeo: THREE.CylinderGeometry;
  busMat: THREE.MeshStandardMaterial;
  extenderGeo: THREE.CylinderGeometry;
  panelGeo: THREE.BoxGeometry;
  panelMat: THREE.MeshStandardMaterial;
  cellLineGeo: THREE.BoxGeometry;
  cellLineMat: THREE.MeshStandardMaterial;
  strutMat: THREE.MeshStandardMaterial;
  dishGeo: THREE.SphereGeometry;
  dishMat: THREE.MeshStandardMaterial;
  boomGeo: THREE.CylinderGeometry;
  sensorGeo: THREE.SphereGeometry;
  sensorMat: THREE.MeshStandardMaterial;
  thrusterGeo: THREE.ConeGeometry;
  thrusterMat: THREE.MeshStandardMaterial;
  radiatorGeo: THREE.BoxGeometry;
  radiatorMat: THREE.MeshStandardMaterial;
}

/**
 * Satellites — 7 data-driven satellites orbiting Earth, each built from a
 * full anatomy: hexagonal bus (MLI gold), dual solar panel arrays with cell
 * grid lines, parabolic antenna dish, magnetometer boom + sensor, attitude
 * thrusters, thermal radiator, and a pulsing pillar-colored status light.
 *
 * Geometry + materials are shared across all satellites for performance.
 */
export function Satellites() {
  const isTouch = useObservatoryStore((s) => s.isTouch);

  const shared = useMemo<SharedResources>(
    () => ({
      // Bus — hexagonal prism, gold MLI thermal insulation.
      busGeo: new THREE.CylinderGeometry(0.25, 0.25, 0.5, 6),
      busMat: new THREE.MeshStandardMaterial({
        color: '#B8860B',
        roughness: 0.4,
        metalness: 0.7,
      }),
      // Extender strut connecting bus to solar panel.
      extenderGeo: new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8),
      // Solar panel substrate — dark blue.
      panelGeo: new THREE.BoxGeometry(0.9, 0.02, 0.4),
      panelMat: new THREE.MeshStandardMaterial({
        color: '#1B2A4E',
        roughness: 0.3,
        metalness: 0.6,
      }),
      // Solar cell grid lines (thin emissive strips on the panel surface).
      cellLineGeo: new THREE.BoxGeometry(0.9, 0.002, 0.02),
      cellLineMat: new THREE.MeshStandardMaterial({
        color: '#4A6FA5',
        emissive: '#4A6FA5',
        emissiveIntensity: 0.4,
        roughness: 0.4,
      }),
      // Grey structural struts (extenders, booms).
      strutMat: new THREE.MeshStandardMaterial({
        color: '#888888',
        roughness: 0.5,
        metalness: 0.6,
      }),
      // Antenna dish — flattened sphere.
      dishGeo: new THREE.SphereGeometry(0.2, 16, 12),
      dishMat: new THREE.MeshStandardMaterial({
        color: '#C4C4C8',
        roughness: 0.6,
        metalness: 0.5,
        side: THREE.DoubleSide,
      }),
      // Magnetometer boom.
      boomGeo: new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8),
      sensorGeo: new THREE.SphereGeometry(0.04, 10, 10),
      sensorMat: new THREE.MeshStandardMaterial({
        color: '#AAAAAA',
        roughness: 0.4,
        metalness: 0.5,
      }),
      // Attitude thrusters — small dark cones.
      thrusterGeo: new THREE.ConeGeometry(0.04, 0.08, 8),
      thrusterMat: new THREE.MeshStandardMaterial({
        color: '#333333',
        roughness: 0.7,
        metalness: 0.4,
      }),
      // Thermal radiator — small white panel.
      radiatorGeo: new THREE.BoxGeometry(0.2, 0.02, 0.2),
      radiatorMat: new THREE.MeshStandardMaterial({
        color: '#EEEEEE',
        roughness: 0.5,
        metalness: 0.3,
      }),
    }),
    [],
  );

  // Join orbit params with project data (preserving orbit order).
  const satellites = useMemo(() => {
    return SATELLITE_ORBITS.map((orbit) => {
      const project = projects.find((p) => p.id === orbit.id);
      if (!project) return null;
      return { project, orbit };
    }).filter((s): s is { project: Project; orbit: (typeof SATELLITE_ORBITS)[number] } => s !== null);
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
  // Status light material — emissive intensity pulses each frame.
  const statusMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const pillarHex = pillarColorHex(project.pillar);
  const cellLineOffsets = [-0.3, -0.1, 0.1, 0.3];

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
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        {/* Bus — hexagonal prism, gold MLI */}
        <mesh geometry={shared.busGeo} material={shared.busMat} />

        {/* Solar panel assembly — +X side */}
        <group position={[0.5, 0, 0]}>
          {/* Extender strut (cylinder rotated to lie along X) */}
          <mesh
            geometry={shared.extenderGeo}
            material={shared.strutMat}
            rotation={[0, 0, Math.PI / 2]}
          />
          {/* Panel substrate */}
          <mesh geometry={shared.panelGeo} material={shared.panelMat} position={[0.45, 0, 0]} />
          {/* Solar cell grid lines */}
          {cellLineOffsets.map((cz, i) => (
            <mesh
              key={`px-${i}`}
              geometry={shared.cellLineGeo}
              material={shared.cellLineMat}
              position={[0.45, 0.012, cz]}
            />
          ))}
        </group>

        {/* Solar panel assembly — -X side (mirrored) */}
        <group position={[-0.5, 0, 0]}>
          <mesh
            geometry={shared.extenderGeo}
            material={shared.strutMat}
            rotation={[0, 0, Math.PI / 2]}
          />
          <mesh geometry={shared.panelGeo} material={shared.panelMat} position={[-0.45, 0, 0]} />
          {cellLineOffsets.map((cz, i) => (
            <mesh
              key={`nx-${i}`}
              geometry={shared.cellLineGeo}
              material={shared.cellLineMat}
              position={[-0.45, 0.012, cz]}
            />
          ))}
        </group>

        {/* Antenna dish — flattened sphere on top of the bus */}
        <mesh
          geometry={shared.dishGeo}
          material={shared.dishMat}
          position={[0, 0.35, 0]}
          scale={[1, 0.25, 1]}
        />

        {/* Magnetometer boom + sensor sphere */}
        <mesh geometry={shared.boomGeo} material={shared.strutMat} position={[0, 0.6, 0]} />
        <mesh geometry={shared.sensorGeo} material={shared.sensorMat} position={[0, 0.9, 0]} />

        {/* Attitude thrusters — 3 small cones on the bottom */}
        <mesh
          geometry={shared.thrusterGeo}
          material={shared.thrusterMat}
          position={[0, -0.3, 0.1]}
          rotation={[Math.PI, 0, 0]}
        />
        <mesh
          geometry={shared.thrusterGeo}
          material={shared.thrusterMat}
          position={[0.1, -0.3, 0]}
          rotation={[Math.PI, 0, 0]}
        />
        <mesh
          geometry={shared.thrusterGeo}
          material={shared.thrusterMat}
          position={[-0.1, -0.3, 0]}
          rotation={[Math.PI, 0, 0]}
        />

        {/* Thermal radiator — small white panel on +Z face */}
        <mesh geometry={shared.radiatorGeo} material={shared.radiatorMat} position={[0, 0, 0.25]} />

        {/* Status light — pillar-colored, pulsing */}
        <mesh position={[0, 0.15, 0.2]}>
          <sphereGeometry args={[0.025, 10, 10]} />
          <meshStandardMaterial
            ref={statusMatRef}
            color={pillarHex}
            emissive={pillarHex}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>

        {/* Project label (drei Text) */}
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.15}
          color="#F5F0E1"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.006}
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
