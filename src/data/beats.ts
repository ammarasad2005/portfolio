// 8 beats for the observatory narrative.
// Copy sourced from phase8_storytelling.md.

export interface Beat {
  id: number;
  slug: string;
  label: string;
  /** Hero copy (Fraunces serif). May be multi-line — line breaks preserved. */
  hero?: string;
  /** Subtitle (Inter, secondary). */
  subtitle?: string;
  /** ARIA-friendly chapter name for screen readers. */
  ariaLabel: string;
}

export const beats: Beat[] = [
  {
    id: 1,
    slug: 'beat-1-arrival',
    label: 'Arrival',
    hero: 'A curious engineer\non a pale blue dot,\ncharting what\'s next.',
    subtitle: 'Scroll to travel. ↓',
    ariaLabel: 'Chapter 1: Earth from low orbit',
  },
  {
    id: 2,
    slug: 'beat-2-introduction',
    label: 'Introduction',
    hero: "I'm Ammar Asad. I build software the way I observe the sky — slowly, carefully, and with a notebook nearby.",
    ariaLabel: 'Chapter 2: Introduction — who is the observer',
  },
  {
    id: 3,
    slug: 'beat-3-exploration',
    label: 'Exploration',
    hero: 'Each satellite is a project I launched. Scroll to travel further.',
    ariaLabel: 'Chapter 3: Entering the satellite belt',
  },
  {
    id: 4,
    slug: 'beat-4-projects',
    label: 'Projects',
    hero: 'Seven satellites, three pillars.',
    ariaLabel: 'Chapter 4: Projects in orbit',
  },
  {
    id: 5,
    slug: 'beat-5-technical',
    label: 'Technical',
    hero: 'The stack, charted by use. Bright stars = daily tools. Dim stars = I\'ve shipped them, but they\'re not my default.',
    ariaLabel: 'Chapter 5: Technical credibility — the stack as orbital debris',
  },
  {
    id: 6,
    slug: 'beat-6-personality',
    label: 'Personality',
    hero: 'At the Moon, the noise fades. What remains is what I listen to.',
    ariaLabel: 'Chapter 6: Moon orbit — personality',
  },
  {
    id: 7,
    slug: 'beat-7-future',
    label: 'Future',
    hero: 'Further out, the questions get bigger.',
    ariaLabel: 'Chapter 7: Inner solar system — curiosities',
  },
  {
    id: 8,
    slug: 'beat-8-contact',
    label: 'Contact',
    hero: 'Thank you for traveling with me.',
    ariaLabel: 'Chapter 8: Galaxy — contact',
  },
];

export const TOTAL_BEATS = beats.length;
