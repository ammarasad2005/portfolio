'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui-observatory/cta-button';

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:ammarasad321993@gmail.com',
    hint: 'ammarasad321993@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ammarasad2005',
    hint: 'github.com/ammarasad2005',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/muhammad-ammar-asad',
    hint: 'linkedin.com/in/muhammad-ammar-asad',
  },
  {
    label: 'Resume / CV',
    href: '/Ammar_Asad_Resume.pdf',
    hint: 'PDF — 1 page',
  },
];

/**
 * ContactPanel — Beat 8 finale.
 * Per phase8_storytelling.md Beat 8.
 *
 * Dawn gradient + large Fraunces thank-you + 4 contact links.
 */
export function ContactPanel() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 dawn-gradient overflow-hidden">
      {/* A single "morning star" that fades as the dome closes. */}
      <motion.div
        initial={{ opacity: 0.9, scale: 1 }}
        whileInView={{ opacity: 0, scale: 0.3 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 2.5, ease: [0.7, 0, 0.84, 0] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] h-2 w-2 rounded-full bg-[var(--text-primary)]"
        style={{ boxShadow: '0 0 20px 6px rgba(245, 240, 225, 0.7)' }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-primary)]/70 mb-6">
          <span className="h-px w-6 bg-current" />
          Dawn
        </div>

        <h2 className="font-display text-[48px] md:text-[88px] leading-[1.0] tracking-[-0.02em] text-[var(--text-primary)]">
          Thank you for observing.
        </h2>

        <p className="mt-8 font-body text-[17px] md:text-[20px] leading-[1.55] text-[var(--text-primary)]/90">
          If you&apos;d like to talk — about a collaboration, an idea, or just to
          compare notes — I&apos;d be glad to hear from you.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          {contactLinks.map((link) => (
            <CTAButton
              key={link.label}
              href={link.href}
              variant="ghost"
              className="border-[rgba(245,240,225,0.3)] hover:border-[var(--text-primary)] text-[var(--text-primary)]"
              aria-label={`${link.label} — ${link.hint}`}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </CTAButton>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 font-display italic text-[24px] md:text-[32px] text-[var(--text-primary)] tracking-[-0.01em]"
        >
          Muhammad Ammar Asad
        </motion.p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-primary)]/60">
          Full-stack web · Agentic AI · Mobile · Islamabad, Pakistan
        </p>
      </motion.div>
    </div>
  );
}
