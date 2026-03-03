import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AnimatedDiv } from '@/components/shared/animated-div';
import { PageStoryIntro } from '@/components/shared/page-story-intro';

const SeoToolForm = dynamic(
  () => import('@/components/seo-tool-form').then((module) => module.SeoToolForm),
  {
    loading: () => (
      <div className="rounded-xl border border-border/70 bg-card/60 p-6 text-sm text-muted-foreground">
        Loading SEO tool...
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: 'SEO Enhancement Tool',
  description: 'Use our AI-powered tool to analyze your content and get SEO improvement suggestions.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'SEO Enhancement Tool',
    description:
      'Use our AI-powered tool to analyze your content and get SEO improvement suggestions.',
    url: '/tools',
    type: 'website',
  },
};

export default function ToolsPage() {
  return (
    <>
      <PageStoryIntro
        chapter="Tools"
        title="AI-Enhanced SEO Workflow"
        description="Analyze content, target the right keywords, and generate focused optimization suggestions with a practical, production-ready tool."
      />
      <div className="container mx-auto px-4 pb-28">
        <div className="max-w-4xl mx-auto">
          <AnimatedDiv delay="0.1s">
            <SeoToolForm />
          </AnimatedDiv>
        </div>
      </div>
    </>
  );
}
