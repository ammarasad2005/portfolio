# Phase 16 — Development Roadmap

> Milestones, dependencies, deliverables, risks. Then we build.

---

## 1. Milestones

### Milestone 0 — Foundation (M0)
**Goal:** Project skeleton + design system + content data.
**Duration:** ~1 session.
**Dependencies:** None.
**Deliverables:**
- Next.js 16 + TypeScript + Tailwind + ESLint + Prettier scaffolded.
- `next/font` configured (Fraunces + Inter + JetBrains Mono).
- Design tokens (Phase 13) as CSS variables in `globals.css`.
- UI primitives: GlassPanel, StackChip, PillarBadge, BuildingNowBadge, CTAButton.
- Data files: `data/projects.ts`, `data/beats.ts`, `data/stack-map.ts`.
- All copy from Phase 8 written into data files.
- Lighthouse score: 95+ on a static "Hello world" page (proves foundation is clean).

**Risk:** Font licensing / availability. Mitigation: All 3 fonts are OFL-licensed, self-hostable.

---

### Milestone 1 — Static Story (M1)
**Goal:** All 8 beats rendered as flat HTML, scrollable, no 3D.
**Duration:** ~1 session.
**Dependencies:** M0.
**Deliverables:**
- All 8 beat DOM components built (HeroText, IntroPanel, ExplorationCues, ProjectInfoPanel, StackMapOverlay, PersonalityPanel, FuturePanel, ContactPanel).
- ProgressIndicator (orbit path) on right edge, updates on scroll.
- SoundToggle in top-right (visual only, no audio yet).
- All project info panels render correctly with data from `data/projects.ts`.
- All deep-dive overlays built (Exam-Table Blueprint, Drama-Ghar Rubric, Hamara-Rozgar Pipeline, Gluco-Guard Pipeline, Internship-Finder Workflow).
- Semantic HTML fallback for screen readers.
- Lighthouse score: 95+ on full static experience.

**Risk:** Copy quality. Mitigation: All copy pre-written in Phase 8, just paste + tune.

---

### Milestone 2 — 3D Foundation (M2)
**Goal:** Three.js scene + camera rig + ambient environment. No projects yet.
**Duration:** ~1 session.
**Dependencies:** M1.
**Deliverables:**
- `<Canvas>` mounted behind DOM content.
- CameraRig with scroll-linked Catmull-Rom path (8 control points).
- AmbientEnvironment: Starfield (300 points), NebulaBackground (gradient shader), DistantGalaxies (5 sprites).
- Lighting: AmbientLight, HemisphereLight, telescope spotlight (visualized as cone).
- Idle drift on camera.
- Loading screen ("Calibrating Telescope" sequence).
- Reduced-motion fallback: static gradient + flat content.
- Mobile detection + 3D disable on low-power devices.
- Lighthouse: 90+ (3D chunk adds weight, may dip slightly).

**Risk:** R3F + Next.js 16 App Router compatibility. Mitigation: Use `next/dynamic` with `ssr: false` for all 3D components.

---

### Milestone 3 — Observatory (M3)
**Goal:** Observatory structures (dome, telescope, chair, desk, notebook, headphones).
**Duration:** ~1 session.
**Dependencies:** M2.
**Deliverables:**
- Observatory subcomponents built from Three.js primitives.
- Dome: 8 wedge panels, articulated open/close animation bound to Beat 1 entry + Beat 8 exit.
- Telescope: barrel + eyepiece + lens + mount, rotates to point at current focal point.
- Chair + Desk + Notebook + Headphones in interior.
- Notebook "opens" on Beat 2 entry + Beat 6 entry (page-flip animation).
- Dust motes (50 particles) inside dome.
- Lighthouse: still 90+.

**Risk:** Dome animation complexity. Mitigation: Start with simple rotation, refine later.

---

### Milestone 4 — Project Bodies (M4)
**Goal:** All 7 project celestial bodies rendered + camera focus pulls working.
**Duration:** ~1 session.
**Dependencies:** M3.
**Deliverables:**
- Exam-Table planet (sphere + ring, ivory shader).
- Drama-Ghar binary planets (two spheres orbiting barycenter).
- Hamara-Rozgar nebula (5000 particles + 4 agent points + custom shader + pulse animation).
- Gluco-Guard star (bright sprite + 4-pulse halo shader).
- Internship-Finder satellite (mesh + blinking light).
- GCR-Fetch comet (sphere + particle trail).
- WayFinder speck (dim point).
- Camera focus pulls between projects (800ms ease, FOV dips to 35).
- Each project's info panel materializes on focus with stagger.
- Lighthouse: 85+ (more 3D content).

