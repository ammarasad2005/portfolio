# Phase 15 — Performance Engineering

> Targets, budgets, and optimization strategies for 60 FPS desktop + 30 FPS mobile + excellent Core Web Vitals.

---

## 1. Performance Targets

| Metric | Target | Stretch |
|---|---|---|
| **First Contentful Paint (FCP)** | <1.5s on 4G | <1.0s |
| **Largest Contentful Paint (LCP)** | <2.5s on 4G | <2.0s |
| **Time to Interactive (TTI)** | <3.5s on 4G | <2.5s |
| **Cumulative Layout Shift (CLS)** | <0.05 | 0 |
| **First Input Delay (FID)** | <100ms | <50ms |
| **Total Blocking Time (TBT)** | <200ms | <100ms |
| **JS bundle (initial, gzipped)** | <300KB | <250KB |
| **JS bundle (3D chunk, gzipped)** | <250KB | <200KB |
| **Total page weight (initial)** | <500KB | <400KB |
| **Frame rate (desktop)** | 60 FPS consistent | 60 FPS w/ headroom |
| **Frame rate (mobile, mid-range)** | 30 FPS minimum | 60 FPS |
| **Frame rate (mobile, high-end)** | 60 FPS | 60 FPS w/ headroom |
| **Memory (mobile)** | <150MB | <100MB |

**Tooling:** Lighthouse, Vercel Analytics (RUM), Chrome DevTools Performance tab, WebPageTest.

---

## 2. Core Web Vitals Strategy

### 2.1 LCP (<2.5s)
- **LCP element:** Beat 1 hero text ("A curious engineer / at a quiet observatory...").
- **Strategy:**
  - Hero text is in the initial HTML response (no JS needed to render).
  - Fonts: `next/font` with `display: swap` + preloaded critical subsets.
  - 3D Canvas is in the background, doesn't block LCP.
  - Loading screen overlay (Calibrating Telescope) is purely CSS + inline SVG — paints in <100ms.

### 2.2 CLS (<0.05)
- **Strategy:**
  - 3D Canvas has fixed dimensions (100vw × 100vh) — no layout shift.
  - All info panels use `position: fixed` or `absolute` — don't push DOM content.
  - Images: only OG images (server-generated, fixed dimensions).
  - Fonts: preloaded, `font-display: swap` with `size-adjust` to minimize reflow.

### 2.3 FID / TBT (<100ms / <200ms)
- **Strategy:**
  - 3D Canvas is `React.lazy()`-loaded with `ssr: false` — doesn't block initial hydration.
  - All non-critical JS is deferred or lazy-loaded.
  - GSAP ScrollTrigger setup is in `useEffect` — runs after hydration.
  - No third-party scripts (analytics is Vercel Analytics, which is edge-injected and non-blocking).

---

## 3. Bundle Size Budget

### 3.1 Initial bundle (route chunk, gzipped)
- Next.js 16 framework: ~80KB
- React 19 + ReactDOM: ~45KB
- App layout + globals: ~5KB
- Loading screen CSS + SVG: ~2KB
- Hero text + minimal DOM: ~3KB
- **Subtotal: ~135KB** (well under 300KB budget)

### 3.2 3D chunk (loaded after first paint)
- Three.js: ~150KB
- React Three Fiber: ~25KB
- Drei (selected helpers only): ~20KB
- GSAP + ScrollTrigger: ~30KB
- Custom shaders: ~5KB
- **Subtotal: ~230KB** (under 250KB budget)

### 3.3 Per-project chunks (lazy-loaded on Beat 4 entry)
- Each project's 3D component: ~5KB
- Each deep-dive overlay: ~10–20KB
- **Subtotal per project: ~15–25KB**

### 3.4 Total page weight (full experience)
- Initial + 3D + all projects + all deep dives: ~600KB gzipped
- **Plus fonts** (~80KB), **audio** (~200KB if sound toggled on).
- **Grand total: ~880KB** — acceptable for an immersive 3D experience.

### 3.5 Bundle analysis
- `pnpm build` produces `.next/analyze/` (via `@next/bundle-analyzer`).
- Review on every PR. Fail CI if initial bundle > 300KB.

