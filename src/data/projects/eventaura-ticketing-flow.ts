import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'EventAura - Ticketing and Seat Flow',
    slug: 'eventaura-ticketing-flow',
    projectType: 'Concept',
    industry: 'Events / Entertainment',
    timeline: '2 weeks',
    role: 'Purchase flow UX and seat selection interaction design',
    scope: [
      'Seat map interaction model',
      'Add-on and upsell stage',
      'Checkout error prevention',
      'Mobile wallet ticket delivery',
    ],
    summary:
      'A ticketing concept focused on smoother seat selection and lower drop-off in final checkout steps.',
    tech: ['Next.js', 'Framer Motion', 'Conversion UX', 'Interaction Design'],
    impact: [
      { value: '20 testers', label: 'Booking Simulations' },
      { value: '-27%', label: 'Payment Step Exits' },
      { value: '+19%', label: 'Add-on Attach Rate' },
    ],
    images: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Ticket buyers dropped at checkout due to confusing seat and fee breakdown interfaces.</p>
      <h3>The Solution</h3>
      <p>I simplified seat decisions with better map controls and transparent pricing summaries.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Checkout exits decreased in testing flows.</li>
        <li>Seat selection confidence improved.</li>
        <li>Upsell placement felt less intrusive.</li>
      </ul>
    `,
  };
