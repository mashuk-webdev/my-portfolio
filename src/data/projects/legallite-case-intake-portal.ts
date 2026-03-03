import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'LegalLite - Case Intake Portal',
    slug: 'legallite-case-intake-portal',
    projectType: 'Concept',
    industry: 'LegalTech',
    timeline: '2 weeks',
    role: 'Intake flow architecture and document upload UX',
    scope: [
      'Guided legal query intake',
      'Evidence upload and validation',
      'Consultation scheduling',
      'Client status tracker',
    ],
    summary:
      'A legal intake portal concept to simplify first contact, collect useful case context, and reduce manual back-and-forth.',
    tech: ['Next.js', 'TypeScript', 'Workflow UX', 'Security UX'],
    impact: [
      { value: '11 lawyers', label: 'Problem Interviews' },
      { value: '-42%', label: 'Intake Clarification Calls' },
      { value: '3.8x', label: 'Structured Submissions' },
    ],
    images: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Law firms received incomplete case requests and spent time on repetitive clarification calls.</p>
      <h3>The Solution</h3>
      <p>I designed a step-by-step intake wizard with contextual prompts and better document submission patterns.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Clarification calls dropped significantly in testing scenarios.</li>
        <li>Case summaries became easier to triage.</li>
        <li>Submission confidence improved for first-time users.</li>
      </ul>
    `,
  };