**Risk:** Particle count performance. Mitigation: Test on mobile early. Reduce count if FPS drops.

---

### Milestone 5 — Stack Map + Deep Dives (M5)
**Goal:** Beat 5 holographic stack map + all 5 deep-dive overlays functional.
**Duration:** ~1 session.
**Dependencies:** M4.
**Deliverables:**
- StackMap: 14 stack stars in holographic grid, brightness varies by frequency.
- Exam-Table Blueprint overlay (architecture diagram with stagger animation).
- Drama-Ghar Rubric overlay (self-eval rubric with hover evidence).
- Hamara-Rozgar Pipeline overlay (animated 4-agent flow).
- Gluco-Guard Pipeline overlay (4-model visualization).
- Internship-Finder Workflow overlay (file tree + commit log).
- All overlays lazy-loaded, slide up from bottom on mobile.
- Lighthouse: 85+.

**Risk:** Overlay animation complexity. Mitigation: Reuse a single overlay component, data-driven content.

---

### Milestone 6 — Polish + Audio + Post-Processing (M6)
**Goal:** Audio, post-processing, custom cursor, sound design, micro-interactions.
**Duration:** ~1 session.
**Dependencies:** M5.
**Deliverables:**
- Ambient drone (200KB MP3, Web Audio API, looped).
- 8 chime files (4 pillar + 4 AI model tones).
- Sound toggle functional, persists in localStorage.
- Post-processing: Bloom (subtle), DOF (focus pulls only), grain, vignette — desktop only.
- Custom cursor (desktop) — 12px circle, scales on hover.
- All hover states working.
- Telescope volumetric light cone.
- Dawn finale (Beat 8 gradient shift + dome close + wordmark materialize).
- Lighthouse: 85+ desktop. 80+ mobile (post-processing skipped).

**Risk:** Audio file sizes. Mitigation: Use Web Audio API decoding + low-bitrate MP3.

---

### Milestone 7 — Accessibility + Performance Tuning (M7)
**Goal:** WCAG AA+ compliance, 60 FPS desktop / 30 FPS mobile, Core Web Vitals all green.
**Duration:** ~1 session.
**Dependencies:** M6.
**Deliverables:**
- `prefers-reduced-motion` fallback fully functional.
- Keyboard navigation: Tab through all interactive elements, Enter activates, Esc closes.
- Screen reader: semantic HTML fallback verified with NVDA + VoiceOver.
- ARIA live regions announce beat changes.
- Color contrast: all text combinations meet AA.
- Lighthouse mobile score: 85+.
- Lighthouse desktop score: 95+.
- Real-device testing: iPhone 12, Pixel 6, MacBook Air 2020.
- Memory leak test: 5-minute scroll, heap stable.
- Vercel Analytics deployed.

**Risk:** Mobile performance tuning is fiddly. Mitigation: Budget time for 2–3 iterations of pixel ratio / particle count tuning.

---

### Milestone 8 — Launch (M8)
**Goal:** Deploy to Vercel + GitHub Actions CI + final QA.
**Duration:** ~half session.
**Dependencies:** M7.
**Deliverables:**
- GitHub Actions CI: lint + type-check + build + Lighthouse CI on every PR.
- Vercel auto-deploy on `main` push.
- Custom domain (optional — `ammarasad.dev` or similar).
- OG image + Twitter card (dynamic via Next.js opengraph-image).
- `robots.txt` + `sitemap.xml`.
- Final cross-browser test: Chrome, Firefox, Safari (macOS + iOS).
- Final Lighthouse check: all 4 categories ≥90.
- README.md with project overview + setup instructions.
- LICENSE (MIT).

**Risk:** Domain registration delay. Mitigation: Use `*.vercel.app` subdomain initially, custom domain can come later.

---

## 2. Total Effort Estimate

