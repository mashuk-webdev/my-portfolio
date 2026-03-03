'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedDiv } from './shared/animated-div';
import { useMotionPreferences } from '@/hooks/use-motion-preferences';

interface ProjectCardProps {
  project: Project;
  delay?: string;
}

export function ProjectCard({ project, delay = '0s' }: ProjectCardProps) {
  const { mode, shouldReduceMotion } = useMotionPreferences();

  const cardVariants = shouldReduceMotion
    ? undefined
    : {
        rest: { y: 0, rotateX: 0, rotateY: 0, scale: 1 },
        hover:
          mode === 'butter'
            ? { y: -6, rotateX: 1.4, rotateY: -1.4, scale: 1.01 }
            : { y: -8, rotateX: 1.8, rotateY: -1.8, scale: 1.012 },
      };

  return (
    <AnimatedDiv delay={delay}>
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={cardVariants}
        transition={{
          type: 'spring',
          stiffness: mode === 'butter' ? 140 : 170,
          damping: mode === 'butter' ? 26 : 24,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Link href={`/projects/${project.slug}`} className="group block" data-cursor-hover>
          <Card className="h-full overflow-hidden border transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
            <div className="overflow-hidden">
              <motion.div
                variants={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rest: { scale: 1 },
                        hover: { scale: 1.07 },
                      }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={500}
                  height={300}
                  data-ai-hint="project thumbnail"
                  className="h-48 w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            </div>
            <CardHeader>
              <motion.div
                variants={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rest: { y: 0 },
                        hover: { y: -6 },
                      }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {(project.projectType || project.client || project.timeline) && (
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {project.projectType && (
                      <Badge
                        variant={project.projectType === 'Client' ? 'default' : 'outline'}
                        className="text-[10px] uppercase tracking-[0.12em]"
                      >
                        {project.projectType}
                      </Badge>
                    )}
                    {(project.client || project.timeline) && (
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {project.client}
                        {project.client && project.timeline ? ' | ' : ''}
                        {project.timeline}
                      </p>
                    )}
                  </div>
                )}
                <CardTitle className="transition-colors group-hover:text-primary">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.summary}</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              {project.impact && project.impact.length > 0 && (
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {project.impact.slice(0, 2).map((metric) => (
                    <div
                      key={`${project.slug}-${metric.label}`}
                      className="rounded-xl border border-primary/20 bg-primary/5 px-2.5 py-2"
                    >
                      <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <TrendingUp className="h-3 w-3 text-primary" />
                        {metric.label}
                      </div>
                      <p className="mt-0.5 text-sm font-bold text-foreground">{metric.value}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
              <motion.div
                className="mt-4 flex items-center font-semibold text-primary"
                variants={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rest: { x: 0 },
                        hover: { x: 3 },
                      }
                }
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                View Case Study
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </AnimatedDiv>
  );
}
