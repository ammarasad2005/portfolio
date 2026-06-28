# Phase 10 — 3D Experience

> Scene hierarchy, cameras, lighting, shaders, particles, post-processing, environmental storytelling, transitions, VFX.

---

## 1. Scene Hierarchy (Three.js scene graph)

```
Scene (root)
├── AmbientEnvironment
│   ├── Starfield (200–400 point sprites, sparse, high-contrast)
│   ├── NebulaGradient (background sphere with gradient shader)
│   ├── DistantGalaxies (3–5 sprite planes, very low opacity)
│   └── AmbientLight (low intensity, navy tint)
│
├── Observatory (the visitor's "home" structure)
│   ├── Dome (torus + sphere sections, opens/closes for Beat 1 + 8)
│   ├── Telescope (cylinder + lens mesh, rotates to point at projects)
│   ├── Chair (empty — visitor is the observer)
│   ├── Desk (small box mesh)
│   ├── Notebook (plane with handwriting texture, opens in Beat 2 + 6)
│   └── Headphones (small mesh, sits on desk in Beat 6)
│
├── ProjectBodies (the celestial bodies, one per project)
│   ├── Exam-Table_Planet (sphere with ring, ivory tint)
│   ├── Drama-Ghar_DoublePlanet (two spheres orbiting each other)
│   ├── hamara-rozgar_Nebula (particle cloud + 4 agent-points)
│   ├── glucoguard-plus_Star (bright point + 4-pulse halo)
│   ├── Internship-Finder_Satellite (mesh + blinking light)
│   ├── gcr-resources-fetch_Comet (sphere + particle trail)
│   └── WayFinder_Speck (small dim point, distant)
│
├── StackMap (Beat 5 holographic grid)
│   └── 14 StackStars (variable brightness based on repo frequency)
│
├── CameraRig (the camera + its spline path)
│   ├── Camera (perspective camera)
│   ├── CameraTarget (lookAt target, eases between focal points)
│   └── CameraPath (Catmull-Rom curve, 8 control points)
│
└── PostProcessing (only on desktop, see §6)
    ├── BloomPass (subtle, threshold high)
    ├── DOFPass (only during focus pulls)
    ├── GrainPass (very subtle, animated noise)
    └── VignettePass (subtle darkening at edges)
```

---

## 2. Cameras

### 2.1 Primary camera
- `PerspectiveCamera`, fov 50, aspect = window aspect, near 0.1, far 2000.
- Position bound to a Catmull-Rom curve through 8 control points (one per beat).
- LookAt target eases between focal points within each beat.
- FOV animates: 50 (default) → 35 (focus on a project, intimacy) → 70 (travel between beats, vastness).

### 2.2 Control points (camera path)
| Beat | Position (x, y, z) | LookAt | FOV | Notes |
|---|---|---|---|---|
| 1. Arrival | (0, 0, 30) | Observatory | 50 | Far back, dome closes |
| 2. Introduction | (0, 2, 15) | Chair + notebook | 45 | Inside dome, eye-level |
| 3. Exploration | (0, 4, 10) | Telescope eyepiece | 50 | Looking through lens |
| 4. Projects | (varies per project) | Current project body | 35 | Focus pull between bodies |
| 5. Technical | (0, 8, 25) | Stack map center | 70 | Pulled back, wide FOV |
| 6. Personality | (0, 2, 12) | Desk + headphones | 45 | Back inside observatory |
| 7. Future | (0, 6, 35) | Distant sky | 60 | Looking outward |
| 8. Contact | (0, 0, 30) | Observatory (dawn) | 50 | Same as Beat 1, dawn light |

### 2.3 Idle drift
- When scroll velocity is 0 for >2 seconds:
  - Camera position drifts ±0.3 units on a slow sine wave (period 8s).
  - Camera target drifts ±0.1 units on a sine wave (period 6s, offset phase).
  - Subtle, never still — the observatory "breathes."

