'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/ui-observatory/glass-panel';
import { StackChip } from '@/components/ui-observatory/stack-chip';
import { PillarBadge } from '@/components/ui-observatory/pillar-badge';
import {
  stackMap,
  TOTAL_REPOS,
  engineeringRigorNote,
} from '@/data/stack-map';

/**
 * StackMapOverlay — Beat 5. The engineering stack as a star map.
 * Per phase8_storytelling.md Beat 5 + phase13 §5.2.
 */
export function StackMapOverlay() {
  // Sort: highest repoCount first → brightest stars at top.
  const sorted = [...stackMap].sort((a, b) => b.repoCount - a.repoCount);

  return (
    <div className="w-full px-4 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)] mb-4">
            <span className="h-px w-6 bg-[var(--border-strong)]" />
            Technical Credibility
          </div>
          <h2 className="font-display text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
            The stack, charted by use.
          </h2>
          <p className="mt-3 font-body text-[16px] md:text-[18px] text-[var(--text-secondary)] max-w-2xl">
            Bright stars = daily tools. Dim stars = I&apos;ve shipped them,
            but they&apos;re not my default.
          </p>
        </div>

        <GlassPanel className="p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {sorted.map((entry, i) => {
              // Brightness 1..3 from repoCount: 1 → dim, 3 → brightest.
              const brightness = entry.repoCount >= 4
                ? 3
                : entry.repoCount >= 2 ? 2 : 1;
              const opacity = 0.4 + (entry.repoCount / 5) * 0.6;
              return (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col gap-2 p-3 rounded-lg border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-block rounded-full"
                      style={{
                        width: `${6 + entry.repoCount * 2}px`,
                        height: `${6 + entry.repoCount * 2}px`,
                        background:
                          entry.pillar === 'ai'
                            ? 'var(--accent-sunset)'
                            : entry.pillar === 'mobile'
                              ? 'var(--accent-cyan)'
                              : 'var(--text-primary)',
                        opacity,
                        boxShadow:
                          entry.repoCount >= 4
                            ? `0 0 ${entry.repoCount * 2}px ${entry.pillar === 'ai' ? 'var(--accent-sunset)' : 'rgba(245,240,225,0.6)'}`
                            : 'none',
                        animation: entry.pulse
                          ? 'pulse-building 2s ease-in-out infinite'
                          : undefined,
                      }}
                      aria-hidden="true"
                    />
                    <PillarBadge pillar={entry.pillar} label={entry.pillar.toUpperCase()} />
                  </div>
                  <div>
                    <div className="font-mono text-[12px] text-[var(--text-primary)]">
                      {entry.name}
                    </div>
                    <div className="font-mono text-[11px] text-[var(--text-muted)] mt-0.5">
                      {entry.repoCount}/{TOTAL_REPOS} repos
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 pt-5 border-t border-[var(--border-subtle)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-amber)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)]">
                Engineering Rigor
              </span>
            </div>
            <p className="font-body text-[14px] md:text-[15px] leading-[1.6] text-[var(--text-secondary)]">
              {engineeringRigorNote}
            </p>
          </motion.div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}

// Re-export so consumers can grab the chips list without re-importing.
export { StackChip };
