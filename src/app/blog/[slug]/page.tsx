import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedDiv } from '@/components/shared/animated-div';
import { Badge } from '@/components/ui/badge';
import { fetchAllBlogSlugs, fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/blog-posts';
import { formatDateForDisplay } from '@/lib/date';
import { sanitizeHtml } from '@/lib/sanitize-html';
import { estimateReadingTimeMinutesFromHtml } from '@/lib/reading-time';
import { profile } from '@/data/site';

type Props = {
  params: Promise<{ slug: string }>;
};

// This function generates the metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const parsedPublishedAt = new Date(post.date);
  const publishedTime = Number.isNaN(parsedPublishedAt.getTime())
    ? undefined
    : parsedPublishedAt.toISOString();
  const parsedUpdatedAt = post.updatedAt ? new Date(post.updatedAt) : null;
  const modifiedTime =
    parsedUpdatedAt && !Number.isNaN(parsedUpdatedAt.getTime())
      ? parsedUpdatedAt.toISOString()
      : undefined;
  const authorName = post.author ?? profile.name;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: authorName }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${slug}`,
      publishedTime,
      modifiedTime,
      authors: [authorName],
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

// This function generates the static paths for all blog posts
export async function generateStaticParams() {
  return await fetchAllBlogSlugs();
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await fetchBlogPosts();
  const relatedPosts = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      return {
        post: candidate,
        sharedTags,
      };
    })
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      return Date.parse(b.post.date) - Date.parse(a.post.date);
    })
    .slice(0, 3)
    .map((entry) => entry.post);

  const authorName = post.author ?? profile.name;
  const updatedLabel =
    post.updatedAt && post.updatedAt !== post.date
      ? formatDateForDisplay(post.updatedAt)
      : null;
  const readTimeMinutes = estimateReadingTimeMinutesFromHtml(post.content);

  return (
    <div className="container mx-auto px-4 py-32">
      <article className="max-w-4xl mx-auto">
        <AnimatedDiv>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-muted-foreground mb-1">
            By {authorName}
          </p>
          <p className="text-muted-foreground mb-4">
            Published on {formatDateForDisplay(post.date)} · {readTimeMinutes} min read
            {updatedLabel ? ` · Updated on ${updatedLabel}` : ''}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay="0.1s">
          <Image
            src={post.image || 'https://placehold.co/1200x600'}
            alt={post.title}
            width={1200}
            height={600}
            data-ai-hint="blog post header"
            className="w-full rounded-lg object-cover mb-12"
          />
        </AnimatedDiv>

        <AnimatedDiv
          delay="0.2s"
          className="prose prose-lg dark:prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        >
        </AnimatedDiv>

        {relatedPosts.length > 0 && (
          <AnimatedDiv delay="0.3s" className="mt-16 border-t border-border/70 pt-10">
            <h2 className="text-2xl font-bold tracking-tight">Related Articles</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="rounded-xl border border-border/70 bg-card/60 p-4 transition-colors hover:border-primary/45"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {formatDateForDisplay(relatedPost.date)}
                  </p>
                  <h3 className="mt-2 text-base font-semibold leading-snug">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </AnimatedDiv>
        )}
      </article>
    </div>
  );
}
