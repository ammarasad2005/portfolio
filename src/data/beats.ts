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
    hero: 'A curious engineer\nat a quiet observatory,\ncharting constellations of work.',
    subtitle: 'Scroll to enter. ↓',
    ariaLabel: 'Chapter 1: Arrival at the observatory',
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
    hero: 'Each constellation is a project. Scroll to fly closer. Hover to preview. Click to focus.',
    ariaLabel: 'Chapter 3: Exploration — how to use the telescope',
  },
  {
    id: 4,
    slug: 'beat-4-projects',
    label: 'Projects',
    hero: 'Constellations of work — three pillars, seven projects.',
    ariaLabel: 'Chapter 4: Projects — constellations of work',
  },
  {
    id: 5,
    slug: 'beat-5-technical',
    label: 'Technical',
    hero: 'The stack, charted by use. Bright stars = daily tools. Dim stars = I\'ve shipped them, but they\'re not my default.',
    ariaLabel: 'Chapter 5: Technical credibility — the engineering stack',
  },
  {
    id: 6,
    slug: 'beat-6-personality',
    label: 'Personality',
    hero: "When I'm not building, I'm listening — or writing.",
    ariaLabel: 'Chapter 6: Personality — beyond code',
  },
  {
    id: 7,
    slug: 'beat-7-future',
    label: 'Future',
    hero: 'What I want to build next.',
    ariaLabel: 'Chapter 7: Future ambitions',
  },
  {
    id: 8,
    slug: 'beat-8-contact',
    label: 'Contact',
    hero: 'Thank you for observing.',
    ariaLabel: 'Chapter 8: Contact — how to reach the observer',
  },
];

export const TOTAL_BEATS = beats.length;
