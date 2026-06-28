'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost';

interface CTAButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: React.ReactNode;
}

/**
 * CTAButton — link-styled call-to-action with two variants.
 * Per phase13_visual_design_system.md §5.5 + §5.6.
 * Always renders an <a> tag (per accessibility rule: CTAs are real links).
 */
export function CTAButton({
  variant = 'primary',
  children,
  className,
  ...rest
}: CTAButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 ' +
    'font-body text-[15px] font-medium leading-none ' +
    'transition-all duration-200 cursor-pointer ' +
    'min-h-[44px] select-none ' +
    'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]';

  const variants: Record<Variant, string> = {
    primary:
      'bg-[var(--accent-sunset)] text-[var(--bg-deep)] hover:bg-[#FF7E50] ' +
      'hover:-translate-y-px hover:shadow-[var(--shadow-cta)]',
    ghost:
      'bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] ' +
      'hover:bg-[rgba(245,240,225,0.04)] hover:border-[var(--text-secondary)]',
  };

  return (
    <a
      className={cn(base, variants[variant], className)}
      // Open external links safely; let users Cmd+click for in-page anchors.
      target={rest.href?.startsWith('#') ? undefined : '_blank'}
      rel={rest.href?.startsWith('#') ? undefined : 'noopener noreferrer'}
      {...rest}
    >
      {children}
    </a>
  );
}
