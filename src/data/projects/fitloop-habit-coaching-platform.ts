import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'FitLoop - Habit Coaching Platform',
    slug: 'fitloop-habit-coaching-platform',
    projectType: 'Concept',
    industry: 'Health and Wellness',
    timeline: '2 weeks',
    role: 'Habit loop design and retention focused interaction patterns',
    scope: [
      'Daily action streak design',
      'Coach check-in workflow',
      'Goal consistency dashboard',
      'Drop-off recovery nudges',
    ],
    summary:
      'A habit coaching concept that blends accountability features with lightweight daily actions.',
    tech: ['Next.js', 'Behavior Design', 'Framer Motion', 'Gamification UX'],
    impact: [
      { value: '17 testers', label: 'Concept Trials' },
      { value: '+29%', label: 'Week 2 Retention Intent' },
      { value: '4 loops', label: 'Habit Reinforcement Flows' },
    ],
    images: [
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Users started wellness routines but dropped off quickly when progress feedback felt weak.</p>
      <h3>The Solution</h3>
      <p>I built a compact daily loop with visible progress, coach nudges, and recovery paths after missed days.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Retention intent increased in second-week scenarios.</li>
        <li>Daily actions felt easier to complete.</li>
        <li>Coaches had clearer intervention triggers.</li>
      </ul>
    `,
  };
