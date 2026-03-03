
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchBlogPosts } from '@/lib/blog-posts';
import { formatDateForDisplay } from '@/lib/date';
import { estimateReadingTimeMinutesFromHtml } from '@/lib/reading-time';
import { AnimatedDiv } from '@/components/shared/animated-div';
import { ArrowRight } from 'lucide-react';
import { PageStoryIntro } from '@/components/shared/page-story-intro';
import { profile } from '@/data/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read articles and tutorials on web development, design, and technology from Mashuk.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog',
    description:
      'Read articles and tutorials on web development, design, and technology from Mashuk.',
    url: '/blog',
    type: 'website',
  },
};

type BlogPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  void searchParams;
  const posts = await fetchBlogPosts();
  const pageSize = 12;
  const displayedPosts = posts.slice(0, pageSize);

  return (
    <>
      <PageStoryIntro
        chapter="Blog"
        title="Thoughts, Experiments, and Build Notes"
        description="Insights from real projects, practical development patterns, and lessons that help transform ideas into scalable products."
      />
      <div className="container mx-auto px-4 pb-28">
        <h2 className="sr-only">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <AnimatedDiv key={post.slug} delay={`${index * 0.1}s`}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute left-4 top-4 z-10 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur">
                    Article
                  </div>
                  <Image
                    src={post.image || 'https://placehold.co/600x400'}
                    alt={post.title}
                    width={600}
                    height={400}
                    data-ai-hint="blog post"
                    className="h-60 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    <span>{formatDateForDisplay(post.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{estimateReadingTimeMinutesFromHtml(post.content)} min read</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    By {post.author ?? profile.name}
                  </p>
                  <h3 className="text-xl font-semibold mt-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="mt-5 flex items-center font-semibold text-primary dark:text-violet-200">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </AnimatedDiv>
          ))}
        </div>
        {posts.length > pageSize && (
          <AnimatedDiv className="mt-12 text-center">
            <Link
              href="/blog/archive"
              className="mt-4 inline-flex items-center rounded-full border border-border/70 px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              Browse All {posts.length} Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </AnimatedDiv>
        )}
      </div>
    </>
  );
}
