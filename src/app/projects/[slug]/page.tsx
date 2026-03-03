import { projects } from '@/data/projects';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Globe,
  ListChecks,
  TrendingUp,
  UserRound,
} from 'lucide-react';
import { AnimatedDiv } from '@/components/shared/animated-div';
import { sanitizeHtml } from '@/lib/sanitize-html';
import type { Project } from '@/lib/types';

type Props = {
  params: Promise<{ slug: string }>;
};

function resolveProjectBySlug(
  slug: string
): { project: Project; isLegacySlug: boolean } | null {
  const project = projects.find((item) => {
    if (item.slug === slug) return true;
    return item.legacySlugs?.includes(slug) ?? false;
  });

  if (!project) return null;

  return {
    project,
    isLegacySlug: project.slug !== slug,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedProject = resolveProjectBySlug(slug);
  const project = resolvedProject?.project;

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: 'website',
      images: [project.images[0]],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: [project.images[0]],
    },
  };
}

export async function generateStaticParams() {
  return projects.flatMap((project) => {
    const slugs = [project.slug, ...(project.legacySlugs ?? [])];
    return slugs.map((slug) => ({ slug }));
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolvedProject = resolveProjectBySlug(slug);

  if (!resolvedProject) {
    notFound();
  }

  if (resolvedProject.isLegacySlug) {
    redirect(`/projects/${resolvedProject.project.slug}`);
  }

  const project = resolvedProject.project;

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-4xl mx-auto">
        <AnimatedDiv>
          {project.projectType && (
            <Badge
              variant={project.projectType === 'Client' ? 'default' : 'outline'}
              className="mb-4 w-fit text-[11px] uppercase tracking-[0.14em]"
            >
              {project.projectType} Project
            </Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4 mb-12">
            {project.links.live && (
              <Button asChild>
                <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <Globe />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay="0.06s" className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Project Snapshot
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.projectType && (
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  Type
                </p>
                <p className="mt-2 text-sm font-semibold">{project.projectType}</p>
              </div>
            )}
            {project.client && (
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  Client
                </p>
                <p className="mt-2 text-sm font-semibold">{project.client}</p>
              </div>
            )}
            {project.industry && (
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Industry
                </p>
                <p className="mt-2 text-sm font-semibold">{project.industry}</p>
              </div>
            )}
            {project.timeline && (
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-primary" />
                  Timeline
                </p>
                <p className="mt-2 text-sm font-semibold">{project.timeline}</p>
              </div>
            )}
            {project.role && (
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <UserRound className="h-3.5 w-3.5 text-primary" />
                  My Role
                </p>
                <p className="mt-2 text-sm font-semibold">{project.role}</p>
              </div>
            )}
          </div>
        </AnimatedDiv>

        {project.scope && project.scope.length > 0 && (
          <AnimatedDiv delay="0.08s" className="mb-12">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Scope of Work
            </h2>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="grid gap-2 sm:grid-cols-2">
                {project.scope.map((item) => (
                  <p key={item} className="inline-flex items-start gap-2 text-sm text-foreground">
                    <ListChecks className="mt-0.5 h-4 w-4 text-primary" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </AnimatedDiv>
        )}

        {project.impact && project.impact.length > 0 && (
          <AnimatedDiv delay="0.1s" className="mb-12">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Project Impact
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.impact.map((metric) => (
                <div
                  key={`${project.slug}-${metric.label}`}
                  className="rounded-2xl border border-primary/20 bg-primary/5 p-4"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    {metric.label}
                  </div>
                  <p className="mt-2 text-2xl font-extrabold tracking-tight">{metric.value}</p>
                </div>
              ))}
            </div>
          </AnimatedDiv>
        )}
        
        <div className="space-y-8">
          {project.images.map((image, index) => (
            <AnimatedDiv key={index} delay={`${index * 0.1 + 0.1}s`}>
              <Image
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                width={1200}
                height={800}
                data-ai-hint="project image"
                className="w-full rounded-2xl object-cover shadow-lg"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </AnimatedDiv>
          ))}
        </div>

        <AnimatedDiv
          delay="0.5s"
          className="prose prose-lg dark:prose-invert max-w-none mt-16 prose-p:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.details) }}
        >
        </AnimatedDiv>
      </div>
    </div>
  );
}
