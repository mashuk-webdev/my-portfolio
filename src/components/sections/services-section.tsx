'use client';

import { useRef } from 'react';
import { services } from '@/data/services';
import { AnimatedDiv } from '../shared/animated-div';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServicesSectionProps {
  isHomePage?: boolean;
  showHeading?: boolean;
}

export default function ServicesSection({
  isHomePage = false,
  showHeading = true,
}: ServicesSectionProps) {
  const displayedServices = isHomePage ? services.slice(0, 3) : services;
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [18, -14]);
  const gridY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [32, -20]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.75, 1],
    shouldReduceMotion ? [0.18, 0.18, 0.18, 0.18] : [0.08, 0.24, 0.24, 0.1]
  );

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden bg-secondary py-24 sm:py-32">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-30%] mx-auto h-72 w-[min(72rem,92vw)] rounded-full bg-primary/20 blur-3xl"
        style={{ opacity: glowOpacity }}
      />
      <div className="container mx-auto px-4">
        {!showHeading && <h2 className="sr-only">Service Catalog</h2>}
        {showHeading && (
          <motion.div style={{ y: headingY }}>
            <AnimatedDiv>
              <h2 className="text-3xl md:text-4xl font-bold text-center">What I Offer</h2>
              <p className="text-lg text-muted-foreground text-center mt-4 max-w-3xl mx-auto">
                Strategic design, engineering, and growth-focused execution to help you launch better products and get measurable outcomes.
              </p>
            </AnimatedDiv>
          </motion.div>
        )}

        <motion.div
          className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8', showHeading ? 'mt-12' : 'mt-4')}
          style={{ y: gridY }}
        >
          {displayedServices.map((service, index) => (
            <AnimatedDiv key={service.title} delay={`${index * 0.1}s`}>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full text-left focus-visible:outline-none"
                  >
                    <Card
                      className="group relative h-full cursor-pointer overflow-hidden text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-lg hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      data-cursor-hover
                    >
                      <div className="absolute inset-0 scale-150 bg-primary/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                      <CardHeader className="relative z-10">
                        <div className="mb-4">
                          <service.icon className="mx-auto h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                        </div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.summary}</CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="mb-3 flex flex-wrap justify-center gap-2">
                          <span className="rounded-full border border-border/70 bg-background/75 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            {service.timeline}
                          </span>
                          <span className="rounded-full border border-primary/30 bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary dark:text-violet-200">
                            {service.deliverable}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs text-muted-foreground">{service.idealFor}</p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary dark:text-violet-200">
                          {service.startingAt}
                        </p>
                        <div className="mt-3 flex items-center justify-center font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-2xl">
                      <service.icon className="w-8 h-8 text-primary" />
                      {service.title}
                    </DialogTitle>
                    <DialogDescription asChild>
                      <div className="pt-4 text-left">
                        <span className="mb-3 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                          {service.timeline} | {service.deliverable}
                        </span>
                        <p className="mb-3 text-sm font-semibold text-foreground">{service.startingAt}</p>
                        <p className="mb-3 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">Ideal for:</span> {service.idealFor}
                        </p>
                        <p className="text-sm text-muted-foreground">{service.details}</p>
                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                            Expected Outcomes
                          </p>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                            {service.outcomes.map((outcome) => (
                              <li key={outcome}>{outcome}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </AnimatedDiv>
          ))}
        </motion.div>

        {isHomePage && services.length > 3 && (
          <AnimatedDiv className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/services">Explore All Services</Link>
            </Button>
          </AnimatedDiv>
        )}
      </div>
    </section>
  );
}
