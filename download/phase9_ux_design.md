# Phase 9 — UX Design

> Navigation, scrolling, transitions, mobile/tablet/desktop, onboarding, loading.

---

## 1. Navigation Model

### 1.1 Primary navigation: scroll
- The visitor scrolls down. The camera flies forward through the observatory.
- Every pixel of scroll has spatial meaning — no "dead scroll" between sections.
- Scroll position is the source of truth for which beat is active.
- ScrollTrigger (GSAP) binds DOM progress to camera position in 3D space.

### 1.2 Secondary navigation: progress indicator (orbit path)
- A thin (1px) arc on the right edge of the viewport, ~80vh tall.
- 8 dots along the arc — one per beat.
- Past beats: filled (text-secondary).
- Current beat: enlarged (8px instead of 4px), tinted accent-sunset, subtle pulse.
- Future beats: hollow (border only).
- Click-to-jump is DISABLED on first visit (prevents spoilers). After the visitor has scrolled past a beat once, that beat becomes clickable.

### 1.3 Tertiary navigation: free-explore mode
- On desktop, when the visitor is within Beat 4 (Projects), they can press SPACE to enter free-explore mode.
- In free-explore: scroll is paused, camera can orbit around the current focal point via mouse drag.
- Press SPACE again or scroll to exit free-explore and resume the journey.
- This is the only place we break the "scroll = camera" rule, because visitors may want to examine a project body without advancing the timeline.

### 1.4 Forbidden navigation patterns
- ❌ Hamburger menu
- ❌ Top nav bar
- ❌ Side nav rail with text labels
- ❌ Footer link list (footer is end-credits only — see Beat 8)
- ❌ Breadcrumbs
- ❌ Tab system inside chapters

---

## 2. Scrolling Behavior

### 2.1 Native scroll, not smooth-scroll library
- We use the browser's native scroll (don't hijack with Lenis or Locomotive).
- Why: native scroll respects OS-level accessibility settings (trackpad momentum, mouse wheel acceleration, keyboard PgUp/PgDn).
- Smooth-scroll libraries can feel great on macOS trackpads but terrible on Windows + mouse wheels, and they break screen reader navigation.
- Trade-off: we lose a tiny bit of "buttery smoothness" but gain accessibility and platform-respect.

### 2.2 Scroll-linked camera
- GSAP ScrollTrigger binds `window.scrollY` to a normalized progress value [0,1] across the whole page.
- A custom Three.js camera rig reads this progress and translates it to a spline path through the observatory.
- The spline has 8 control points (one per beat). Between control points, the camera eases along a Catmull-Rom curve.
- On fast scrolls, the camera "catches up" with a slight ease-out lag (300ms) — feels physical without being sluggish.

### 2.3 Scroll velocity affects camera
- Slow scroll (<200px/s): camera moves smoothly, ambient sound at normal volume.
- Medium scroll (200–800px/s): camera moves smoothly, ambient sound dips slightly to make way for whoosh (if sound is on).
- Fast scroll (>800px/s): camera "boosts" forward with a slight FOV widening (vastness feeling), subtle wind sound if enabled.
- This makes scrolling feel like operating a real telescope's drive motor — responsive, with character.

### 2.4 Scroll snap (off by default)
- No scroll snapping. The visitor should be able to stop anywhere, including between beats.
- Mid-scroll positions are valid — the camera interpolates between control points.
- Exception: if the visitor is in free-explore mode and exits, the camera eases to the nearest beat's control point.

---

## 3. Transitions

### 3.1 Between beats (chapter transitions)
- Duration: 1200ms.
- Easing: `--ease-in-out` (power3.inOut).
- Visual: camera flies forward through space, distant celestial bodies drift past, info panels fade out then fade in for the new beat.
- Audio: subtle swell, then settle.
- Crossfade of overlay text (Beat titles) at the midpoint of the transition.

### 3.2 Within a beat (focus pulls between projects in Beat 4)
- Duration: 800ms.
- Easing: `--ease-focus` (subtle back-ease).
- Visual: current project's info panel fades out, camera flies to next project's celestial body, new info panel materializes with stagger.
- Stagger: panel border → title → subtitle → stack chips → body → CTAs, 80ms between each.

### 3.3 Hover-to-preview (subtle)
- Duration: 300ms in, 200ms out.
- Easing: `--ease-out`.
- Visual: camera nudges 3° toward the hovered element, info panel "peeks" — shows title + first 2 lines, rest is blurred.
- On mouse out: snaps back, blur clears.

