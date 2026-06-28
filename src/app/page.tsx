'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useScroll } from '@/lib/use-scroll';
import { useObservatoryStore } from '@/lib/store';
import { projects } from '@/data/projects';
import { LoadingScreen } from '@/components/dom/loading-screen';
import { ProgressIndicator } from '@/components/dom/progress-indicator';
import { SoundToggle } from '@/components/dom/sound-toggle';
import { CustomCursor } from '@/components/dom/custom-cursor';
import { HeroText } from '@/components/dom/hero-text';
import { IntroPanel } from '@/components/dom/intro-panel';
import { ExplorationCues } from '@/components/dom/exploration-cues';
import { ProjectInfoPanel } from '@/components/dom/project-info-panel';
import { StackMapOverlay } from '@/components/dom/stack-map-overlay';
import { PersonalityPanel } from '@/components/dom/personality-panel';
import { FuturePanel } from '@/components/dom/future-panel';
import { ContactPanel } from '@/components/dom/contact-panel';

// 3D scene — lazy-loaded, SSR off. Falls back to a static gradient while
// the GL context initializes.
const Scene = dynamic(
  () => import('@/components/three/scene').then((m) => m.Scene),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function Home() {
  // Single scroll listener → Zustand store. Mounts once.
  useScroll();
  const reducedMotion = useObservatoryStore((s) => s.reducedMotion);

  // Prevent the page from scrolling during the loading sequence.
  const hasLoaded = useObservatoryStore((s) => s.hasLoaded);
  useEffect(() => {
    if (!hasLoaded) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
  }, [hasLoaded]);

  return (
    <main
      className={`relative bg-observatory text-[var(--text-primary)] min-h-screen vignette-overlay grain-overlay ${
        reducedMotion ? 'scene-static-mode' : ''
      }`}
      aria-label="Ammar Asad — Observatory Portfolio"
    >
      {/* Loading screen overlay (fades out after the calibration sequence) */}
      <LoadingScreen />

      {/* Fixed UI affordances */}
      <SoundToggle />
      <ProgressIndicator />
      <CustomCursor />

      {/* 3D scene — fixed behind the DOM overlays. aria-hidden (decorative). */}
      {!reducedMotion && (
        <div
          className="scene-canvas-wrapper fixed inset-0 z-0"
          aria-hidden="true"
          style={{ pointerEvents: 'none' }}
        >
          <Scene />
        </div>
      )}

      {/* DOM overlays — relative so the document scrolls naturally. */}
      <div className="relative z-10">
        {/* Beat 1 — Arrival */}
        <Section
          beat={1}
          ariaLabel="Beat 1: Arrival at the observatory"
          className="flex items-center justify-center"
        >
          <HeroText />
        </Section>

        {/* Beat 2 — Introduction */}
        <Section
          beat={2}
          ariaLabel="Beat 2: Introduction — who is the observer"
          className="flex items-center"
        >
          <IntroPanel />
        </Section>

        {/* Beat 3 — Exploration */}
        <Section
          beat={3}
          ariaLabel="Beat 3: Exploration — how to use the telescope"
          className="flex items-center justify-center"
        >
          <ExplorationCues />
        </Section>

        {/* Beat 4 — Projects (7 sub-screens, one per project) */}
        {projects.map((project, i) => (
          <Section
            key={project.id}
            beat={4}
            subBeat={i + 1}
            ariaLabel={`Beat 4.${i + 1}: Project — ${project.title}`}
            className="flex items-center"
            dataProjectId={project.id}
          >
            <ProjectInfoPanel project={project} index={i} />
          </Section>
        ))}

        {/* Beat 5 — Technical credibility */}
        <Section
          beat={5}
          ariaLabel="Beat 5: Technical credibility — the engineering stack"
          className="flex items-center"
        >
          <StackMapOverlay />
        </Section>

        {/* Beat 6 — Personality */}
        <Section
          beat={6}
          ariaLabel="Beat 6: Personality — beyond code"
          className="flex items-center"
        >
          <PersonalityPanel />
        </Section>

        {/* Beat 7 — Future ambitions */}
        <Section
          beat={7}
          ariaLabel="Beat 7: Future ambitions — where the telescope turns next"
          className="flex items-center"
        >
          <FuturePanel />
        </Section>

        {/* Beat 8 — Contact (with dawn gradient) */}
        <Section
          beat={8}
          ariaLabel="Beat 8: Contact — how to reach the observer"
          className="flex items-center"
        >
          <ContactPanel />
        </Section>
      </div>

      {/* Screen-reader-only semantic HTML duplicate of all content.
          The 3D canvas is aria-hidden above; this gives AT users the full
          narrative without the visual layer. */}
      <SrOnlyNarrative />
    </main>
  );
}

interface SectionProps {
  beat: number;
  subBeat?: number;
  ariaLabel: string;
  className?: string;
  dataProjectId?: string;
  children: React.ReactNode;
}

function Section({
  beat,
  subBeat,
  ariaLabel,
  className = '',
  dataProjectId,
  children,
}: SectionProps) {
  return (
    <section
      data-beat={beat}
      data-sub-beat={subBeat}
      data-project-id={dataProjectId}
      aria-label={ariaLabel}
      className={`scene-overlay-section h-screen w-full px-0 py-12 md:py-20 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * SrOnlyNarrative — a complete semantic HTML duplicate of all narrative
 * content for screen readers. Visually hidden via .sr-only-stack.
 */
function SrOnlyNarrative() {
  return (
    <div className="sr-only-stack" aria-hidden="false">
      <h1>Muhammad Ammar Asad — Builder in Islamabad</h1>
      <p>Builder in Islamabad, Pakistan. Full-stack web, agentic AI, mobile. CS student at FAST-NUCES Islamabad. Building for communities I'm part of.</p>

      <section aria-label="Beat 1 — Arrival">
        <h2>Arrival</h2>
        <p>A curious engineer at a quiet observatory, charting constellations of work.</p>
        <p>Scroll to enter.</p>
      </section>

      <section aria-label="Beat 2 — Introduction">
        <h2>Introduction</h2>
        <p>
          I&apos;m Muhammad Ammar Asad. I build software for communities I&apos;m
          part of — mostly FAST students in Islamabad, where I&apos;m a 6th-semester
          CS student.
        </p>
        <p>Three pillars: full-stack web, agentic AI, mobile. I ship to figure out what I don&apos;t know yet — every project on this site started as a question I couldn&apos;t answer.</p>
      </section>

      <section aria-label="Beat 3 — Exploration">
        <h2>Exploration</h2>
        <p>Each constellation is a project. Scroll to fly closer. Hover to preview. Click to focus.</p>
        <p>The Builder (Web pillar). The Agent (AI / ML pillar). The Hand (Mobile pillar).</p>
      </section>

      <section aria-label="Beat 4 — Projects">
        <h2>Projects — three pillars, seven projects</h2>
        {projects.map((project, i) => (
          <article key={project.id} aria-label={`Project ${i + 1}: ${project.title}`}>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
            <p>Pillar: {project.pillar}. Status: {project.status}.</p>
            {project.badge && <p>{project.badge}</p>}
            <p>Stack: {project.stackChips.join(', ')}</p>
            <p>{project.body}</p>
            <p>{project.engineeringNote}</p>
            <ul>
              {project.ctas.map((cta) => (
                <li key={cta.label}>
                  <a href={cta.href}>{cta.label}</a>
                </li>
              ))}
            </ul>
            <p>Repository: <a href={project.repoUrl}>{project.repoUrl}</a></p>
          </article>
        ))}
      </section>

      <section aria-label="Beat 5 — Technical credibility">
        <h2>The stack, charted by use</h2>
        <p>
          Bright stars = daily tools. Dim stars = I&apos;ve shipped them, but
          they&apos;re not my default.
        </p>
        <p>Engineering rigor: 2/7 repos tested (Playwright E2E in Exam-Table, scratch tests in hamara-rozgar). 3/7 repos use GitHub Actions for scheduled tasks and background workers, not push-triggered CI/CD. Honest gap: no test/build/deploy pipelines on push or PR yet. Working on it.</p>
      </section>

      <section aria-label="Beat 6 — Personality">
        <h2>Personality — beyond code</h2>
        <p>When I&apos;m not building, I&apos;m listening — or writing.</p>
        <p>I listen to Brian Eno&apos;s Apollo when I code. The ambient structure — long sustained tones, no sharp edges — matches how I want software to feel. Calm, not anxious. Vast, not cluttered.</p>
        <p>I refactored the Drama-Ghar navigation through the Next.js App Router migration. The transitions didn&apos;t survive the first attempt.</p>
        <p>I got interested in agentic AI because I wanted to build systems that could handle real ambiguity — a plumber query in Roman Urdu, a food label with 50 hidden names for sugar. Single-model systems can&apos;t do that. Multi-agent pipelines can.</p>
        <p>Writing is how I find out what I think. If I can&apos;t explain it in a paragraph, I don&apos;t understand it yet.</p>
        <p>Soundtrack: Brian Eno — Apollo.</p>
      </section>

      <section aria-label="Beat 7 — What I want to understand next">
        <h2>What I want to understand next</h2>
        <p>Multi-agent coherence: Whether multi-agent systems stay coherent as they scale, or whether they always collapse into single-agent-with-tools. hamara-rozgar has 4 agents. I don&apos;t know what happens at 20.</p>
        <p>Urdu / Roman Urdu NLP: How to build NLP that doesn&apos;t lean on English-centric tokenizers. Two of my projects parse Roman Urdu. I want to understand what&apos;s lost when you force Urdu through English-shaped pipes.</p>
        <p>Offline-first AI: Whether real agents can run on edge devices without cloud dependencies. hamara-rozgar migrated off Google Cloud on purpose. I want to know if that scales beyond a hackathon.</p>
      </section>

      <section aria-label="Beat 8 — Contact">
        <h2>Thank you for observing.</h2>
        <p>
          If you&apos;d like to talk — about a collaboration, an idea, or just to
          compare notes — I&apos;d be glad to hear from you.
        </p>
        <ul>
          <li><a href="mailto:ammarasad321993@gmail.com">Email: ammarasad321993@gmail.com</a></li>
          <li><a href="https://github.com/ammarasad2005">GitHub: github.com/ammarasad2005</a></li>
          <li><a href="https://linkedin.com/in/muhammad-ammar-asad">LinkedIn: linkedin.com/in/muhammad-ammar-asad</a></li>
          <li><a href="/Ammar_Asad_Resume.pdf">Resume / CV (PDF)</a></li>
        </ul>
        <p>Muhammad Ammar Asad — Full-stack web · Agentic AI · Mobile · Islamabad, Pakistan</p>
      </section>
    </div>
  );
}
