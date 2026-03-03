'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AnimatedDiv } from '../shared/animated-div';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Gauge, Handshake } from 'lucide-react';

const valuePoints = [
  { icon: Gauge, text: 'Fast delivery' },
  { icon: ShieldCheck, text: 'Production-ready quality' },
  { icon: Handshake, text: 'Clear communication' },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [22, -20]);
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.97, 1, 0.98]
  );
  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [40, -40]);

  return (
    <section id="cta" ref={sectionRef} className="py-24 relative overflow-hidden">
      <motion.div className="absolute inset-0 -z-10 bg-primary/5" style={{ y: bgY }} />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-20%] -z-10 mx-auto h-64 w-[min(65rem,92vw)] rounded-full bg-accent/20 blur-3xl"
        style={{ y: bgY }}
      />
      <div className="container mx-auto px-4 text-center">
        <motion.div style={{ y: contentY, scale: contentScale }}>
          <AnimatedDiv className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Open for selected projects</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Need a website that actually grows your business? <br />
            <span className="text-primary">Let&apos;s build it</span> with speed and clarity.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From strategy to launch, I help you ship a polished product that converts visitors, builds trust, and stays maintainable.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {valuePoints.map((point) => (
              <span
                key={point.text}
                className="inline-flex items-center gap-2 rounded-full border border-border/65 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <point.icon className="h-3.5 w-3.5 text-primary" />
                {point.text}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="h-14 px-8 text-lg">
              <Link href="/contact">
                Book a Project Call <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg">
              <Link href="/resume">
                Review Resume
              </Link>
            </Button>
          </div>
          </AnimatedDiv>
        </motion.div>
      </div>
    </section>
  );
}
