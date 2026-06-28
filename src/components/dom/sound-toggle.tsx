'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useObservatoryStore } from '@/lib/store';

/**
 * SoundToggle — top-right icon button.
 * Per phase13_visual_design_system.md §5.8.
 *
 * Visual only for v1 — no actual audio playback. Persists state in localStorage
 * via the Zustand store.
 */
export function SoundToggle() {
  const soundEnabled = useObservatoryStore((s) => s.soundEnabled);
  const setSoundEnabled = useObservatoryStore((s) => s.setSoundEnabled);

  return (
    <button
      type="button"
      onClick={() => setSoundEnabled(!soundEnabled)}
      aria-label={soundEnabled ? 'Mute ambient sound' : 'Unmute ambient sound'}
      aria-pressed={soundEnabled}
      title={soundEnabled ? 'Sound on (toggle ambient drone)' : 'Sound off'}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-40 flex h-10 w-10 items-center justify-center
                 rounded-lg bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border-subtle)]
                 text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                 hover:border-[var(--border-strong)] hover:bg-[var(--bg-glass-hover)]
                 transition-all duration-200 cursor-pointer
                 focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]"
    >
      {soundEnabled ? (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
