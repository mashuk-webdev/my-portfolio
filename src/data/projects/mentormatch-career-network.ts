import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'MentorMatch - Career Guidance Network',
    slug: 'mentormatch-career-network',
    projectType: 'Concept',
    industry: 'CareerTech',
    timeline: '3 weeks',
    role: 'Matching logic UX and mentorship journey design',
    scope: [
      'Mentor and learner onboarding',
      'Goal-based matching preferences',
      'Session planning workflow',
      'Progress milestone tracking',
    ],
    summary:
      'A mentorship network concept that improves mentor-learner fit and keeps guidance sessions outcome-focused.',
    tech: ['Next.js', 'Matching UX', 'Journey Design', 'TypeScript'],
    impact: [
      { value: '27 users', label: 'Onboarding Tests' },
      { value: '+39%', label: 'Match Satisfaction' },
      { value: '4 milestones', label: 'Guided Progress Model' },
    ],
    images: [
      'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Mentorship platforms connected users but lacked structure to drive measurable progress.</p>
      <h3>The Solution</h3>
      <p>I built a goal-first matching and milestone journey to keep conversations action oriented.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Match quality scores improved in pilot tests.</li>
        <li>Session plans became easier to prepare.</li>
        <li>Learners tracked progress with better clarity.</li>
      </ul>
    `,
  };
