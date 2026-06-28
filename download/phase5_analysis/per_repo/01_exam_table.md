# Phase 5 — Deep Analysis: `Exam-Table`

**Slug:** 01_exam_table  
**Local path:** `/home/z/my-project/repos/Exam-Table`

## 1. High-Level Snapshot

- **Total files (excluding node_modules/.git):** 172
- **Total source lines (non-empty):** 30,392
- **Source : Config ratio:** 5.0 (higher = more code-driven)
- **Docs : Source ratio:** 0.048

## 2. Language Breakdown (by file count)

| Language | Files |
|---|---|
| TypeScript (React) | 52 |
| Other | 40 |
| TypeScript | 40 |
| JSON | 21 |
| Python | 6 |
| Markdown | 4 |
| JavaScript | 4 |
| JavaScript (ESM) | 1 |
| Text | 1 |
| JavaScript (React) | 1 |
| SQL | 1 |
| CSS | 1 |

## 3. Lines of Code by Language (source only)

| Language | Lines |
|---|---|
| TypeScript (React) | 20,614 |
| TypeScript | 4,809 |
| Python | 2,693 |
| CSS | 999 |
| JavaScript | 592 |
| JavaScript (React) | 541 |
| SQL | 129 |
| JavaScript (ESM) | 15 |

## 4. File Categories

| Category | Files |
|---|---|
| docs | 5 |
| config | 21 |
| other | 40 |
| source | 105 |
| test | 1 |

## 5. Frameworks Detected

- Next.js ^14.2.0 (App Router, Pages Router)
- React ^18.3.0
- Tailwind CSS

## 6. Key Libraries Detected

- Framer Motion
- Supabase
- lucide-react icons
- Radix UI / shadcn
- Zod
- React Hook Form
- TypeScript ^5
- Playwright (E2E)
- ESLint

## 7. Directory Structure (depth ≤ 2)

```
./
  .eslintrc.json
  .gitignore
  LICENSE
  README.md
  TimetableOptimizer.jsx
  all_courses_schedule.py
  exam_schedule.xlsx
  next.config.js
  package-lock.json
  package.json
  patch_custom_exam.js
  postcss.config.js
  scratch.mjs
  supabase_schema.sql
  tailwind.config.ts
  ... +3 more files
  Screenshots/
    configuration_page_desktop.png
    configuration_page_mobile.png
    custom_exams_desktop.png
    custom_exams_mobile.png
    custom_exams_page_desktop.png
    custom_exams_page_mobile.png
    custom_timetable_desktop.png
    custom_timetable_mobile.png
    custom_timetable_page_desktop.png
    custom_timetable_page_mobile.png
    events_page_desktop.png
    events_page_mobile.png
    exam_schedule_desktop.png
    exam_schedule_mobile.png
    faculty_page_desktop.png
    ... +21 more files
  cli-tool/
    exam_timetable.py
  docs/
    campus_map_rules.md
    end-user-guide.md
    timetable_analysis.md
  public/
    data/
    logo/
  scripts/
    capture-screenshots.js
    filter_events.py
    parse-excel.ts
    parse_summer_timetable.py
    run_parser.py
    scrape_slate.py
    setup-settings-db.ts
  src/
    app/
    components/
    hooks/
    lib/
    pages/
    styles/
    types/
```

## 8. Key Config Files Found

- `README.md` → `README.md`
- `package.json` → `package.json`
- `package-lock.json` → `package-lock.json`
- `tsconfig.json` → `tsconfig.json`
- `next.config.js` → `next.config.js`
- `tailwind.config.ts` → `tailwind.config.ts`
- `postcss.config.js` → `postcss.config.js`
- `LICENSE` → `LICENSE`
- `vercel.json` → `vercel.json`

## 9. package.json (if present)

- **Name:** fsc-exams
- **Version:** 0.1.0
- **Private:** True
- **Type:** None

### Scripts

| Script | Command |
|---|---|
| `prebuild` | `ts-node scripts/parse-excel.ts` |
| `build` | `next build` |
| `dev` | `ts-node scripts/parse-excel.ts && next dev` |
| `start` | `next start` |
| `type-check` | `tsc --noEmit` |
| `lint` | `next lint` |
| `timetable:update` | `python3 all_courses_schedule.py && mkdir -p public/data && cp timetable.json pub...` |
| `events:scrape` | `python3 scripts/scrape_slate.py` |
| `events:filter` | `python3 scripts/filter_events.py` |
| `events:update` | `npm run events:scrape && npm run events:filter` |

### Dependencies (top 20)

