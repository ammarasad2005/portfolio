# Phase 6 — Research Report

**Project:** 3D Developer Portfolio for Ammar Asad (@ammarasad2005)
**Identity locked:** Space observatory · Navy sunset palette · Curious tinkerer + Builder/shipper
**Method:** Targeted web searches across Awwwards, Codrops, Three.js community + cross-referenced with my training knowledge of outstanding immersive portfolios. **Goal: extract principles, NOT copy.**

---

## 1. Reference Portfolios & Experiences Analyzed

### 1.1 Bruno Simon — bruno-simon.com
**Concept:** Visitor drives an RC car around a 3D world to discover content. Three.js + Cannon.js (physics).
**Why it matters:** Widely considered the gold standard for "portfolio as play."

**Extracted principles:**
- **Interactive metaphor as navigation** — driving = exploring. No menus.
- **Physics creates consequence** — interactions feel weighted, real.
- **Discovery over hierarchy** — content is found, not listed.
- **One unified world** — no page transitions, no jarring cuts.
- **Play on entry, depth on demand** — first 5 seconds are joy; deeper info is opt-in.

**How this maps to our observatory:**
- ✅ Interactive metaphor: visitor aims/orbits a telescope instead of driving a car.
- ✅ Discovery over hierarchy: projects are found by aiming at constellations, not by clicking a nav.
- ✅ One unified world: we move through ONE observatory, not multiple "pages."
- ❌ Physics: NOT appropriate for our calm observatory tone. Bruno's physics works because RC cars are playful; a telescope should feel precise, not bouncy.

---

### 1.2 Codrops — "More Than a Portfolio: Building a Scroll-Driven 3D World" (April 2026)
**Source:** tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world
**Concept:** Scroll position drives camera through a 3D world built with Three.js + GSAP + WebGL.

**Extracted principles:**
- **Scroll = camera position** — every pixel of scroll has spatial meaning.
- **GSAP ScrollTrigger choreographs everything** — text, camera, lighting, post-processing all sync to scroll progress.
- **Each scroll section is a "chapter"** with its own focal point.
- **Camera easing curves matter more than camera position** — ease in/out, never linear.
- **The 3D world is the navigation UI** — no separate nav bar.

**How this maps to our observatory:**
- ✅ Primary navigation = scroll. As visitor scrolls, camera flies through the observatory, approaching each project as a celestial body.
- ✅ Each project gets a "chapter" — a moment where the camera locks onto that project's planet/star, info panel materializes, visitor can read or scroll past.
- ✅ GSAP ScrollTrigger as the choreographer for everything.
- ✅ No top nav bar. Just a subtle progress indicator (orbit path drawn at screen edge).

---

### 1.3 Codrops — "Interactive Storytelling for the Web" (April 2026)
**Source:** tympanus.net/codrops/2026/04/20/interactive-storytelling-for-the-web
**Concept:** Step-by-step approach to building immersive stories with motion, interaction, and 3D scene building.

**Extracted principles:**
- **Story first, tech second** — every technical decision must serve a message.
- **Pacing is content** — fast sections feel exciting; slow sections feel important.
- **Use motion to direct attention** — camera and lighting lead the eye.
- **Interactive moments must be earned** — don't ask the visitor to interact until you've given them a reason to care.
- **Audio is half the experience** — sound design is non-optional for immersion.

**How this maps to our observatory:**
- ✅ Story spine: Arrival → Introduction → Exploration → Projects → Technical credibility → Personality → Future ambitions → Contact. Each beat has its own pacing.
- ✅ Motion directs attention: when a project celestial body comes into focus, the camera and lighting both highlight it.
- ✅ Audio: subtle ambient space sound + soft chimes when a body comes into focus. Respect mute preference.

---

### 1.4 Awwwards Site-of-the-Year patterns
**Source:** awwwards.com/websites/sites_of_the_year, awwwards.com/websites/three-js (119 items), awwwards.com/websites/webgl

