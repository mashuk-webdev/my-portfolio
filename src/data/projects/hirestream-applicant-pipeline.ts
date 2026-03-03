import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'HireStream - Applicant Pipeline Workspace',
    slug: 'hirestream-applicant-pipeline',
    projectType: 'Concept',
    industry: 'HRTech',
    timeline: '3 weeks',
    role: 'Pipeline UX, interviewer workflow, and hiring analytics interface',
    scope: [
      'Candidate stage board redesign',
      'Interview feedback capture model',
      'Hiring velocity metrics',
      'Decision sync workflow',
    ],
    summary:
      'A recruiting workspace concept to reduce hiring delays and improve collaborative decision quality.',
    tech: ['Next.js', 'Dashboard UX', 'Workflow Design', 'TypeScript'],
    impact: [
      { value: '10 recruiters', label: 'Stakeholder Interviews' },
      { value: '-29%', label: 'Stage Transition Delay' },
      { value: '+34%', label: 'Feedback Completion' },
    ],
    images: [
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Recruiting teams lost momentum due to scattered feedback and unclear candidate stage ownership.</p>
      <h3>The Solution</h3>
      <p>I designed a shared pipeline workspace with structured feedback and clear stage accountability.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Transition delays reduced in process simulation.</li>
        <li>Interview feedback completion improved.</li>
        <li>Teams reached decisions with higher confidence.</li>
      </ul>
    `,
  };
