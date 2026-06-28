# Phase 12 — Project Presentation

> Per-flagship presentation approach. Each project gets a unique celestial body + interaction + info architecture.

---

## 1. Presentation Principles (locked Phase 6 + Phase 10)

- No ordinary project cards.
- Each project is a celestial body in the observatory.
- Body type matches project architecture (planet, nebula, star, satellite, comet, speck).
- Info panels are glass surfaces that materialize on focus.
- Each project has ONE interactive "deep dive" element that reinforces its story.

---

## 2. Flagship #1 — Exam-Table (Web pillar)

### 2.1 Celestial body
- **Type:** Polished planet with a thin ring.
- **Surface:** Ivory base with amber tint (Web pillar color), 2-octave simplex noise for terrain.
- **Ring:** Thin annulus around the planet, tilted 15°. Color: amber (`#F59E0B`) at 30% opacity.
- **Symbolism:** Planet = the unified campus companion. Ring = the timetable orbit (courses rotating around the student).

### 2.2 Camera focus
- Camera approaches from afar, orbits halfway around the planet (180°), locks focus.
- FOV dips to 35 (intimacy).
- Ring is visible during orbit, disappears behind planet at focus lock.

### 2.3 Info panel content
- **Title:** "FAST Isb Utilities"
- **Subtitle:** "The unified campus companion for FAST NUCES Islamabad"
- **Stack chips:** Next.js 14 · React 18 · TypeScript · Supabase · Tailwind · Framer Motion · Playwright
- **Body (3 sentences):** "No more digging through messy Google Sheets. No more searching emails for exam schedules. Everything in one place — built for my fellow FAST students."
- **Engineering note (mono):** "172 files · 30,392 LoC · 100 commits · Playwright E2E · live demo on Vercel"
- **CTAs:** [Live Demo ↗] [Source ↗] [Case study →]

### 2.4 Interactive deep dive: "Engineering Blueprint"
- Click "Case study →" — overlay slides up.
- Shows a holographic architecture diagram:
  - Supabase schema (left): tables for courses, schedules, exams.
  - Next.js App + Pages Router (center): both routing systems shown side-by-side.
  - Python scraping pipeline (right): all_courses_schedule.py + exam_schedule.xlsx → Supabase.
  - TimetableOptimizer.jsx (bottom): algorithmic component.
- Diagram animates in with stagger (200ms per node).
- Visitor can hover each node to see a 1-line description.
- Close button returns to standard info panel.

### 2.5 Sound
- Focus chime: A4 (Web pillar tone).
- Deep dive: subtle ambient swell when overlay opens.

### 2.6 Engineering rigor to highlight
- **Playwright E2E** — your only repo with E2E tests. This is a senior-engineer signal. Make it visible in the engineering note.
- **Live demo on Vercel** — only repo with a live deployment. Hyperlinked.
- **LICENSE** — only repo with a license file (OSS signal).

---

## 3. Flagship #2 — Drama-Ghar (Web pillar)

### 3.1 Celestial body
- **Type:** Double-planet system (binary planets).
- **Surface:** Ivory base with subtle green veins (cultural accent — Pakistani drama = green).
- **Symbolism:** Two planets orbiting each other = you + Hanzlah Ch (teamwork). The green veins = the cultural specificity of the content.

### 3.2 Camera focus
- Camera approaches the binary system.
- Slow orbit around the system's barycenter (the point between the two planets).
- Both planets visible throughout, occasionally eclipsing each other.

### 3.3 Info panel content
- **Title:** "DramaGhar"
- **Subtitle:** "A full-stack Pakistani drama tracking & streaming platform"
- **Stack chips:** Next.js 15 · React 19 · TypeScript · MongoDB Atlas · Supabase · Radix/shadcn · Zod · React Hook Form
- **Body:** "Built with Hanzlah Ch for a Web Programming course. Streaming + tracking + RBAC + session management. The README includes a self-evaluation rubric — academic-grade documentation."
- **Engineering note:** "101 files · 6,773 LoC · 32 commits · 2 contributors · Next.js 15 + React 19 (latest at time of build)"
- **CTAs:** [Source ↗] [Case study →]

