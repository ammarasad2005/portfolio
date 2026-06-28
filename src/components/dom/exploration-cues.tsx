'use client';

import { motion } from 'framer-motion';

const constellationLabels = [
  { name: 'The Builder', pillar: 'Web', color: 'var(--pillar-web)' },
  { name: 'The Agent', pillar: 'AI / ML', color: 'var(--accent-sunset)' },
  { name: 'The Hand', pillar: 'Mobile', color: 'var(--accent-cyan)' },
];

/**
 * ExplorationCues — Beat 3.
 * Per phase8_storytelling.md Beat 3.
 *
 * Shows the three constellation labels + the inline "how to use" overlay.
 */
export function ExplorationCues() {
  return (
    <div className="w-full px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)] mb-6">
          <span className="h-px w-6 bg-[var(--border-strong)]" />
          Exploration
        </div>

        <h2 className="font-display text-[32px] md:text-[56px] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] max-w-3xl mx-auto">
          Each satellite is a project I launched.
          <br />
          <span className="text-[var(--text-secondary)]">
            Scroll to travel further.
          </span>
        </h2>

        <div className="mt-14 flex flex-wrap justify-center gap-6 md:gap-12">
          {constellationLabels.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative h-12 w-12 flex items-center justify-center">
                {/* Three-star constellation icon */}
                <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
                  <line
                    x1="10" y1="38" x2="24" y2="10"
                    stroke={c.color}
                    strokeWidth="0.8"
                    opacity="0.5"
                  />
                  <line
                    x1="24" y1="10" x2="38" y2="22"
                    stroke={c.color}
                    strokeWidth="0.8"
                    opacity="0.5"
                  />
                  <line
                    x1="10" y1="38" x2="38" y2="22"
                    stroke={c.color}
                    strokeWidth="0.8"
                    opacity="0.3"
                  />
                  <circle cx="10" cy="38" r="2" fill={c.color} />
                  <circle cx="24" cy="10" r="2.5" fill={c.color} />
                  <circle cx="38" cy="22" r="2" fill={c.color} />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-display text-[18px] text-[var(--text-primary)]">
                  {c.name}
                </div>
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.08em] mt-1"
                  style={{ color: c.color }}
                >
                  {c.pillar} Pillar
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
