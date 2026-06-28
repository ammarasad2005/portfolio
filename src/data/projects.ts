// Project data for the observatory portfolio.
// All copy sourced from phase12_project_presentation.md.
// Engineering notes use Phase 5 analysis_cache.json numbers.

export type Pillar = 'web' | 'ai' | 'mobile';
export type ProjectStatus = 'complete' | 'building' | 'early';

export type DeepDiveKey =
  | 'exam-table-blueprint'
  | 'drama-ghar-rubric'
  | 'hamara-rozgar-pipeline'
  | 'glucoguard-pipeline'
  | 'internship-finder-workflow';

export interface ProjectCTA {
  label: string;
  href: string;
  variant?: 'primary' | 'ghost';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  pillar: Pillar;
  status: ProjectStatus;
  badge?: string;
  stackChips: string[];
  body: string;
  engineeringNote: string;
  ctas: ProjectCTA[];
  repoUrl: string;
  deepDive?: DeepDiveKey;
  /** Body type drives which 3D representation is used. */
  bodyType:
    | 'planet'
    | 'binary'
    | 'nebula'
    | 'star'
    | 'satellite'
    | 'comet'
    | 'speck';
}

export const projects: Project[] = [
  {
    id: 'exam-table',
    title: 'FAST Isb Utilities',
    subtitle: 'The unified campus companion for FAST NUCES Islamabad',
    pillar: 'web',
    status: 'complete',
    stackChips: [
      'Next.js 14',
      'React 18',
      'TypeScript',
      'Supabase',
      'Tailwind',
      'Framer Motion',
      'Playwright',
    ],
    body: 'Unified campus companion consolidating 12+ student tools — timetable viewer, exam schedule finder, free-rooms finder, faculty directory, events calendar, lost & found — into one deployed web app. Built for my fellow FAST students.',
    engineeringNote:
      '172 files · 30,392 LoC · 100 commits. Playwright E2E. Hourly timetable refresh via GitHub Actions cron + Vercel Cron, persisted to Supabase (PostgreSQL), consumed by typed Next.js server components.',
    ctas: [
      {
        label: 'Live Demo',
        href: 'https://fast-nuces.vercel.app/',
        variant: 'primary',
      },
      {
        label: 'Source',
        href: 'https://github.com/ammarasad2005/Exam-Table',
        variant: 'ghost',
      },
    ],
    repoUrl: 'https://github.com/ammarasad2005/Exam-Table',
    deepDive: 'exam-table-blueprint',
    bodyType: 'planet',
  },
  {
    id: 'drama-ghar',
    title: 'DramaGhar',
    subtitle: 'A full-stack Pakistani drama tracking & streaming platform',
    pillar: 'web',
    status: 'complete',
    stackChips: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'MongoDB Atlas',
      'Supabase',
      'Tailwind',
      'Framer Motion',
      'Radix/shadcn',
      'Zod',
      'React Hook Form',
    ],
    body: 'Built with Hanzlah Ch for a Web Programming course. Catalogues 200+ Pakistani dramas with embedded streaming, watch history, per-episode analytics, and a live Electronic Program Guide (EPG) grid. MongoDB holds the catalogue, Supabase handles auth, RBAC middleware in Next.js gates the streaming routes, password encryption + session management tie it together.',
    engineeringNote:
      '101 files · 6,773 LoC · 32 commits · 2 contributors · Next.js 15 + React 19',
    ctas: [
      {
        label: 'Live Demo',
        href: 'https://drama-ghar.vercel.app',
        variant: 'primary',
      },
      {
        label: 'Source',
        href: 'https://github.com/ammarasad2005/Drama-Ghar',
        variant: 'ghost',
      },
    ],
    repoUrl: 'https://github.com/ammarasad2005/Drama-Ghar',
    deepDive: 'drama-ghar-rubric',
    bodyType: 'binary',
  },
  {
    id: 'hamara-rozgar',
    title: 'Hamara-Rozgar',
    subtitle: "Agentic AI marketplace orchestrator for Pakistan's informal economy",
    pillar: 'ai',
    status: 'building',
    badge: '🛠️ Building Now — actively iterating, daily scraped business updates',
    stackChips: [
      'React 19',
      'Vite',
      'Firebase',
      'Capacitor (Android APK)',
      'Python + Playwright scraper',
      'OSM Nominatim',
      'Supabase',
      'Ollama',
      'Groq',
      'GitHub Models',
    ],
    body: "Built for the Google Antigravity Hackathon. Plumbers, electricians, tutors, AC technicians, beauticians, mechanics — find them through natural language in Urdu, Roman Urdu, or English. Haversine distance matching, OSM Nominatim geocoding, surge-adjusted pricing (base rate + distance cost + urgency surcharge + high-demand surge − 10% loyalty discount), graceful degradation from Supabase to localStorage when writes fail.",
    engineeringNote:
      'Migrated off Google Cloud to run fully offline with open-source alternatives. Multi-agent cooperative pipeline: IntentAgent → DiscoveryAgent → PricingAgent → BookingAgent. Android APK shipped. GitHub Actions runs the Maps scraper every 6 hours. 100 commits of active iteration.',
    ctas: [
      {
        label: 'Source',
        href: 'https://github.com/ammarasad2005/hamara-rozgar',
        variant: 'ghost',
      },
      {
        label: 'APK download',
        href: 'https://github.com/ammarasad2005/hamara-rozgar/raw/main/Hamara_Rozgar.apk',
        variant: 'primary',
      },
    ],
    repoUrl: 'https://github.com/ammarasad2005/hamara-rozgar',
    deepDive: 'hamara-rozgar-pipeline',
    bodyType: 'nebula',
  },
  {
    id: 'glucoguard-plus',
    title: 'GlucoGuard+',
    subtitle: 'Apne khaane ka guard banayein. Awaaz mein. Roman Urdu mein.',
    pillar: 'ai',
    status: 'complete',
    stackChips: [
      'Python',
      'Streamlit',
      'OpenAI gpt-4o-mini (vision + reasoning)',
      'gpt-4o-search-preview',
      'gpt-4o-mini-tts',
      'Multi-provider fallback (GLM, Groq, Gemini, edge-tts)',
    ],
    body: "Built for the National AI Hackathon at FAST NUCES Islamabad. Snap a photo of any packaged food label — get a personalized verdict in Roman Urdu, spoken aloud for the 40% of Pakistan's 33M diabetics who can't read.",
    engineeringNote:
      '4-model pipeline (Vision → Reasoning → Search → TTS) with multi-provider fallback. Curated knowledge base: 50+ hidden sugar aliases, 10 allergen categories, WHO daily limits. Searches real Pakistani stores (Naheed, Chase Up, Carrefour, Imtiaz, Al-Fatah, Daraz).',
    ctas: [
      {
        label: 'Source',
        href: 'https://github.com/ammarasad2005/glucoguard-plus',
        variant: 'ghost',
      },
    ],
    repoUrl: 'https://github.com/ammarasad2005/glucoguard-plus',
    deepDive: 'glucoguard-pipeline',
    bodyType: 'star',
  },
  {
    id: 'internship-finder',
    title: 'Internship-Finder',
    subtitle: 'An internship discovery platform — currently in active development.',
    pillar: 'ai',
    status: 'building',
    badge: '🛠️ Building Now — Phase 18 production bootstrap',
    stackChips: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase',
      'Zod',
      'React Hook Form',
    ],
    body: 'Not just code — a dev workflow. 21+ phase architecture docs, AGENTS.md, FIRST_RUN_POSTMORTEM_TEMPLATE.md, feature-based architecture (features/, lib/, mocks/, scripts/), proper Supabase migrations. Currently in Phase 18: production bootstrap.',
    engineeringNote:
      '158 files · 5,610 LoC · 53 commits. Phase 17 added a feedback learning loop: aggregates explicit user signals (saved / applied / rejected) into a feedback profile, then applies deterministic scoring adjustments to re-rank matches (+15 for previously-saved companies, −50 for previously-rejected) and enriches the Gemini query-generation prompt with feedback context. GitHub Actions runs a background matching worker via repository_dispatch.',
    ctas: [
      {
        label: 'Source',
        href: 'https://github.com/ammarasad2005/Internship-Finder',
        variant: 'ghost',
      },
      {
        label: 'Commit history',
        href: 'https://github.com/ammarasad2005/Internship-Finder/commits/main',
        variant: 'ghost',
      },
    ],
    repoUrl: 'https://github.com/ammarasad2005/Internship-Finder',
    deepDive: 'internship-finder-workflow',
    bodyType: 'satellite',
  },
  {
    id: 'gcr-resources-fetch',
    title: 'GCR Fetch',
    subtitle:
      'Bulk-download every resource from a Google Classroom course as a single ZIP.',
    pillar: 'web',
    status: 'complete',
    stackChips: [
      'Chrome Extension (MV3)',
      'JavaScript',
      'Node.js',
      'OAuth 2.0',
      'Google Classroom API',
      'Vercel Serverless',
    ],
    body: 'Exam season pain point: 20–25 minutes of manual clicking per course. GCR Fetch bulk-downloads every Google Classroom resource as one organized ZIP via hybrid DOM + REST API detection. OAuth 2.0 token exchange runs through a serverless Vercel backend — client secret never touches the extension, API calls restricted to an HTTPS-only Google-domain allowlist, filenames sanitized.',
    engineeringNote: '3 stars — my most-adopted open-source tool.',
    ctas: [
      {
        label: 'Source',
        href: 'https://github.com/ammarasad2005/gcr-resources-fetch',
        variant: 'ghost',
      },
      {
        label: 'Install',
        href: 'https://github.com/ammarasad2005/gcr-resources-fetch',
        variant: 'primary',
      },
    ],
    repoUrl: 'https://github.com/ammarasad2005/gcr-resources-fetch',
    bodyType: 'comet',
  },
  {
    id: 'wayfinder',
    title: 'WayFinder',
    subtitle: 'Location-search companion that fixes weak in-app address indexing in ride-hailing apps.',
    pillar: 'mobile',
    status: 'complete',
    stackChips: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'NextAuth',
      'Google Maps API',
    ],
    body: 'Ride-hailing apps like Yango have weak in-app address indexing — users end up manually pin-dropping. WayFinder fixes that: users verify their destination via Google Maps intelligence, then hand off directly to Yango for the ride. NextAuth sessions, Next.js App Router UI tuned for fast mobile lookup.',
    engineeringNote:
      'Deployed at wayfinder-app-gray.vercel.app. Eliminates manual pin-dropping inside Yango with verified destination info.',
    ctas: [
      {
        label: 'Live Demo',
        href: 'https://wayfinder-app-gray.vercel.app',
        variant: 'primary',
      },
      {
        label: 'Source',
        href: 'https://github.com/ammarasad2005/WayFinder',
        variant: 'ghost',
      },
    ],
    repoUrl: 'https://github.com/ammarasad2005/WayFinder',
    bodyType: 'speck',
  },
];

export const projectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

/** Visual scene position per project — gentle arc through 3D space. */
export const projectPositions: Record<string, [number, number, number]> = {
  'exam-table': [-6, 0.5, -4],
  'drama-ghar': [-2, -0.5, -2],
  'hamara-rozgar': [2, 0.8, -1],
  'glucoguard-plus': [6, -0.3, -3],
  'internship-finder': [4, 2.2, -6],
  'gcr-resources-fetch': [-4, -1.4, -8],
  wayfinder: [0, 3.5, -12],
};
