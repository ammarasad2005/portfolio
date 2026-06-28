'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — a 12px circle that follows the mouse with a slight lag.
 * Per final-polish spec.
 *
 * Desktop pointer-fine only. Hidden on touch devices.
 * Scales to 28px when hovering interactive elements (a, button, [role=button]).
 */

// Lazy initializer so we never call setState synchronously inside an effect —
// the fine-pointer check runs once on the client during the first render.
function detectFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled] = useState(detectFinePointer);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="active"]',
        );
        setActive(!!interactive);
      }
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.18;
      dotY += (mouseY - dotY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className={`cursor-circle ${active ? 'cursor-active' : ''}`}
      aria-hidden="true"
    />
  );
}
