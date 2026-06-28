# Phase 5 — Deep Analysis: `WayFinder`

**Slug:** 07_wayfinder  
**Local path:** `/home/z/my-project/repos/WayFinder`

## 1. High-Level Snapshot

- **Total files (excluding node_modules/.git):** 48
- **Total source lines (non-empty):** 4,706
- **Source : Config ratio:** 12.0 (higher = more code-driven)
- **Docs : Source ratio:** 0.028

## 2. Language Breakdown (by file count)

| Language | Files |
|---|---|
| TypeScript | 12 |
| TypeScript (React) | 12 |
| CSS | 11 |
| Other | 8 |
| JSON | 3 |
| Markdown | 1 |
| JavaScript (ESM) | 1 |

## 3. Lines of Code by Language (source only)

| Language | Lines |
|---|---|
| CSS | 2,019 |
| TypeScript (React) | 1,741 |
| TypeScript | 930 |
| JavaScript (ESM) | 16 |

## 4. File Categories

| Category | Files |
|---|---|
| other | 8 |
| docs | 1 |
| config | 3 |
| source | 36 |

## 5. Frameworks Detected

- None detected (may be a non-JS project or minimal).

## 6. Key Libraries Detected

- None detected.

## 7. Directory Structure (depth ≤ 2)

```
./
  .gitignore
  wayfinder-app/
    .gitignore
    README.md
    eslint.config.mjs
    next.config.ts
    package-lock.json
    package.json
    tsconfig.json
    app/
    components/
    lib/
    public/
```

## 8. Key Config Files Found

- None of the standard key files detected.

## 9. package.json (if present)

- No package.json found (may be a non-JS project).

## 10. README Excerpt (first 3000 chars)

- No README found.

## 11. Engineering Rigor Signals

- **Has tests:** False (0 test files)
- **Has CI:** False
- **Has Docker:** False
- **Env files:** none

## 12. Largest Files (top 10 — bloat / asset check)

| File | Size |
|---|---|
| `wayfinder-app/package-lock.json` | 212.9 KB |
| `wayfinder-app/app/favicon.ico` | 25.3 KB |
| `wayfinder-app/app/place/[placeId]/page.tsx` | 20.4 KB |
| `wayfinder-app/app/globals.css` | 11.8 KB |
| `wayfinder-app/app/home/page.tsx` | 11.0 KB |
| `wayfinder-app/app/place/[placeId]/page.module.css` | 8.4 KB |
| `wayfinder-app/components/SearchBar.tsx` | 7.4 KB |
| `wayfinder-app/app/profile/page.tsx` | 6.3 KB |
| `wayfinder-app/components/WelcomeScreen.tsx` | 6.0 KB |
| `wayfinder-app/lib/google-maps.ts` | 5.6 KB |

## 13. Commit History

- **Commits available (in shallow clone):** 5
- **First commit date (in clone):** 2026-06-09
- **Last commit date:** 2026-06-10
- **Contributors:** {'Muhammad Ammar Asad': 1, 'Ammar Asad': 4}

### Recent Commits (last 30)

| Hash | Date | Subject |
|---|---|---|
| `e8ddf6e` | 2026-06-10 | Merge pull request #1 from ammarasad2005/main |
| `bf8f4c8` | 2026-06-10 | feat(yango): align redirect URL parameters and fallback with official documentat |
| `0267a6c` | 2026-06-10 | fix: omit starting coordinates in Yango deep link to prevent tariff loading hang |
| `6205b59` | 2026-06-09 | chore: ignore Vercel local folders in git |
| `cb3e232` | 2026-06-09 | init: Wayfinder App v1.0 |

## 14. Observations

- No test files detected — gap to flag in portfolio narrative.
- No CI detected.
- No Dockerfile (acceptable for frontend-focused repos).
- No .env.example found.
- No LICENSE file (fine for personal projects, matters for OSS positioning).
- No README file detected — significant portfolio gap.
