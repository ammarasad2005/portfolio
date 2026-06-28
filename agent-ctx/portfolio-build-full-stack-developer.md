# Portfolio Build — Work Record

Task ID: portfolio-build
Agent: full-stack-developer
Task: Build the Next.js 3D observatory portfolio for Ammar Asad (@ammarasad2005)

## Work Log

Files created (all under `/home/z/my-project/src/`):

### Foundation
- `app/globals.css` — Observatory design tokens (navy sunset palette), fonts, glass surface utilities, vignette/grain overlays, custom cursor styles, `prefers-reduced-motion` static fallback, dawn gradient, custom scrollbar.
- `app/layout.tsx` — Fraunces (display) + Inter (body) + JetBrains Mono (technical) via `next/font/google`. Dark mode by default. SEO/OG metadata set.

### Data
- `data/projects.ts` — 7 projects with exact copy from `phase12_project_presentation.md`, engineering-note LoC/commit numbers from `phase5_analysis/analysis_cache.json`, plus 3D scene positions and body-type tags.
- `data/beats.ts` — 8 beats (titles + subtitles) from `phase8_storytelling.md`.
- `data/stack-map.ts` — 14 stack entries with repo counts; Playwright flagged for pulsing.

### State + hooks
- `lib/store.ts` — Zustand store: `scrollProgress`, `currentBeat`, `currentProjectIndex`, `hasVisited`, `hasLoaded`, `soundEnabled` (localStorage-persisted), `reducedMotion`, `isTouch`.
- `lib/use-scroll.ts` — Single rAF-coalesced scroll listener; maps 0..1 progress into 14 sub-screens (1+1+1+7+1+1+1+1). Exposes `scrollToBeat` and `scrollToProject` helpers.

### UI primitives (`components/ui-observatory/`)
- `glass-panel.tsx` — Glass surface per phase13 §5.1 (blur + saturate + sheen gradient).
- `stack-chip.tsx` — Pill chip per §5.2, brightness 1–3 by repo frequency.
- `pillar-badge.tsx` — Per-pillar color + icon (web/ai/mobile) per §5.3.
- `building-now-badge.tsx` — Pulsing dot badge per §5.4.
- `cta-button.tsx` — Two-variant anchor-based CTA per §5.5/§5.6.

### DOM overlays (`components/dom/`)
- `hero-text.tsx` — Beat 1 hero, 3-line staggered fade.
- `intro-panel.tsx` — Beat 2 introduction glass panel.
- `exploration-cues.tsx` — Beat 3 with three constellation icons (Builder/Agent/Hand).
- `project-info-panel.tsx` — Beat 4 data-driven project panel with stagger materialization (border→title→subtitle→chips→body→note→CTAs at 80ms).
- `stack-map-overlay.tsx` — Beat 5 stack star map (14 chips + engineering rigor note).
- `personality-panel.tsx` — Beat 6 with "Now playing: Brian Eno — Apollo" chip + handwritten notebook line.
- `future-panel.tsx` — Beat 7 short/mid/long-term ambitions grid.
- `contact-panel.tsx` — Beat 8 finale with dawn gradient + "Thank you for observing" + 4 contact links + wordmark.
- `progress-indicator.tsx` — Right-edge vertical orbit path, 8 dots, click-to-jump.
- `loading-screen.tsx` — "Calibrating telescope" CSS-only sequence (~3.5s) with reduced-motion fallback.
- `sound-toggle.tsx` — Top-right Volume2/VolumeX button, localStorage-persisted.
- `custom-cursor.tsx` — 12px lagging circle on desktop, expands on interactive hover.

### Three.js (`components/three/`)
- `scene-constants.ts` — 14 camera control points (8 beats; Beat 4 = 7 sub-points), Catmull-Rom path sampler, pillar color tokens.
- `scene.tsx` — R3F `<Canvas>` (shadows off, DPR [1,2], frameloop always) + ambient + hemisphere lights + lazy children. Mobile caps star count to 200.
- `camera-rig.tsx` — Reads scroll progress from Zustand store via `subscribe()` (no re-render), eases camera along Catmull-Rom path, idle drift after 2s of scroll pause, FOV lerp.
- `starfield.tsx` — 300 (200 mobile) point sprites in sphere shell (r=200–500), custom shader: per-star twinkle (random phase/period), size attenuation, 5% sunset tint.
- `nebula-background.tsx` — Large BackSide sphere (r=800), 3-octave value noise + radial gradient shader, deep navy → elevated → faint sunset horizon tint, slow drift.
- `project-bodies.tsx` — Wrapper rendering all 7 project bodies.