### 3.4 Interactive deep dive: "Self-Evaluation Rubric"
- Click "Case study →" — overlay shows the actual self-eval rubric from the README:
  - Functionality: 25/25
  - Password Encryption & Security: 20/20
  - Role-Based Access Control (RBAC): 25/25
  - Form Validation: 15/15
  - Navigation & Structure: 10/10
  - UI / UX Design: 10/10
  - Authentication & Session Management: 15/15
  - Git Version Control: 10/10
  - Footer & Layout Components: 5/5
  - Content & Creativity: 25/25
  - Performance & Optimization: 5/5
- Each row animates in with stagger (100ms).
- Hover any row → shows the evidence from the codebase.
- This reinforces your "honest engineer" voice — you're showing academic coursework transparently, not hiding it.

### 3.5 Sound
- Focus chime: A4 (Web pillar tone).
- Deep dive: subtle double-chime (binary planet → two-tone motif).

### 3.6 Engineering rigor to highlight
- **Next.js 15 + React 19** — latest versions at time of build. Shows you keep up.
- **MongoDB + Supabase** — uses BOTH a NoSQL and SQL data store. Pragmatic hybrid.
- **Academic rubric** — proves you can ship to spec.

---

## 4. Flagship #3 — hamara-rozgar (AI/ML pillar, Building Now)

### 4.1 Celestial body
- **Type:** Nebula (particle cloud) with 4 bright pulsing points inside.
- **Color:** Sunset orange core fading to ivory edges.
- **4 agent points:** Each is a small bright sprite, pulsing in sequence:
  1. IntentAgent (top-left)
  2. DiscoveryAgent (top-right)
  3. PricingAgent (bottom-right)
  4. BookingAgent (bottom-left)
- **Symbolism:** Nebula = a complex emergent system. 4 points = the 4 cooperative agents. Pulsing sequence = the pipeline flow.

### 4.2 Camera focus
- Camera flies INTO the nebula (not around it).
- Stops at the center, where all 4 agent points are visible.
- Agent points pulse in sequence, demonstrating the flow.

### 4.3 Info panel content
- **Title:** "Hamara-Rozgar (RozgarOrch)"
- **Subtitle:** "Agentic AI marketplace orchestrator for Pakistan's informal economy"
- **Badge:** 🛠️ Building Now — actively iterating
- **Stack chips:** React 19 · Vite · Firebase · Capacitor (Android APK) · Python scraper · Multi-agent pipeline · OSM · Supabase · Ollama · Groq · GitHub Models
- **Body:** "Built for the Google Antigravity Hackathon. Plumbers, electricians, tutors, AC technicians, beauticians, mechanics — find them through natural language in Urdu, Roman Urdu, or English. Proximity matching, travel-adjusted pricing, anomaly resolution."
- **Engineering note:** "100% Google-Cloud-evacuated — runs fully offline with open-source alternatives. Multi-agent cooperative pipeline: IntentAgent → DiscoveryAgent → PricingAgent → BookingAgent. Android APK shipped. 100 commits of active iteration."
- **CTAs:** [Source ↗] [Architecture diagram →] [APK download ↗]

### 4.4 Interactive deep dive: "Multi-Agent Pipeline Visualizer"
- Click "Architecture diagram →" — overlay shows the animated agent flow:
  - User query ("I need a plumber in F-8 tomorrow morning")
  - → IntentAgent (extracts: specialization=plumber, location=F-8, time=tomorrow AM)
  - → DiscoveryAgent (geocodes F-8, Haversine-matches scraped providers)
  - → PricingAgent (travel-adjusted quote, surge calculation)
  - → BookingAgent (registers transaction, resolves anomalies)
  - Each step animates in sequence (1s per step).
  - Sample data shows in a side panel.
- This is the strongest 3D storytelling moment in the portfolio. Worth most polish time.

### 4.5 Sound
- Focus chime: E4 (AI/ML pillar tone).
- Agent pulse: 4-tone motif synced to the agent-point pulses (E4 → A4 → C5 → G4).
- Deep dive: ambient drone shifts to a more agentic-feeling pad.

