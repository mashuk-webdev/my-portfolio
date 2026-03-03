import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'EduPulse - Parent Teacher Dashboard',
    slug: 'edupulse-parent-teacher-dashboard',
    projectType: 'Concept',
    industry: 'EdTech',
    timeline: '2.5 weeks',
    role: 'Learning analytics UX and stakeholder communication flow',
    scope: [
      'Student progress snapshot cards',
      'Teacher intervention alerts',
      'Parent communication timeline',
      'Attendance and assignment insights',
    ],
    summary:
      'An education dashboard concept to align parents and teachers around clear student progress signals.',
    tech: ['Next.js', 'Charts', 'TypeScript', 'Dashboard UX'],
    impact: [
      { value: '24 participants', label: 'User Feedback Sessions' },
      { value: '+44%', label: 'Parent Engagement Intent' },
      { value: '5 views', label: 'Core Insight Panels' },
    ],
    images: [
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Parent communication was reactive and lacked a shared understanding of student progress.</p>
      <h3>The Solution</h3>
      <p>I designed role-specific dashboards and a weekly summary model for aligned decision-making.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Parents reported better clarity about next actions.</li>
        <li>Teachers identified intervention moments faster.</li>
        <li>Core metrics became easier to explain.</li>
      </ul>
    `,
  };
