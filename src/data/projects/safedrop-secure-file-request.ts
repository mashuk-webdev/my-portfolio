import type { Project } from '@/lib/types';

export const project: Project = {
    title: 'SafeDrop - Secure File Request Flow',
    slug: 'safedrop-secure-file-request',
    projectType: 'Concept',
    industry: 'Security / SaaS',
    timeline: '2 weeks',
    role: 'Security UX and upload journey simplification',
    scope: [
      'Secure request link lifecycle',
      'Upload status and validation states',
      'Access expiry communication',
      'Recipient confidence indicators',
    ],
    summary:
      'A secure upload concept that helps teams request sensitive files with clear trust and expiration controls.',
    tech: ['Next.js', 'Security UX', 'Form Design', 'TypeScript'],
    impact: [
      { value: '12 teams', label: 'Workflow Review Calls' },
      { value: '-33%', label: 'Upload Failure Rate' },
      { value: '4.8/5', label: 'Trust Clarity Score' },
    ],
    images: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    ],
    links: {},
    details: `
      <h3>The Challenge</h3>
      <p>Recipients hesitated to upload sensitive files when request links lacked clarity about security and expiry.</p>
      <h3>The Solution</h3>
      <p>I designed a transparent request experience with visible controls and confidence messaging.</p>
      <h3>Prototype Outcome</h3>
      <ul>
        <li>Upload failures dropped in scenario tests.</li>
        <li>Users trusted link authenticity more.</li>
        <li>Support questions around expiry reduced.</li>
      </ul>
    `,
  };
