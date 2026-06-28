'use client';

import { create } from 'zustand';

export interface ObservabilityState {
  /** Scroll progress 0..1 across the whole page. */
  scrollProgress: number;
  /** 1..8 — which beat is currently active (derived from scrollProgress). */
  currentBeat: number;
  /** Sub-beat (0..6) when currentBeat === 4 — which project is focused. */
  currentProjectIndex: number;
  /** Has the visitor scrolled at least once? (Drives first-visit hints.) */
  hasVisited: boolean;
  /** Has the loading screen finished? */
  hasLoaded: boolean;
  /** Sound toggle (persisted in localStorage). */
  soundEnabled: boolean;
  /** prefers-reduced-motion preference (computed on mount). */
  reducedMotion: boolean;
  /** True on touch devices — disables custom cursor / hover preview. */
  isTouch: boolean;

  setScrollProgress: (progress: number) => void;
  setCurrentBeat: (beat: number) => void;
  setCurrentProjectIndex: (index: number) => void;
  markVisited: () => void;
  markLoaded: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setIsTouch: (isTouch: boolean) => void;
}

const SOUND_KEY = 'observatory.soundEnabled';
const VISITED_KEY = 'observatory.hasVisited';

function readBoolean(key: string, fallback = false): boolean {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = window.localStorage.getItem(key);
    if (v === null) return fallback;
    return v === '1' || v === 'true';
  } catch {
    return fallback;
  }
}

function writeBoolean(key: string, value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value ? '1' : '0');
  } catch {
    /* localStorage might be unavailable in private mode */
  }
}

export const useObservatoryStore = create<ObservabilityState>((set) => ({
  scrollProgress: 0,
  currentBeat: 1,
  currentProjectIndex: 0,
  hasVisited: readBoolean(VISITED_KEY, false),
  hasLoaded: false,
  soundEnabled: readBoolean(SOUND_KEY, false),
  reducedMotion: false,
  isTouch: false,

  setScrollProgress: (progress) => set({ scrollProgress: Math.min(1, Math.max(0, progress)) }),
  setCurrentBeat: (beat) => set({ currentBeat: beat }),
  setCurrentProjectIndex: (index) => set({ currentProjectIndex: index }),
  markVisited: () => {
    writeBoolean(VISITED_KEY, true);
    set({ hasVisited: true });
  },
  markLoaded: () => set({ hasLoaded: true }),
  setSoundEnabled: (enabled) => {
    writeBoolean(SOUND_KEY, enabled);
    set({ soundEnabled: enabled });
  },
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setIsTouch: (isTouch) => set({ isTouch }),
}));

export { SOUND_KEY, VISITED_KEY };
