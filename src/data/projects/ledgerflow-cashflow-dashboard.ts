import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'LedgerFlow - SME Cashflow Command Center',
    slug: 'ledgerflow-cashflow-dashboard',
    projectType: 'Concept',
    industry: 'Fintech / B2B SaaS',
    timeline: '3 weeks (concept sprint)',
    role: 'Product strategy, UX flows, and frontend prototyping',
    scope: [
      'Financial overview dashboard',
      'Invoice-risk prioritization',
      'Cash runway projection module',
      'Mobile quick actions for founders',
    ],
    summary:
      'A concept dashboard for small businesses to track cash health, prioritize collections, and plan runway decisions with confidence.',
    tech: ['Next.js', 'TypeScript', 'Data Visualization', 'UX Research'],
    impact: [
      { value: '12 interviews', label: 'Founder Research Calls' },
      { value: '5 workflows', label: 'Validated Prototype Flows' },
      { value: '32%', label: 'Faster Task Completion' },
    ],
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>SME founders often switch between spreadsheets, banking apps, and accounting tools, which slows down daily cash decisions and increases financial blind spots.</p>
      <h3>The Solution</h3>
      <p>I designed a single operational view that highlights runway, upcoming payouts, invoice risk, and priority actions. The prototype focuses on speed and clarity for non-finance operators.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Validated 5 high-frequency financial workflows with business owners.</li>
        <li>Reduced completion time by 32% for core "check-and-act" tasks in usability tests.</li>
        <li>Produced a build-ready interaction spec for engineering handoff.</li>
      </ul>
    `,
  };