| Package | Version |
|---|---|
| `@hookform/resolvers` | `^5.2.2` |
| `@radix-ui/react-accordion` | `^1.2.12` |
| `@radix-ui/react-alert-dialog` | `^1.1.15` |
| `@radix-ui/react-aspect-ratio` | `^1.1.8` |
| `@radix-ui/react-avatar` | `^1.1.11` |
| `@radix-ui/react-context-menu` | `^2.2.16` |
| `@radix-ui/react-dialog` | `^1.1.15` |
| `@radix-ui/react-dropdown-menu` | `^2.1.16` |
| `@radix-ui/react-hover-card` | `^1.1.15` |
| `@radix-ui/react-label` | `^2.1.8` |
| `@radix-ui/react-menubar` | `^1.1.16` |
| `@radix-ui/react-navigation-menu` | `^1.2.14` |
| `@radix-ui/react-popover` | `^1.1.15` |
| `@radix-ui/react-progress` | `^1.1.8` |
| `@radix-ui/react-radio-group` | `^1.3.8` |
| `@radix-ui/react-scroll-area` | `^1.2.10` |
| `@radix-ui/react-select` | `^2.2.6` |
| `@radix-ui/react-separator` | `^1.1.8` |
| `@radix-ui/react-slider` | `^1.3.6` |
| `@radix-ui/react-slot` | `^1.2.4` |

*+36 more dependencies not shown.*

### Dev Dependencies (top 20)

| Package | Version |
|---|---|
| `@types/file-saver` | `^2.0.7` |
| `@types/node` | `^20` |
| `@types/nodemailer` | `^8.0.0` |
| `@types/react` | `^18` |
| `@types/react-dom` | `^18` |
| `autoprefixer` | `^10` |
| `eslint` | `^8` |
| `eslint-config-next` | `^14` |
| `playwright` | `^1.59.1` |
| `postcss` | `^8` |
| `tailwindcss` | `^3.4` |
| `ts-node` | `^10` |
| `typescript` | `^5` |

## 10. README Excerpt (first 3000 chars)

```markdown
<div align="center">

<img src="public/logo/logo.png" alt="FAST Isb Utilities Logo" width="80" />

# FAST Isb Utilities

**The unified campus companion for FAST NUCES Islamabad**

No more digging through messy Google Sheets. No more searching emails for exam schedules. No more peeking into rooms to check if they're free. Everything you need — in one place.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://fast-nuces.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## Navigation
- [The Problem](#the-problem)
- [What Is FAST Isb Utilities?](#what-is-fast-isb-utilities)
  - [Who Is It For?](#who-is-it-for)
- [Screenshots](#screenshots)
  - [Landing Page](#landing-page)
- [Features](#features)
  - [📅 Timetable Viewer](#timetable-viewer)
  - [📝 Exam Schedule Finder](#exam-schedule-finder)
  - [🎯 Custom Exams Builder](#custom-exams-builder)
  - [🗓️ Custom Timetable Builder](#custom-timetable-builder)
  - [🧠 Timetable Optimizer](#timetable-optimizer)
  - [🚪 Free Rooms Finder](#free-rooms-finder)
  - [👨‍🏫 Faculty Directory](#faculty-directory)
  - [🎪 Campus Events Calendar](#campus-events-calendar)
  - [📆 Semester Schedule](#semester-schedule)
  - [📦 Lost & Found](#lost-found)
  - [🏠 Configuration & Home Page](#configuration-home-page)
  - [🌗 Dark Mode & Theming](#dark-mode-theming)
  - [⌨️ Keyboard Shortcuts](#keyboard-shortcuts)
  - [📤 Export Options](#export-options)
- [How It Works](#how-it-works)
  - [User Workflow](#user-workflow)
  - [Custom Course Workflow](#custom-course-workflow)
  - [Timetable Optimizer Workflow](#timetable-optimizer-workflow)
  - [Data Flow](#data-flow)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Data Pipeline](#data-pipeline)
  - [Exam Schedule Pipeline](#exam-schedule-pipeline)
  - [Timetable Pipeline](#timetable-pipeline)
  - [Campus Events Pipeline](#campus-events-pipeline)
  - [Faculty & Semester Data](#faculty-semester-data)
- [Scheduled Automation](#scheduled-automation)
  - [Vercel Cron Jobs (Production)](#vercel-cron-jobs-production)
  - [GitHub Actions (Recommended for Data Updates)](#github-actions-data-updates)
- [Database Schema](#database-schema)
  - [`lost_found_items`](#lost-found-items)
  - [`lost_found_claims`](#lost-found-claims)
  - [`campus_feedback`](#campus-feedback)
- [Design Highlights](#desi
```

## 11. Engineering Rigor Signals

- **Has tests:** True (1 test files)
  - Test files:
    - `src/components/ui/aspect-ratio.tsx`
- **Has CI:** False
- **Has Docker:** False
- **Env files:** none

## 12. Largest Files (top 10 — bloat / asset check)

