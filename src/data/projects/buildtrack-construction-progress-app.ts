import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'BuildTrack - Construction Progress App',
    slug: 'buildtrack-construction-progress-app',
    projectType: 'Concept',
    industry: 'Construction / Field Ops',
    timeline: '3 weeks',
    role: 'Field reporting UX and project dashboard prototyping',
    scope: [
      'Daily site progress logging',
      'Delay and risk reporting',
      'Photo evidence timeline',
      'Client ready progress snapshots',
    ],
    summary:
      'A field-first construction concept that connects on-site reporting with executive level progress visibility.',
    tech: ['Next.js', 'Mobile UX', 'Data Visualization', 'Offline-first Patterns'],
    impact: [
      { value: '9 PMs', label: 'Workflow Interviews' },
      { value: '-31%', label: 'Status Update Lag' },
      { value: '2x', label: 'Reporting Consistency' },
    ],
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Construction updates were spread across chats, calls, and spreadsheets, making project tracking unreliable.</p>
      <h3>The Solution</h3>
      <p>I created a mobile-first reporting model with structured logs, risk flags, and visual progress snapshots.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Update lag reduced by 31% in pilot simulation.</li>
        <li>Teams used a consistent reporting structure.</li>
        <li>Stakeholder communication became clearer.</li>
      </ul>
    `,
  };
