'use client';

import { useRef } from 'react';
import { AnimatedDiv } from '../shared/animated-div';
import { Card, CardContent } from '../ui/card';
import { ExternalLink, Quote, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    name: 'Sanjeev Kumar',
    role: 'Founder, Shubhamkriti Jewels',
    content:
      'Our old website looked good but did not convert. The new experience feels premium, loads faster on mobile, and brings significantly better inquiry quality.',
    highlight: '+40% mobile inquiries',
    project: 'Luxury commerce revamp',
    companyUrl: 'https://shubhamkritij.com/',
  },
  {
    name: 'Amit Sharma',
    role: 'Operations Lead, Amiro',
    content:
      'The product finder solved a major pain point for our buyers. Support requests dropped and customers now reach the correct parts much faster.',
    highlight: '25% fewer support calls',
    project: 'Auto parts finder UX',
    companyUrl: 'https://amiro.co.in/',
  },
  {
    name: 'Priya Verma',
    role: 'Director, Anuvridhi NGO',
    content:
      'The website communicates our mission with clarity and trust. Donation flow is smoother now, and volunteer participation has grown after launch.',
    highlight: '2x+ volunteer signups',
    project: 'Donation and trust redesign',
    companyUrl: 'https://anuvridhi.org/',
  },
];

function getInitials(name: string): string {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [18, -12]);
  const cardsY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [26, -24]);
  const cardsRotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0.7, -0.7]
  );

  return (
    <section id="testimonials" ref={sectionRef} className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div style={{ y: headingY }}>
          <AnimatedDiv>
          <h2 className="text-3xl md:text-4xl font-bold text-center">What My Clients Say</h2>
          <p className="text-lg text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
            Trusted by founders and organizations across diverse industries. Feedback below is linked to live project contexts.
          </p>
          </AnimatedDiv>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          style={{ y: cardsY, rotate: cardsRotate }}
        >
          {testimonials.map((testimonial, index) => (
            <AnimatedDiv key={index} delay={`${index * 0.1}s`}>
              <Card className="h-full relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <Quote className="absolute -right-2 -top-2 w-24 h-24 text-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-8">
                  <p className="mb-4 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {testimonial.highlight}
                  </p>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage alt={testimonial.name} />
                      <AvatarFallback>{getInitials(testimonial.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-bold">{testimonial.name}</h3>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <a
                    href={testimonial.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {testimonial.project}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </CardContent>
              </Card>
            </AnimatedDiv>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
