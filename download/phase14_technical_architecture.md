# Phase 14 — Technical Architecture

> Production-ready architecture for the 3D observatory portfolio.

---

## 1. Stack Decisions (with rationale)

| Choice | Decision | Why |
|---|---|---|
| **Framework** | **Next.js 16 (App Router)** | You already use Next.js 16 in Internship-Finder — consistency with your skills. App Router for streaming + server components. |
| **Language** | **TypeScript (strict)** | 5/7 of your repos use TypeScript. Matches your stack identity. |
| **3D engine** | **Three.js + React Three Fiber + Drei** | R3F is the React-friendly wrapper. Drei provides helpers (PerspectiveCamera, OrbitControls, useGLTF, shaderMaterial). Industry standard for React 3D. |
| **Animation (DOM)** | **Framer Motion** | You already use it in Exam-Table. Best for UI panel materialization. |
| **Animation (3D + scroll)** | **GSAP + ScrollTrigger** | Industry standard for scroll-linked 3D camera choreography. Better than Framer Motion for complex timelines. |
| **Styling** | **Tailwind CSS 4 + CSS variables** | You already use Tailwind in 2/7 repos. CSS variables for the design tokens (Phase 13). |
| **Fonts** | **next/font (self-hosted)** | Fraunces (display serif) + Inter (body) + JetBrains Mono (technical). Self-hosted = no FOIT, no external requests. |
| **Icons** | **lucide-react** | You already use it in 3/7 repos. Tree-shakeable. |
| **State** | **Zustand** | Minimal, no boilerplate. Used for: current beat, sound on/off, has-visited flag, free-explore mode. |
| **Forms** | N/A | No forms in the portfolio. Contact is a mailto link. |
| **Backend** | None | Static portfolio. No backend needed. |
| **Hosting** | **Vercel** | Free tier sufficient. Edge network. Automatic Next.js optimization. Same host as your Exam-Table live demo. |
| **Analytics** | **Vercel Analytics** (privacy-first) | Free, no cookies, no consent banner needed. |
| **Package manager** | **pnpm** | Faster than npm/yarn, disk-efficient. Used increasingly across modern Next.js projects. |

**Excluded (and why):**
- ❌ **Lenis / Locomotive scroll** — hijacks native scroll, breaks accessibility (Phase 9 §2.1).
- ❌ **postprocessing (R3F)** — too heavy for mobile. We'll use Drei's `EffectComposer` selectively, or skip on mobile.
- ❌ **Cannon.js / Rapier** — physics don't fit the calm observatory tone (Phase 7).
- ❌ **Framer Motion 3D** — not a real thing. Framer Motion is for DOM, R3F handles 3D.

---

## 2. Folder Structure

