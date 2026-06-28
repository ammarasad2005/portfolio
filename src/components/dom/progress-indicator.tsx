'use client';

import { useObservatoryStore } from '@/lib/store';
import { scrollToBeat } from '@/lib/use-scroll';
import { beats } from '@/data/beats';
import { cn } from '@/lib/utils';

/**
 * ProgressIndicator — vertical orbit path on the right edge of the viewport.
 * Per phase13_visual_design_system.md §5.7 + phase9 §1.2.
 *
 * Past beats: filled (text-secondary). Current: enlarged + sunset tint.
 * Future beats: hollow (border only). Click jumps to that beat.
 */
export function ProgressIndicator() {
  const currentBeat = useObservatoryStore((s) => s.currentBeat);
  const scrollProgress = useObservatoryStore((s) => s.scrollProgress);

  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40"
    >
      <ol className="flex flex-col items-center gap-3 py-3">
        {/* Vertical line behind the dots */}
        <div
          className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-[var(--border-subtle)]"
          aria-hidden="true"
        />
        {/* Progress fill — sunset orange to current position */}
        <div
          className="absolute left-1/2 top-2 w-px -translate-x-1/2 bg-[var(--accent-sunset)] transition-all duration-300"
          style={{ height: `calc((100% - 16px) * ${scrollProgress})` }}
          aria-hidden="true"
        />
        {beats.map((beat) => {
          const isCurrent = beat.id === currentBeat;
          const isPast = beat.id < currentBeat;
          return (
            <li key={beat.id} className="relative z-10">
              <button
                type="button"
                onClick={() => scrollToBeat(beat.id)}
                aria-label={`Jump to Beat ${beat.id}: ${beat.label}`}
                aria-current={isCurrent ? 'step' : undefined}
                className="group flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-sunset)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)] rounded-full p-1"
              >
                <span
                  className={cn(
                    'block rounded-full transition-all duration-300',
                    isCurrent
                      ? 'h-2.5 w-2.5 bg-[var(--accent-sunset)] shadow-[0_0_12px_rgba(255,107,53,0.6)]'
                      : isPast
                        ? 'h-1.5 w-1.5 bg-[var(--text-secondary)]'
                        : 'h-1.5 w-1.5 border border-[var(--text-muted)] bg-transparent',
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-[0.08em] whitespace-nowrap transition-opacity duration-300',
                    isCurrent
                      ? 'text-[var(--accent-sunset)] opacity-100'
                      : 'opacity-0 group-hover:opacity-60 text-[var(--text-secondary)]',
                  )}
                >
                  {beat.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