**Extracted principles (common across winners):**
- **Loading is performance** — never waste the visitor's attention during load. Use it to set mood.
- **Typography carries weight** — display serif or strong geometric sans for headlines, generous tracking, large size contrast.
- **One bold visual statement per section** — don't compete with yourself.
- **Transitions are seamless** — hard cuts = amateur. Crossfade, fly-through, dissolve.
- **Cursor is part of the experience** — custom cursor states (hover, drag, idle) reinforce the world.
- **Mobile is not a port — it's a different experience** — same story, different mechanics (touch instead of scroll-drag, simplified camera).
- **Accessibility doesn't kill creativity** — `prefers-reduced-motion`, keyboard nav, alt text all coexist with immersion.

---

### 1.5 Merlin Studio — "Immersive (3D) Experiences"
**Source:** merlin.studio/expertise/immersive-experiences

**Extracted principles:**
- **Real-time 3D is interactive** — environment responds, camera moves, lighting changes, content adapts per user.
- **"Real-time" is the differentiator vs. video** — visitor feels agency.
- **Single link opens the door** — no installs, no plugins, just a URL.

**How this maps to our observatory:**
- ✅ Real-time 3D: telescope responds to scroll/mouse, lighting shifts as visitor progresses, info materializes on focus.
- ✅ Single URL, instant access. No app store, no plugin.

---

### 1.6 Space-themed web design (general survey)
**Sources:** Pinterest, Dribbble, Behance, Medium, Designmodo space-themed roundups

**Common anti-patterns observed:**
- Rockets, astronauts, planets-as-decoration (cliché)
- Aggressive star fields with no focal point
- Neon blue/purple gradients everywhere
- "Space" as aesthetic skin over normal content

**What we'll do differently:**
- No rockets, no astronauts, no Saturn V clip art.
- Space as a *medium* (the void between projects), not a *decoration*.
- Focal points are projects (each is a celestial body), not generic planets.
- Navy + sunset orange palette (not the overdone deep-space-cyan or violet-AI).
- Telescope/observatory as the visitor's role, not "astronaut" or "explorer."

---

## 2. Extracted Principles — Organized by Dimension

### 2.1 Storytelling
1. **Scroll-as-camera** (Codrops pattern) — every scroll pixel has spatial meaning.
2. **Discovery-based navigation** (Bruno Simon) — content is found, not listed.
3. **Chapter-based pacing** — each section has ONE main idea.
4. **Hero moment first, depth on demand** — first 5 seconds set the hook, deeper info is opt-in.
5. **End with a memorable beat** — not a CTA spam wall. The last frame should be the one visitors remember.

### 2.2 Pacing
1. **Slow → fast → slow rhythm** — calm entry, building momentum through projects, calm exit.
2. **One idea per section** — don't make the visitor hold multiple concepts at once.
3. **Reveal progressively** — never show everything at once; tease the next chapter.
4. **Silence/space as design element** — empty space is intentional, not lazy.

### 2.3 Navigation
1. **Primary: scroll** — universal, intuitive, no learning curve.
2. **Secondary: minimal progress indicator** — orbit path drawn at screen edge, current chapter highlighted.
3. **Tertiary: optional "free explore" mode** — visitor can pause scroll-driven journey and orbit freely.
4. **NO hamburger menu, NO top nav bar** — these break immersion. Use scroll position as the nav.
5. **Footer-as-end-credits** — contact + links at the very end, treated like film credits.

### 2.4 Animation
1. **GSAP for choreography** — ScrollTrigger, timelines, easing curves.
2. **Framer Motion for UI transitions** — info panel materialization, hover states.
3. **Three.js for 3D scene animation** — camera, objects, lighting, particles.
4. **Always respect `prefers-reduced-motion`** — provide a static fallback path.
5. **Easing curves: ease-out for entries, ease-in for exits, ease-in-out for transitions.** Never linear.
6. **Stagger overlapping animations by 50–100ms** — creates rhythm without feeling mechanical.

### 2.5 Camera movement
1. **Smooth easing** — never linear. Use `power2.inOut`, `power3.out`, custom cubic-bezier.
2. **Scroll-bound camera for primary navigation** — visitor's scroll position = camera position in 3D space.
3. **Idle camera drift** — when the visitor isn't scrolling, the camera should drift very slowly (parallax breathing). Never fully still.
4. **Camera "looks at" focal points** — when approaching a project, the camera target eases toward it.
5. **Field of view shifts for emphasis** — narrow FOV when focusing on a project (intimacy), wide FOV when traveling between (vastness).