```
portfolio/
├── app/                              # Next.js 16 App Router
│   ├── layout.tsx                    # Root layout, fonts, metadata
│   ├── page.tsx                      # Main scroll container
│   ├── opengraph-image.tsx           # Dynamic OG image
│   ├── twitter-image.tsx             # Dynamic Twitter card
│   ├── robots.ts                     # robots.txt generation
│   ├── sitemap.ts                    # sitemap.xml generation
│   └── globals.css                   # Tailwind + CSS variables
│
├── components/
│   ├── three/                        # All 3D components
│   │   ├── Scene.tsx                 # Root Canvas scene
│   │   ├── CameraRig.tsx             # Scroll-linked camera + idle drift
│   │   ├── AmbientEnvironment/
│   │   │   ├── Starfield.tsx         # 300 point sprites
│   │   │   ├── NebulaBackground.tsx  # Gradient shader sphere
│   │   │   └── DistantGalaxies.tsx   # 5 sprite planes
│   │   ├── Observatory/
│   │   │   ├── Dome.tsx              # 8 articulated panels
│   │   │   ├── Telescope.tsx         # Barrel + eyepiece + mount
│   │   │   ├── Chair.tsx             # Box primitive
│   │   │   ├── Desk.tsx              # Box primitive
│   │   │   ├── Notebook.tsx          # Plane + handwritten-font texture
│   │   │   └── Headphones.tsx        # Torus + 2 spheres
│   │   ├── Projects/                 # One component per project body
│   │   │   ├── ExamTablePlanet.tsx
│   │   │   ├── DramaGharBinaryPlanet.tsx
│   │   │   ├── HamaraRozgarNebula.tsx
│   │   │   ├── GlucoGuardStar.tsx
│   │   │   ├── InternshipFinderSatellite.tsx
│   │   │   ├── GcrFetchComet.tsx
│   │   │   └── WayFinderSpeck.tsx
│   │   ├── StackMap/
│   │   │   └── StackMap.tsx          # Beat 5 holographic grid
│   │   ├── Lighting/
│   │   │   ├── AmbientLights.tsx
│   │   │   ├── PillarLights.tsx      # One per pillar
│   │   │   └── TelescopeSpotlight.tsx
│   │   └── PostProcessing/
│   │       └── Effects.tsx           # Bloom + DOF + grain (desktop only)
│   │
│   ├── dom/                          # DOM overlay components
│   │   ├── HeroText.tsx              # Beat 1 hero
│   │   ├── IntroPanel.tsx            # Beat 2
│   │   ├── ExplorationCues.tsx       # Beat 3
│   │   ├── ProjectInfoPanel.tsx      # Beat 4 (one component, data-driven)
│   │   ├── ProjectDeepDives/         # One per flagship
│   │   │   ├── ExamTableBlueprint.tsx
│   │   │   ├── DramaGharRubric.tsx
│   │   │   ├── HamaraRozgarPipeline.tsx
│   │   │   ├── GlucoGuardPipeline.tsx
│   │   │   └── InternshipFinderWorkflow.tsx
│   │   ├── StackMapOverlay.tsx       # Beat 5
│   │   ├── PersonalityPanel.tsx      # Beat 6
│   │   ├── FuturePanel.tsx           # Beat 7
│   │   ├── ContactPanel.tsx          # Beat 8
│   │   ├── ProgressIndicator.tsx     # Right-edge orbit path
│   │   ├── SoundToggle.tsx           # Top-right
│   │   ├── LoadingScreen.tsx         # Calibrating telescope sequence
│   │   └── ReducedMotionFallback.tsx # Static version
│   │
│   ├── ui/                           # Reusable UI primitives
│   │   ├── GlassPanel.tsx
│   │   ├── StackChip.tsx
│   │   ├── PillarBadge.tsx
│   │   ├── BuildingNowBadge.tsx
│   │   ├── CTAButton.tsx
│   │   └── Cursor.tsx                # Custom cursor (desktop)
│   │
│   └── layout/
│       ├── ScrollContainer.tsx       # The scrollable wrapper
│       └── SemanticFallback.tsx      # Screen-reader-only HTML
│
├── lib/
│   ├── store.ts                      # Zustand store
│   ├── scroll.ts                     # GSAP ScrollTrigger setup
│   ├── camera-path.ts                # Catmull-Rom curve + control points
│   ├── audio.ts                      # Ambient drone + chimes (Web Audio API)
│   ├── motion.ts                     # prefers-reduced-motion hook
│   ├── device.ts                     # Device capability detection
│   └── analytics.ts                  # Vercel Analytics wrapper
│
├── data/
│   ├── projects.ts                   # All project metadata (single source)
│   ├── stack-map.ts                  # Stack star data
│   ├── beats.ts                      # Beat definitions (8 chapters)
│   └── ambience.ts                   # Now-playing track list
│
├── shaders/
│   ├── nebula-background.vert        # Background gradient shader
│   ├── nebula-background.frag
│   ├── planet-surface.frag           # Project planet surface shader
│   ├── hamara-nebula.frag            # Multi-agent particle shader
│   ├── glucoguard-star.frag          # 4-pulse star shader
│   └── star-twinkle.frag             # Starfield twinkle shader
│
├── public/
│   ├── fonts/                        # Self-hosted font files
│   ├── audio/
│   │   ├── ambient.mp3               # ~200KB loop
│   │   └── chimes/                   # 4 pillar tones + 4 AI model tones
│   ├── og-default.png                # Fallback OG image
│   └── favicon.svg
│
├── scripts/
│   └── generate-textures.ts          # Optional: bake notebook/desk textures
│
├── tests/
│   └── e2e/
│       └── beats.spec.ts             # Playwright tests for all 8 beats
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .eslintrc.json
├── .prettierrc
├── .env.example                      # NEXT_PUBLIC_SITE_URL only
├── README.md
└── LICENSE                           # MIT
```

---

## 3. Code Architecture Patterns

### 3.1 Data-driven beats
All 8 beats are defined in `data/beats.ts`. Each beat has:
- `id`, `title`, `subtitle`, `cameraControlPoint`, `lookAt`, `fov`.
- `domComponent` (the React component to render).
- `threeComponents` (which 3D objects to show/hide).
- `audioCue` (which chime to play, if any).

The `ScrollContainer` reads this array and renders the appropriate DOM + 3D state per beat.

