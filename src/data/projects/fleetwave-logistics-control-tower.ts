import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'FleetWave - Logistics Control Tower',
    slug: 'fleetwave-logistics-control-tower',
    projectType: 'Concept',
    industry: 'Logistics / Supply Chain',
    timeline: '3 weeks',
    role: 'Operations dashboard and exception management UX',
    scope: [
      'Shipment health command center',
      'Delay risk prioritization',
      'Driver and route visibility',
      'Escalation and incident actions',
    ],
    summary:
      'A logistics command concept that brings shipment status, risks, and actions into one operational surface.',
    tech: ['Next.js', 'Data Visualization', 'Dashboard UX', 'TypeScript'],
    impact: [
      { value: '14 operators', label: 'Operations Interviews' },
      { value: '-27%', label: 'Exception Response Time' },
      { value: '+31%', label: 'On-time Recovery Actions' },
    ],
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Logistics teams reacted late to shipment exceptions because alerts and context lived in separate tools.</p>
      <h3>The Solution</h3>
      <p>I created a control-tower UI with prioritized exceptions and guided resolution actions.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Response time to critical delays improved.</li>
        <li>Escalation handoffs became more structured.</li>
        <li>Teams maintained better route awareness.</li>
      </ul>
    `,
  };