---

## 4. 3D Performance Optimization

### 4.1 Geometry
- **Primitives over models:** All observatory structures are Three.js primitives (cylinders, spheres, boxes). No GLTF models in v1 (per Phase 11 §10).
- **Poly count budget:** Total scene polys <50,000. Most are in the starfield (instanced points, 0 polys).
- **LOD:** Project bodies use `<Detailed>` from Drei with 2 LODs (high-poly within 30 units, low-poly beyond). swap distance tested on mid-range mobile.

### 4.2 Materials
- **ShaderMaterial** for procedural surfaces (planet, nebula, star). Custom shaders kept under 50 lines each.
- **MeshStandardMaterial** for primitives (dome, telescope, desk). Reuse the same material instance across multiple meshes.
- **No env maps** (except optional 256x128 cube map for telescope brass reflection, generated once on load).

### 4.3 Textures
- **None in v1.** All visuals are procedural.
- **v2 (future):** KTX2 textures for notebook paper, desk wood. 1K–2K resolution. ETC1S for color, UASTC for normal.

### 4.4 Particles
- **All particles use `THREE.Points`** (single draw call per system).
- **Total particle budget:** 5000 desktop, 2500 mobile.
- **Additive blending** for nebula + comet trail + dust motes. **Normal blending** for starfield.
- **Frustum culling** enabled. Particles off-screen don't update.

### 4.5 Post-processing
- **Desktop:** Bloom (subtle) + DOF (only during focus pulls) + grain + vignette.
- **Mobile:** None. Performance budget goes to scene complexity.
- **Reduced motion:** None. Static fallback replaces 3D entirely.

### 4.6 Render quality
- **Desktop:** Pixel ratio capped at 2 (not 3). `antialias: true`. `powerPreference: 'high-performance'`.
- **Mobile:** Pixel ratio capped at 2. `antialias: false` (relies on MSAA via CSS). `powerPreference: 'default'` (saves battery).
- **Reduced motion:** Pixel ratio 1, antialias off, no post-processing.

### 4.7 Frame loop
- `<AdaptiveDpr>` from Drei — drops pixel ratio on frame drops.
- `<AdaptiveEvents>` from Drei — disables raycasting during fast scrolls.
- `frameloop="demand"` is NOT used — we have continuous animations (idle drift, twinkle, agent pulses).

---

## 5. Asset Loading Strategy

### 5.1 Critical path (first 2 seconds)
1. HTML response (server-rendered, includes hero text).
2. Critical CSS (inline in `<head>`).
3. Critical fonts (Inter body + Fraunces display, preloaded subsets).
4. Initial JS chunk (~135KB).
5. Loading screen paints.

### 5.2 Async path (2–5 seconds)
1. 3D chunk (~230KB) — loaded as soon as initial hydration completes.
2. Ambient audio file (~200KB) — only if sound toggle is on.
3. Starfield JSON (positions, sizes, colors) — ~10KB.
4. Camera path data — ~2KB.

### 5.3 Just-in-time (5–10 seconds)
1. Beat 2 + Beat 3 3D components.
2. First flagship project (Exam-Table) 3D component.
3. Project info panel data.

### 5.4 Background prefetch (10+ seconds)
1. Remaining project 3D components (prefetched when visitor enters Beat 4).
2. Deep-dive overlay components (prefetched when visitor focuses a project).
3. Beat 5–8 components (prefetched as visitor progresses).

### 5.5 Audio strategy
- Ambient drone: 200KB MP3, looped.
- Chimes: 8 short WAV files (one per pillar + 4 AI model tones), ~5KB each, ~40KB total.
- All audio lazy-loaded only when sound toggle is on.
- Web Audio API for playback (low latency, no DOM element overhead).

---

## 6. Mobile Optimization

### 6.1 Detection
- `lib/device.ts` detects: `isMobile`, `isTablet`, `isDesktop`, `isLowPower`, `prefersReducedMotion`.
- Detection uses `navigator.userAgent` + `window.matchMedia('(pointer: coarse)')` + `navigator.deviceMemory`.
- Updated on resize / orientation change.

