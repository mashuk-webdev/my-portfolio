'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AnimatedDiv } from '../shared/animated-div';
import { Card } from '../ui/card';
import { Mail, Phone, MapPin, Clock3, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { profile } from '@/data/site';

const ContactForm = dynamic(
  () => import('../contact-form').then((module) => module.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-border/70 bg-card/70 p-6 text-sm text-muted-foreground">
        Loading project brief form...
      </div>
    ),
  }
);

type ContactSectionProps = {
  showHeading?: boolean;
};

const projectFit = [
  'New website or portfolio build',
  'Redesign with conversion improvements',
  'E-commerce setup and optimization',
  'Performance, SEO, and technical cleanup',
];

const nextSteps = [
  'I review your brief and goals.',
  'You get a clear scope and timeline.',
  'We begin with milestones and regular updates.',
];

export default function ContactSection({ showHeading = true }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneHref = `tel:${profile.phone.replace(/[^\d+]/g, '')}`;
  const mailHref = `mailto:${profile.email}`;
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [14, -12]);
  const cardY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [30, -18]);
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.97, 1, 0.99]
  );

  return (
    <section ref={sectionRef} id="contact" className="bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4">
        {!showHeading && <h2 className="sr-only">Contact and Project Brief</h2>}
        {showHeading && (
          <motion.div style={{ y: headingY }}>
            <AnimatedDiv>
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Let&apos;s Build Something Great
              </h2>
              <p className="text-lg text-muted-foreground text-center mt-4 max-w-3xl mx-auto">
                Share your project details and goals. I&apos;ll help you turn them into a clear execution plan with practical next steps.
              </p>
            </AnimatedDiv>
          </motion.div>
        )}
        
        <motion.div className={cn(showHeading ? 'mt-20' : 'mt-8')} style={{ y: cardY, scale: cardScale }}>
          <Card className="max-w-6xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <AnimatedDiv className="p-8 md:p-12 bg-card">
                  <h3 className="text-2xl font-bold mb-2">Tell Me About Your Project</h3>
                  <p className="text-muted-foreground mb-6">
                    Share what you&apos;re building, your timeline, and expected outcome. The more context you provide, the better the first response.
                  </p>
                  <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-medium text-primary dark:text-violet-200">
                    <Clock3 className="h-3.5 w-3.5" />
                    Typical response within 24 hours
                  </div>

                  <div className="mb-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Best fit projects
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projectFit.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border/70 bg-background/75 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      What happens next
                    </p>
                    <div className="space-y-2.5">
                      {nextSteps.map((step) => (
                        <p key={step} className="inline-flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-muted-foreground">
                    <a
                      href={mailHref}
                      aria-label={`Send email to ${profile.email}`}
                      className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/55 px-3 py-2 transition-colors hover:border-primary/35 hover:text-primary"
                    >
                      <Mail className="h-5 w-5 text-primary"/>
                      <span>{profile.email}</span>
                    </a>
                    <a
                      href={phoneHref}
                      aria-label={`Call ${profile.phone}`}
                      className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/55 px-3 py-2 transition-colors hover:border-primary/35 hover:text-primary"
                    >
                      <Phone className="h-5 w-5 text-primary"/>
                      <span>{profile.phone}</span>
                    </a>
                    <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/55 px-3 py-2">
                      <MapPin className="h-5 w-5 text-primary"/>
                      <span>{profile.location}</span>
                    </div>
                  </div>
              </AnimatedDiv>

              <AnimatedDiv delay="0.1s" className="p-8 md:p-12 bg-background/50">
                <ContactForm />
              </AnimatedDiv>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
