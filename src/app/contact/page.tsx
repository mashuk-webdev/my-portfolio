import type { Metadata } from 'next';
import ContactSection from '@/components/sections/contact-section';
import { PageStoryIntro } from '@/components/shared/page-story-intro';

export const metadata: Metadata = {
  title: 'Contact Me',
  description:
    'Start a project conversation with Mashuk. Share your goals and get a clear execution plan for design, development, and launch.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Me',
    description:
      'Share your project scope and goals to receive a practical roadmap for building and launching with confidence.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageStoryIntro
        chapter="Contact"
        title="Let's Plan Your Next Digital Build"
        description="Tell me what you need, what timeline you have, and what outcome you want. I'll help you map the fastest path to a reliable launch."
      />
      <ContactSection showHeading={false} />
    </>
  );
}
