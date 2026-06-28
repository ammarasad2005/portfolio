# Phase 5 — Deep Analysis: `gcr-resources-fetch`

**Slug:** 05_gcr_resources_fetch  
**Local path:** `/home/z/my-project/repos/gcr-resources-fetch`

## 1. High-Level Snapshot

- **Total files (excluding node_modules/.git):** 19
- **Total source lines (non-empty):** 3,818
- **Source : Config ratio:** 3.0 (higher = more code-driven)
- **Docs : Source ratio:** 0.222

## 2. Language Breakdown (by file count)

| Language | Files |
|---|---|
| JavaScript | 7 |
| Other | 5 |
| JSON | 3 |
| Markdown | 1 |
| Text | 1 |
| CSS | 1 |
| HTML | 1 |

## 3. Lines of Code by Language (source only)

| Language | Lines |
|---|---|
| JavaScript | 3,088 |
| CSS | 589 |
| HTML | 141 |

## 4. File Categories

| Category | Files |
|---|---|
| docs | 2 |
| source | 9 |
| config | 3 |
| other | 5 |

## 5. Frameworks Detected

- None detected (may be a non-JS project or minimal).

## 6. Key Libraries Detected

- None detected.

## 7. Directory Structure (depth ≤ 2)

```
./
  .gitignore
  LICENSE
  README.md
  background.js
  content.js
  manifest.json
  gcr-fetch-backend/
    .gitignore
    package.json
    vercel.json
    api/
  icons/
    icon128.png
    icon16.png
    icon48.png
  lib/
    fetcher.js
    jszip.min.js
    zipper.js
  sidebar/
    sidebar.css
    sidebar.html
    sidebar.js
```

## 8. Key Config Files Found

- `README.md` → `README.md`
- `LICENSE` → `LICENSE`

## 9. package.json (if present)

- No package.json found (may be a non-JS project).

## 10. README Excerpt (first 3000 chars)

```markdown
# GCR Fetch — Google Classroom Resource Downloader

<p align="center">
  <strong>Bulk-download every resource from a Google Classroom course as a single ZIP archive.</strong>
</p>

<p align="center">
  <a href="#install"><strong>🚀 Quick Install Guide (For Users)</strong></a> &nbsp;•&nbsp; 
  <a href="#dev-setup"><strong>🛠️ Developer Setup & Self-Hosting</strong></a>
</p>

---

## The Problem

If you've ever used Google Classroom during exam season, you know the pain. Teachers share resources — PDFs, slides, documents, spreadsheets — across dozens of posts, announcements, and classwork items throughout the semester. When exam day approaches and you finally sit down to study, you realize you need to download all of them first. That means scrolling through the entire classroom feed, from the oldest post at the bottom to the newest at the top, hunting for every attachment one by one.

This process is slow, tedious, and disorganized. A typical course with a semester's worth of material can easily take 20–25 minutes of manual clicking and downloading. Worse, it becomes a procrastination trigger — the friction of "I have to download everything first" is enough to push students away from preparing for their exams entirely. Resources are scattered across Stream posts, Classwork topics, and announcements with no centralized way to grab them all.

**GCR Fetch eliminates this entirely.** One click scans your entire course and bundles every downloadable resource into a single ZIP file.

---

## Overview

GCR Fetch is a Chrome extension (Manifest V3) that integrates directly into Google Classroom. When you open a course page, a floating "GCR Fetch" button appears. Clicking it opens a sidebar panel where you can:

- **Sign in** with your Google account (OAuth 2.0, works with any Google account regardless of your Chrome profile)
- **Scan** the course for all resources using a hybrid detection approach (DOM scraping + Google Classroom API)
- **Browse, filter, and select** which files to download
- **Download** everything as a neatly organized ZIP archive

The extension also handles non-downloadable resources (YouTube links, Google Forms, Drive folders, external URLs) by generating a polished, interactive **External Resources Dashboard** — an HTML file included in the ZIP with search, filtering, and one-click copy/open functionality.

---

## Key Features

| Feature | Description |
|---|---|
| **Hybrid Resource Detection** | Combines DOM scraping (finds what's visible on the page) with Google Classroom REST API calls (finds attachments behind "See more", in collapsed topics, or in unexpanded classwork). No resource goes undetected. |
| **Smart File Conversion** | Google Docs, Sheets, Slides, and Drawings are automatically exported to their Microsoft Office equivalents (`.docx`, `.xlsx`, `.pptx`) or as PDFs. Optionally convert all documents to PDF with one toggle. |
| **Organized ZIP Archives** | Choose between a flat file structure or a categorized structure that 
```

