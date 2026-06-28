'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectPositions } from '@/data/projects';
import { PILLAR_COLORS } from '../scene-constants';

/**
 * HamaraRozgarNebula — particle cloud + 4 pulsing "agent" points.
 * Per phase12_project_presentation.md §4.1.
 *
 * 5000 particles in a gaussian distribution, sunset orange core, ivory edges.
 * Additive blending. 4 agent spheres pulse in sequence (IntentAgent →
 * DiscoveryAgent → PricingAgent → BookingAgent, 0.5s each).
 */
export function HamaraRozgarNebula() {
  const pointsRef = useRef<THREE.Points>(null);
  const agentRefs = useRef<Array<THREE.Mesh | null>>([null, null, null, null]);
  const [x, y, z] = projectPositions['hamara-rozgar'];

  const PARTICLE_COUNT = 5000;

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Gaussian-ish distribution (sum of 3 uniforms per axis).
      const gx =
        (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
      const gy =
        (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
      const gz =
        (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
      const r = 1.6 + Math.random() * 0.8;
      arr[i * 3] = gx * r * 2;
      arr[i * 3 + 1] = gy * r * 1.4;
      arr[i * 3 + 2] = gz * r * 2;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    const core = new THREE.Color('#FF6B35');
    const edge = new THREE.Color('#F5F0E1');
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distance from center → mix core (sunset) to edge (ivory).
      const dx = positions[i * 3];
      const dy = positions[i * 3 + 1];
      const dz = positions[i * 3 + 2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const t = Math.min(1, d / 3.5);
      const c = core.clone().lerp(edge, t);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [positions]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  // Agent positions in the nebula — top-left, top-right, bottom-right, bottom-left.
  const agentPositions: [number, number, number][] = [
    [-1.0, 0.8, 0.3],
    [1.0, 0.8, 0.3],
    [1.0, -0.8, 0.3],
    [-1.0, -0.8, 0.3],
  ];

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.z += delta * 0.01;
    }

    // Agent pulse cycle: 0.5s each → 2s full cycle.
    const cycle = (uniforms.uTime.value % 2.0) / 2.0;
    agentRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const slot = i / 4;
      const local = (cycle - slot + 1) % 1; // 0..1 within this agent's window
      // Bright flash 0..0.25, fade 0.25..1.
      const pulse =
        local < 0.25
          ? 1.0 - local / 0.25 * 0.2
          : Math.max(0.15, 1.0 - (local - 0.25) / 0.75 * 0.85);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse;
      const scale = 1.0 + pulse * 0.6;
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group position={[x, y, z]}>
      {/* Particle cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={/* glsl */ `
            attribute vec3 color;
            varying vec3 vColor;
            uniform float uTime;
            void main() {
              vColor = color;
              vec3 p = position;
              // Slow drift.
              p.x += sin(uTime * 0.5 + position.y * 1.5) * 0.05;
              p.y += cos(uTime * 0.4 + position.x * 1.5) * 0.05;
              vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
              gl_PointSize = 4.0 * (40.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={/* glsl */ `
            varying vec3 vColor;
            void main() {
              vec2 c = gl_PointCoord - 0.5;
              float d = length(c);
              if (d > 0.5) discard;
              float a = smoothstep(0.5, 0.0, d) * 0.5;
              gl_FragColor = vec4(vColor, a);
            }
          `}
        />
      </points>

      {/* 4 pulsing agent spheres */}
      {agentPositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            agentRefs.current[i] = el;
          }}
          position={pos}
        >
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial
            color={PILLAR_COLORS.ai}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Pillar key light — AI: sunset orange, intensity 1.5, distance 18 */}
      <pointLight
        color={PILLAR_COLORS.ai}
        intensity={1.5}
        distance={18}
        decay={2}
      />
    </group>
  );
}
