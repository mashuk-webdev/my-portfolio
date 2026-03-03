import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'MedQueue - Clinic Appointment Suite',
    slug: 'medqueue-clinic-appointment-suite',
    projectType: 'Concept',
    industry: 'HealthTech',
    timeline: '2.5 weeks',
    role: 'Patient journey mapping and appointment flow UX',
    scope: [
      'Doctor discovery and slot selection',
      'Symptoms based booking path',
      'Appointment reminders UX',
      'Digital queue dashboard',
    ],
    summary:
      'A clinic-first appointment suite concept that reduces missed appointments and improves patient booking speed.',
    tech: ['Next.js', 'Accessibility', 'Design System', 'Form UX'],
    impact: [
      { value: '19 users', label: 'Patient Testers' },
      { value: '-34%', label: 'Booking Time' },
      { value: '92%', label: 'Flow Completion' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Patients abandoned booking due to too many form steps and unclear slot availability.</p>
      <h3>The Solution</h3>
      <p>I built a compact stepper flow with progressive disclosure and clearer confirmation states.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Booking time dropped by 34% in usability tests.</li>
        <li>Completion increased across mobile users.</li>
        <li>Clinics received cleaner appointment data format.</li>
      </ul>
    `,
  };