| Milestone | Duration | Cumulative |
|---|---|---|
| M0 Foundation | 1 session | 1 session |
| M1 Static Story | 1 session | 2 sessions |
| M2 3D Foundation | 1 session | 3 sessions |
| M3 Observatory | 1 session | 4 sessions |
| M4 Project Bodies | 1 session | 5 sessions |
| M5 Stack Map + Deep Dives | 1 session | 6 sessions |
| M6 Polish + Audio | 1 session | 7 sessions |
| M7 Accessibility + Performance | 1 session | 8 sessions |
| M8 Launch | 0.5 session | 8.5 sessions |

**Total: ~8.5 sessions** of focused work.

---

## 3. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| R3F + Next.js 16 App Router SSR conflicts | Medium | High | Use `next/dynamic` with `ssr: false` for all 3D. Already standard practice. |
| Mobile performance below 30 FPS | Medium | High | Detect early, reduce particle count + drop post-processing + cap pixel ratio at 2. |
| Lighthouse score dips below 85 | Low | Medium | Bundle analysis on every PR. Lighthouse CI gating. |
| Audio file size bloats page weight | Low | Low | Lazy-load audio only on opt-in. Use Web Audio API + low-bitrate MP3. |
| Custom shader bugs (nebula, planet) | Medium | Medium | Test shaders in isolation first. Keep shader code <50 lines each. |
| Dome articulation animation breaks | Low | Low | Start with simple rotation, refine in M3. |
| ScrollTrigger conflicts with mobile browsers | Low | Medium | Test on iOS Safari + Chrome Android early in M2. |
| Memory leak from particle systems | Low | High | Use object pooling. Verify with Chrome DevTools Memory in M7. |
| Font loading causes FOIT | Low | Low | Use `next/font` with `display: swap` + preloaded subsets. |
| Reduced-motion fallback looks bad | Low | Medium | Design fallback as first-class, not afterthought. Tested in M7. |

---

## 4. Continuous Self-Critique (Phase 17)

### 4.1 Can the roadmap be simpler?
- 9 milestones is already minimal. Could merge M2 + M3 (3D foundation + observatory), but keeping them separate gives cleaner checkpoints.
- The "1 session per milestone" estimate is conservative; some may finish faster.

### 4.2 Can it be faster?
- Yes — skip deep-dive overlays (M5) for v1. But this loses the strongest storytelling moments (hamara-rozgar pipeline, glucoguard-plus pipeline). Worth keeping.

### 4.3 Can it tell a stronger story?
- The 8-beat structure (Phase 8) IS the story. The roadmap just builds it. No story changes needed.

### 4.4 Can it better represent the developer?
- Using Next.js 16 + TypeScript + Tailwind + lucide-react (your stack) is meta-consistency. The portfolio's tech stack IS your stack.

### 4.5 Can it create a more memorable experience?
- The dawn finale (Beat 8) is the most memorable moment. M3 (dome animation) + M6 (dawn gradient) build it. Worth the polish time.

### 4.6 What could go wrong that I haven't anticipated?
- **Taste drift:** I might build something that looks great in my head but mediocre in browser. Mitigation: ship M1 (static story) first, get visual feedback, then layer 3D on top.
- **Scope creep:** New ideas during build. Mitigation: park new ideas in a "v2 backlog" doc, don't add to v1.
- **Performance regression:** Adding features may break 60 FPS. Mitigation: Lighthouse CI gating on every PR.

---

## 5. v2 Backlog (out of scope for v1)

- Custom Blender models for dome, telescope, notebook (per Phase 11 §10).
- KTX2 textures for wood + paper materials.
- Live dev log for Internship-Finder (real GitHub API integration).
- "Now playing" chip with live Spotify API.
- Blog/notes section (your writing interest from Phase 4).
- Internationalization (Urdu accents, per Phase 4 alternative).
- Custom telescope cursor that rotates to point at current focus.
- Audio-reactive camera (subtle camera shake on chime peaks).
- Day/night cycle (visitor's local time affects observatory lighting).
- Easter egg: typing "Hubble" reveals a hidden Hubble telescope model in the sky.

---

## 6. Ready to Build

All design decisions are locked. All trade-offs evaluated. All risks identified with mitigations. All copy pre-written. All data structures defined.

**Next:** Build the actual portfolio following this roadmap. Start with M0 (foundation), ship each milestone as a checkpoint.
