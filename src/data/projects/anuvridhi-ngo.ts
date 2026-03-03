import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'Anuvridhi - NGO Fundraising and Impact Site',
    slug: 'anuvridhi-ngo',
    projectType: 'Client',
    client: 'Anuvridhi',
    industry: 'Non-profit / Social Impact',
    timeline: '4 weeks',
    role: 'Trust-first UX strategy, donation funnel optimization, and content structuring',
    scope: [
      'Donation flow redesign',
      'Volunteer onboarding path',
      'Impact storytelling sections',
      'Mobile accessibility improvements',
    ],
    summary:
      'A trust-first website built to communicate mission clarity, improve donation completion, and increase volunteer participation.',
    tech: ['WordPress', 'Donation Flow', 'Storytelling', 'Accessibility'],
    impact: [
      { value: '+50%', label: 'Online Donations' },
      { value: '+2.1x', label: 'Volunteer Signups' },
      { value: '-35%', label: 'Donation Drop-offs' },
    ],
    images: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {
      live: 'https://anuvridhi.org/',
    },
    details: `
      <h3>The Challenge</h3>
      <p>The organization needed to communicate credibility clearly and reduce friction in donation and volunteer journeys, especially for mobile users.</p>
      <h3>The Solution</h3>
      <p>I redesigned key pages around social proof, mission clarity, and quick-action sections. Donation steps were simplified and impact communication was made more transparent.</p>
      <h3>The Result</h3>
      <ul>
        <li>Online donations increased by 50% after launch.</li>
        <li>Volunteer signups grew by over 2x with clearer action flows.</li>
        <li>Donation drop-offs were reduced by 35% on mobile-heavy traffic.</li>
      </ul>
    `,
  };