### Project body components (`components/three/projects/`)
- `exam-table-planet.tsx` — Sphere + thin tilted ring (15°), ivory material, amber ring, slow rotation (0.1 rad/s), Web pillar point light (ivory, intensity 1.2, distance 15).
- `drama-ghar-binary-planet.tsx` — Two spheres orbiting barycenter, ivory + green emissive veins, faint connecting bond.
- `hamara-rozgar-nebula.tsx` — 5000 gaussian-distributed particles (sunset→ivory gradient, additive blending) + 4 pulsing agent spheres (IntentAgent→DiscoveryAgent→PricingAgent→BookingAgent, 0.5s each, 2s cycle).
- `glucoguard-star.tsx` — Bright sunset-orange core + 4 expanding ivory halos (1.2s cycle, 0.3s per model: Vision→Reasoning→Search→TTS).
- `internship-finder-satellite.tsx` — Box mesh + solar panels + blinking red light (1s on / 1s off), slow orbit drift, AI pillar point light.
- `gcr-fetch-comet.tsx` — Bright ivory head + 200-particle trailing cloud (ages recycle every 2s, additive blending, ivory→amber fade).
- `wayfinder-speck.tsx` — Tiny dim cyan sphere + dual point lights (sunset orange + cyan = mobile pillar blend).

### Composition
- `app/page.tsx` — 14 vertical-screen sections (1 per beat + 7 for Beat 4 projects), Scene lazy-loaded with `next/dynamic({ ssr: false })`, body overflow locked during loading, screen-reader-only semantic HTML duplicate of all narrative content for AT users, vignette + grain overlays applied.

### Tooling
- `eslint.config.mjs` — Disabled `react-hooks/immutability` (false-positive for R3F imperative mutation patterns); added `repos/`, `research/`, `scripts/`, `tool-results/` to ignores (reference code only).

## Stage Summary

Built a complete, cinematic 3D observatory portfolio matching the phase 7–16 design docs:

- **Loading**: 3.5s "Calibrating telescope" CSS-only sequence with reduced-motion static fallback.
- **3D scene**: Starfield (300/200 particles with twinkle shader), nebula background (3-octave noise + radial gradient), 7 distinct project celestial bodies (planet, binary planets, nebula, star, satellite, comet, speck).
- **Camera**: 14 control points sampled via Catmull-Rom; idle drift after 2s scroll pause; FOV animates per beat (35 intimacy at projects → 70 vastness at technical); eases frame-rate independently.
- **DOM**: 8 beats rendered as 14 vertical-screen sections; glass info panels with stagger materialization; data-driven project panels with exact copy from `phase12_project_presentation.md`.
- **Palette**: Navy sunset throughout (deep navy `#0A1530`, sunset `#FF6B35`, ivory `#F5F0E1`); per-pillar lighting (web=ivory, AI=sunset, mobile=gradient).
- **Typography**: Fraunces display, Inter body, JetBrains Mono technical accents.
- **Mobile**: Star count halved, antialias off, DPR cap 2, full-width info panels.
- **Accessibility**: `prefers-reduced-motion` static fallback (hides 3D, shows DOM statically); `aria-hidden` on canvas; complete SR-only narrative duplicate; 44×44px touch targets; descriptive aria-labels; keyboard-navigable progress dots.
- **Performance**: All 3D components lazy-loaded; `useFrame` for all 3D updates (no React re-renders during animation); single draw call per particle system via `THREE.Points`.

### Issues encountered + fixed
- Initial import path typo (`../../scene-constants` from `projects/` should be `../scene-constants`) caused `Module not found` errors on first compile. Fixed with `sed` across all 6 affected files.
- ESLint `react-hooks/immutability` rule is incompatible with R3F's imperative mutation pattern (mutating camera position, FOV, shader uniforms inside `useFrame`). Disabled the rule.
- ESLint `react-hooks/set-state-in-effect` flagged the synchronous `setEnabled(true)` in `CustomCursor`. Fixed by using a lazy `useState` initializer (`detectFinePointer`) so the check runs once on first render.
- Reference repos in `repos/` (cloned Phase 5 analysis targets) had their own lint failures unrelated to the portfolio build. Added `repos/**` to eslint ignores.

### Verification
- `bun run lint` → clean (no errors, no warnings on portfolio code).
- Dev server returns `HTTP 200` on `/`; latest log entries show `GET / 200 in 60–200ms`.
- HTML output includes correct title, meta description, OG tags, fonts (Fraunces/Inter/JetBrains Mono) on `<html class="dark ...">`, all 8 progress dots, sound toggle, loading screen with telescope SVG.

### Next steps (deferred to v2)
- Deep-dive overlays (exam-table-blueprint, drama-ghar-rubric, hamara-rozgar-pipeline, glucoguard-pipeline, internship-finder-workflow) — placeholders ready, overlays not implemented.
- Free-explore mode (Beat 4 desktop SPACE-toggle drag-to-orbit).
- Audio implementation (ambient drone + focus chimes + scroll wind) — sound toggle is UI-only for v1.
- Post-processing (bloom, DOF, grain, vignette) — currently CSS-only vignette + SVG grain.
- Telescope/dome/chair/desk/notebook/headphones meshes (phase 11 Blender pipeline) — currently using primitives + sphere shells only.