## 11. Engineering Rigor Signals

- **Has tests:** False (0 test files)
- **Has CI:** False
- **Has Docker:** False
- **Env files:** none

## 12. Largest Files (top 10 — bloat / asset check)

| File | Size |
|---|---|
| `lib/jszip.min.js` | 95.3 KB |
| `lib/zipper.js` | 34.5 KB |
| `sidebar/sidebar.js` | 19.8 KB |
| `content.js` | 18.9 KB |
| `lib/fetcher.js` | 18.1 KB |
| `README.md` | 18.0 KB |
| `sidebar/sidebar.css` | 14.8 KB |
| `icons/icon128.png` | 12.4 KB |
| `background.js` | 12.1 KB |
| `sidebar/sidebar.html` | 7.3 KB |

## 13. Commit History

- **Commits available (in shallow clone):** 32
- **First commit date (in clone):** 2026-06-02
- **Last commit date:** 2026-06-06
- **Contributors:** {'Muhammad Ammar Asad': 32}

### Recent Commits (last 30)

| Hash | Date | Subject |
|---|---|---|
| `9add768` | 2026-06-06 | Fix SyntaxError by removing duplicate origin declaration in backend |
| `55e3802` | 2026-06-06 | Improve CORS handling and Firefox browser detection using User-Agent as backup |
| `c3e3f0f` | 2026-06-06 | Add Vercel backend URL to manifest host_permissions |
| `2dcdc39` | 2026-06-06 | Add Firefox extension support and update Vercel backend token exchange |
| `f448ff3` | 2026-06-04 | docs: update README installation guide for clarity |
| `f1f756c` | 2026-06-04 | docs: add quick navigation links at the top of README |
| `b3f9291` | 2026-06-04 | docs: restructure installation instructions for users vs developers |
| `e55f0db` | 2026-06-04 | docs: add MIT license and update README link |
| `f2405c6` | 2026-06-04 | docs: rewrite README to provide comprehensive feature overview and architectural |
| `25b4ce4` | 2026-06-04 | fix(backend): update EXTENSION_ID to match new locked extension ID |
| `5dd2d83` | 2026-06-04 | chore: Update OAuth Client ID to new university project credentials |
| `501f34c` | 2026-06-04 | chore: Set locked manifest key, update extension ID, and ignore local key/zip to |
| `3de4c3b` | 2026-06-04 | feat: Exclude noisy Google subdomains from link scanning and revert individual . |
| `bc8bea0` | 2026-06-04 | feat: Add individual .url shortcut files inside the ZIP and align download progr |
| `e52d2a1` | 2026-06-04 | feat: Scrape external links from DOM and extract links from plaintext post descr |
| `bdd0493` | 2026-06-04 | feat: Replace DOCX export with interactive HTML Dashboard for external resources |
| `af8ecce` | 2026-06-04 | checkout: temporary commit for worktree checkout |
| `baa980e` | 2026-06-04 | Add styles.xml and override definition for absolute MS Word docx compatibility |
| `4f4c163` | 2026-06-04 | Fix DOCX corruption by removing leading XML newlines, renaming rel IDs, and fixi |
| `bb792b3` | 2026-06-04 | Index external resources and compile to DOCX |
| `4b55f54` | 2026-06-03 | Add option to download student coursework submissions ('Your Work') |
| `d081fd4` | 2026-06-03 | Ignore zip files in .gitignore |
| `72790ac` | 2026-06-03 | Clean up redundant debug error messages and try-catch in convertAndFetchPdfBlob |
| `3d3bc74` | 2026-06-02 | Fix showToast undefined in zipper, disable silent fallback |
| `b8a2f73` | 2026-06-02 | Fix alerts blocked by iframe sandbox, use showToast instead |
| `46754f0` | 2026-06-02 | Fix isConvertibleToPdf failing on DOM files and missing extensions |
| `6a593e7` | 2026-06-02 | Add error alert and supportsAllDrives to PDF conversion |
| `507f301` | 2026-06-02 | feat: Add PDF conversion feature via Google Drive API |
| `20a8f9d` | 2026-06-02 | Fix empty ZIP by using Drive API v3 endpoint instead of drive.google.com/uc |
| `4c962c5` | 2026-06-02 | Fix 404 by decoding base64 course IDs from URLs |

## 14. Observations

- No test files detected — gap to flag in portfolio narrative.
- No CI detected.
- No Dockerfile (acceptable for frontend-focused repos).
- No .env.example found.
- Has LICENSE file.
- README length: 17233 chars. Badges: False. Screenshots: False. Install section: True. Architecture section: True.
