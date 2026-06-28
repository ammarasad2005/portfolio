# Phase 5 — Deep Analysis: `Internship-Finder`

**Slug:** 06_internship_finder  
**Local path:** `/home/z/my-project/repos/Internship-Finder`

## 1. High-Level Snapshot

- **Total files (excluding node_modules/.git):** 158
- **Total source lines (non-empty):** 5,610
- **Source : Config ratio:** 29.25 (higher = more code-driven)
- **Docs : Source ratio:** 0.231

## 2. Language Breakdown (by file count)

| Language | Files |
|---|---|
| TypeScript | 74 |
| Markdown | 27 |
| TypeScript (React) | 22 |
| CSS | 12 |
| Other | 10 |
| SQL | 7 |
| JSON | 3 |
| Python | 1 |
| JavaScript (ESM) | 1 |
| TOML | 1 |

## 3. Lines of Code by Language (source only)

| Language | Lines |
|---|---|
| TypeScript | 3,389 |
| TypeScript (React) | 1,089 |
| CSS | 861 |
| SQL | 243 |
| JavaScript (ESM) | 16 |
| Python | 12 |

## 4. File Categories

| Category | Files |
|---|---|
| docs | 27 |
| config | 4 |
| source | 117 |
| other | 10 |

## 5. Frameworks Detected

- Next.js 16.2.9 (App Router)
- React 19.2.4

## 6. Key Libraries Detected

- Supabase
- Zod
- React Hook Form
- TypeScript ^5
- ESLint

## 7. Directory Structure (depth ≤ 2)

```
./
  .gitignore
  .rules
  AGENTS.md
  CLAUDE.md
  CURRENT_STATE.md
  EXECUTIVE_SUMMARY.md
  FIRST_RUN_CHECKLIST.md
  FIRST_RUN_POSTMORTEM_TEMPLATE.md
  NEXT_PHASE.md
  PHASE_13A_FIX_PROMPT.md
  PHASE_13_ARCHITECTURE.md
  PHASE_14_ARCHITECTURE.md
  PHASE_15_ARCHITECTURE.md
  PHASE_16_ARCHITECTURE.md
  PHASE_17_ARCHITECTURE.md
  ... +21 more files
  public/
    file.svg
    globe.svg
    next.svg
    vercel.svg
    window.svg
  src/
    middleware.ts
    app/
    features/
    lib/
    mocks/
    scripts/
  supabase/
    .gitignore
    config.toml
    migrations/
```

## 8. Key Config Files Found

- `README.md` → `README.md`
- `package.json` → `package.json`
- `package-lock.json` → `package-lock.json`
- `tsconfig.json` → `tsconfig.json`
- `next.config.ts` → `next.config.ts`

## 9. package.json (if present)

- **Name:** temp-app
- **Version:** 0.1.0
- **Private:** True
- **Type:** None

### Scripts

| Script | Command |
|---|---|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint` |

### Dependencies (top 20)

| Package | Version |
|---|---|
| `@google/genai` | `^2.8.0` |
| `@hookform/resolvers` | `^5.4.0` |
| `@supabase/ssr` | `^0.12.0` |
| `@supabase/supabase-js` | `^2.108.2` |
| `cheerio` | `^1.2.0` |
| `next` | `16.2.9` |
| `nodemailer` | `^9.0.1` |
| `react` | `19.2.4` |
| `react-dom` | `19.2.4` |
| `react-hook-form` | `^7.79.0` |
| `server-only` | `^0.0.1` |
| `zod` | `^4.4.3` |

### Dev Dependencies (top 20)

| Package | Version |
|---|---|
| `@types/node` | `^20` |
| `@types/nodemailer` | `^8.0.1` |
| `@types/react` | `^19` |
| `@types/react-dom` | `^19` |
| `eslint` | `^9` |
| `eslint-config-next` | `16.2.9` |
| `tsx` | `^4.22.4` |
| `typescript` | `^5` |

## 10. README Excerpt (first 3000 chars)

```markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

## 11. Engineering Rigor Signals

- **Has tests:** False (0 test files)
- **Has CI:** False
- **Has Docker:** False
- **Env files:** none

