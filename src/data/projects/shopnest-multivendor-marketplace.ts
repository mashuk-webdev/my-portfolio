import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'ShopNest - Multi Vendor Marketplace Experience',
    slug: 'shopnest-multivendor-marketplace',
    projectType: 'Concept',
    industry: 'E-commerce / Marketplace',
    timeline: '3 weeks (concept sprint)',
    role: 'Marketplace UX, trust model design, and checkout flow prototyping',
    scope: [
      'Vendor profile and trust signals',
      'Category and filter architecture',
      'Cart flow for multi-vendor orders',
      'Returns and dispute journey',
    ],
    summary:
      'A marketplace concept focused on trust, vendor discoverability, and low-friction multi-vendor checkout.',
    tech: ['Next.js', 'TypeScript', 'E-commerce UX', 'Information Architecture'],
    impact: [
      { value: '21 sessions', label: 'Buyer Testing Runs' },
      { value: '-28%', label: 'Checkout Confusion' },
      { value: '4 flows', label: 'Validated Journeys' },
    ],
    images: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Shoppers needed confidence when purchasing from multiple unknown vendors in one cart.</p>
      <h3>The Solution</h3>
      <p>I introduced vendor trust layers, standardized policies, and a clearer order summary structure.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Confusion in checkout tests dropped by 28%.</li>
        <li>Buyers rated vendor trust signals higher.</li>
        <li>Concept flow supported multi-vendor operations.</li>
      </ul>
    `,
  };
