'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BuildingNowBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

/**
 * BuildingNowBadge — pulsing badge for in-progress projects.
 * Per phase13_visual_design_system.md §5.4.
 * The CSS pseudo-element-style pulsing dot is implemented as a real element
 * so we can keep Tailwind purged of arbitrary content.
 */
export function BuildingNowBadge({
  label = 'Building Now',
  className,
  ...rest
}: BuildingNowBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1',
        'bg-[rgba(255,107,53,0.15)] border-[rgba(255,107,53,0.4)]',
        'font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--accent-sunset)]',
        className,
      )}
      {...rest}
    >
      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-sunset)] animate-[pulse-building_2s_ease-in-out_infinite]" />
      {label}
    </span>
  );
}
