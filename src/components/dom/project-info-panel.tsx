'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/ui-observatory/glass-panel';
import { StackChip } from '@/components/ui-observatory/stack-chip';
import { PillarBadge, pillarLabels } from '@/components/ui-observatory/pillar-badge';
import { BuildingNowBadge } from '@/components/ui-observatory/building-now-badge';
import { CTAButton } from '@/components/ui-observatory/cta-button';
import type { Project } from '@/data/projects';

interface ProjectInfoPanelProps {
  project: Project;
  /** Index in the project list — used for stagger. */
  index?: number;
}

const pillarColors: Record<Project['pillar'], string> = {
  web: 'var(--pillar-web)',
  ai: 'var(--pillar-ai)',
  mobile: 'var(--accent-cyan)',
};

/**
 * ProjectInfoPanel — data-driven info panel for a project.
 * Per phase12_project_presentation.md (per-project info architecture)
 * + phase9_ux_design.md §3.2 stagger timing.
 *
 * Materializes with stagger: border → title → subtitle → chips → body → CTAs
 * at 80ms intervals.
 */
export function ProjectInfoPanel({ project, index = 0 }: ProjectInfoPanelProps) {
  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  const accent = pillarColors[project.pillar];
  const brightnessFor = (chipIndex: number): 1 | 2 | 3 => {
    // First 3 chips get max brightness, next 3 medium, rest dim.
    if (chipIndex < 3) return 3;
    if (chipIndex < 6) return 2;
    return 1;
  };

  return (
    <div className="w-full px-4 md:px-0 md:ml-auto md:mr-12 md:w-[480px]">
      <motion.div
        {...stagger(0)}
        style={{
          borderColor: `rgba(245, 240, 225, ${project.status === 'building' ? 0.18 : 0.08})`,
        }}
      >
        <GlassPanel className="p-6 md:p-8" elevated={project.status === 'building'}>
          {/* Top row: pillar badge + building-now badge */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <PillarBadge pillar={project.pillar} label={pillarLabels[project.pillar]} />
            {project.badge && (
              <motion.div {...stagger(1)}>
                <BuildingNowBadge label={project.badge.replace('🛠️ ', '')} />
              </motion.div>
            )}
          </div>

          {/* Title */}
          <motion.h2
            {...stagger(1)}
            className="font-display text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]"
          >
            {project.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            {...stagger(2)}
            className="mt-3 font-body text-[18px] md:text-[20px] leading-[1.4] text-[var(--text-secondary)]"
          >
            {project.subtitle}
          </motion.p>

          {/* Stack chips */}
          <motion.div
            {...stagger(3)}
            className="mt-5 flex flex-wrap gap-1.5"
            aria-label="Tech stack"
          >
            {project.stackChips.map((chip, i) => (
              <StackChip key={chip} label={chip} brightness={brightnessFor(i)} />
            ))}
          </motion.div>

          {/* Body */}
          <motion.p
            {...stagger(4)}
            className="mt-5 font-body text-[17px] md:text-[18px] leading-[1.55] text-[var(--text-primary)]"
          >
            {project.body}
          </motion.p>

          {/* Engineering note */}
          <motion.div
            {...stagger(5)}
            className="mt-5 pt-4 border-t border-[var(--border-subtle)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)]">
                Engineering Note
              </span>
            </div>
            <p className="font-mono text-[13px] leading-[1.5] text-[var(--text-secondary)]">
              {project.engineeringNote}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...stagger(6)}
            className="mt-6 flex flex-wrap gap-3"
          >
            {project.ctas.map((cta) => (
              <CTAButton
                key={cta.label}
                href={cta.href}
                variant={cta.variant ?? 'ghost'}
                aria-label={`${cta.label} — ${project.title} (opens in new tab)`}
              >
                {cta.label}
                <span aria-hidden="true">↗</span>
              </CTAButton>
            ))}
          </motion.div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