### 6.2 Mobile-specific adjustments
- **3D:** Lower poly count (halved), fewer particles (2500 vs 5000), no post-processing.
- **Camera:** Simplified path (4 control points vs 8), no idle drift, no FOV changes.
- **Interactions:** Tap-to-focus (no hover), no free-explore mode, no custom cursor.
- **Info panels:** Bottom sheets instead of side panels, smaller text (16px body, not 18px).
- **Audio:** Off by default (mobile data + battery consciousness).
- **Pixel ratio:** Capped at 2 (not 3) — saves 50%+ fill rate on retina.

### 6.3 Low-power device detection
- If `navigator.deviceMemory < 4` (GB) OR `navigator.hardwareConcurrency < 4`:
  - Skip 3D entirely. Show reduced-motion fallback.
  - This is the same fallback as `prefers-reduced-motion`.
- Prevents crashes on low-end Android devices.

---

## 7. Accessibility Performance

- **Screen reader:** Semantic HTML fallback is in the DOM from the start (visually hidden). No JS needed to access content.
- **Keyboard:** All interactive elements are keyboard-navigable by default. Tab order matches DOM order.
- **Reduced motion:** Static fallback renders instantly (no 3D load). Same content, different presentation.
- **Color contrast:** All text combinations meet WCAG AA. Most meet AAA.

---

## 8. Monitoring

### 8.1 Real User Monitoring (RUM)
- Vercel Analytics (free, privacy-first, no cookies).
- Tracks: LCP, FID, CLS, TTFB per session.
- Aggregated by device type, country, route.

### 8.2 Synthetic monitoring
- Lighthouse CI runs on every PR (via GitHub Actions).
- Targets: Lighthouse score ≥90 on all 4 categories (Performance, Accessibility, Best Practices, SEO).
- Fail PR if score drops below 85.

### 8.3 Manual testing matrix
- Desktop: Chrome, Firefox, Safari (macOS).
- Mobile: iOS Safari, Chrome Android (Pixel 6, Samsung S21, iPhone 12).
- Reduce-motion: macOS System Preferences → Accessibility → Reduce Motion.
- Slow network: Chrome DevTools → Network → Slow 3G.
- Low-end: Chrome DevTools → CPU → 4x slowdown.

---

## 9. Trade-offs (evaluated)

| Feature | Performance cost | Worth keeping? |
|---|---|---|
| Idle camera drift | Low (one matrix update per frame) | Yes — adds "alive" feeling |
| Starfield twinkle | Low (per-star opacity update) | Yes — adds depth |
| Hamara-rozgar agent pulse | Low (4 sprites animating) | Yes — strongest storytelling moment |
| Glucoguard-plus 4-pulse halo | Low (one sprite with shader) | Yes — visual differentiation |
| Bloom post-processing | Medium (extra render pass) | Yes on desktop, no on mobile |
| DOF post-processing | High (depth texture + blur pass) | Only during focus pulls, not always |
| Film grain | Low (animated noise) | Yes on desktop, no on mobile |
| Custom cursor | Negligible | Yes on desktop, no on mobile (touch) |
| Ambient audio | Network cost only (200KB) | Yes if user opts in |
| Free-explore mode | Negligible (just changes camera input) | Yes on desktop, no on mobile |

---

## 10. Performance Checklist (pre-launch)

- [ ] Lighthouse mobile score ≥85
- [ ] Lighthouse desktop score ≥95
- [ ] LCP <2.5s on Slow 3G (Chrome DevTools)
- [ ] 60 FPS consistent on 2020+ MacBook Air (Chrome DevTools Performance)
- [ ] 30 FPS minimum on iPhone 12 (real device test)
- [ ] No layout shift on load (Chrome DevTools LCP element)
- [ ] Bundle size <300KB initial gzipped
- [ ] All images AVIF + WebP (Next.js Image component)
- [ ] All fonts self-hosted via next/font
- [ ] All 3D components lazy-loaded
- [ ] `prefers-reduced-motion` respected
- [ ] Keyboard navigation works without mouse
- [ ] Screen reader reads all content via semantic fallback
- [ ] No console errors or warnings
- [ ] No memory leaks (Chrome DevTools Memory — 5-minute scroll test)
