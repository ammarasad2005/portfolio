# High-Fidelity Satellites — Work Record

**Task ID:** high-fidelity-satellites
**Agent:** full-stack-developer
**Task:** Rebuild satellite 3D models with real satellite anatomy for higher fidelity.

## Context

The previous satellites (built by `space-journey-actual-build`) had the right
component list but read as generic shapes at viewing distance: a 6-sided gold
cylinder, a flat 0.9×0.4 panel with 4 thin lines, a squished sphere for the
antenna, and 3 thrusters. The user said the design "lacks fidelity to that of
an actual satellite."

## Verification of starting state

- Read `src/components/three/satellites.tsx` (331 lines, hexagonal bus 0.25r,
  single-panel 0.9×0.4 per side, sphere-antenna scaled [1,0.25,1], 3 thrusters).
- Read `src/data/projects.ts` (7 projects, each with `id` + `pillar`).
- Read `src/lib/store.ts` (`isTouch` flag from Zustand store).
- Read `src/components/three/scene-constants.ts` (SATELLITE_ORBITS lives in
  satellites.tsx itself, not scene-constants — preserved there).
- Read `src/components/three/scene.tsx` (imports `Satellites` — kept).
- Read `src/app/page.tsx` (`Scene` is `dynamic(..., { ssr: false })` — so
  `document` is available in `useMemo`; CanvasTexture creation is safe).
- Read prior work records in `/agent-ctx/` for context on the existing scene.

## Work performed

### Rewrote `src/components/three/satellites.tsx`

Kept the data-driven structure (7 satellites, SATELLITE_ORBITS, pillar colors,
labels, orbit rings, point lights, touch-skipped lights, `'use client'`).
Rebuilt the satellite model itself with real satellite anatomy:

#### Bus / body (was: plain 6-sided gold cylinder)
- **Octagonal prism** `CylinderGeometry(0.35, 0.35, 0.7, 8)` — 8-sided, larger.
- **MLI blanket texture** — procedural `CanvasTexture` (`makeMLITexture`):
  base gold #B8860B with 90 darker-gold wrinkle streaks, 45 lighter specular
  glints, 25 darker depth patches. Used as both `map` and `bumpMap` (bumpScale
  0.02) for a wrinkled-foil look. Roughness 0.5, metalness 0.8.
- **Top equipment deck** — thin grey disc `CylinderGeometry(0.36, 0.36, 0.03, 8)`
  on top of the bus.
- **Thermal radiator** — distinct white panel `BoxGeometry(0.3, 0.02, 0.25)`
  on the +Z face, clearly different from the dark-blue solar panels.
- **Instrument cutouts** — 3 dark sensor-port boxes
  `BoxGeometry(0.08, 0.06, 0.02)` on different bus faces.

