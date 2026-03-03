import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'TaxMate - Filing Assistant Experience',
    slug: 'taxmate-filing-assistant',
    projectType: 'Concept',
    industry: 'Fintech / Tax',
    timeline: '2.5 weeks',
    role: 'Question flow simplification and trust interface design',
    scope: [
      'Guided tax profiling journey',
      'Document readiness checklist',
      'Deduction recommendation UX',
      'Return submission confirmation flow',
    ],
    summary:
      'A filing assistant concept that helps users complete returns with fewer errors and less anxiety.',
    tech: ['Next.js', 'Form UX', 'TypeScript', 'Financial Content Design'],
    impact: [
      { value: '18 users', label: 'Guided Filing Tests' },
      { value: '-39%', label: 'Input Error Rate' },
      { value: '4.6/5', label: 'Trust Perception' },
    ],
    images: [
      'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Users found tax interfaces dense and often missed important data before submission.</p>
      <h3>The Solution</h3>
      <p>I introduced progressive questions, readiness checks, and confidence indicators before final filing.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Error rate reduced in guided simulations.</li>
        <li>Completion confidence increased across user groups.</li>
        <li>Critical missing fields were caught earlier.</li>
      </ul>
    `,
  };
