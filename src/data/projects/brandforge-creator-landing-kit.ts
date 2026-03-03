import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'BrandForge - Creator Landing Kit',
    slug: 'brandforge-creator-landing-kit',
    projectType: 'Concept',
    industry: 'Creator Economy',
    timeline: '2 weeks (concept sprint)',
    role: 'Messaging architecture, CTA strategy, and UI prototyping',
    scope: [
      'Hero experimentation matrix',
      'Trust and proof section flow',
      'Reusable landing block system',
      'Lead capture optimization',
    ],
    summary:
      'A conversion-first landing kit for creators to launch offers quickly with strong narrative structure and clear calls to action.',
    tech: ['Next.js', 'CRO', 'UX Writing', 'Component Design'],
    impact: [
      { value: '14 creators', label: 'Interview Inputs' },
      { value: '+37%', label: 'Mock Signup Lift' },
      { value: '3 templates', label: 'Reusable Layouts' },
    ],
    images: [
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Most creator sites looked good but did not guide visitors toward one clear action.</p>
      <h3>The Solution</h3>
      <p>I designed a modular landing system with narrative flow, social proof placement, and strong conversion blocks.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Signup intent improved by 37% in concept tests.</li>
        <li>Templates reduced launch time for new pages.</li>
        <li>Content hierarchy improved message clarity.</li>
      </ul>
    `,
  };