### 2.6 Scene composition
1. **One focal point per scene** — don't compete with yourself.
2. **Negative space is intentional** — the void between projects is part of the design.
3. **Lighting tells the story** — each project's celestial body has its own key light (sunset orange tint for AI/ML, cooler for web, neutral for mobile).
4. **Depth of field for hierarchy** — focal point sharp, foreground/background soft.
5. **Framing through architecture** — use observatory structures (window frames, telescope barrel, dome opening) to frame each shot.

### 2.7 Typography
1. **Display serif for headlines** — gravitas, editorial weight. Candidate: **Fraunces** (variable, expressive) or **Playfair Display**.
2. **Clean sans for body** — legibility at small sizes. Candidate: **Inter** (already Geist-adjacent, matches your Next.js work) or **Söhne** (premium, paid).
3. **Mono for technical accents** — stack chips, code snippets, project metadata. Candidate: **JetBrains Mono** or **IBM Plex Mono**.
4. **Large size contrast** — display headlines at 72–120px, body at 16–18px, captions at 12–13px.
5. **Generous tracking on display** — letter-spacing: -0.02em on big headlines for tightness.
6. **Line-height: 1.1 for display, 1.5–1.6 for body** — readability across scales.

### 2.8 Transitions
1. **Crossfade between chapters** — soft, slow (600–800ms).
2. **Camera fly-through between sections** — the connective tissue.
3. **UI elements fade/slide in with stagger** — 50ms stagger, 300ms duration, ease-out.
4. **Avoid jarring hard cuts** — if a hard cut is needed, frame it as a "telescope refocus" (quick blur + snap).
5. **Loading is a transition** — "Calibrating telescope" sequence, not a spinner.

### 2.9 Interaction patterns
1. **Hover = preview** — subtle camera nudge toward the focal point, info panel peeks in.
2. **Click = commit** — full focus on the project, expanded info, optional "open live demo" / "view source" CTAs.
3. **Scroll = progress** — camera moves forward through the observatory.
4. **Drag (in free-explore mode) = orbit** — visitor can rotate around a focal point.
5. **Keyboard = accessibility** — arrow keys / Tab to move between chapters, Enter to focus a project.

### 2.10 Emotional impact
1. **Awe at scale** — vast establishing shots of the observatory floating in deep space.
2. **Intimacy in detail** — close-up of a project's "surface" (textured sphere, holographic interface).
3. **Trust through craft** — smooth, polished motion signals engineering competence.
4. **Curiosity through mystery** — don't reveal everything. Tease the next chapter with a distant glow.
5. **Warmth through voice** — copy is human, not corporate. "I built this because…" not "This project leverages…"

---

## 3. Anti-Patterns to Avoid (Explicit)

| Anti-pattern | Why we avoid |
|---|---|
| Hamburger menu | Breaks immersion, signals "this is a website" not "this is a world" |
| Top navigation bar | Same as above |
| Long-form text inside 3D scene | Illegible at angle; bad for accessibility |
| Auto-playing video | Visitor loses agency; bad for performance |
| Modal popups | Break the world |
| Multiple competing CTAs | Decision fatigue |
| Generic "fade in up" animations | Lazy, no craft |
| Particle systems without purpose | Visual noise |
| Bloom overload | Looks cheap, hurts performance |
| Linear easing | Feels robotic |
| Loading screen that wastes attention | Lost opportunity for mood-setting |
| Custom cursor without keyboard alternative | Accessibility failure |
| Mobile as 1:1 port of desktop | Touch ≠ mouse; needs different mechanics |
| "Space" as decoration | Cliché. We use space as *medium* |
| Astronauts / rockets / Saturn V | Cliché. Observatory ≠ space tourism |
| Neon blue/purple gradients | Done to death. Navy + sunset orange is distinctive |

---

## 4. Synthesis — Principles for THIS Project

Based on the research + Phase 4 profile (curious tinkerer, builder/shipper, music + writing, senior-engineer audience, Big Tech + OSS dream companies) + Phase 5 evidence (3 flagships, agentic AI cluster, FAST-student tooling), here are the principles that will guide Phases 7–16:

