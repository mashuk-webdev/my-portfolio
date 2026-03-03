import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'CityFix - Civic Reporting App',
    slug: 'cityfix-civic-reporting-app',
    projectType: 'Concept',
    industry: 'GovTech',
    timeline: '3 weeks',
    role: 'Citizen reporting workflow and municipal dashboard UX',
    scope: [
      'Issue report creation flow',
      'Location and photo validation',
      'Department routing logic UX',
      'Public status tracking timeline',
    ],
    summary:
      'A civic issue reporting concept that makes complaint submission and status tracking transparent for citizens.',
    tech: ['Next.js', 'Mobile UX', 'Map Interaction', 'Service Design'],
    impact: [
      { value: '23 citizens', label: 'User Sessions' },
      { value: '-31%', label: 'Invalid Reports' },
      { value: '+2.4x', label: 'Status Page Usage' },
    ],
    images: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Complaint systems lacked clear progress visibility after submission, reducing citizen trust.</p>
      <h3>The Solution</h3>
      <p>I designed transparent status steps and cleaner reporting forms with geo-tagged evidence.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Invalid submissions reduced through guided forms.</li>
        <li>Status tracking usage increased substantially.</li>
        <li>Citizens felt more informed after reporting.</li>
      </ul>
    `,
  };