## 12. Largest Files (top 10 — bloat / asset check)

| File | Size |
|---|---|
| `package-lock.json` | 255.1 KB |
| `WORKLOG.md` | 27.7 KB |
| `src/app/favicon.ico` | 25.3 KB |
| `supabase/config.toml` | 15.2 KB |
| `PHASE_14_ARCHITECTURE.md` | 14.0 KB |
| `PHASE_15_ARCHITECTURE.md` | 10.4 KB |
| `database-design.md` | 10.0 KB |
| `PHASE_16_ARCHITECTURE.md` | 9.7 KB |
| `supabase/migrations/20260618000000_initial_schema.sql` | 9.3 KB |
| `src/lib/supabase/types.ts` | 8.6 KB |

## 13. Commit History

- **Commits available (in shallow clone):** 53
- **First commit date (in clone):** 2026-06-18
- **Last commit date:** 2026-06-21
- **Contributors:** {'Muhammad Ammar Asad': 53}

### Recent Commits (last 30)

| Hash | Date | Subject |
|---|---|---|
| `905eb12` | 2026-06-21 | fix: upgrade worker runtime to node 22 |
| `e969175` | 2026-06-21 | fix: restore dashboard navigation and protect onboarding |
| `68a31e9` | 2026-06-21 | fix: grant authenticated role access to user tables |
| `e21f165` | 2026-06-21 | fix: remove react-dom server rendering from notifications |
| `0c5109d` | 2026-06-20 | fix: migrate schema to gen_random_uuid and deploy production database |
| `9c3f181` | 2026-06-20 | docs: prepare production bootstrap package |
| `d5f5679` | 2026-06-20 | docs: plan phase 18 production bootstrap |
| `468e724` | 2026-06-20 | docs: update continuity after phase 17 completion |
| `eba1d70` | 2026-06-20 | feat: implement phase 17 feedback learning loop |
| `287de3c` | 2026-06-20 | docs: plan phase 17 feedback learning loop |
| `6436eb0` | 2026-06-20 | docs: update continuity after phase 16 completion |
| `4f56afc` | 2026-06-20 | feat: implement phase 16 notifications system |
| `b4e0535` | 2026-06-19 | docs: update continuity after phase 15 completion |
| `e0112f9` | 2026-06-19 | feat: implement phase 15 worker decoupling |
| `ed1b0c0` | 2026-06-19 | docs: update continuity after phase 14 completion |
| `3c6670e` | 2026-06-19 | feat: complete phase 14 recommendation ui |
| `820922a` | 2026-06-19 | feat: partial phase 14 recommendation ui implementation |
| `c10a06d` | 2026-06-19 | docs: update continuity after phase 13 completion |
| `a32b02d` | 2026-06-19 | feat: implement phase 13 matching engine |
| `cc8b267` | 2026-06-19 | docs: refresh continuity after phase 13 audit failure |
| `6d6cf46` | 2026-06-19 | docs: prepare project continuity and account transition handoff |
| `ade8d26` | 2026-06-19 | docs: final handoff before account transition |
| `53e2edd` | 2026-06-19 | docs: update continuity after phase 13 architecture review |
| `b02e153` | 2026-06-19 | docs: refine phase 13 architecture after scalability audit |
| `d8fbd99` | 2026-06-19 | docs: update continuity after phase 12 |
| `9d4c7be` | 2026-06-19 | feat: integrate gemini research brain with caching and structured outputs |
| `0161855` | 2026-06-19 | docs: update continuity after application url hotfix |
| `4ad0323` | 2026-06-19 | fix: persist application url through internship pipeline |
| `2f23388` | 2026-06-19 | docs: refresh project continuity before account transition |
| `0b25221` | 2026-06-18 | docs: update continuity after persistence pipeline |

## 14. Observations

- Has lint script (code quality discipline).
- Has build script.
- Has dev script.
- No test files detected — gap to flag in portfolio narrative.
- No CI detected.
- No Dockerfile (acceptable for frontend-focused repos).
- No .env.example found.
- No LICENSE file (fine for personal projects, matters for OSS positioning).
- README length: 1450 chars. Badges: False. Screenshots: False. Install section: False. Architecture section: False.
