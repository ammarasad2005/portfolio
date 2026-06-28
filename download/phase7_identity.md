# Phase 7 — Identity

> The single strongest identity for the portfolio, formalized as a brand bible.

---

## 1. The One Identity

**World:** A quiet observatory, floating in deep navy space, at the edge of an unnamed star system.

**Visitor's role:** Observer. They are not an astronaut, not a pilot, not a hero. They are a quiet person at a telescope, slowly turning it to find things.

**Owner's voice (yours):** A curious tinkerer who ships. The telescope isn't decoration — it's a metaphor for how you work: aim carefully, observe patiently, then build.

**One-line identity statement:**
> *A curious engineer at a quiet observatory, charting constellations of projects — each one a small world with its own gravity.*

---

## 2. Why this identity (and not the alternatives)

The brief offered 10 candidate identities (engineering lab, command center, AI facility, museum, cyberpunk workshop, floating islands, abstract universe, innovation campus, space observatory). After Phase 4 + Phase 5 evidence, the space observatory wins decisively. Here's the reasoning — not just preference, evidence:

| Identity | Why it loses to space observatory |
|---|---|
| Engineering lab | Implies clutter, work-in-progress everywhere. Conflicts with your "calm observer" personality. |
| Command center | Too aggressive / mission-control. Conflicts with "curious tinkerer." |
| AI research facility | Reduces you to one pillar (AI/ML). You have three (web + AI + mobile). |
| Museum | Too static. You're a builder, not a curator. |
| Cyberpunk workshop | Aesthetic overload. Conflicts with senior-engineer audience who respect restraint. |
| Floating islands | Whimsical, but doesn't connect to your culturally-grounded work (Pakistan informal economy, Urdu NLP, FAST-student tools). |
| Abstract universe | Most original, hardest to land. Risks feeling cold and impersonal — bad for "music + writing" humanization. |
| Innovation campus | Corporate. Conflicts with hacker-builder identity. |

**Space observatory wins because:**
1. **Calm + vast** matches your "curious tinkerer" personality (Phase 4).
2. **Telescope = builder mindset** — observe carefully, then build precisely.
3. **Projects as celestial bodies** maps perfectly to your diverse project set (each is a small world).
4. **Navy sunset palette** fits naturally (deep space + sunset on a distant horizon).
5. **Senior engineers respect restraint** — observatory is the opposite of cyberpunk overload.
6. **Music + writing** humanization fits the "quiet observer" tone (an observatory is a place for contemplation, not action).
7. **Distinctive** — most dev portfolios are workshops, dashboards, or cyberpunk rooms. Almost none are observatories.
8. **Original** — space-themed web design is common, but space-as-observatory (vs. space-as-astronauts) is rare.

---

## 3. Brand Bible

### 3.1 Name treatment
- **Wordmark:** "Ammar Asad" set in Fraunces (display serif), tracking -0.02em.
- **Alternative:** "ammar asad" lowercase for casual contexts (footer, contact).
- **Tagline (rotating, one per chapter):**
  - "Curious engineer. Quiet observer."
  - "Building agentic AI for Pakistan."
  - "Full-stack web · AI/ML · Mobile."
  - "I aim carefully, then ship."
- **NEVER:** "Ammar Asad — Software Engineer" or "Full-Stack Developer." Generic, forgettable.

### 3.2 Logo concept (no actual logo file needed for v1)
- **Concept:** A minimal telescope icon — a circle (lens) + a line (barrel) at a 30° angle. Drawn in 1px stroke, ivory on navy.
- **Animated state:** When the telescope icon appears, it slowly rotates 5° back and forth (idle drift), matching the observatory's idle camera drift.
- **Alternative concept:** A constellation of 5 dots forming your initials "A A" — the dots are stars of varying brightness.
- **v1 implementation:** Text-only wordmark. Logo can be added later if needed.

### 3.3 Voice & tone
- **Voice (consistent across all copy):**
  - Warm, not corporate.
  - First-person ("I built…") not third-person ("Ammar built…").
  - Specific, not vague. ("33M Pakistani diabetics" not "many people.")
  - Honest about gaps. ("No tests yet — I'd add Playwright if I shipped this today.")
  - Curious, not authoritative. ("I'm still figuring out…" is fine.)
- **Tone per section:**
  - Hero / arrival: Hushed, reverent. Short sentences.
  - Introduction: Warmer, more personal. Anecdotes OK.
  - Projects: Technical, precise. Engineering trade-offs explicit.
  - Technical credibility: Confident, dry. Numbers and specifics.
  - Personality: Playful, introspective. Music + writing come through.
  - Future ambitions: Earnest, ambitious. No false modesty.
  - Contact: Direct, simple. No "Let's connect!" clichés.