### 3.2 Data-driven projects
All 7 projects are defined in `data/projects.ts`. Each project has:
- `id`, `title`, `subtitle`, `pillar`, `status` (complete/building/early).
- `stackChips[]`, `bodyMarkdown`, `engineeringNoteMarkdown`.
- `ctas[]` (label + URL + style).
- `celestialBody` (which 3D component to render).
- `deepDive` (which deep-dive component, if any).
- `cameraFocus` (position + lookAt + fov for focus pull).

The `ProjectInfoPanel` component takes a project ID and renders everything data-driven. No per-project code; only per-project data.

### 3.3 Scroll-bound camera (single source of truth)
- `lib/scroll.ts` sets up a single ScrollTrigger spanning the whole page.
- It writes the scroll progress (0–1) to a Zustand store.
- `CameraRig.tsx` reads the progress and updates the Three.js camera position along the Catmull-Rom curve.
- This avoids React re-renders on every scroll frame (Zustand uses selectors + transient updates).

### 3.4 Frame-loop isolation
- All 3D frame-loop updates (camera position, particle animation, shader uniforms) happen in `useFrame()` callbacks inside R3F.
- These do NOT trigger React re-renders.
- DOM updates (info panel materialization, beat transitions) happen via ScrollTrigger callbacks, which DO trigger React state updates — but only on beat boundaries, not every frame.

### 3.5 Lazy loading
- Each project's 3D component is `React.lazy()`-loaded.
- Each deep-dive overlay is `React.lazy()`-loaded.
- Only the current beat's 3D objects are mounted; previous/next beats' objects are mounted just-in-time (IntersectionObserver).
- This keeps initial bundle small and per-frame draw calls low.

### 3.6 Code splitting strategy
- `next/dynamic` for all heavy 3D components (with `ssr: false`).
- Separate chunks for: Scene.tsx, each Project component, each DeepDive component, audio.ts.
- Initial route chunk: <300KB gzipped (target).
- 3D chunk: ~200KB gzipped (Three.js + R3F + Drei).
- Per-project chunks: <20KB each.
- Deep-dive chunks: <30KB each.

---

## 4. Data Flow Diagram

```
[User scrolls]
   ↓
[Browser scroll event]
   ↓
[GSAP ScrollTrigger]
   ↓
[Zustand store: scrollProgress]
   ↓
   ├──→ [CameraRig.tsx useFrame()] — updates camera position (no React render)
   ├──→ [ShaderMaterial uniforms] — updates via useFrame (no React render)
   ├──→ [Particle systems] — update via useFrame (no React render)
   └──→ [Beat boundary detection] — triggers React state update ONLY at boundaries
              ↓
       [Current beat changes]
              ↓
       [DOM panel materializes / fades]
       [3D components mount/unmount]
       [Audio chime plays]
```

**Key principle:** 60 FPS frame loop is decoupled from React render cycle. React only re-renders on beat boundaries (8 times per page visit, not 60 times per second).

---

## 5. Build & Deploy

### 5.1 Build
- `pnpm build` — Next.js production build.
- Output: `.next/` directory.
- Static export where possible (no server-side data).
- All pages static, no ISR/SSR needed.

### 5.2 Deploy
- Vercel auto-deploys on `git push` to `main`.
- Environment variables: `NEXT_PUBLIC_SITE_URL` only.
- Headers: strict CSP, X-Frame-Options, X-Content-Type-Options (via `next.config.ts`).

### 5.3 CI (added as a quick win — addresses Phase 5 gap)
- GitHub Actions workflow:
  - On PR: lint + type-check + build + Playwright smoke test.
  - On push to main: deploy to Vercel.
- This adds CI to your portfolio repo (you have 0/7 CI in your project repos — fixing this gap on the portfolio itself is a senior-engineer signal).

---

## 6. Continuous Self-Critique

- **Can the architecture be simpler?** Yes — could remove Zustand and use React state. But Zustand's transient updates are critical for 60 FPS scroll. Worth the dependency.
- **Can it be faster?** Yes — could remove GSAP and use native scroll + a simple lerp. Trade-off: lose ScrollTrigger's powerful timeline + scrub features. Worth keeping GSAP.
- **Can it tell a stronger story?** The data-driven approach means changing the story doesn't require changing code. Strong foundation.
- **Can it better represent the developer?** Using Next.js 16 (your stack), TypeScript (your stack), Tailwind (your stack), lucide-react (your stack) — the portfolio's tech stack IS your stack. Meta-consistency.
- **Can it create a more memorable experience?** The architecture supports the memorable moments (hamara-rozgar multi-agent pulse, glucoguard-plus 4-model pulse, dawn finale). Architecture enables, doesn't dictate.
