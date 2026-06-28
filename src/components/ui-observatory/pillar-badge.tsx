'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { Pillar } from '@/data/projects';

interface PillarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  pillar: Pillar;
  label: string;
}

const pillarStyles: Record<Pillar, string> = {
  web: 'bg-[rgba(245,240,225,0.1)] text-[var(--text-primary)] border-[rgba(245,240,225,0.2)]',
  ai: 'bg-[rgba(255,107,53,0.1)] text-[var(--accent-sunset)] border-[rgba(255,107,53,0.3)]',
  mobile:
    'bg-[linear-gradient(135deg,rgba(255,107,53,0.1)_0%,rgba(77,208,225,0.1)_100%)] text-[var(--text-primary)] border-[rgba(77,208,225,0.3)]',
};

const pillarIcon: Record<Pillar, React.ReactNode> = {
  web: (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="3" width="12" height="9" rx="1" />
      <path d="M2 6h12M5 9h2M9 9h2" strokeLinecap="round" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="8" cy="8" r="3" />
      <path d="M8 2v2M8 12v2M2 8h2M12 8h2M4 4l1.4 1.4M11.6 11.6L13 13M4 12l1.4-1.4M11.6 4.4L13 3" strokeLinecap="round" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="5" y="2" width="6" height="12" rx="1" />
      <path d="M7 12h2" strokeLinecap="round" />
    </svg>
  ),
};

/**
 * PillarBadge — color-coded badge per pillar (web / ai / mobile).
 * Per phase13_visual_design_system.md §5.3.
 * Color is never the only signal — icon + label included.
 */
export function PillarBadge({ pillar, label, className, ...rest }: PillarBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1',
        'font-mono text-[11px] uppercase tracking-[0.04em]',
        pillarStyles[pillar],
        className,
      )}
      {...rest}
    >
      {pillarIcon[pillar]}
      {label}
    </span>
  );
}

export const pillarLabels: Record<Pillar, string> = {
  web: 'Full-stack Web',
  ai: 'AI / ML',
  mobile: 'Mobile',
};
