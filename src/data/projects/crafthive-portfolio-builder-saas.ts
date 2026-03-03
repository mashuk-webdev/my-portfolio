import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'CraftHive - Portfolio Builder SaaS',
    slug: 'crafthive-portfolio-builder-saas',
    projectType: 'Concept',
    industry: 'SaaS / No-code',
    timeline: '2 weeks',
    role: 'Onboarding flow, template system UX, and publishing experience',
    scope: [
      'Zero-to-site onboarding',
      'Template style switcher',
      'Section composition controls',
      'Domain connect and publish flow',
    ],
    summary:
      'A no-code concept for creators to launch polished portfolio sites in minutes with guided setup.',
    tech: ['Next.js', 'SaaS UX', 'Onboarding Design', 'Design Tokens'],
    impact: [
      { value: '12 creators', label: 'Onboarding Tests' },
      { value: '-46%', label: 'Setup Drop-off' },
      { value: '7 min', label: 'Time to First Publish' },
    ],
    images: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Most website builders overwhelmed first-time users with too many design choices at once.</p>
      <h3>The Solution</h3>
      <p>I built a guided onboarding sequence with smart defaults and clear publish milestones.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Setup abandonment reduced in first-session tests.</li>
        <li>Users reached publish state faster.</li>
        <li>Template confidence improved for non-designers.</li>
      </ul>
    `,
  };
