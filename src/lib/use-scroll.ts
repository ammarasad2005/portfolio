'use client';

import { useEffect } from 'react';
import { useObservatoryStore } from './store';
import { TOTAL_BEATS } from '@/data/beats';
import { projects } from '@/data/projects';

/**
 * useScroll — sets up a single scroll listener that computes scrollProgress
 * and derives currentBeat / currentProjectIndex, writing to Zustand.
 *
 * Beat mapping (TOTAL_BEATS=8, but Beat 4 is the projects mega-beat which
 * spans 7 sub-screens, so we account for that here):
 *
 *   Beat 1: 1 screen
 *   Beat 2: 1 screen
 *   Beat 3: 1 screen
 *   Beat 4: 7 screens (one per project)
 *   Beat 5: 1 screen
 *   Beat 6: 1 screen
 *   Beat 7: 1 screen
 *   Beat 8: 1 screen
 *   Total: 14 screens of scroll.
 *
 * We compute the current beat from a per-screen table and currentProjectIndex
 * when inside Beat 4.
 */
const SCREEN_COUNTS_PER_BEAT: number[] = [
  1, // Beat 1 — Arrival
  1, // Beat 2 — Introduction
  1, // Beat 3 — Exploration
  projects.length, // Beat 4 — Projects (7 sub-screens)
  1, // Beat 5 — Technical
  1, // Beat 6 — Personality
  1, // Beat 7 — Future
  1, // Beat 8 — Contact
];

export const TOTAL_SCREENS = SCREEN_COUNTS_PER_BEAT.reduce((a, b) => a + b, 0);

interface BeatRange {
  beat: number;
  startScreen: number; // 0-indexed inclusive
  endScreen: number; // 0-indexed exclusive
  screens: number;
}

const beatRanges: BeatRange[] = (() => {
  let cursor = 0;
  const ranges: BeatRange[] = [];
  for (let i = 0; i < TOTAL_BEATS; i++) {
    const screens = SCREEN_COUNTS_PER_BEAT[i];
    ranges.push({
      beat: i + 1,
      startScreen: cursor,
      endScreen: cursor + screens,
      screens,
    });
    cursor += screens;
  }
  return ranges;
})();

export function useScroll(): void {
  const setScrollProgress = useObservatoryStore((s) => s.setScrollProgress);
  const setCurrentBeat = useObservatoryStore((s) => s.setCurrentBeat);
  const setCurrentProjectIndex = useObservatoryStore(
    (s) => s.setCurrentProjectIndex,
  );
  const markVisited = useObservatoryStore((s) => s.markVisited);
  const hasVisited = useObservatoryStore((s) => s.hasVisited);
  const setReducedMotion = useObservatoryStore((s) => s.setReducedMotion);
  const setIsTouch = useObservatoryStore((s) => s.setIsTouch);

  // Detect environment once on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);

    const touch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(touch);

    return () => mq.removeEventListener('change', onChange);
  }, [setReducedMotion, setIsTouch]);

  // Single scroll listener → rAF-coalesced state update.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let rafId = 0;
    let lastVisited = hasVisited;

    const compute = () => {
      rafId = 0;
      const doc = document.documentElement;
      const scrollableHeight =
        (doc.scrollHeight - window.innerHeight) || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
      setScrollProgress(progress);

      // Map progress → screen index.
      const screen = progress * TOTAL_SCREENS;
      let beat = 1;
      let projectIndex = 0;
      for (const r of beatRanges) {
        if (screen >= r.startScreen && screen < r.endScreen) {
          beat = r.beat;
          if (r.beat === 4) {
            projectIndex = Math.min(
              projects.length - 1,
              Math.max(0, Math.floor(screen - r.startScreen)),
            );
          }
          break;
        }
        // If we're past the last beat (progress = 1), clamp to beat 8.
        beat = r.beat;
      }
      setCurrentBeat(beat);
      setCurrentProjectIndex(projectIndex);

      if (!lastVisited && progress > 0.005) {
        lastVisited = true;
        markVisited();
      }
    };

    const onScroll = () => {
      if (rafId === 0) rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, [
    setScrollProgress,
    setCurrentBeat,
    setCurrentProjectIndex,
    markVisited,
    hasVisited,
  ]);
}

/** Smoothly scroll to the start of a specific beat. */
export function scrollToBeat(beat: number): void {
  if (typeof window === 'undefined') return;
  const range = beatRanges.find((r) => r.beat === beat);
  if (!range) return;
  const ratio = range.startScreen / TOTAL_SCREENS;
  const doc = document.documentElement;
  const target = ratio * (doc.scrollHeight - window.innerHeight);
  window.scrollTo({ top: target, behavior: 'smooth' });
}

/** Smoothly scroll to a specific project within Beat 4. */
export function scrollToProject(index: number): void {
  if (typeof window === 'undefined') return;
  const range = beatRanges.find((r) => r.beat === 4);
  if (!range) return;
  const screen = range.startScreen + Math.min(projects.length - 1, Math.max(0, index));
  const ratio = screen / TOTAL_SCREENS;
  const doc = document.documentElement;
  const target = ratio * (doc.scrollHeight - window.innerHeight);
  window.scrollTo({ top: target, behavior: 'smooth' });
}