### 3.4 Click-to-focus (full commit)
- Duration: 500ms.
- Easing: `--ease-focus`.
- Visual: camera locks onto target, full info panel materializes, optional "expanded view" button appears.
- If the click is on a project's "expanded view" button, an overlay slides up with detailed architecture, screenshots, or interactive demo.

### 3.5 Forbidden transitions
- ❌ Hard cuts
- ❌ Fade-to-black (depressing, slow)
- ❌ Spinning cube transitions (1980s TV)
- ❌ Slide-in-from-right full screen (feels like a SPA router, breaks the world)
- ❌ Bouncy spring transitions (conflicts with calm tone)

---

## 4. Loading Experience

### 4.1 First load (the "Calibrating Telescope" sequence)
1. **0–200ms:** Blank deep-navy background. No spinner.
2. **200–600ms:** A single horizontal line appears in the center — the telescope barrel silhouette. Fades in 200ms.
3. **600ms–1.5s:** The barrel tilts 30°. A subtle text fades in below: "Calibrating telescope…" (Fraunces 32px, text-secondary).
4. **1.5s–2.5s:** Behind the barrel, a faint starfield materializes (sparse, 100 stars). The text changes to "Locating constellations…"
5. **2.5s–3.5s:** The starfield sharpens into focus. Three constellation outlines appear, then fade. The text changes to "Ready."
6. **3.5s:** The telescope barrel rotates to point upward. The hero text from Beat 1 fades in. The visitor has arrived.

**Fallback if load takes >5s:** Skip ahead to step 6 with the hero text. Don't make the visitor wait for the calibration sequence if their connection is slow.

**Fallback if `prefers-reduced-motion`:** Show a static centered telescope icon + the words "Ammar Asad — Portfolio" + a progress bar (0–100%). Skip the cinematic sequence entirely.

### 4.2 Asset streaming strategy
- **First paint:** HTML + CSS + minimal JS (~50KB). Telescope icon as inline SVG.
- **First 2s:** Hero fonts (Fraunces display + Inter body subsets), ambient drone (if sound on), initial starfield JSON.
- **First 5s:** Three.js core, R3F, Drei. Camera rig + observatory shell.
- **First 10s:** Project celestial bodies (low-poly first, swap to high-poly as available).
- **Background:** KTX2 textures, GLTF models, full particle systems.

### 4.3 Chapter preloading
- As the visitor approaches the end of Beat N, Beat N+1's assets are preloaded in the background.
- If the visitor scrolls into Beat N+1 before its assets are loaded, show the glass info panel with text content immediately, fade in the 3D celestial body when ready. Don't block the scroll.

---

## 5. Onboarding

### 5.1 No tutorial overlay
- No "Welcome! Here's how to use this site" modal.
- No animated cursor showing what to click.
- No "Skip intro" button.

### 5.2 Inline cues instead
- Beat 1 hero: "Scroll to enter. ↓" — fades out after first scroll.
- Beat 3 (Exploration): inline overlay text "Hover to preview. Click to focus." — fades out after first hover.
- Beat 4 (Projects): small text "Press SPACE to orbit freely" — only appears after the visitor has been in Beat 4 for 10 seconds. Fades out after first press.
- Sound toggle: tooltip on first hover "Toggle ambient sound" — never shown again after first interaction.

