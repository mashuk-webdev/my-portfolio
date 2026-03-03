'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectCard } from '../project-card';
import { AnimatedDiv } from '../shared/animated-div';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProjectsSectionProps {
  isHomePage?: boolean;
  showHeading?: boolean;
}

export default function ProjectsSection({
  isHomePage = false,
  showHeading = true,
}: ProjectsSectionProps) {
  const [selectedType, setSelectedType] = useState<'All' | 'Client' | 'Concept'>('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [12, -10]);
  const gridY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [22, -18]);

  const allIndustries = useMemo(() => {
    const industrySet = new Set<string>();
    projects.forEach((project) => {
      if (project.industry) {
        industrySet.add(project.industry);
      }
    });
    return ['All', ...Array.from(industrySet).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const typeMatch = selectedType === 'All' || project.projectType === selectedType;
      const industryMatch = selectedIndustry === 'All' || project.industry === selectedIndustry;
      return typeMatch && industryMatch;
    });
  }, [selectedType, selectedIndustry]);
  const hasActiveFilters = selectedType !== 'All' || selectedIndustry !== 'All';

  const displayedProjects = isHomePage
    ? projects.slice(0, 3)
    : filteredProjects.slice(0, visibleCount);

  useEffect(() => {
    if (isHomePage) return;
    setVisibleCount(9);
  }, [selectedType, selectedIndustry, isHomePage]);

  return (
    <section ref={sectionRef} id="projects" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4">
        {!showHeading && <h2 className="sr-only">Project Listings</h2>}
        {showHeading && (
          <motion.div style={{ y: headingY }}>
            <AnimatedDiv>
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground text-center mt-4 max-w-3xl mx-auto">
                Client and concept case studies with clear outcomes. Use filters to explore by technology and specialization.
              </p>
            </AnimatedDiv>
          </motion.div>
        )}

        {!isHomePage && (
          <AnimatedDiv
            delay="0.1s"
            className={cn(showHeading ? 'mt-12' : 'mt-4')}
          >
            <div className="rounded-2xl border border-border/70 bg-card/40 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Type
                </p>
                {(['All', 'Client', 'Concept'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    aria-pressed={selectedType === type}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                      selectedType === type
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <p className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Industry
                </p>
                {allIndustries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    aria-pressed={selectedIndustry === industry}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm',
                      selectedIndustry === industry
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {industry}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}
                </p>
                <button
                  onClick={() => {
                    setSelectedType('All');
                    setSelectedIndustry('All');
                  }}
                  disabled={!hasActiveFilters}
                  className={cn(
                    'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300',
                    hasActiveFilters
                      ? 'border-border text-foreground hover:border-primary hover:text-primary'
                      : 'cursor-not-allowed border-border/50 text-muted-foreground/60'
                  )}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </AnimatedDiv>
        )}

        <motion.div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
            !isHomePage && !showHeading ? 'mt-8' : 'mt-12'
          )}
          style={{ y: gridY }}
        >
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={`${index * 0.1}s`} />
          ))}
        </motion.div>
        
        {filteredProjects.length === 0 && !isHomePage && (
          <AnimatedDiv className="text-center mt-12 text-muted-foreground">
            <p>No projects found for the selected type and industry.</p>
          </AnimatedDiv>
        )}

        {!isHomePage && filteredProjects.length > displayedProjects.length && (
          <AnimatedDiv className="mt-12 text-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setVisibleCount((prev) => prev + 9)}
            >
              Load More Projects
            </Button>
          </AnimatedDiv>
        )}

        {isHomePage && projects.length > 3 && (
          <AnimatedDiv className="text-center mt-16">
            <Button asChild size="lg">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </AnimatedDiv>
        )}
      </div>
    </section>
  );
}
