// Stack map data for Beat 5 — engineering stack as a star map.
// Source: phase8_storytelling.md Beat 5 + phase5 analysis_cache.json.

import type { Pillar } from './projects';

export interface StackEntry {
  name: string;
  /** Number of the 7 portfolio repos that use this technology. */
  repoCount: number;
  pillar: Pillar;
  /** Extra signal — e.g. Playwright is "only repo with E2E" → pulse it. */
  pulse?: boolean;
}

export const stackMap: StackEntry[] = [
  { name: 'React', repoCount: 5, pillar: 'web' },
  { name: 'Next.js', repoCount: 4, pillar: 'web' },
  { name: 'TypeScript', repoCount: 5, pillar: 'web' },
  { name: 'Tailwind', repoCount: 3, pillar: 'web' },
  { name: 'Supabase', repoCount: 4, pillar: 'web' },
  { name: 'Node.js', repoCount: 3, pillar: 'web' },
  { name: 'OAuth 2.0', repoCount: 2, pillar: 'web' },
  { name: 'NextAuth', repoCount: 2, pillar: 'web' },
  { name: 'Zod', repoCount: 3, pillar: 'web' },
  { name: 'React Hook Form', repoCount: 3, pillar: 'web' },
  { name: 'Radix/shadcn', repoCount: 2, pillar: 'web' },
  { name: 'Framer Motion', repoCount: 2, pillar: 'web' },
  { name: 'Playwright', repoCount: 1, pillar: 'web', pulse: true },
  { name: 'MongoDB Atlas', repoCount: 1, pillar: 'web' },
  { name: 'Python', repoCount: 2, pillar: 'ai' },
  { name: 'OpenAI SDK', repoCount: 1, pillar: 'ai' },
  { name: 'OSM Nominatim', repoCount: 1, pillar: 'ai' },
  { name: 'Google Maps API', repoCount: 1, pillar: 'mobile' },
  { name: 'Capacitor', repoCount: 1, pillar: 'mobile' },
  { name: 'Chrome Extension MV3', repoCount: 1, pillar: 'web' },
  { name: 'GitHub Actions', repoCount: 3, pillar: 'web' },
];

export const TOTAL_REPOS = 7;

export const engineeringRigorNote =
  'Engineering rigor: 2/7 repos tested (Playwright E2E in Exam-Table, scratch tests in hamara-rozgar). 3/7 repos use GitHub Actions — for scheduled tasks (hourly timetable updates, 6-hourly Maps scraper) and background workers, not push-triggered CI/CD. Honest gap: no test/build/deploy pipelines on push or PR yet. If I shipped any of these today, I would add: GitHub Actions CI on PR, Vitest unit tests, Playwright E2E across the board. Working on it.';
