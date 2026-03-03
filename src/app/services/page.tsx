import type { Metadata } from 'next';
import ServicesSection from '@/components/sections/services-section';
import { PageStoryIntro } from '@/components/shared/page-story-intro';

export const metadata: Metadata = {
  title: 'My Services',
  description:
    'Explore conversion-focused services by Mashuk: full-stack development, UI/UX strategy, SEO/performance, e-commerce execution, CMS builds, messaging systems, AI integration, retainers, and analytics/CRO.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'My Services',
    description:
      'Conversion-focused product and growth services including development, UX strategy, performance optimization, AI workflows, retainers, and analytics/CRO systems.',
    url: '/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageStoryIntro
        chapter="Services"
        title="Services Built for Measurable Outcomes"
        description="Each service is structured with clear scope, timeline, deliverables, and expected impact so you know exactly what gets delivered and why it matters."
      />
      <ServicesSection showHeading={false} />
    </>
  );
}
