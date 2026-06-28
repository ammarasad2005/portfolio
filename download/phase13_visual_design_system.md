# Phase 13 — Visual Design System

> Tokens, components, and rules that keep the observatory visually coherent across all 8 beats.

---

## 1. Color Tokens (locked in Phase 7, formalized as code)

```css
/* === Backgrounds === */
--bg-deep: #0A1530;             /* primary background, deep navy */
--bg-elevated: #0F1B3D;          /* gradient edge, slightly lighter */
--bg-glass: rgba(255, 255, 255, 0.04); /* glass surfaces */
--bg-glass-hover: rgba(255, 255, 255, 0.06);

/* === Text === */
--text-primary: #F5F0E1;         /* ivory */
--text-secondary: #8B95B5;       /* slate-blue */
--text-muted: #5A6485;           /* muted slate */

/* === Accents === */
--accent-sunset: #FF6B35;        /* primary accent (AI/ML pillar) */
--accent-amber: #F59E0B;         /* secondary accent (callouts) */
--accent-ivory-glow: rgba(245, 240, 225, 0.6); /* Web pillar glow */
--accent-cyan: #4DD0E1;          /* Mobile pillar cool side */
--accent-mobile-blend: linear-gradient(135deg, #FF6B35 0%, #4DD0E1 100%);

/* === Borders === */
--border-subtle: rgba(245, 240, 225, 0.08);
--border-focus: rgba(255, 107, 53, 0.4);
--border-strong: rgba(245, 240, 225, 0.16);

/* === Pillar colors (for celestial bodies + lighting) === */
--pillar-web: #F5F0E1;           /* ivory, low warmth */
--pillar-ai: #FF6B35;            /* sunset orange, high warmth */
--pillar-mobile: linear-gradient(135deg, #FF6B35 0%, #4DD0E1 100%);
```

**Contrast ratios (WCAG):**
- text-primary on bg-deep: 13.2:1 (AAA)
- text-secondary on bg-deep: 5.8:1 (AA)
- text-muted on bg-deep: 3.1:1 (AA for large text only — use sparingly)
- accent-sunset on bg-deep: 5.2:1 (AA)

---

## 2. Typography Scale

```css
/* === Font families (self-hosted via next/font) === */
--font-display: 'Fraunces', Georgia, serif;     /* variable serif */
--font-body: 'Inter', system-ui, sans-serif;     /* clean sans */
--font-mono: 'JetBrains Mono', ui-monospace, monospace;

/* === Type scale (desktop) === */
--text-display-xl: 120px;   /* hero headlines only */
--text-display-lg: 96px;    /* section headlines */
--text-display-md: 72px;    /* subsection headlines */
--text-display-sm: 48px;    /* card headlines */

--text-body-lg: 20px;       /* lead paragraphs */
--text-body-md: 18px;       /* default body */
--text-body-sm: 16px;       /* compact body */

--text-caption: 13px;       /* captions, metadata */
--text-micro: 11px;         /* uppercase labels */

/* === Type scale (mobile, 1-step down) === */
--text-display-xl-m: 56px;
--text-display-lg-m: 40px;
--text-display-md-m: 32px;
--text-display-sm-m: 24px;
--text-body-lg-m: 18px;
--text-body-md-m: 16px;
--text-body-sm-m: 14px;

/* === Line heights === */
--leading-display: 1.05;
--leading-body: 1.55;
--leading-caption: 1.4;

/* === Letter spacing === */
--tracking-display: -0.02em;
--tracking-body: 0;
--tracking-caption: 0.04em;   /* for uppercase */

/* === Weights === */
--weight-display: 500;       /* Fraunces variable */
--weight-body-regular: 400;
--weight-body-medium: 500;
--weight-body-bold: 600;
--weight-mono: 400;
```

**Usage rules:**
- Display serif ONLY for headlines (Beat 1 hero, Beat intros, project titles). Never for body.
- Body sans for all paragraphs, captions, UI text.
- Mono for: stack chips, code snippets, technical metadata, file paths.
- Uppercase + tracking-caption only for: micro-labels above headlines ("FLAGSHIP", "BUILDING NOW", stack chip category labels).

---

## 3. Spacing System