### 2.4 Free-explore mode (Beat 4 only, desktop)
- SPACE toggles.
- Camera detaches from scroll-linked position.
- Mouse drag = orbit around current focal point (azimuth + elevation, 60° each direction).
- Mouse wheel = dolly in/out (clamped 5–25 units from focal point).
- Scroll position pauses (doesn't advance the timeline).
- Esc or SPACE again = resume scroll-linked camera (eases back to spline position over 600ms).

---

## 3. Lighting

### 3.1 Ambient
- `AmbientLight`, color `#1A2547` (slightly bluer than bg), intensity 0.3.
- Fills shadow areas without flattening the scene.

### 3.2 Hemisphere
- `HemisphereLight`, sky `#0F1B3D`, ground `#050818`, intensity 0.4.
- Subtle gradient lighting top-to-bottom.

### 3.3 Key lights (per pillar)
Each project celestial body has its own `PointLight` tinted to its pillar:

| Pillar | Light color | Intensity | Distance | Notes |
|---|---|---|---|---|
| Web | `#F5F0E1` (ivory) | 1.2 | 15 | Cool, low warmth |
| AI/ML | `#FF6B35` (sunset) | 1.5 | 18 | Warm, high glow |
| Mobile | `#FF6B35 + #4DD0E1` blend (two lights) | 1.0 each | 12 each | Dual-light cyan-amber |

### 3.4 Telescope spotlight
- `SpotLight`, color `#F5F0E1`, intensity 2.0, angle 0.3, penumbra 0.5.
- Attached to telescope barrel, points where telescope points.
- Lights up the current project body when telescope "aims" at it.
- Subtle volumetric cone effect (using a transparent cone mesh with additive blending).

### 3.5 Dome light (Beat 1 + 8 only)
- `PointLight` inside dome, color `#F5F0E1`, intensity 0.5.
- Fades in when dome opens (Beat 1), shifts to `#FF6B35` as dawn breaks (Beat 8).

---

## 4. Shaders

### 4.1 Nebula background (custom ShaderMaterial)
- Sphere geometry, BackSide.
- Fragment shader: 3-octave simplex noise + radial gradient.
- Colors: deep navy `#0A1530` → slightly elevated `#0F1B3D` → faint sunset tint `#3A1A2A` at edges.
- Animated: noise slowly drifts over time (speed 0.02).
- No stars in this shader — stars are separate point sprites.

### 4.2 Project planet surface (custom ShaderMaterial)
- Sphere geometry.
- Fragment shader: 2-octave simplex noise for surface variation + fresnel rim light.
- Color tinted per pillar (Web: ivory, AI: sunset, Mobile: cyan-amber).
- Subtle emissive map on the lit side.
- Animated: noise pattern slowly shifts (rotation-like effect, speed 0.05).

### 4.3 Hamara-rozgar nebula (custom ShaderMaterial on particle cloud)
- 5000 particles in a 3D gaussian distribution.
- Fragment shader: soft circular falloff + color gradient (sunset orange core → ivory edges).
- Animated: particles drift on sine waves, 4 bright "agent points" pulse in sequence (IntentAgent → DiscoveryAgent → PricingAgent → BookingAgent, 0.5s each).

### 4.4 Glucoguard-plus star pulse (custom ShaderMaterial)
- Bright point sprite + halo ring.
- Fragment shader: 4-pulse cycle (one pulse per model in pipeline: Vision → Reasoning → Search → TTS).
- Each pulse: bright flash + expanding ring, 0.3s per pulse, 1.2s total cycle.
- Color: sunset orange core, ivory halo.

### 4.5 Stack map stars (Beat 5)
- 14 point sprites in a holographic grid arrangement.
- Fragment shader: brightness modulated by frequency (React = brightest, Mongoose = dimmest).
- Subtle pulse on the Playwright star (1/7 repos — "I know how" signal).
- Holographic plane behind: wireframe grid, very low opacity.

---

## 5. Particles

### 5.1 Starfield (always present)
- 300 point sprites (200 on mobile).
- Distributed in a large sphere shell around the observatory (radius 200–500 units).
- Size: 0.5–2.0 units, varying.
- Color: white `#F5F0E1`, with 5% of stars tinted `#FF6B35` (sunset variety).
- Subtle twinkle: per-star opacity sine wave, random phase, period 3–8s.
- Implementation: `THREE.Points` with custom shader for size + twinkle.

### 5.2 Telescope dust motes (inside dome)
- 50 tiny particles (30 on mobile).
- Distributed in a small sphere around the telescope (radius 5 units).
- Slow upward drift, recycle at top.
- Visible only when camera is inside dome (Beats 1, 2, 6, 8).
- Implementation: `THREE.Points` with custom shader.

### 5.3 Hamara-rozgar nebula particles (see §4.3 above)

### 5.4 Gcr-resources-fetch comet trail
- 200 particles trailing behind the comet sphere.
- Color: ivory fading to transparent.
- Lifetime: 2 seconds, then recycled.
- Implementation: `THREE.Points` with custom shader for fade.

### 5.5 Particle rules
- Total particle count budget: 5000 desktop, 2500 mobile.
- All particles use `THREE.Points` (not individual meshes) for performance.
- All particles use `AdditiveBlending` (except starfield, which uses `NormalBlending` for crispness).
- Particles are paused when off-screen (frustum culling on).

---

## 6. Post-Processing (desktop only)

### 6.1 Bloom
- `UnrealBloomPass`, strength 0.4, radius 0.6, threshold 0.85.
- Very subtle — only the brightest highlights (project key lights, telescope spotlight, stack map stars) get bloomed.
- Threshold is high (0.85) so most of the scene is unaffected.

### 6.2 Depth of field
- `BokehPass`, focus distance bound to camera-to-focal-point distance.
- Aperture 0.001 (very subtle).
- Only active during focus pulls in Beat 4. Disabled otherwise (performance).

### 6.3 Film grain
- Custom shader pass, 2% opacity, animated 8x8 noise pattern.
- Adds organic texture, prevents banding in dark gradients.

### 6.4 Vignette
- Custom shader pass, very subtle (10% darkening at corners).

### 6.5 Mobile: no post-processing
- All passes disabled on mobile. Performance budget goes to scene complexity instead.

---

## 7. Environmental Animation

### 7.1 Always-running animations
- Nebula background shader drift (continuous).
- Starfield twinkle (continuous, per-star random phase).
- Telescope dust motes drift (when inside dome).
- Camera idle drift (when scroll paused).
- Project body slow rotation (each body rotates on its axis, 0.1 rad/s).

### 7.2 Scroll-triggered animations
- Dome open/close (Beat 1 entry, Beat 8 exit).
- Notebook page turn (Beat 2 entry, Beat 6 entry).
- Telescope rotation (per project focus in Beat 4).
- Stack map materialize (Beat 5 entry).
- Dawn light shift (Beat 8 finale).

### 7.3 Audio-synced animations
- Hamara-rozgar agent-point pulse (synced to ambient drone frequency).
- Glucoguard-plus model-pulse (synced to 4-tone chime).
- Subtle camera shake on focus chime (0.5px, 100ms).

---

## 8. Object Interactions

### 8.1 Hover (desktop only)
- Project body hover: scale 1.0 → 1.05, emissive intensity +20%, camera nudges 3° toward body, info panel peeks.
- Stack map star hover: brightness +50%, tooltip with stack name + repo count.
- Sound toggle hover: icon scales 1.0 → 1.1.

### 8.2 Click
- Project body click: full focus pull + info panel materializes + telescope rotates to aim at body.
- CTA click: standard link behavior, opens in new tab.
- Sound toggle click: toggle + animate icon.
- Progress dot click: jump to that beat (only if past).

### 8.3 Drag (free-explore mode only, Beat 4 desktop)
- Mouse drag = orbit camera around focal point.
- Mouse wheel = dolly in/out.

### 8.4 Touch (mobile)
- Tap project body = focus + info panel slide-up.
- Tap info panel "expand" = full detail view.
- Swipe down on info panel = close.
- Two-finger pinch (in expanded view) = zoom on detail.

---

## 9. Transitions (3D-side)

### 9.1 Beat-to-beat camera fly-through
- Camera moves along Catmull-Rom curve between control points.
- Duration: 1200ms.
- Easing: `power3.inOut`.
- FOV widens to 70 during travel (vastness), narrows to 50 at arrival.
- Info panels fade out 200ms before transition starts, fade in 400ms after arrival.

### 9.2 Project-to-project focus pull (within Beat 4)
- Camera target eases from current project to next project.
- Duration: 800ms.
- Easing: subtle back-ease (`power2.out` with 5% overshoot).
- FOV dips to 35 (intimacy) at the midpoint, returns to 50 at arrival.
- Current info panel fades out 100ms before focus pull starts.
- New info panel materializes with stagger (border → title → subtitle → chips → body → CTAs, 80ms each).

### 9.3 Dome open/close (Beat 1 + 8)
- 8 dome panels rotate from closed (vertical) to open (horizontal).
- Duration: 2000ms.
- Easing: `power3.inOut`.
- Stars become visible as dome opens (fade in 1000ms after dome starts opening).

### 9.4 Dawn finale (Beat 8)
- Over 4000ms, background gradient shifts from deep navy → sunset orange → ivory.
- Ambient light color shifts from `#1A2547` → `#FF6B35` → `#F5F0E1`.
- Dome closes (reverse of Beat 1).
- Final frame: single star visible through closing dome slit → fades into wordmark.

---

## 10. Visual Effects (VFX)

### 10.1 Telescope volumetric light cone
- Transparent cone mesh, additive blending, very low opacity (5%).
- Attached to telescope barrel.
- Subtle flicker (sine wave intensity, 0.5s period).
- Visible only when telescope is aimed at a project (Beat 4).

### 10.2 Lens flare (subtle, sparingly)
- Custom sprite-based flare on the brightest project body.
- Only when camera is looking directly at it.
- Very subtle (10% opacity), 3 elements (main flare + 2 ghost circles).

### 10.3 Star twinkle (per-star)
- Each star has a random twinkle phase and period.
- Opacity sine wave, 0.5–1.0 range.
- Period 3–8 seconds, randomized per star.

### 10.4 Dust mote catch-light
- When telescope spotlight hits a dust mote, the mote briefly brightens (200ms).
- Subtle but adds physicality.

### 10.5 Project body atmospheric haze
- Each project body has a faint haze around it (large transparent sphere, gradient falloff).
- Color matches pillar.
- Haze density increases when body is focused.

---

## 11. Performance Considerations (linked to Phase 15)

- **Instancing:** Starfield uses `THREE.Points` (one draw call). Dust motes same. Hamara-rozgar nebula same.
- **LOD:** Project bodies have 2 LODs — high-poly (within 30 units) and low-poly (beyond). Swap based on camera distance.
- **Frustum culling:** Enabled by default in Three.js. Verified for all custom meshes.
- **Texture compression:** KTX2 with Basis Universal for all textures. 4:1 compression vs uncompressed.
- **Draco compression:** All GLTF models Draco-compressed. 10:1 compression on geometry.
- **Material sharing:** All stack chips share one material. All starfield points share one material.
- **Shader complexity:** Custom shaders kept under 50 lines each. No nested loops. No expensive trig in fragment shaders.
- **Mobile scaling:** Pixel ratio capped at 2 (not 3) on mobile. Saves 50%+ fill rate on retina displays.

---

## 12. Continuous Self-Critique

- **Can the 3D be simpler?** Yes — could remove film grain, DOF, lens flare. Will evaluate in implementation based on performance budget.
- **Can it be faster?** Yes — instancing is already aggressive. Could reduce particle counts further if needed.
- **Can it tell a stronger story?** Yes — the multi-agent pipeline visualization (hamara-rozgar) and 4-model pulse (glucoguard-plus) are the strongest 3D storytelling moments. Worth investing most polish time there.
- **Can it better represent the developer?** The agentic AI cluster's visual differentiation (nebula vs star) reinforces the architecture difference (multi-agent vs multi-model). This is intentional and effective.
- **Can it create a more memorable experience?** The dawn finale (Beat 8) is the most memorable moment. The single-star-through-closing-dome-slit → wordmark transition is the emotional payoff. Worth the most production attention.
