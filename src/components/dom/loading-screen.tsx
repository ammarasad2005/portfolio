'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useObservatoryStore } from '@/lib/store';

/**
 * LoadingScreen — "Initializing journey" orbit-ring sequence.
 *
 * CSS-only sequence:
 *   0–200ms    blank deep navy
 *   200–600ms  orbit ring fades in
 *   600–1500ms orbiting satellite dot begins; "Initializing journey…" text
 *   1500–2500ms "Charting the orbit…" text swap
 *   2500–3500ms "Ready." text
 *   3500ms      fade out
 *
 * Fallback: if prefers-reduced-motion, show a static centered icon + name.
 */
const PHASES = [
  { delay: 0,    text: '' },
  { delay: 600,  text: 'Initializing journey…' },
  { delay: 1500, text: 'Charting the orbit…' },
  { delay: 2500, text: 'Ready.' },
] as const;

export function LoadingScreen() {
  const markLoaded = useObservatoryStore((s) => s.markLoaded);
  const hasLoaded = useObservatoryStore((s) => s.hasLoaded);
  const reducedMotion = useObservatoryStore((s) => s.reducedMotion);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Reduced motion: short static delay, then dismiss.
  useEffect(() => {
    if (!reducedMotion) return;
    const t = setTimeout(() => {
      setVisible(false);
      markLoaded();
    }, 400);
    return () => clearTimeout(t);
  }, [reducedMotion, markLoaded]);

  // Cinematic sequence.
  useEffect(() => {
    if (reducedMotion || hasLoaded) return;
    let cancelled = false;

    const timers = PHASES.map((p, i) =>
      setTimeout(() => {
        if (!cancelled) setPhaseIndex(i);
      }, p.delay),
    );
    const dismiss = setTimeout(() => {
      if (cancelled) return;
      setVisible(false);
      markLoaded();
    }, 3500);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      clearTimeout(dismiss);
    };
  }, [reducedMotion, hasLoaded, markLoaded]);

  if (!visible) return null;

  const text = PHASES[phaseIndex].text;
  const ringOpacity = phaseIndex >= 1 ? 1 : 0;

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-deep)]"
        role="status"
        aria-live="polite"
        aria-label={text || 'Loading portfolio'}
      >
        {/* Orbit ring — a circle with a small satellite dot orbiting it. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ringOpacity }}
          transition={{ duration: 0.4 }}
          className="relative h-32 w-32 flex items-center justify-center"
        >
          {/* Orbit ring */}
          <div
            className="absolute h-24 w-24 rounded-full border border-[var(--border-strong)]"
            aria-hidden="true"
          />
          {/* Central planet (Earth) */}
          <div
            className="absolute h-3 w-3 rounded-full bg-[var(--text-primary)]"
            style={{ boxShadow: '0 0 10px 2px rgba(74, 144, 226, 0.6)' }}
            aria-hidden="true"
          />
          {/* Orbiting satellite dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
            className="absolute h-24 w-24"
            aria-hidden="true"
          >
            <div
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--accent-sunset)]"
              style={{ boxShadow: '0 0 8px 2px rgba(255, 107, 53, 0.7)' }}
            />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.p
          key={text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 font-display text-[24px] md:text-[32px] text-[var(--text-secondary)] tracking-[-0.01em]"
        >
          {text}
        </motion.p>

        {/* Progress bar (subtle) */}
        <div className="mt-6 h-px w-32 bg-[var(--border-subtle)] overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full bg-[var(--accent-sunset)] origin-left"
          />
        </div>

        {/* Static fallback for reduced motion */}
        {reducedMotion && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
            Muhammad Ammar Asad — Portfolio
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
