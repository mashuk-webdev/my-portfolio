import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'TravelCraft - Story-Led Trip Builder',
    slug: 'travelcraft-trip-builder',
    projectType: 'Concept',
    industry: 'Travel / Consumer App',
    timeline: '2 weeks (interaction concept)',
    role: 'Experience concepting, itinerary UX, and animation direction',
    scope: [
      'Narrative onboarding',
      'Preference-to-itinerary generation flow',
      'Budget and route optimizer UI',
      'Shareable journey summary cards',
    ],
    summary:
      'A storytelling-driven trip planning concept that converts vague travel intent into a structured, budget-aware multi-day itinerary.',
    tech: ['Next.js', 'Framer Motion', 'UX Writing', 'Interaction Design'],
    impact: [
      { value: '18 travelers', label: 'Concept Feedback Calls' },
      { value: '3x', label: 'Itinerary Save Intent' },
      { value: '91%', label: 'Flow Completion in Tests' },
    ],
    images: [
      'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Most travel planners overwhelm users with too many form fields upfront, which leads to shallow plans or early exits from the planning flow.</p>
      <h3>The Solution</h3>
      <p>I built a guided, story-like planner that asks lightweight preference prompts and progressively reveals route, budget, and day plans with contextual visuals.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>91% of testers completed an end-to-end itinerary in one sitting.</li>
        <li>Saved-itinerary intent increased 3x compared to baseline wireframes.</li>
        <li>Introduced a reusable motion pattern library for storytelling transitions.</li>
      </ul>
    `,
  };