### 3.4 Color system (locked Phase 4, formalized here)
| Token | Hex | Usage |
|---|---|---|
| `bg-deep` | `#0A1530` | Primary background (deep navy) |
| `bg-elevated` | `#0F1B3D` | Secondary background (gradient edge) |
| `bg-glass` | `rgba(255, 255, 255, 0.04)` | Glass surfaces (info panels) |
| `text-primary` | `#F5F0E1` | Ivory — primary text |
| `text-secondary` | `#8B95B5` | Slate-blue — secondary text |
| `text-muted` | `#5A6485` | Muted slate — captions |
| `accent-sunset` | `#FF6B35` | Sunset orange — primary accent (AI/ML pillar) |
| `accent-amber` | `#F59E0B` | Amber — secondary accent (callouts, badges) |
| `accent-ivory-glow` | `#F5F0E1` at 60% opacity | Soft glow on focused objects (Web pillar) |
| `accent-cyan-amber` | gradient `#FF6B35 → #4DD0E1` | Mobile pillar (cyan-amber blend) |
| `border-subtle` | `rgba(245, 240, 225, 0.08)` | Glass borders |
| `border-focus` | `rgba(255, 107, 53, 0.4)` | Focus rings |

**Pillar color mapping (for project celestial bodies + lighting):**
- **Full-stack Web pillar:** cool ivory light (`#F5F0E1` tint, low warmth)
- **AI/ML pillar:** warm sunset orange light (`#FF6B35` tint, high warmth)
- **Mobile pillar:** cyan-amber blend (`#4DD0E1 + #F59E0B`, dual-light setup)

### 3.5 Typography (locked Phase 6, formalized here)
| Role | Family | Weight | Tracking | Size range |
|---|---|---|---|---|
| Display headlines | Fraunces (variable serif) | 500–600 | -0.02em | 72–120px desktop, 40–56px mobile |
| Body | Inter | 400 | 0 | 16–18px |
| Captions / labels | Inter | 500 | +0.04em uppercase | 11–13px |
| Technical accents (stack chips, code, metadata) | JetBrains Mono | 400–500 | 0 | 12–14px |

**Line-height:** 1.1 for display, 1.5 for body, 1.4 for captions.
**Font loading:** Self-host via `next/font` (Inter + Fraunces variable), JetBrains Mono via `next/font/google`. Subset to Latin + Latin Extended only.

### 3.6 Sound identity (subtle, off by default)
- **Ambient drone:** Sustained low pad (think Brian Eno "Apollo: Atmospheres & Soundtracks"). Volume 5–8%.
- **Focus chime:** Soft singing-bowl tone when a project body comes into focus. Pitch varies per pillar (Web: A4, AI/ML: E4, Mobile: C5).
- **Scroll wind:** Very subtle white-noise sweep during fast scrolls. Off by default.
- **Toggle:** Top-right icon (sound on/off). Persists in localStorage.

### 3.7 Motion identity
- **Idle drift:** Camera and ambient particles drift very slowly (0.5°/s) when visitor pauses. Never still.
- **Focus pull:** When a project body enters the focus zone, camera target eases toward it over 800ms (`power3.inOut`).
- **Chapter transitions:** Crossfade 600–800ms. Camera flies forward at constant speed during transition.
- **Hover:** Subtle camera nudge (3°) toward the focal point, info panel peeks in.
- **Click:** Full focus — info panel materializes, optional CTAs appear.
- **Never:** linear easing, bouncy springs, rotating cubes, fade-in-up generics.

### 3.8 Differentiator pillars (the "why you" story)
1. **Agentic AI for Pakistan** — hamara-rozgar (multi-agent) + glucoguard-plus (multi-model) + Internship-Finder (feedback learning loop). Two hackathons, two domains, two architectures. No other internship candidate has this.
2. **FAST-student tooling cluster** — Exam-Table, gcr-resources-fetch. Real users, real adoption (3★ on gcr-resources-fetch). Practical empathy.
3. **Culturally grounded products** — Urdu/Roman Urdu NLP, Pakistani stores, informal economy. You build for communities you understand.
4. **Mobile shipping** — hamara-rozgar ships an Android APK. Few web devs can claim mobile shipping.
5. **Sophisticated dev workflow** — Internship-Finder's 21+ phase architecture docs, AGENTS.md, FIRST_RUN_POSTMORTEM_TEMPLATE.md. Senior-engineer signal.

---

## 4. Identity Artifacts (linked from other phases)
- Phase 8: Storytelling (visitor journey through the observatory)
- Phase 9: UX (navigation, scroll behavior, mobile)
- Phase 10: 3D experience (scene hierarchy, cameras, lighting, shaders)
- Phase 11: Blender pipeline (which assets to model custom)
- Phase 12: Project presentation (per-flagship presentation approach)
- Phase 13: Visual design system (component library, spacing, shadows)
