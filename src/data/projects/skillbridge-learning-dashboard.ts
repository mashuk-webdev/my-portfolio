import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'SkillBridge - Cohort Learning Dashboard',
    slug: 'skillbridge-learning-dashboard',
    projectType: 'Concept',
    industry: 'EdTech',
    timeline: '3 weeks (product concept)',
    role: 'UX architecture, learning analytics design, and interaction prototyping',
    scope: [
      'Learner progress command center',
      'Mentor intervention alerts',
      'Assignment health visualization',
      'Weekly sprint reflection flow',
    ],
    summary:
      'A cohort-based learning platform concept that helps mentors detect learner risk early and guide interventions with actionable progress signals.',
    tech: ['Next.js', 'TypeScript', 'Charts', 'Product Analytics UX'],
    impact: [
      { value: '16 mentors', label: 'Problem Interviews' },
      { value: '29%', label: 'Faster Risk Identification' },
      { value: '8 modules', label: 'Designed Learning Surfaces' },
    ],
    images: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Mentors in cohort programs often discover struggling learners too late because progress data is fragmented across attendance, assignments, and discussion activity.</p>
      <h3>The Solution</h3>
      <p>I designed a unified mentor dashboard with early-warning indicators, assignment health summaries, and guided outreach actions for at-risk learners.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Mentors identified at-risk learners 29% faster in scenario testing.</li>
        <li>Intervention flow reduced navigation steps from 7 to 3.</li>
        <li>Design artifacts are ready for MVP implementation planning.</li>
      </ul>
    `,
  };