### 4.6 Engineering rigor to highlight
- **Multi-agent cooperative pipeline** — rare skill, currently very hireable.
- **Android APK** — few web devs can claim mobile shipping.
- **Offline-first** (Google-Cloud-evacuated) — systems-thinking signal.
- **Hackathon project** — proves you can ship under pressure.
- **100 commits** — sustained iteration, not a one-shot.
- **Culturally specific** (Urdu/Roman Urdu NLP, informal economy) — distinctive.

### 4.7 In-progress framing
- The "Building Now" badge pulses (see Phase 13 §5.4).
- Engineering note includes: "actively iterating — daily scraped business updates."
- Don't hide the in-progress status. Frame as "two serious systems in active flight."

---

## 5. Agentic AI Cluster — glucoguard-plus (AI/ML pillar)

### 5.1 Celestial body
- **Type:** Bright star with 4-pulse halo.
- **Color:** Sunset orange core, ivory halo.
- **4 pulses:** Each pulse represents one model in the pipeline:
  1. gpt-4o-mini (vision) — first pulse
  2. gpt-4o-mini (reasoning) — second pulse
  3. gpt-4o-search-preview (search) — third pulse
  4. gpt-4o-mini-tts (voice) — fourth pulse
- Pulse cycle: 1.2 seconds total (0.3s per model).
- **Symbolism:** Bright star = focused, complete hackathon build. 4-pulse cycle = the 4-model pipeline that powers it.

### 5.2 Camera focus
- Camera pulls back from hamara-rozgar nebula, focuses on glucoguard-plus star (they share the AI constellation).
- Star pulses visibly throughout focus.

### 5.3 Info panel content
- **Title:** "GlucoGuard+ 🛡️"
- **Subtitle:** "Apne khaane ka guard banayein. Awaaz mein. Roman Urdu mein."
- **Stack chips:** Python · Streamlit · OpenAI gpt-4o-mini (vision + reasoning) · gpt-4o-search-preview · gpt-4o-mini-tts · Multi-provider fallback (GLM · Groq · Gemini · edge-tts)
- **Body:** "Built for the National AI Hackathon at FAST NUCES Islamabad. Snap a photo of any packaged food label — get a personalized verdict in Roman Urdu, spoken aloud for the 40% of Pakistan's 33M diabetics who can't read."
- **Engineering note:** "4-model pipeline (Vision → Reasoning → Search → TTS) with multi-provider fallback. Curated knowledge base: 50+ hidden sugar aliases, 10 allergen categories, WHO daily limits. Searches real Pakistani stores (Naheed, Chase Up, Carrefour, Imtiaz, Al-Fatah, Daraz)."
- **CTAs:** [Source ↗] [Case study →]

### 5.4 Interactive deep dive: "4-Model Pipeline Visualization"
- Click "Case study →" — overlay shows the photo → verdict flow:
  1. Sample food label photo (placeholder image).
  2. → gpt-4o-mini vision reads the label (animated JSON output).
  3. → gpt-4o-mini reasoning generates verdict (SAFE/MODERATE/AVOID).
  4. → gpt-4o-search-preview finds healthier alternative at Naheed/Chase Up/etc.
  5. → gpt-4o-mini-tts generates voice (audio waveform visualization).
  6. Final: verdict spoken in Roman Urdu (text shown).
- Each stage animates in sequence (1.5s per stage).
- Multi-provider fallback chain shown as a side diagram (OpenAI → GLM → Groq → Gemini → edge-tts).

### 5.5 Sound
- Focus chime: E4 (AI/ML pillar tone).
- 4-pulse halo synced to a 4-tone motif (E4 → G4 → B4 → D5 — major triad + extension).
- Deep dive: each pipeline stage has a subtle "processing" sound.