#### Solar arrays (was: 0.9×0.4 flat box with 4 thin lines)
- **Two arrays** on ±X sides, each with:
  - **Deployment boom** — `CylinderGeometry(0.04, 0.04, 0.6, 8)`, grey #888888.
  - **Hinge mechanism** — `CylinderGeometry(0.06, 0.06, 0.1, 8)`, darker #555555,
    perpendicular to the boom.
  - **Two-panel array (hinged look)** — two `BoxGeometry(0.8, 0.02, 0.5)`
    panels per side, with a small visual hinge gap between them. Total panel
    width per side ≈ 1.6 units (vs 0.9 before).
  - **Procedural solar-cell texture** (`makeSolarCellTexture`): 256×160 canvas
    with a 4×3 grid of dark-blue iridescent cells (diagonal gradient
    #1B2A4E → #2E4576 → #162547), thin gold #D4A017 grid lines between cells,
    lighter-blue bus bars inside each cell, and a top-edge specular highlight.
    Mapped to the +Y face of each panel via a 6-material array.
  - **Panel back** — light silver-grey #9A9A9A substrate on the −Y face.
  - **Panel edges** — grey #666666 on the 4 thin sides.
- Total span (both sides + bus): ~5.1 units (vs ~2.5 before). The satellites
  now have real visual presence at orbit radius 9–14.

#### Main antenna (was: squished sphere)
- **Parabolic dish** via `LatheGeometry` (`buildParabolicDish`): true
  paraboloid, radius 0.3, depth 0.1, concave-up. 14 profile segments × 36
  radial segments. Material: light grey #D0D0D4, roughness 0.4, metalness 0.7,
  `DoubleSide` so the concave interior is visible.
- **Feed horn** — `CylinderGeometry(0.04, 0.04, 0.15)` pointing up from the
  dish center, dark grey #2A2A2A.
- **Feed horn top** — small `SphereGeometry(0.05)` at the focal point.
- **Feed support struts** — 3 thin `CylinderGeometry(0.008, 0.008, 0.335)`
  forming a tripod from the dish rim to the feed-horn top. Each strut's
  position + quaternion is precomputed once in `computeStrutTransforms`
  (shared across all satellites).

#### High-gain antenna (NEW — didn't exist before)
- Smaller parabolic dish `buildParabolicDish(0.15, 0.05)` on the +X face,
  rotated −90° around Z so the concave side faces +X (outward).
- Small scaled feed horn (60% radius, 70% length) pointing +X.

#### Magnetometer boom + sensor (was: 0.6-length boom, 0.04 sensor)
- Long thin `CylinderGeometry(0.012, 0.012, 0.8)` boom, offset to +X side of
  the top deck so it clears the main dish (position [0.2, 1.0, 0]).
- Sensor `SphereGeometry(0.05)` at the end with a slight bluish emissive
  (#222244 @ 0.4) so it reads as an active instrument.

#### Attitude thrusters (was: 3 cones)
- **8 thrusters** (2 per cardinal face × 4 faces) at the bottom edges of the
  bus, apex pointing outward. Precomputed placements in
  `buildThrusterPlacements` — positions and rotations shared across all sats.

#### Lights
- **Status light** — small `SphereGeometry(0.03)` on the top deck, per-sat
  material with pillar-color emissive, pulses `0.5 + 0.5·sin(t·2 + index)`
  (kept from before).
- **Navigation lights (NEW)** — red sphere on the +X panel tip, green sphere
  on the −X panel tip. Blink (1s period, per-satellite offset
  `index * 0.13`): bright 1.5 when on, dim floor 0.08 when off so they stay
  visible at distance. `toneMapped={false}` so colors stay saturated.

#### Label
- Moved to `[0, 1.8, 0]` (from 1.2) to clear the larger model.
- Font size 0.18 (from 0.15). Outline width 0.008 (from 0.006).

### Performance

- All geometries + most materials shared across 7 satellites via one
  `useMemo<SharedResources>` (empty deps — created once).
- Static transforms (strut tripod, thruster placements) precomputed once and
  shared.
- `panelMaterials` array stored on `shared` so the array reference is stable
  across renders (no R3F re-attachment).
- Per-satellite materials created inline (status + 2 nav lights) — 3 × 7 = 21
  lightweight materials, needed for independent pulse/blink.
- `useFrame` loop only touches: position, lookAt, and 3 emissiveIntensity
  values per satellite. No geometry recreation, no material creation.

### Polycount estimate (per satellite)
- Bus (octagonal cylinder, 8 seg, 1 seg height): ~32 tris
- Top deck (8 seg disc): ~16 tris
- 3 instrument cutouts (12 tris each): ~36 tris
- Radiator box: ~12 tris
- 2 booms + 2 hinges (8 seg cylinders): ~64 tris
- 4 panels (boxes): ~48 tris
- Main dish (14×36 lathe): ~1008 tris
- Feed + top sphere + 3 struts: ~120 tris
- High-gain dish (10×24 lathe): ~480 tris
- High-gain feed: ~20 tris
- Mag boom + sensor: ~60 tris
- 8 thrusters (8 seg cones): ~128 tris
- 3 light spheres: ~120 tris
- Total ≈ **~2150 tris per satellite** (within the 2000–3000 target).
- 7 satellites ≈ **~15,000 tris total**.

## Verification

1. **Lint:** `bun run lint` → exit 0, no errors, no warnings.
2. **Dev log:** latest entries show `✓ Compiled in 138ms` then `GET / 200 in 69ms` — clean compile, no module-not-found, no runtime errors. (The earlier `nebula-background` / `observatory` module-not-found errors are stale — left over from before the previous agent fixed `scene.tsx`; the current `scene.tsx` imports `Satellites` correctly.)
3. **HTTP check:** `curl -s -o /dev/null -w "HTTP %{http_code}" http://localhost:3000/` → `HTTP 200`.
4. **Export preserved:** `export function Satellites()` is the only named export; `scene.tsx`'s `import { Satellites } from './satellites'` still resolves.
5. **Imports preserved:** `useMemo`, `useRef`, `useFrame`, `Text` (drei), `THREE`, `projects` + `Project`, `useObservatoryStore` — all still imported and used.

## Notes for downstream agents

- The solar-cell and MLI textures are drawn to a `<canvas>` via
  `document.createElement`. This is safe because `Scene` is dynamically
  imported with `ssr: false` in `page.tsx`, so `Satellites` only renders on
  the client.
- The dish material uses `DoubleSide` so the concave interior renders — this
  roughly doubles the dish's draw cost but is necessary for the paraboloid to
  read correctly from any orbit angle.
- The high-gain antenna group is rotated −90° around Z to face +X. If a
  downstream agent wants the high-gain on a different face, change the group
  rotation (Z axis = face in XY plane; X axis = face in YZ plane).
- Nav-light blink uses `(t + offset) % 1 < 0.5` — a hard on/off, not a smooth
  pulse. This matches real aircraft-style beacon behavior. To soften it,
  swap the ternary for a `sin` like the status light.
- The magnetometer boom is offset to +X (position [0.2, 1.0, 0]) instead of
  the spec's [0, 0.9, 0] to avoid clipping through the main dish rim at
  y=0.5. Visually equivalent — a long thin boom sticking up from the top
  deck.
