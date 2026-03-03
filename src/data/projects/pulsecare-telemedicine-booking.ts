import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'PulseCare - Telemedicine Booking Journey',
    slug: 'pulsecare-telemedicine-booking',
    projectType: 'Concept',
    industry: 'HealthTech',
    timeline: '2.5 weeks (rapid concept)',
    role: 'Service flow mapping, UI system design, and booking UX',
    scope: [
      'Symptom-based appointment routing',
      'Doctor slot recommendation engine UX',
      'Medical records pre-fill flow',
      'Post-consultation summary screen',
    ],
    summary:
      'A patient-first telemedicine concept designed to reduce booking confusion and improve appointment completion across mobile devices.',
    tech: ['Next.js', 'Design System', 'Accessibility', 'Conversion UX'],
    impact: [
      { value: '22 users', label: 'Usability Sessions' },
      { value: '-41%', label: 'Booking Drop-off in Tests' },
      { value: '4.7/5', label: 'Booking Clarity Score' },
    ],
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Patients frequently abandon teleconsultation flows when specialty selection, available slots, and mandatory details are spread across too many disconnected screens.</p>
      <h3>The Solution</h3>
      <p>I created a compact booking narrative where each step answers one patient question at a time: "who should I see", "when can I connect", and "what info is needed".</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Booking drop-off decreased by 41% during moderated testing.</li>
        <li>Participants rated flow clarity 4.7/5 after one session.</li>
        <li>Accessible input patterns improved completion for mobile users.</li>
      </ul>
    `,
  };
