import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'AgroLink - Farmer Advisory Portal',
    slug: 'agrolink-farmer-advisory-portal',
    projectType: 'Concept',
    industry: 'AgriTech',
    timeline: '3 weeks',
    role: 'Advisory information architecture and multilingual UX direction',
    scope: [
      'Crop specific guidance journeys',
      'Weather and market snapshots',
      'Issue reporting with image upload',
      'Seasonal planning planner',
    ],
    summary:
      'A farmer support concept that merges weather, advisory, and market insights in one practical interface.',
    tech: ['Next.js', 'Accessibility', 'Localization UX', 'Mobile-first'],
    impact: [
      { value: '26 participants', label: 'Rural User Interviews' },
      { value: '+48%', label: 'Guidance Comprehension' },
      { value: '3 languages', label: 'Content Variants' },
    ],
    images: [
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Farmers needed reliable seasonal advice but information sources were fragmented and hard to trust.</p>
      <h3>The Solution</h3>
      <p>I structured a single portal with local language guidance, risk updates, and action-first modules.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Users understood recommendations faster.</li>
        <li>Navigation remained simple for first-time users.</li>
        <li>Advisory actions were easier to plan.</li>
      </ul>
    `,
  };
