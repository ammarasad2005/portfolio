'use client';

import { motion } from 'framer-motion';
import { useObservatoryStore } from '@/lib/store';

/**
 * HeroText — Beat 1 hero copy. Three lines fade in with stagger.
 * Per phase8_storytelling.md Beat 1.
 *
 * Layout: centered, large Fraunces serif. Mobile 48px, desktop 96px+.
 */
export function HeroText() {
  const hasVisited = useObservatoryStore((s) => s.hasVisited);

  // Returning visitors skip the long fade — they get to "Ready" immediately.
  const baseDelay = hasVisited ? 0.1 : 0.4;

  const lines = [
    'A curious engineer',
    'on a pale blue dot,',
    "charting what's next.",
  ];

  return (
    <div className="flex flex-col items-center text-center px-6 max-w-4xl">
      <div className="space-y-2 md:space-y-3">
        {lines.map((line, i) => (
          <motion.h1
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: baseDelay + i * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display font-medium tracking-[-0.02em] text-[var(--text-primary)] leading-[1.05]
                       text-[40px] sm:text-[56px] md:text-[72px] lg:text-[96px]"
          >
            {line}
          </motion.h1>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: hasVisited ? 0 : 1 }}
        transition={{ duration: 0.8, delay: baseDelay + 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 font-body text-[var(--text-secondary)] text-[15px] md:text-[16px] tracking-[0.04em] uppercase"
      >
        Scroll to travel. ↓
      </motion.p>
    </div>
  );
}