| File | Size |
|---|---|
| `public/logo/logo.png` | 1.87 MB |
| `Screenshots/faculty_page_desktop.png` | 471.0 KB |
| `package-lock.json` | 363.9 KB |
| `src/app/lost-found/page.tsx` | 271.2 KB |
| `public/logo/icon.png` | 244.2 KB |
| `Screenshots/semester_page_desktop.png` | 158.2 KB |
| `Screenshots/lost_found_page_desktop.png` | 143.7 KB |
| `Screenshots/landing_page_desktop.png` | 137.3 KB |
| `Screenshots/optimizer_desktop.png` | 118.7 KB |
| `Screenshots/rooms_detail_mobile.png` | 114.9 KB |

## 13. Commit History

- **Commits available (in shallow clone):** 100
- **First commit date (in clone):** 2026-05-25
- **Last commit date:** 2026-06-28
- **Contributors:** {'Muhammad Ammar Asad': 63, 'github-actions[bot]': 35, 'Copilot': 2}

### Recent Commits (last 30)

| Hash | Date | Subject |
|---|---|---|
| `b94e824` | 2026-06-28 | fix: remove hardcoded section A rule in summer courses filtering |
| `cb8200f` | 2026-06-25 | chore: auto-update timetable.json [2026-06-25 16:26 UTC] |
| `7c677be` | 2026-06-25 | chore: auto-update timetable.json [2026-06-25 13:20 UTC] |
| `a1b2cd4` | 2026-06-24 | chore: auto-update timetable.json [2026-06-24 08:23 UTC] |
| `4435d8f` | 2026-06-24 | chore: auto-update timetable.json [2026-06-24 05:05 UTC] |
| `3a3fd6d` | 2026-06-24 | fix: scrub resch and explicit times inside admin page catalog fetch and python p |
| `c008ab1` | 2026-06-24 | chore: auto-update timetable.json [2026-06-24 04:40 UTC] |
| `e20d538` | 2026-06-24 | feat: handle explicit time slots and rescheduled keyword in timetable parsing |
| `23d568d` | 2026-06-23 | chore: auto-update timetable.json [2026-06-23 12:34 UTC] |
| `1568b42` | 2026-06-23 | chore: auto-update timetable.json [2026-06-23 09:43 UTC] |
| `05d1bea` | 2026-06-22 | chore: auto-update timetable.json [2026-06-22 15:53 UTC] |
| `1c4bd49` | 2026-06-22 | chore: auto-update student events [2026-06-22 12:15 UTC] |
| `9a9f3e9` | 2026-06-22 | chore: auto-update timetable.json [2026-06-22 04:41 UTC] |
| `b4fabad` | 2026-06-19 | chore: auto-update timetable.json [2026-06-19 16:56 UTC] |
| `40bb6cb` | 2026-06-19 | chore: auto-update timetable.json [2026-06-19 16:44 UTC] |
| `af1e3c9` | 2026-06-19 | chore: auto-update timetable.json [2026-06-19 16:23 UTC] |
| `4180627` | 2026-06-19 | chore: auto-update timetable.json [2026-06-19 16:06 UTC] |
| `e176213` | 2026-06-18 | chore: auto-update timetable.json [2026-06-18 09:15 UTC] |
| `58e0e15` | 2026-06-17 | fix(ticker): enable weekly wrap-around for recurring classes |
| `449fe5c` | 2026-06-17 | fix(ticker): resolve date mapping reactively and skip cancelled classes in live  |
| `3f7b467` | 2026-06-17 | feat(timetable): implement special keyword cells (Canceled, Reserved) for timeta |
| `aac2ece` | 2026-06-17 | chore(semester): update semester_calendar.json for Summer 2026 |
| `0f7f0e0` | 2026-06-17 | fix(semester): derive calendar grid months from JSON date range |
| `888f4f1` | 2026-06-17 | updated the semester calendar for summer 2026 |
| `ce3c9ec` | 2026-06-17 | chore: auto-update timetable.json [2026-06-17 06:14 UTC] |
| `67311e1` | 2026-06-16 | chore: auto-update timetable.json [2026-06-16 14:46 UTC] |
| `939f9a0` | 2026-06-16 | feat(timetable): align custom and standard timetable pages with custom date reso |
| `4d79d1e` | 2026-06-16 | chore: auto-update timetable.json [2026-06-16 13:40 UTC] |
| `2415a6a` | 2026-06-16 | fix: resolve all matching sheets in python parser, and fix Groq LLM API 403 bloc |
| `61a2cc7` | 2026-06-16 | chore: auto-update timetable.json [2026-06-16 13:14 UTC] |

## 14. Observations

- Has lint script (code quality discipline).
- Has type-check script (TypeScript rigor).
- Has build script.
- Has dev script.
- Has 1 test file(s) — testing discipline present.
- No CI detected.
- No Dockerfile (acceptable for frontend-focused repos).
- No .env.example found.
- Has LICENSE file.
- README length: 19749 chars. Badges: True. Screenshots: True. Install section: True. Architecture section: True.
