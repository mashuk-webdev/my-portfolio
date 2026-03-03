import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'RentPilot - Property Management Panel',
    slug: 'rentpilot-property-management',
    projectType: 'Concept',
    industry: 'PropTech',
    timeline: '3 weeks',
    role: 'Operations dashboard design and tenant communication workflow',
    scope: [
      'Rent collection dashboard',
      'Maintenance ticket routing',
      'Lease renewal timeline',
      'Owner level reporting',
    ],
    summary:
      'A property operations concept for faster maintenance handling and cleaner lease cycle visibility.',
    tech: ['Next.js', 'Dashboard UX', 'TypeScript', 'Workflow Design'],
    impact: [
      { value: '8 managers', label: 'Operational Interviews' },
      { value: '-33%', label: 'Ticket Response Delay' },
      { value: '4 panels', label: 'Core Ops Surfaces' },
    ],
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Property managers tracked rent, maintenance, and renewals in disconnected tools.</p>
      <h3>The Solution</h3>
      <p>I unified recurring operations into one panel with clear priorities and response SLAs.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Maintenance triage became faster in scenario tests.</li>
        <li>Renewal risk visibility improved for managers.</li>
        <li>Owner reporting became easier to generate.</li>
      </ul>
    `,
  };