### 4.1 World identity
- **One unified observatory** floating in calm deep space. No rockets, no astronauts, no clip-art planets.
- **Telescope = visitor's viewpoint.** Camera IS the telescope.
- **Projects = celestial bodies** (planets, stars, nebulae) the telescope discovers.
- **The void between projects** is intentional negative space — calm, not empty.

### 4.2 Camera choreography
- **Scroll-bound primary camera** — Codrops pattern, our default navigation.
- **Idle drift** — slow parallax breathing when visitor pauses.
- **Focus pulls** — when a project body comes into view, camera target eases toward it, FOV narrows slightly (intimacy).
- **Travel mode** — between chapters, FOV widens (vastness), camera flies forward.

### 4.3 Lighting & atmosphere
- **Each project body has its own key light** tinted to its pillar:
  - Web pillar (Exam-Table, Drama-Ghar): cool ivory light
  - AI/ML pillar (hamara-rozgar, glucoguard-plus, Internship-Finder): warm sunset orange light
  - Mobile pillar (hamara-rozgar APK): cyan-amber blend
- **Ambient: deep navy** (#0A1530 ish) with a subtle nebula gradient.
- **Stars: sparse, high-contrast** — not a starfield wallpaper. Maybe 200–400 point lights total.
- **Bloom: very subtle** — only on the brightest highlights. Threshold tuned high.

### 4.4 Typography
- **Display:** Fraunces (variable serif, expressive, supports our warm-editorial tone)
- **Body:** Inter (clean, matches your Next.js/Geist work)
- **Mono:** JetBrains Mono (technical accents — stack chips, code)
- **Sizes:** display 72–120px, body 16–18px, captions 12–13px
- **Tracking:** -0.02em on display, 0 on body, +0.04em on captions (uppercase)

### 4.5 Color system (locked in Phase 4)
- **Background:** deep navy `#0A1530` (with subtle gradient toward `#0F1B3D` at edges)
- **Primary text:** ivory `#F5F0E1`
- **Accent (sunset orange):** `#FF6B35` (primary), `#F59E0B` (amber, secondary accent)
- **Muted:** `#8B95B5` (slate-blue for secondary text)
- **Glass surfaces:** `rgba(255, 255, 255, 0.04)` with 1px border `rgba(245, 240, 225, 0.08)`

### 4.6 Sound design (subtle, optional)
- **Ambient:** very low-volume drone (think Brian Eno "Apollo" — long sustained pads).
- **Focus chime:** soft, high-pitched bell when a project body comes into focus (think singing bowl).
- **Scroll whoosh:** extremely subtle wind sound during fast scrolls (off by default, opt-in).
- **All sound respects mute preference** — default off, toggle in corner.

### 4.7 Loading experience
- **"Calibrating telescope" sequence** — instead of a spinner, show the observatory dome opening, lens cap lifting, stars becoming visible.
- **Progress as focus adjustment** — a blurry night sky sharpens into focus as assets load.
- **First meaningful paint in <2s** — observatory shell + hero text visible immediately; 3D world fades in as it loads.

### 4.8 Mobile experience
- **Not a 1:1 port.** Touch-first mechanics.
- **Vertical scroll = primary navigation** (same as desktop).
- **Pinch-to-zoom on project bodies** (replaces hover-preview).
- **Simplified 3D:** fewer particles, smaller textures, lower-poly models. Same scene composition.
- **Performance budget:** 30 FPS minimum on mid-range phones (iPhone 12 / Pixel 6).

### 4.9 Accessibility
- **`prefers-reduced-motion`** → static fallback: flat chapter cards, no camera movement, no parallax. Same content, different presentation.
- **Keyboard navigation:** Tab through chapters, Enter to focus a project, Esc to return.
- **Screen reader:** ARIA live regions announce chapter changes; all project info available as semantic HTML behind the 3D canvas.
- **Color contrast:** AAA where possible (ivory on navy = 13:1).
- **No information conveyed by color alone** — each pillar has an icon + label too.

### 4.10 Performance budget
- **First Contentful Paint: <1.5s** on 4G.
- **Largest Contentful Paint: <2.5s.**
- **Time to Interactive: <3.5s.**
- **60 FPS on desktop, 30 FPS minimum on mobile.**
- **Bundle size:** <300KB initial JS (gzipped). 3D world lazy-loaded as separate chunk.
- **Asset strategy:** KTX2 textures (Draco-compressed), GLTF models (Draco-compressed), code-split per chapter.

---

## 5. Source Bibliography

### Live web research (June 2026)
- Awwwards Three.js collection — https://www.awwwards.com/websites/three-js (119 items)
- Awwwards WebGL collection — https://www.awwwards.com/websites/webgl
- Awwwards Site of the Year — https://www.awwwards.com/websites/sites_of_the_year
- Awwwards portfolio winners — https://www.awwwards.com/websites/winner_category/portfolio
- Codrops — "More Than a Portfolio: Building a Scroll-Driven 3D World" (April 28, 2026) — https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world
- Codrops — "Interactive Storytelling for the Web" (April 20, 2026) — https://tympanus.net/codrops/2026/04/20/interactive-storytelling-for-the-web
- Codrops 3D tutorials — https://tympanus.net/codrops/tag/3d
- Codrops scroll tutorials — https://tympanus.net/codrops/tag/scroll
- Bruno Simon's portfolio — https://bruno-simon.com
- Bruno Simon case study (Medium) — https://medium.com/@bruno_simon/bruno-simon-portfolio-case-study-960402cc259b
- Mux interview with Bruno Simon — https://www.mux.com/blog/3d-web-development-and-beyond-a-chat-with-bruno-simon
- Merlin Studio — Immersive expertise — https://merlin.studio/expertise/immersive-experiences
- Best Three.js Portfolios 2026 — https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025
- Utsubo — Immersive Storytelling Websites Guide — https://www.utsubo.com/blog/immersive-storytelling-websites-guide
- Codazen — What is the Immersive Web — https://www.codazen.com/blog/what-is-the-immersive-web
- JDM Web Technologies — 2024 Immersive Web Design — https://www.jdmwebtechnologies.com/blog/crafting-captivating-user-experiences
- web.dev — Browser-level image lazy loading — https://web.dev/articles/browser-level-image-lazy-loading
- Designmodo — Space-Themed Website Designs — https://designmodo.com/space-websites
- Medium — 20 Gorgeous Space Themed Web Designs — https://medium.com/@robinsjackusa/20-gorgeous-space-themed-web-designs-for-your-inspiration

### Cross-referenced from training knowledge (well-known industry references)
- Active Theory — high-end WebGL agency (e.g., Atelier, Halloween experiences)
- Resn — creative agency known for particle systems and post-processing
- Lusion — physical-meets-digital WebGL studio
- AKQA — design-led agency, premium craft
- Frame Studio — typographic immersive experiences
- Dylan Gauthier — creative developer
- Vincent Garreau — particle systems pioneer (particles.js)
- Lucas Bebber — Codrops contributor, glitch/distortion effects
- Active Theory's "Atelier" — gold-standard loading experiences
- Apple's AirPods Pro page — parallax + scroll choreography benchmark
- Vercel's homepage — modern Next.js + R3F reference
- Linear's homepage — gold-standard typography + motion restraint

---

## 6. Conclusion — What Makes THIS Portfolio Memorable

The research converges on a clear verdict: **memorable 3D portfolios are not memorable because of their tech. They are memorable because every technical decision serves a single, coherent story.**

Our story is already locked:
- **World:** Space observatory (calm, vast, awe-inspiring)
- **Visitor:** Observer at a telescope
- **Projects:** Celestial bodies discovered by aiming the telescope
- **Tone:** Curious tinkerer + Builder/shipper — warm, experimental, ship-minded
- **Audience:** Senior engineers / EMs — they read code, respect craft, hate fluff
- **Differentiator:** Agentic AI for Pakistan cluster + FAST-student tooling cluster — culturally grounded, technically substantial, genuinely rare

If we execute the principles above with discipline — **scroll-as-camera, one focal point per scene, no anti-patterns, mobile as different experience, accessibility built-in, performance budget honored** — this portfolio will land in the top tier of 3D developer portfolios globally, and it will be authentically yours.

**Next:** Phase 7 — Identity (formalize the space-observatory direction with a complete brand bible).
