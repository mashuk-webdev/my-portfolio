import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchBlogPosts } from '@/lib/blog-posts';
import { formatDateForDisplay } from '@/lib/date';
import { estimateReadingTimeMinutesFromHtml } from '@/lib/reading-time';
import { AnimatedDiv } from '@/components/shared/animated-div';
import { PageStoryIntro } from '@/components/shared/page-story-intro';
import { profile } from '@/data/site';

export const metadata: Metadata = {
  title: 'Blog Archive',
  description: 'Explore the complete archive of published articles by Mashuk.',
  alternates: {
    canonical: '/blog/archive',
  },
  openGraph: {
    title: 'Blog Archive',
    description: 'Explore the complete archive of published articles by Mashuk.',
    url: '/blog/archive',
    type: 'website',
  },
};

export default async function BlogArchivePage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <PageStoryIntro
        chapter="Blog Archive"
        title="Complete Article Library"
        description="Browse all published notes, case-study lessons, and implementation guides in one archive."
      />
      <div className="container mx-auto px-4 pb-28">
        <AnimatedDiv className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </AnimatedDiv>
        <h2 className="sr-only">All Blog Articles</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <AnimatedDiv key={post.slug} delay={`${index * 0.05}s`}>
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
                  <h3 className="mt-2 text-xl font-semibold transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center font-semibold text-primary dark:text-violet-200">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </>
  );
}
