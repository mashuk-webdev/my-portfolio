import AboutSection from '@/components/sections/about-section';
import { PageStoryIntro } from '@/components/shared/page-story-intro';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Learn about Mashuk\'s approach to building fast, conversion-ready digital products with clear strategy, engineering quality, and measurable outcomes.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Me',
    description:
      'Discover how Mashuk designs and develops high-performing web products with a practical, outcome-first delivery process.',
    url: '/about',
    type: 'profile',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageStoryIntro
        chapter="About"
        title="Product Thinking + Engineering Execution"
        description="A practical look at my approach, capabilities, and delivery process for building digital products that perform, convert, and scale."
      />
      <AboutSection showHeading={false} />
    </>
  );
}
