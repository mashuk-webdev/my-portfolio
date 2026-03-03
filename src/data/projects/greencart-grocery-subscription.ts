import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'GreenCart - Grocery Subscription Flow',
    slug: 'greencart-grocery-subscription',
    projectType: 'Concept',
    industry: 'Quick Commerce',
    timeline: '2 weeks',
    role: 'Subscription UX and reorder automation planning',
    scope: [
      'Smart basket builder',
      'Cadence and frequency controls',
      'Pause and skip flow',
      'Household usage tracking',
    ],
    summary:
      'A grocery subscription concept that improves reorder predictability and reduces cart rebuild fatigue.',
    tech: ['Next.js', 'E-commerce UX', 'Personalization', 'CRO'],
    impact: [
      { value: '13 households', label: 'Journey Testing' },
      { value: '+2.6x', label: 'Subscription Intent' },
      { value: '-36%', label: 'Manual Reorder Steps' },
    ],
    images: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Frequent grocery buyers repeated the same ordering steps every week with no smart assistance.</p>
      <h3>The Solution</h3>
      <p>I developed a subscription flow with adaptive cadence controls and quick household-based edits.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Reorder effort reduced for recurring shoppers.</li>
        <li>Subscription confidence increased in interviews.</li>
        <li>Pause and skip controls reduced cancellation intent.</li>
      </ul>
    `,
  };
