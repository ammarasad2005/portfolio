'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/ui-observatory/glass-panel';

interface Curiosity {
  label: string;
  copy: string;
  accent: string;
}

const curiosities: Curiosity[] = [
  {
    label: 'Multi-agent coherence',
    copy: "Whether multi-agent systems stay coherent as they scale, or whether they always collapse into single-agent-with-tools. hamara-rozgar has 4 agents. I don't know what happens at 20.",
    accent: 'var(--accent-sunset)',
  },
  {
    label: 'Urdu / Roman Urdu NLP',
    copy: "How to build NLP that doesn't lean on English-centric tokenizers. Two of my projects parse Roman Urdu. I want to understand what's lost when you force Urdu through English-shaped pipes.",
    accent: 'var(--accent-amber)',
  },
  {
    label: 'Offline-first AI',
    copy: "Whether real agents can run on edge devices without cloud dependencies. hamara-rozgar migrated off Google Cloud on purpose. I want to know if that scales beyond a hackathon.",
    accent: 'var(--accent-cyan)',
  },
];

/**
 * FuturePanel — Beat 7.
 * Reframed from career ambitions to personal curiosities.
 */
export function FuturePanel() {
  return (
    <div className="w-full px-4 md:px-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)] mb-3">
            <span className="h-px w-6 bg-[var(--border-strong)]" />
            What's Next
          </div>
          <h2 className="font-display text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
            What I want to understand next.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {curiosities.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GlassPanel className="p-6 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: c.accent, boxShadow: `0 0 10px ${c.accent}` }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-secondary)]">
                    {c.label}
                  </span>
                </div>
                <p className="font-body text-[15px] md:text-[16px] leading-[1.55] text-[var(--text-primary)]">
                  {c.copy}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
