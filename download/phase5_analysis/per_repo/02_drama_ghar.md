# Phase 5 — Deep Analysis: `Drama-Ghar`

**Slug:** 02_drama_ghar  
**Local path:** `/home/z/my-project/repos/Drama-Ghar`

## 1. High-Level Snapshot

- **Total files (excluding node_modules/.git):** 101
- **Total source lines (non-empty):** 6,773
- **Source : Config ratio:** 14.67 (higher = more code-driven)
- **Docs : Source ratio:** 0.023

## 2. Language Breakdown (by file count)

| Language | Files |
|---|---|
| TypeScript (React) | 50 |
| TypeScript | 31 |
| JSON | 5 |
| Other | 5 |
| Markdown | 2 |
| JavaScript (ESM) | 2 |
| JavaScript (CJS) | 2 |
| Env | 1 |
| JavaScript | 1 |
| CSS | 1 |
| Python | 1 |

## 3. Lines of Code by Language (source only)

| Language | Lines |
|---|---|
| TypeScript (React) | 5,002 |
| TypeScript | 1,528 |
| JavaScript | 103 |
| JavaScript (CJS) | 65 |
| Python | 53 |
| JavaScript (ESM) | 17 |
| CSS | 5 |

## 4. File Categories

| Category | Files |
|---|---|
| docs | 2 |
| config | 6 |
| source | 88 |
| other | 5 |

## 5. Frameworks Detected

- Next.js ^15.4.9 (App Router)
- React ^19.2.1
- Tailwind CSS

## 6. Key Libraries Detected

- Mongoose
- lucide-react icons
- Radix UI / shadcn
- Zod
- React Hook Form
- TypeScript 5.9.3
- ESLint

## 7. Directory Structure (depth ≤ 2)

```
./
  .env.example
  .eslintrc.json
  .gitignore
  README.md
  WebProgramming_ProjectRubrics.md
  eslint.config.mjs
  generate-pages.js
  metadata.json
  middleware.ts
  next-env.d.ts
  next.config.ts
  package-lock.json
  package.json
  postcss.config.mjs
  replace-colors-2.cjs
  ... +2 more files
  app/
    globals.css
    icon.png
    layout.tsx
    page.tsx
    (app)/
    api/
    login/
  components/
    EpgGrid.tsx
    Header.tsx
    Sidebar.tsx
    drama/
    epg/
    screens/
    ui/
  context/
    UserContext.tsx
  drama-ghar-streaming-included/
  hooks/
    use-mobile.ts
  lib/
    auth.ts
    date-utils.ts
    drama-types.ts
    epg-types.ts
    mongodb.ts
    utils.ts
  models/
    DramaView.ts
    History.ts
    Reminder.ts
    User.ts
    Watchlist.ts
  public/
    icon.png
    login-bg.jpg
    login-mobile.jpg
  scripts/
    pakdrama-scraper.py
```

## 8. Key Config Files Found

- `README.md` → `README.md`
- `package.json` → `package.json`
- `package-lock.json` → `package-lock.json`
- `tsconfig.json` → `tsconfig.json`
- `next.config.ts` → `next.config.ts`
- `postcss.config.mjs` → `postcss.config.mjs`
- `.env.example` → `.env.example`

## 9. package.json (if present)

- **Name:** ai-studio-applet
- **Version:** 0.1.0
- **Private:** True
- **Type:** None

### Scripts

| Script | Command |
|---|---|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint .` |
| `clean` | `next clean` |

### Dependencies (top 20)

| Package | Version |
|---|---|
| `@google/genai` | `^1.17.0` |
| `@hookform/resolvers` | `^5.2.2` |
| `@radix-ui/react-dialog` | `^1.1.15` |
| `@radix-ui/react-separator` | `^1.1.8` |
| `@radix-ui/react-slot` | `^1.2.4` |
| `@radix-ui/react-tabs` | `^1.1.13` |
| `autoprefixer` | `^10.4.21` |
| `bcryptjs` | `^3.0.3` |
| `class-variance-authority` | `^0.7.1` |
| `clsx` | `^2.1.1` |
| `date-fns` | `^4.1.0` |
| `date-fns-tz` | `^3.2.0` |
| `jose` | `^6.2.3` |
| `lucide-react` | `^0.553.0` |
| `mongoose` | `^9.6.2` |
| `motion` | `^12.23.24` |
| `next` | `^15.4.9` |
| `nodemailer` | `^8.0.7` |
| `postcss` | `^8.5.6` |
| `react` | `^19.2.1` |

*+5 more dependencies not shown.*

### Dev Dependencies (top 20)

| Package | Version |
|---|---|
| `@tailwindcss/postcss` | `4.1.11` |
| `@tailwindcss/typography` | `^0.5.19` |
| `@types/bcryptjs` | `^2.4.6` |
| `@types/node` | `^20` |
| `@types/nodemailer` | `^8.0.0` |
| `@types/react` | `^19` |
| `@types/react-dom` | `^19` |
| `eslint` | `9.39.1` |
| `eslint-config-next` | `16.0.8` |
| `firebase-tools` | `^15.0.0` |
| `tailwindcss` | `4.1.11` |
| `tw-animate-css` | `^1.4.0` |
| `typescript` | `5.9.3` |

## 10. README Excerpt (first 3000 chars)

```markdown
# DramaGhar 

