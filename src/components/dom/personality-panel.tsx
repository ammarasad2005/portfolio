'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/ui-observatory/glass-panel';

/**
 * PersonalityPanel — Beat 6.
 * Per phase8_storytelling.md Beat 6.
 *
 * Handwritten notebook + "Now playing" chip.
 */
export function PersonalityPanel() {
  return (
    <div className="w-full px-4 md:px-12 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)] mb-3">
            <span className="h-px w-6 bg-[var(--border-strong)]" />
            Beyond Code
          </div>
        </div>

        <GlassPanel className="p-6 md:p-10">
          {/* Now playing chip */}
          <div className="inline-flex items-center gap-2.5 mb-8 px-3 py-1.5 rounded-full bg-[rgba(255,107,53,0.08)] border border-[rgba(255,107,53,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-sunset)] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-sunset)]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-secondary)]">
              Soundtrack · Brian Eno — Apollo
            </span>
          </div>

          <h2 className="font-display text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6">
            When I&apos;m not building, I&apos;m listening — or writing.
          </h2>

          <div className="space-y-5">
            <p className="font-body text-[17px] md:text-[18px] leading-[1.6] text-[var(--text-secondary)]">
              I listen to Brian Eno&apos;s <em>Apollo</em> when I code. The
              ambient structure — long sustained tones, no sharp edges — matches
              how I want software to feel. Calm, not anxious. Vast, not cluttered.
            </p>

            <p className="font-body text-[17px] md:text-[18px] leading-[1.6] text-[var(--text-secondary)]">
              I refactored the Drama-Ghar navigation through the Next.js App
              Router migration. The transitions didn&apos;t survive the first
              attempt.
            </p>

            <p className="font-body text-[17px] md:text-[18px] leading-[1.6] text-[var(--text-secondary)]">
              I got interested in agentic AI because I wanted to build systems
              that could handle real ambiguity — a plumber query in Roman Urdu, a
              food label with 50 hidden names for sugar. Single-model systems
              can&apos;t do that. Multi-agent pipelines can.
            </p>

            <p className="font-body text-[17px] md:text-[18px] leading-[1.6] text-[var(--text-secondary)]">
              Writing is how I find out what I think. If I can&apos;t explain it
              in a paragraph, I don&apos;t understand it yet.
            </p>
          </div>

          {/* Handwritten notebook line — a small accent */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 pt-6 border-t border-[var(--border-subtle)]"
          >
            <p className="handwritten text-[22px] md:text-[26px] text-[var(--accent-amber)] leading-[1.4]">
              &ldquo;I built hamara-rozgar in one day. Then I automated the scraper so it would run itself.&rdquo;
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)]">
              — commit history, May 21, 2026
            </p>
          </motion.div>

          {/* Beyond code — concrete community + competition signal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 pt-6 border-t border-[var(--border-subtle)] grid gap-4 sm:grid-cols-2"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)] mb-2">
                Community
              </p>
              <p className="font-body text-[14px] md:text-[15px] leading-[1.5] text-[var(--text-secondary)]">
                16 hours volunteering as a literacy and maths tutor for
                underprivileged students via Karwaan-e-Mudabbir&apos;s non-formal
                education program (Sep–Dec 2024).
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)] mb-2">
                Competition
              </p>
              <p className="font-body text-[14px] md:text-[15px] leading-[1.5] text-[var(--text-secondary)]">
                Competed in the FAST Problem Solving Competition (FPSC), Winter
                2025 — a competitive programming challenge.
              </p>
            </div>
          </motion.div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
