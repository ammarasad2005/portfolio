'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Adds a subtle top-left sheen highlight. Default: true. */
  sheen?: boolean;
  /** Elevates shadow for focused / modal surfaces. */
  elevated?: boolean;
}

/**
 * GlassPanel — the primary content surface of the observatory.
 * Per phase13_visual_design_system.md §5.1.
 */
export function GlassPanel({
  children,
  className,
  sheen = true,
  elevated = false,
  ...rest
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'border border-[var(--border-subtle)]',
        'bg-[var(--bg-glass)] backdrop-blur-xl backdrop-saturate-150',
        elevated ? 'shadow-[var(--shadow-elevated)]' : 'shadow-[var(--shadow-glass)]',
        className,
      )}
      style={{
        // The gradient sheen overlays a faint highlight on the top-left.
        backgroundImage: sheen
          ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'
          : undefined,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
