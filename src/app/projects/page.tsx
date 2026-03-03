import type { Metadata } from 'next';
import ProjectsSection from '@/components/sections/projects-section';
import { PageStoryIntro } from '@/components/shared/page-story-intro';

export const metadata: Metadata = {
  title: 'My Projects',
  description:
    'Explore client and concept case studies with clear problem statements, delivery approach, and measurable outcomes.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'My Projects',
    description:
      'A portfolio of client and concept builds with challenge-solution-result storytelling and impact metrics.',
    url: '/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageStoryIntro
        chapter="Projects"
        title="Case Studies With Clear Business Impact"
        description="Each case study covers the challenge, implementation choices, and measurable outcomes across client delivery and product concepts."
      />
      <ProjectsSection showHeading={false} />
    </>
  );
}