### 5.6 Engineering rigor to highlight
- **Multi-model pipeline** (4 OpenAI models in sequence) — different architecture from hamara-rozgar's multi-agent system. Together they prove you understand BOTH patterns.
- **Multi-provider fallback** — production-grade resilience thinking.
- **Curated knowledge base** (50+ sugar aliases, 10 allergens, WHO limits) — domain expertise signal.
- **Real Pakistani product search** — cultural specificity.
- **Accessibility-first** (voice for illiterate users) — empathy signal.

### 5.7 Cluster framing
- glucoguard-plus is positioned RIGHT NEXT TO hamara-rozgar in the AI/ML constellation.
- Both are hackathon projects (Google Antigravity + National AI Hackathon).
- Both target Pakistani users with culturally grounded AI.
- Together they form the "Agentic AI for Pakistan" cluster — your strongest differentiator.

---

## 6. Building Now — Internship-Finder (AI/ML pillar, in progress)

### 6.1 Celestial body
- **Type:** Satellite with a blinking light, orbiting the AI cluster.
- **Surface:** Dark metallic (blends with sky), with a single bright blinking red light.
- **Blink pattern:** 1s on, 1s off (active dev signal).
- **Symbolism:** Satellite = active operation in flight. Blinking = "transmitting" / "in progress."

### 6.2 Camera focus
- Camera pulls back to show the satellite orbiting the hamara-rozgar + glucoguard-plus cluster.
- Satellite drifts slowly along its orbit during focus.

### 6.3 Info panel content
- **Title:** "Internship-Finder"
- **Subtitle:** "An internship discovery platform — currently in active development."
- **Badge:** 🛠️ Building Now — Phase 18 production bootstrap
- **Stack chips:** Next.js 16 · React 19 · TypeScript · Supabase · Zod · React Hook Form · Claude Code workflow
- **Body:** "Not just code — a dev workflow. 21+ phase architecture docs, AGENTS.md, FIRST_RUN_POSTMORTEM_TEMPLATE.md, feature-based architecture (features/, lib/, mocks/, scripts/), proper Supabase migrations. Currently in Phase 18: production bootstrap."
- **Engineering note:** "158 files · 5,610 LoC · 53 commits · sophisticated dev workflow. Phase 17 implemented a feedback learning loop — there's an ML component here."
- **CTAs:** [Source ↗] [Live dev log →]

### 6.4 Interactive deep dive: "Dev Workflow Showcase"
- Click "Live dev log →" — overlay shows:
  - File tree of the project's documentation: PHASE_13_ARCHITECTURE.md, PHASE_14, 15, 16, 17, 18, AGENTS.md, CLAUDE.md, CURRENT_STATE.md, EXECUTIVE_SUMMARY.md, FIRST_RUN_CHECKLIST.md, FIRST_RUN_POSTMORTEM_TEMPLATE.md, NEXT_PHASE.md.
  - Sample commit log showing the phase progression: "feat: implement phase 17 feedback learning loop", "docs: plan phase 18 production bootstrap", "fix: migrate schema to gen_random_uuid".
  - Quote from CURRENT_STATE.md (first paragraph).
- This deep dive tells the story: "I'm not just writing code. I'm running a one-person engineering operation with documentation, postmortems, and phased planning. Senior-engineer workflow."

### 6.5 Sound
- Focus chime: E4 (AI/ML pillar tone).
- Blink: subtle electronic blip synced to the satellite light (1s interval).

### 6.6 Engineering rigor to highlight
- **21+ phase architecture docs** — most sophisticated dev workflow in your portfolio.
- **AGENTS.md + CLAUDE.md** — shows you use AI-assisted development (Claude Code).
- **FIRST_RUN_POSTMORTEM_TEMPLATE.md** — proves you reflect on failures.
- **Supabase migrations** — proper DB discipline.
- **Feature-based architecture** — modern Next.js organization.
- **Feedback learning loop (Phase 17)** — there's an ML component, even if it's basic.

### 6.7 In-progress framing
- Same "Building Now" badge as hamara-rozgar.
- "Phase 18 production bootstrap" subtitle updates as the project progresses.
- Don't hide the in-progress status. This is your "currently building" signal.

---

## 7. Secondary #1 — gcr-resources-fetch (Web pillar)

