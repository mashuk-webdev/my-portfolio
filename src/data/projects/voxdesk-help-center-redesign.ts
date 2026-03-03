import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'VoxDesk - Help Center Redesign',
    slug: 'voxdesk-help-center-redesign',
    projectType: 'Concept',
    industry: 'SaaS Support',
    timeline: '2 weeks',
    role: 'Self-serve support IA and search-first help UX',
    scope: [
      'Knowledge base restructuring',
      'Intent-based article discovery',
      'Escalation path clarity',
      'Support ticket deflection flow',
    ],
    summary:
      'A support hub concept that improves self-service resolution and reduces repetitive ticket volume.',
    tech: ['Next.js', 'Search UX', 'Content Design', 'Support Ops'],
    impact: [
      { value: '120 articles', label: 'Content Audit' },
      { value: '+26%', label: 'Self-Serve Resolution' },
      { value: '-18%', label: 'Ticket Volume Projection' },
    ],
    images: [
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Users could not find the right support article quickly and escalated too early to human support.</p>
      <h3>The Solution</h3>
      <p>I reorganized content around intent and improved search relevance cues across help journeys.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Self-serve resolution intent rose in tests.</li>
        <li>Escalation paths became easier to understand.</li>
        <li>Article discoverability improved significantly.</li>
      </ul>
    `,
  };