**A full-stack Pakistani drama tracking & streaming platform built with Next.js 15, React 19, MongoDB Atlas, and Supabase.**

---
## Contributors

- [Ammar Asad](https://github.com/ammarasad2005)
- [Hanzlah Ch](https://github.com/HanzlahCh)

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Feature Breakdown & Self-Evaluation](#4-feature-breakdown--self-evaluation)
   - [Functionality](#41-functionality-2525)
   - [Password Encryption & Security](#42-password-encryption--security-2020)
   - [Role-Based Access Control (RBAC)](#43-role-based-access-control-rbac-2525)
   - [Form Validation](#44-form-validation-1515)
   - [Navigation & Structure](#45-navigation--structure-1010)
   - [UI / UX Design](#46-ui--ux-design-1010)
   - [Authentication & Session Management](#47-authentication--session-management-1515)
   - [Git Version Control](#48-git-version-control-1010)
   - [Footer & Layout Components](#49-footer--layout-components-55)
   - [Content & Creativity](#410-content--creativity-2525)
   - [Performance & Optimization](#411-performance--optimization-55)
5. [Database Models](#5-database-models)
6. [API Routes](#6-api-routes)
7. [Pages & Screens](#7-pages--screens)
8. [Technical Setup](#8-technical-setup)
9. [Self-Evaluation Summary Table](#9-self-evaluation-summary-table)

---

## 1. Project Overview

**DramaGhar** (meaning *Drama Home* in Urdu) is a personalized Pakistani drama tracking and streaming platform. It integrates a live **Electronic Program Guide (EPG)** sourced from a Supabase database, allowing users to:

- Browse a catalog of **200+ Pakistani dramas** across all major channels (ARY Digital, HUM TV, Geo Entertainment, Green Entertainment, Express Entertainment, and more).
- **Stream episodes** directly in-app via embedded YouTube players.
- **Track watch history** with per-episode progress and analytics (today / weekly / lifetime watch time in hours).
- **Save dramas** to a personal watchlist and receive reminders.
- View a **live TV schedule** (EPG grid) with auto-scroll to the current time.
- Manage their account via a full **settings page**.
- (Admins) Manage all user accounts from a dedicated **Admin Dashboard**.

---

## 2. Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router + API Routes) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.1, tw-animate-css |
| **Icons** | Lucide React |
| **Animations** | Framer Motion (motion 12) |
| **Fonts** | Inter (sans), Playfair Display (serif) via `next/font` |
| **Primary Database** | MongoDB Atlas via Mongoose 9 |
| **Drama/Media Data** | Supabase (PostgreSQL + object storage) |
| **Authentication** | Custom JWT (`jose` 6) — HTTP-only cookies |
| **Password Hashing** | bcryptjs (salt rounds: 10) |
| **Email** | Nodemailer 8 (Gmail SMTP) |
| **Form Handling** | react-hook-form 7, Zod 4 |
| **Vi
```

## 11. Engineering Rigor Signals

- **Has tests:** False (0 test files)
- **Has CI:** False
- **Has Docker:** False
- **Env files:** ['.env.example']

## 12. Largest Files (top 10 — bloat / asset check)

| File | Size |
|---|---|
| `app/icon.png` | 2.32 MB |
| `public/icon.png` | 2.32 MB |
| `public/login-mobile.jpg` | 2.27 MB |
| `public/login-bg.jpg` | 2.12 MB |
| `package-lock.json` | 550.0 KB |
| `README.md` | 21.9 KB |
| `components/screens/DramaDetailScreen.tsx` | 15.3 KB |
| `components/screens/LoginScreen.tsx` | 15.1 KB |
| `components/EpgGrid.tsx` | 14.8 KB |
| `components/screens/HomeScreen.tsx` | 14.8 KB |

## 13. Commit History

- **Commits available (in shallow clone):** 32
- **First commit date (in clone):** 2026-05-09
- **Last commit date:** 2026-05-21
- **Contributors:** {'Hanzlah Mehmood Ch': 1, 'Muhammad Ammar Asad': 30, 'copilot-swe-agent[bot]': 1}

### Recent Commits (last 30)

| Hash | Date | Subject |
|---|---|---|
| `7a5e837` | 2026-05-21 | Final Commit |
| `bf422f9` | 2026-05-10 | feat: clean up credits and implement data management controls |
| `2e171b2` | 2026-05-10 | fix: resolve typescript prop interfaces in route wrappers for vercel build |
| `f6f84f3` | 2026-05-10 | fix: remove unused params spread causing next.js warning |
| `8f27077` | 2026-05-10 | refactor: transition to Next.js App Router URLs and add admin delete functionali |
| `c8aeb2c` | 2026-05-10 | feat: add interactive guest name prompt and isolate admin logic |
| `fb3227c` | 2026-05-10 | feat: implement guest session, explicit remember me, and social footer for rubri |
| `36cb81c` | 2026-05-10 | fix: enable scrolling for explore library page |
| `92368e0` | 2026-05-10 | feat: apply channel filter correctly when navigating |
| `d3d6a13` | 2026-05-10 | refactor: improve aesthetics and navigation for channels/explore |
| `f4b261b` | 2026-05-11 | feat: implement data-driven recommendations, fix stale picsum images in history, |
| `3b2b3d0` | 2026-05-10 | fix: remove is_active filter to resolve missing dramas like Pehli Barish |
| `66dba7d` | 2026-05-10 | Merge pull request #1 from ammarasad2005/copilot/update-readme-with-project-repo |
| `8dae09a` | 2026-05-14 | docs: rewrite README as comprehensive project report aligned with rubric |
| `aebbba2` | 2026-05-10 | fix: add youtube image domains to next.config.ts remotePatterns |
| `c48d0ff` | 2026-05-10 | fix: resolve drama not found error, fix streaming playback, and enable scrolling |
| `9c68221` | 2026-05-10 | fix: resolve build errors and complete drama streaming integration |
| `5fcf9b3` | 2026-05-10 | feat: integrate drama library, streaming, and quantitative watch tracking |
| `500f97c` | 2026-05-11 | style: make mobile auth cards more compact and enhance glassmorphism effect |
| `44b1cd2` | 2026-05-11 | style: apply glassmorphism to login/auth cards on mobile |
| `03836a7` | 2026-05-10 | style: finalize and set official website icon with tight cropping |
| `c87fb92` | 2026-05-10 | fix: strictly filter live on tv now to only show currently airing dramas |
| `79c9935` | 2026-05-10 | style: replace initial auth spinner with login skeleton for faster perceived loa |
| `b9fb2a8` | 2026-05-10 | fix: resolve build-time environment variable errors by adopting lazy db connecti |
| `3c199a5` | 2026-05-10 | feat: enhance login screen pre-load with detailed skeleton content |
| `aa4fc20` | 2026-05-10 | feat: implement personalized UX, dynamic interactivity, and complete site hierar |
| `1b9577a` | 2026-05-10 | feat: complete project architecture including RBAC, Watchlist, and Form Validati |
| `f122a91` | 2026-05-10 | fix: resolve new/repeat tag conflict and enhance EPG component |
| `a110254` | 2026-05-10 | fix: resolve new/repeat tag conflict and enhance EPG component |
| `18cffa3` | 2026-05-10 | feat: Implement schedule screen and data fetching |

## 14. Observations

- Has lint script (code quality discipline).
- Has build script.
- Has dev script.
- No test files detected — gap to flag in portfolio narrative.
- No CI detected.
- No Dockerfile (acceptable for frontend-focused repos).
- Provides .env.example — good DX practice.
- No LICENSE file (fine for personal projects, matters for OSS positioning).
- README length: 19695 chars. Badges: False. Screenshots: False. Install section: False. Architecture section: True.