### 7.1 Celestial body
- **Type:** Comet (bright sphere + particle trail).
- **Color:** Ivory with amber trail.
- **Symbolism:** Comet = speed, "grabs resources quickly." The motion = the bulk-download functionality.

### 7.2 Camera focus
- Quick pan as the comet streaks across the sky.
- No full focus pull — secondary projects get lighter treatment.

### 7.3 Info panel content (compact)
- **Title:** "GCR Fetch"
- **Subtitle:** "Bulk-download every resource from a Google Classroom course as a single ZIP."
- **Stack chips:** Chrome Extension · JavaScript · Node.js backend · manifest v3
- **Body:** "Exam season pain point: 20–25 minutes of manual clicking. GCR Fetch does it in one click."
- **Engineering note:** "3 stars — my most-adopted open-source tool."
- **CTAs:** [Source ↗] [Install ↗]

### 7.4 No deep dive
- Secondary projects don't get deep dive overlays.
- Just the info panel + a link to the repo.

### 7.5 Sound
- Quick whoosh as comet passes.

### 7.6 What to highlight
- **3 stars** — your most-adopted repo. Real users, real adoption.
- **Chrome Extension** — different platform from your other work.
- **Excellent README** — proves you can write for users, not just code.

---

## 8. Secondary #2 — WayFinder (Mobile pillar, early experiment)

### 8.1 Celestial body
- **Type:** Faint, distant speck. Barely visible.
- **Symbolism:** Early-stage exploration. Honest about its maturity.

### 8.2 Camera focus
- Quick far pan. Speck becomes barely visible against the sky.

### 8.3 Info panel content (very compact)
- **Title:** "WayFinder"
- **Subtitle:** "Early exploration: Yango ride-hailing deep-link helper."
- **Stack chips:** Next.js · TypeScript
- **Body:** "An early experiment in ride-hailing deep links. 5 commits, no README yet — being honest about where this is."
- **CTAs:** [Source ↗]

### 8.4 No deep dive, no sound
- Secondary + early stage = minimal treatment.
- Just the info panel + repo link.

### 8.5 What to highlight
- **Honest framing** — "I tinker, and I'm honest about maturity."
- **Yango deep-link** — interesting technical niche (ride-hailing deep links, tariff lock).

---

## 9. Visual Variety Summary

| Project | Body type | Pillar color | Deep dive | Status |
|---|---|---|---|---|
| Exam-Table | Planet + ring | Ivory | Engineering Blueprint | Complete |
| Drama-Ghar | Binary planets | Ivory + green | Self-Eval Rubric | Complete |
| hamara-rozgar | Nebula (4 agent points) | Sunset | Multi-Agent Pipeline | Building Now |
| glucoguard-plus | Pulsing star (4 halos) | Sunset | 4-Model Pipeline | Complete |
| Internship-Finder | Blinking satellite | Sunset | Dev Workflow | Building Now |
| gcr-resources-fetch | Comet | Ivory + amber | None | Complete |
| WayFinder | Distant speck | — | None | Early experiment |

**Visual variety check:** Each project has a distinct body type. No two flagships look alike. The AI/ML pillar projects share the sunset color but have different body types (nebula vs star vs satellite) to avoid monotony.

---

## 10. Continuous Self-Critique

- **Can this be simpler?** The 3 deep dives (Exam-Table blueprint, hamara-rozgar pipeline, glucoguard-plus pipeline) are the heaviest production load. Could cut to 2 (the two AI pipelines are most differentiating). Decision: keep all 3 — each tells a different story.
- **Can it be faster?** Each deep dive overlay is a separate React component, lazy-loaded. Should not impact initial load.
- **Can it tell a stronger story?** The cluster framing (hamara-rozgar + glucoguard-plus + Internship-Finder as "Agentic AI for Pakistan") is the strongest narrative thread. Worth emphasizing visually.
- **Can it better represent the developer?** The honest in-progress framing on hamara-rozgar and Internship-Finder is a senior-engineer signal. Don't soften it.
- **Can it create a more memorable experience?** The hamara-rozgar multi-agent pulse animation is the most memorable visual moment. Worth most polish time.
