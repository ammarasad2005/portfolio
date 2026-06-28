# Phase 5 — Deep Analysis: `gcr-contacts`

**Slug:** 04_gcr_contacts  
**Local path:** `/home/z/my-project/repos/gcr-contacts`

## 1. High-Level Snapshot

- **Total files (excluding node_modules/.git):** 32
- **Total source lines (non-empty):** 2,211
- **Source : Config ratio:** 6.33 (higher = more code-driven)
- **Docs : Source ratio:** 0.158

## 2. Language Breakdown (by file count)

| Language | Files |
|---|---|
| JavaScript | 12 |
| Other | 7 |
| JavaScript (React) | 4 |
| Markdown | 3 |
| JSON | 3 |
| JavaScript (ESM) | 2 |
| CSS | 1 |

## 3. Lines of Code by Language (source only)

| Language | Lines |
|---|---|
| JavaScript | 1,385 |
| CSS | 563 |
| JavaScript (React) | 238 |
| JavaScript (ESM) | 25 |

## 4. File Categories

| Category | Files |
|---|---|
| docs | 3 |
| config | 3 |
| other | 7 |
| source | 19 |

## 5. Frameworks Detected

- Next.js 16.2.7 (App Router)
- React 19.2.4

## 6. Key Libraries Detected

- ESLint

## 7. Directory Structure (depth ≤ 2)

```
./
  .gitignore
  AGENTS.md
  CLAUDE.md
  README.md
  eslint.config.mjs
  jsconfig.json
  next.config.mjs
  package-lock.json
  package.json
  app/
    favicon.ico
    globals.css
    layout.js
    page.js
    api/
    dashboard/
  components/
    CopyButton.jsx
    CourseCard.jsx
    PersonRow.jsx
    SkeletonCard.jsx
  lib/
    auth.js
    classroom.js
    emailResolver.js
    facultyCache.js
    semesterFilter.js
    studentRegex.js
    taSheet.js
  public/
    file.svg
    globe.svg
    next.svg
    vercel.svg
    window.svg
```

## 8. Key Config Files Found

- `README.md` → `README.md`
- `package.json` → `package.json`
- `package-lock.json` → `package-lock.json`
- `jsconfig.json` → `jsconfig.json`
- `next.config.mjs` → `next.config.mjs`

## 9. package.json (if present)

- **Name:** gcr-contacts
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
| `next` | `16.2.7` |
| `react` | `19.2.4` |
| `react-dom` | `19.2.4` |

### Dev Dependencies (top 20)

| Package | Version |
|---|---|
| `eslint` | `^9` |
| `eslint-config-next` | `16.2.7` |

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

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
| `package-lock.json` | 203.4 KB |
| `app/favicon.ico` | 25.3 KB |
| `app/globals.css` | 16.1 KB |
| `lib/emailResolver.js` | 11.6 KB |
| `lib/taSheet.js` | 11.6 KB |
| `app/dashboard/page.js` | 8.9 KB |
| `app/page.js` | 3.8 KB |
| `lib/auth.js` | 3.0 KB |
| `lib/facultyCache.js` | 3.0 KB |
| `components/PersonRow.jsx` | 2.9 KB |

## 13. Commit History

- **Commits available (in shallow clone):** 7
- **First commit date (in clone):** 2026-06-05
- **Last commit date:** 2026-06-07
- **Contributors:** {'Ammar Asad': 7}

### Recent Commits (last 30)

| Hash | Date | Subject |
|---|---|---|
| `22b0cea` | 2026-06-07 | fix: coverage-score tie-breaking + discard unresolvable GCR teachers |
| `d6e1ebf` | 2026-06-07 | fix: two-pass matching to correctly handle multi-batch course offerings |
| `be55d6b` | 2026-06-07 | fix: Step 0 TA sheet check must run for ALL GCR teachers, not just looksLikeStud |
| `1c35a7b` | 2026-06-07 | fix: fetch both TASheet and LDSheet tabs (not just TASheet) |
| `267bf4d` | 2026-06-07 | feat: integrate TA/LD allocation sheet as Step 0 of email resolution pipeline |
| `d13438b` | 2026-06-05 | feat: initial implementation of GCR Contacts website |
| `11e73f0` | 2026-06-05 | Initial commit from Create Next App |

## 14. Observations

- Has lint script (code quality discipline).
- Has build script.
- Has dev script.
- No test files detected — gap to flag in portfolio narrative.
- No CI detected.
- No Dockerfile (acceptable for frontend-focused repos).
- No .env.example found.
- No LICENSE file (fine for personal projects, matters for OSS positioning).
- README length: 1449 chars. Badges: False. Screenshots: False. Install section: False. Architecture section: False.