### 5.3 Returning visitors
- localStorage flag: `hasVisited = true` after first scroll.
- On return visit: skip Beat 1's full 4-second hero fade — jump to "Ready" state immediately. Visitor can scroll back up if they want to re-experience the arrival.
- Skip all inline cues (they've seen them).

---

## 6. Mobile Experience (≤768px)

### 6.1 Different, not ported
- Touch-first, not mouse-first.
- Same 8 beats, same story, different mechanics.

### 6.2 Scroll mechanics
- Native vertical scroll. Same as desktop.
- Scroll velocity detection: based on touch velocity, not wheel delta.
- No free-explore mode (touch drag conflicts with page scroll). Beat 4 projects are tap-to-focus instead.

### 6.3 Camera behavior
- Simplified camera path — fewer control points per beat, more linear motion.
- No idle drift (drains battery, doesn't add value on mobile).
- Reduced FOV changes (less GPU intensive).

### 6.4 Info panels
- Full-width, slide up from bottom (like iOS sheets).
- Max height: 70vh. Scrollable internally.
- Tap-outside-to-close.
- Project celestial bodies: tap once = focus + panel slides up. Tap again = expand to full detail view.

### 6.5 Performance budget
- 30 FPS minimum on mid-range phones (iPhone 12 / Pixel 6 / Samsung Galaxy S21).
- 60 FPS target on high-end (iPhone 14+ / Pixel 8+ / S23+).
- Texture sizes halved (1024px max instead of 2048px).
- Particle count halved (200 instead of 400).
- No post-processing (no bloom, no DOF) — too expensive on mobile GPUs.
- WebGL fallback: if no WebGL2, show a static version (Beat 1 hero + flat chapter cards with text content).

### 6.6 Mobile-specific UX
- Bottom nav: small "Back to top" button appears after scrolling past Beat 2.
- Haptic feedback: subtle vibration on focus pulls (Web Vibration API, where supported).
- No custom cursor (touch doesn't have one).
- No hover states — replaced with tap-and-hold preview (250ms hold = preview state).

---

## 7. Tablet Experience (768–1279px)

### 7.1 Hybrid of desktop + mobile
- Desktop-style camera path (full 8 control points, idle drift enabled).
- Mobile-style info panels (slide-up bottom sheets) — but wider, taking 60% of viewport width.
- Free-explore mode available (drag-to-orbit) — but uses two-finger drag instead of single-finger (single-finger reserved for scroll).
- Performance budget: 60 FPS target, 30 FPS minimum. Texture sizes 75% of desktop.

---

## 8. Desktop Experience (≥1280px)

### 8.1 Full cinematic experience
- All 8 control points on camera path.
- Idle drift enabled.
- Free-explore mode (SPACE + mouse drag).
- Hover-to-preview enabled.
- Custom cursor (subtle 12px circle, scales to 20px on hover over interactive elements).
- Full post-processing: bloom (subtle), DOF (on focus pulls), grain (very subtle).
- Performance budget: 60 FPS consistent on 2020+ laptops with discrete GPU. 30 FPS minimum on integrated GPU.

---

## 9. Accessibility UX

### 9.1 Keyboard navigation
- Tab: moves between interactive elements in DOM order (CTAs, sound toggle, project celestial bodies, progress indicator dots).
- Enter: activates focused element.
- Esc: closes any open info panel or expanded view.
- Arrow keys (when in Beat 4): moves between projects.
- SPACE (when in Beat 4): toggles free-explore mode.
- PageUp/PageDown: jumps between beats (same as clicking progress dots).

### 9.2 Screen reader experience
- The 3D canvas is `aria-hidden="true"`.
- Behind the canvas, a complete semantic HTML duplicate of all content exists — headings, paragraphs, links, lists.
- This duplicate is visually hidden (clip-path, opacity:0, pointer-events:none) but readable by screen readers.
- ARIA live region announces: "Entering [Beat Name]" as the visitor scrolls.
- All CTAs have descriptive aria-labels.

### 9.3 Reduced motion
- `prefers-reduced-motion: reduce` triggers:
  - Camera static (no scroll-linked movement).
  - All transitions set to 0.01ms duration.
  - No idle drift, no particles, no post-processing.
  - 3D scene replaced with a static gradient background.
  - Content presented as flat chapter cards in a vertical stack.
  - Same copy, same info, same order — different presentation.

### 9.4 Color blindness
- Color is never the only signal. Each pillar has both a color AND an icon AND a label.
- Stack chips are textual, not color-only.
- Status badges ("Building Now") have an icon + text, not just a color.

### 9.5 Cognitive load
- One focal point per beat (Phase 6 principle).
- Maximum 7 stack chips per project (Miller's Law).
- Info panels never exceed 70vh — visitor always sees context above.
- Copy is short. No paragraph over 4 sentences. No sentence over 25 words.

---

## 10. Error states

- **3D fails to load:** Static gradient background + flat chapter cards. Same content. Banner at top: "3D experience unavailable — showing static version."
- **Audio fails to load:** Sound toggle greyed out. No error message — silent fallback.
- **Network slow:** Loading sequence extends. If >10s, skip to static fallback for current beat.
- **JavaScript disabled:** Show a static HTML page with: hero text, project list (cards), contact links. "This portfolio is best experienced with JavaScript enabled."
