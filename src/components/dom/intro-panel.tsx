'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/ui-observatory/glass-panel';

/**
 * IntroPanel — Beat 2 introduction.
 * Per phase8_storytelling.md Beat 2.
 *
 * Glass panel positioned on the right on desktop, bottom sheet on mobile.
 */
export function IntroPanel() {
  return (
    <div className="w-full px-4 md:px-0 md:ml-auto md:mr-12 md:w-[480px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlassPanel className="p-6 md:p-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)]">
              <span className="h-px w-6 bg-[var(--border-strong)]" />
              The Observer
            </div>

            <p className="font-display text-[24px] md:text-[28px] leading-[1.25] text-[var(--text-primary)] tracking-[-0.02em]">
              I&apos;m Muhammad Ammar Asad. I build software for communities
              I&apos;m part of — mostly FAST students in Islamabad, where I&apos;m
              a 6th-semester CS student.
            </p>

            <p className="font-body text-[16px] md:text-[18px] leading-[1.55] text-[var(--text-secondary)]">
              Three pillars: full-stack web, agentic AI, mobile. I ship to figure
              out what I don&apos;t know yet — every project on this site started
              as a question I couldn&apos;t answer.
            </p>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
