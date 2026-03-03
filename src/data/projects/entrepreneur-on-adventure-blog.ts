import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'Entrepreneur On Adventure - Content and Growth Blog',
    slug: 'entrepreneur-on-adventure-blog',
    projectType: 'Client',
    client: 'Entrepreneur On Adventure',
    industry: 'Personal Brand / Content',
    timeline: '4 weeks',
    role: 'Content strategy, SEO architecture, and lead flow optimization',
    scope: [
      'Content information architecture',
      'Internal link strategy',
      'Lead capture placement',
      'Article template optimization',
    ],
    summary:
      'A content-led website for a personal brand, optimized for discoverability, authority building, and qualified inbound leads.',
    tech: ['WordPress', 'Content Strategy', 'SEO', 'Lead Generation'],
    impact: [
      { value: '+32%', label: 'Organic Sessions' },
      { value: '3.2x', label: 'Lead Conversion' },
      { value: '+41%', label: 'Returning Visitors' },
    ],
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {
      live: 'https://entrepreneuronadventure.in/',
    },
    details: `
      <h3>The Challenge</h3>
      <p>The site needed to move beyond simple publishing and become a growth engine that could attract, educate, and convert the right audience.</p>
      <h3>The Solution</h3>
      <p>I rebuilt the content architecture around intent-driven categories, improved internal linking, and conversion-oriented article layouts with stronger CTA placement.</p>
      <h3>The Result</h3>
      <ul>
        <li>Organic sessions grew by 32% within the first quarter.</li>
        <li>Lead conversion rate improved by 3.2x with refined funnel paths.</li>
        <li>Returning visitors increased by 41%, indicating stronger content engagement.</li>
      </ul>
    `,
  };
