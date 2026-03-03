import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'ByteBank - Developer Docs Hub',
    slug: 'bytebank-dev-docs-hub',
    projectType: 'Concept',
    industry: 'Developer Tools',
    timeline: '2 weeks',
    role: 'Documentation IA, search UX, and developer onboarding design',
    scope: [
      'Docs hierarchy redesign',
      'Code sample discoverability',
      'Quickstart path optimization',
      'Contextual API reference links',
    ],
    summary:
      'A developer docs concept designed to reduce time-to-first-success for API consumers.',
    tech: ['Next.js', 'Technical Writing UX', 'Search UX', 'Information Architecture'],
    impact: [
      { value: '30 devs', label: 'Pilot Readers' },
      { value: '-35%', label: 'Time to First Call' },
      { value: '+22%', label: 'Quickstart Completion' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Developers could not quickly find the right sequence from setup to first successful API response.</p>
      <h3>The Solution</h3>
      <p>I organized docs into intent-based tracks and added tighter links between concepts and references.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Quickstart completion rates improved in tests.</li>
        <li>Navigation depth reduced for key tasks.</li>
        <li>New developers onboarded with less friction.</li>
      </ul>
    `,
  };