**Base unit: 4px.** All spacing values are multiples of 4.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
--space-32: 128px;
--space-48: 192px;     /* between major sections */
--space-64: 256px;     /* between chapters */
```

**Rules:**
- Between paragraphs: `--space-4` (16px).
- Between heading and body: `--space-6` (24px).
- Between cards in a grid: `--space-6` (24px).
- Between sections within a beat: `--space-32` (128px).
- Between chapters (beats): `--space-64` (256px) — equivalent to ~3 seconds of scroll.

---

## 4. Layout Grid

**Desktop (≥1280px):**
- 12-column grid, 80px max-width per column, 24px gutters.
- Content max-width: 1280px.
- Info panels (project details): 480px wide, glass surface, positioned right of the focal point.
- Side margins: 96px minimum.

**Tablet (768–1279px):**
- 8-column grid, 16px gutters.
- Content max-width: 720px.
- Info panels: full-width, slide up from bottom.
- Side margins: 48px.

**Mobile (<768px):**
- 4-column grid, 16px gutters.
- Content max-width: 100% - 32px.
- Info panels: full-width, slide up from bottom, max-height 70vh (scrollable).
- Side margins: 16px.

---

## 5. Component Library

### 5.1 Glass info panel (primary content surface)
```css
.info-panel {
  background: var(--bg-glass);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: var(--space-8);
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.5),
              0 0 0 1px var(--border-subtle) inset;
}
```

### 5.2 Stack chip
```css
.stack-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 6px 12px;
  background: rgba(245, 240, 225, 0.06);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-caption);
}
.stack-chip:hover { background: rgba(245, 240, 225, 0.1); }
```

### 5.3 Pillar badge (color-coded per pillar)
```css
.pillar-badge--web {
  background: rgba(245, 240, 225, 0.1);
  color: var(--text-primary);
  border: 1px solid rgba(245, 240, 225, 0.2);
}
.pillar-badge--ai {
  background: rgba(255, 107, 53, 0.1);
  color: var(--accent-sunset);
  border: 1px solid rgba(255, 107, 53, 0.3);
}
.pillar-badge--mobile {
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(77, 208, 225, 0.1) 100%);
  color: var(--text-primary);
  border: 1px solid rgba(77, 208, 225, 0.3);
}
```

### 5.4 Building Now badge (for in-progress projects)
```css
.badge-building-now {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(255, 107, 53, 0.15);
  border: 1px solid rgba(255, 107, 53, 0.4);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  color: var(--accent-sunset);
  text-transform: uppercase;
  letter-spacing: var(--tracking-caption);
}
.badge-building-now::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--accent-sunset);
  border-radius: 50%;
  animation: pulse-building 2s ease-in-out infinite;
}
@keyframes pulse-building {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}
```

### 5.5 CTA button (primary)
```css
.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 12px 24px;
  background: var(--accent-sunset);
  color: var(--bg-deep);
  font-family: var(--font-body);
  font-weight: var(--weight-body-medium);
  font-size: var(--text-body-sm);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.cta-primary:hover {
  background: #FF7E50;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px -8px rgba(255, 107, 53, 0.5);
}
```

### 5.6 CTA button (secondary, ghost)
```css
.cta-ghost {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 12px 24px;
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-weight: var(--weight-body-medium);
  font-size: var(--text-body-sm);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.cta-ghost:hover {
  background: rgba(245, 240, 225, 0.04);
  border-color: var(--text-secondary);
}
```

### 5.7 Progress indicator (orbit path)
- A thin (1px) arc drawn at the right edge of the viewport.
- 8 dots along the arc, one per beat.
- Current beat's dot is enlarged (4px → 8px) and tinted with accent-sunset.
- Past beats' dots are filled (text-secondary).
- Future beats' dots are hollow (border only).
- Clicking a dot takes you to that beat (jump navigation, but only if the visitor has already scrolled past it once — prevents spoilers).

### 5.8 Sound toggle (top-right)
- Icon: speaker with sound waves (on) or muted speaker (off).
- Position: fixed, top-right, 24px from edges.
- Size: 32x32px, glass surface, border-radius 8px.
- Persists state in localStorage.

---

## 6. Iconography

**Library:** lucide-react (you already use it in 3/7 repos — consistency signal).

**Custom icons (need to be created as SVG):**
- Telescope icon (for the wordmark / loading screen)
- Constellation outline icons (3 — Builder, Agent, Hand)
- Celestial body type icons (planet, star, nebula, comet, satellite)

**Rules:**
- All icons 1.5px stroke, no fill (unless dot-style).
- Stroke color = currentColor (inherits text color).
- 24x24px viewBox.
- Rounded line caps.

---

## 7. Shadows & Depth

```css
--shadow-glass: 0 20px 60px -20px rgba(0, 0, 0, 0.5);
--shadow-elevated: 0 30px 80px -20px rgba(0, 0, 0, 0.6);
--shadow-focus: 0 0 0 4px rgba(255, 107, 53, 0.2);
--shadow-cta: 0 8px 20px -8px rgba(255, 107, 53, 0.5);
```

**Rules:**
- Glass surfaces get `--shadow-glass`.
- Modals / focused panels get `--shadow-elevated`.
- Focused interactive elements get `--shadow-focus` (replaces outline).
- CTAs on hover get `--shadow-cta`.
- **Never** use box-shadow for 3D depth on flat UI elements — the 3D world provides depth; UI should feel flat-glass.

---

## 8. Gradients

```css
--gradient-bg-radial: radial-gradient(ellipse at top, #0F1B3D 0%, #0A1530 60%);
--gradient-dawn: linear-gradient(180deg, #0A1530 0%, #FF6B35 80%, #F5F0E1 100%); /* Beat 8 ending */
--gradient-mobile-pillar: linear-gradient(135deg, #FF6B35 0%, #4DD0E1 100%);
--gradient-glass-sheen: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
```

**Rules:**
- Gradients are subtle. Never let them compete with the 3D scene.
- The dawn gradient (Beat 8) is the only "bold" gradient — saved for emotional payoff.
- Glass surfaces use `--gradient-glass-sheen` to add a subtle highlight on the top-left.

---

## 9. Animation Rules

**Easing curves:**
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);          /* power4.out equivalent */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);           /* power4.in equivalent */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);      /* power3.inOut equivalent */
--ease-focus: cubic-bezier(0.34, 1.56, 0.64, 1);    /* subtle back-ease for focus pulls */
```

**Durations:**
```css
--dur-instant: 100ms;       /* hover states */
--dur-fast: 200ms;          /* button transitions */
--dur-medium: 400ms;        /* panel materialization */
--dur-slow: 800ms;          /* focus pulls */
--dur-chapter: 1200ms;      /* chapter transitions */
```

**Rules:**
- Never use linear easing.
- Never use bouncy springs (conflicts with calm observatory tone).
- Stagger overlapping animations by 50ms.
- Respect `prefers-reduced-motion: reduce` → set all durations to 0.01ms, disable camera movement, show content statically.

---

## 10. Interaction States

| State | Visual change |
|---|---|
| Default | Glass surface, subtle border |
| Hover | Background lightens +6%, border lightens, subtle 1px translateY(-1) |
| Focus | `--shadow-focus` (4px sunset orange ring), no outline |
| Active | Background lightens +10%, 1px translateY(0) |
| Disabled | 50% opacity, cursor: not-allowed |
| Loading | Skeleton: 1px border, animated shimmer (low-opacity gradient sweep) |

---

## 11. Accessibility Rules

- All interactive elements: minimum 44x44px touch target.
- Color contrast: WCAG AA minimum, AAA where possible.
- Focus indicators: always visible, never removed.
- `prefers-reduced-motion`: respected globally.
- `prefers-color-scheme`: not needed (we're always dark mode — but ensure no flash-of-light-content on load).
- Keyboard navigation: Tab moves between interactive elements, Enter activates, Esc closes panels.
- Screen reader: ARIA live region announces chapter changes; all info panels have proper headings and landmarks.
- 3D canvas: `aria-hidden="true"` (decorative), with semantic HTML duplicate content behind it for screen readers.

---

## 12. Asset Strategy

- **Fonts:** Self-host via `next/font`. Subset to Latin + Latin-Extended. ~80KB total.
- **Icons:** Inline SVG components (no icon font). Tree-shakeable via lucide-react.
- **3D models:** GLTF + Draco compression + KTX2 textures. See Phase 10 + 11.
- **Images:** Next.js Image component, AVIF + WebP, lazy-loaded.
- **Audio:** Lazy-loaded, only when sound toggle is on. ~200KB ambient loop (mp3).
