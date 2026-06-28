'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface StackChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  /** Brightness 1-3 derived from repo frequency. Default 2. */
  brightness?: 1 | 2 | 3;
  /** Pulsing accent (e.g. for the Playwright chip — only repo with E2E). */
  pulse?: boolean;
}

/**
 * StackChip — pill-shaped tech stack chip.
 * Per phase13_visual_design_system.md §5.2.
 * Mono font, uppercase, tracked.
 */
export function StackChip({
  label,
  brightness = 2,
  pulse = false,
  className,
  ...rest
}: StackChipProps) {
  const brightnessClasses: Record<number, string> = {
    1: 'text-[var(--text-muted)]',
    2: 'text-[var(--text-secondary)]',
    3: 'text-[var(--text-primary)]',
  };
  const brightnessBg: Record<number, string> = {
    1: 'bg-[rgba(245,240,225,0.03)]',
    2: 'bg-[rgba(245,240,225,0.06)]',
    3: 'bg-[rgba(245,240,225,0.1)]',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
        'font-mono text-[11px] uppercase tracking-[0.04em]',
        'border border-[var(--border-subtle)]',
        'transition-colors duration-200',
        brightnessBg[brightness],
        brightnessClasses[brightness],
        pulse && 'animate-[pulse-building_2s_ease-in-out_infinite]',
        className,
      )}
      {...rest}
    >
      {pulse && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-sunset)]" />
      )}
      {label}
    </span>
  );
}
