import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'Amiro - Auto Parts Commerce Platform',
    slug: 'amiro-ecommerce',
    projectType: 'Client',
    client: 'Amiro',
    industry: 'Automotive E-commerce',
    timeline: '5 weeks',
    role: 'UX architecture, catalog structuring, and conversion optimization',
    scope: [
      'Part Finder redesign',
      'Category and filter logic',
      'Cross-sell placement strategy',
      'Checkout flow simplification',
    ],
    summary:
      'A utility-first catalog and checkout experience for automotive products, optimized for findability and order confidence.',
    tech: ['WordPress', 'E-commerce', 'Catalog UX', 'Conversion'],
    impact: [
      { value: '-25%', label: 'Support Calls' },
      { value: '+15%', label: 'Average Order Value' },
      { value: '1000+ Parts', label: 'Search Coverage' },
    ],
    images: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {
      live: 'https://amiro.co.in/',
    },
    details: `
      <h3>The Challenge</h3>
      <p>Users struggled to find exact-fit parts quickly, which caused abandoned sessions and frequent support calls for basic fitment questions.</p>
      <h3>The Solution</h3>
      <p>I implemented a structured "Part Finder" flow with attribute-based filtering, cleaner product taxonomy, and high-intent cross-sell placements during selection and checkout.</p>
      <h3>The Result</h3>
      <ul>
        <li>Support dependency dropped by 25% with improved self-service finding.</li>
        <li>Average order value increased by 15% via contextual product suggestions.</li>
        <li>Catalog discovery scaled reliably across 1000+ searchable parts.</li>
      </ul>
    `,
  };
