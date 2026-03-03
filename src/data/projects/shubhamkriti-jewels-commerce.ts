import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'Shubhamkriti Jewels - Luxury Commerce Experience',
    slug: 'shubhamkriti-jewels-commerce',
    projectType: 'Client',
    legacySlugs: ['shubham-kritij-portfolio'],
    client: 'Shubhamkriti Jewels',
    industry: 'Luxury Retail / Jewelry',
    timeline: '6 weeks',
    role: 'Product design, frontend architecture, and performance optimization',
    scope: [
      'Commerce UX overhaul',
      'Catalog information architecture',
      'Mobile performance optimization',
      'Conversion-focused product pages',
    ],
    summary:
      'A luxury e-commerce storefront designed to combine premium visual storytelling with mobile-first conversion performance.',
    tech: ['WordPress', 'WooCommerce', 'CRO', 'Performance'],
    impact: [
      { value: '+40%', label: 'Mobile Inquiries' },
      { value: '90+', label: 'PageSpeed' },
      { value: '500+ SKUs', label: 'Catalog Scale' },
    ],
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {
      live: 'https://shubhamkritij.com/',
    },
    details: `
      <h3>The Challenge</h3>
      <p>The brand needed an online presence that felt premium, loaded quickly on mobile networks, and handled a large catalog without making discovery difficult.</p>
      <h3>The Solution</h3>
      <p>I designed a refined commerce interface with optimized media delivery, focused category architecture, and conversion-first product page layouts. The experience was tuned for trust, speed, and easy browsing.</p>
      <h3>The Result</h3>
      <ul>
        <li>Mobile inquiries increased by 40% in the first quarter.</li>
        <li>Achieved 90+ PageSpeed benchmarks on key landing and product pages.</li>
        <li>Enabled stable management for a 500+ SKU product catalog.</li>
      </ul>
    `,
  };
