import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'LoanLens - Credit Score Coach',
    slug: 'loanlens-credit-score-coach',
    projectType: 'Concept',
    industry: 'Fintech',
    timeline: '3 weeks',
    role: 'Financial behavior UX and credit education flow design',
    scope: [
      'Credit score simulation cards',
      'Actionable risk breakdown',
      'Goal based financial plans',
      'Progress history visualization',
    ],
    summary:
      'A credit coaching concept that turns complex scoring data into clear weekly improvement actions.',
    tech: ['Next.js', 'TypeScript', 'Data Visualization', 'Fintech UX'],
    impact: [
      { value: '15 users', label: 'Prototype Interviews' },
      { value: '+51%', label: 'Action Clarity Score' },
      { value: '6 journeys', label: 'Scenario Simulations' },
    ],
    images: [
      'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>People understood their score value but not what exact actions could improve it over time.</p>
      <h3>The Solution</h3>
      <p>I designed guided score simulations with personalized action plans and progress checkpoints.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Users understood cause-and-effect of credit actions better.</li>
        <li>Financial guidance felt less intimidating.</li>
        <li>Weekly planning behavior increased in tests.</li>
      </ul>
    `,
  };
