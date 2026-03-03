import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'PantryPal - Meal Planning Assistant',
    slug: 'pantrypal-meal-planning-assistant',
    projectType: 'Concept',
    industry: 'Consumer App',
    timeline: '2 weeks',
    role: 'Meal flow design and personalization logic prototyping',
    scope: [
      'Inventory-based meal suggestions',
      'Weekly meal planner workflow',
      'Auto-generated shopping list',
      'Nutritional balance indicators',
    ],
    summary:
      'A meal planning concept that turns pantry inventory into practical weekly plans and shopping actions.',
    tech: ['Next.js', 'Recommendation UX', 'Framer Motion', 'Mobile-first'],
    impact: [
      { value: '16 homes', label: 'Concept Interviews' },
      { value: '+33%', label: 'Planner Reuse Intent' },
      { value: '-24%', label: 'Food Waste Estimate' },
    ],
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Families planned meals inconsistently and often bought duplicate ingredients every week.</p>
      <h3>The Solution</h3>
      <p>I created a pantry-aware planner with quick substitutions and one-tap shopping conversion.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Planning consistency improved in weekly simulations.</li>
        <li>Users preferred inventory-aware suggestions.</li>
        <li>Shopping prep became faster and clearer.</li>
      </ul>
    `,
  };
