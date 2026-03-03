
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  ArrowRight,
  Eye,
  Clock3,
  BriefcaseBusiness,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useMotionPreferences } from '@/hooks/use-motion-preferences';

const titles = ['Web Products', 'Conversion Funnels', 'Digital Brands'];
const headingWords = ['Building', 'Growth-Ready'];
const trustPoints = [
  { icon: BriefcaseBusiness, label: '20+ client launches since 2019' },
  { icon: Clock3, label: 'Reply within 24 hours' },
  { icon: TrendingUp, label: 'Up to 40% inquiry uplift' },
];
const quickOutcomes = [
  'Fast-loading pages and clean UX',
  'SEO-first structure and metadata',
  'Secure forms and reliable integrations',
];

export default function HeroSection() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const isMobile = useIsMobile();
  const { mode, shouldReduceMotion, motionFactor, durationScale } = useMotionPreferences();
  const isLowMotionMode = shouldReduceMotion || isMobile;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : isMobile ? [0, 30 * motionFactor] : [0, 90 * motionFactor]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    shouldReduceMotion
      ? [1, 1, 1]
      : isMobile
      ? [1, 0.98, 0.8 + (1 - motionFactor) * 0.1]
      : [1, 0.95, 0.45 + (1 - motionFactor) * 0.2]
  );
  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : isMobile ? [0, 14 * motionFactor] : [0, 54 * motionFactor]
  );
  const gridScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? [1, 1]
      : isMobile
      ? [1, 1 + 0.01 * motionFactor]
      : [1, 1 + 0.04 * motionFactor]
  );
  const orbShift = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : isMobile ? [0, 14 * motionFactor] : [0, 64 * motionFactor]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, mode === 'butter' ? 4600 : 4200);

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className={cn(
        'relative bg-background',
        isMobile ? 'min-h-[100svh]' : 'min-h-[130vh] md:min-h-[150vh] lg:min-h-[165vh]'
      )}
    >
      <div
        className={cn(
          'flex min-h-screen justify-center overflow-hidden text-center',
          isMobile ? 'relative items-start px-1 pt-20 pb-8' : 'sticky top-0 items-center'
        )}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern-animated opacity-10"
          style={{ y: gridY, scale: gridScale }}
        />
        <motion.div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" style={{ y: orbShift }}>
          <motion.div
            className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
            animate={
              isLowMotionMode
                ? undefined
                : {
                    x: [0, (isMobile ? 10 : 24) * motionFactor, 0],
                    y: [0, (isMobile ? -6 : -14) * motionFactor, 0],
                    scale: [1, 1 + (isMobile ? 0.02 : 0.05) * motionFactor, 1],
                  }
            }
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
            animate={
              isLowMotionMode
                ? undefined
                : {
                    x: [0, (isMobile ? -10 : -22) * motionFactor, 0],
                    y: [0, (isMobile ? 8 : 16) * motionFactor, 0],
                    scale: [1, 1 + (isMobile ? 0.02 : 0.05) * motionFactor, 1],
                  }
            }
            transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        
        <motion.div
          className="relative z-10 container mx-auto flex flex-col items-center px-4"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.h1
            className="relative mb-4 text-[2.5rem] font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: shouldReduceMotion
                  ? { staggerChildren: 0 }
                  : { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
          >
            <span className="inline-flex gap-3 flex-wrap justify-center">
              {headingWords.map((word) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0.01 : 0.6 * durationScale,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="relative mt-2 block text-primary h-24 md:h-28 lg:h-32">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titles[currentTitleIndex]}
                  className="absolute left-0 right-0"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -24 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.65 * durationScale,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {titles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 max-w-3xl text-[1.02rem] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.28, duration: shouldReduceMotion ? 0.01 : 0.55 }}
          >
            I&apos;m Mashuk, a <span className="font-semibold text-primary dark:text-violet-300">Full-Stack Developer</span> and <span className="text-accent font-semibold">Growth-focused Builder</span> helping founders, creators, and small teams launch faster, look premium, and convert better.
          </motion.p>

          <motion.div
            className="mb-6 grid w-full max-w-3xl grid-cols-1 gap-2 text-left sm:grid-cols-3"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.33, duration: shouldReduceMotion ? 0.01 : 0.45 }}
          >
            {quickOutcomes.map((outcome) => (
              <p
                key={outcome}
                className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-xs font-medium text-muted-foreground"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                {outcome}
              </p>
            ))}
          </motion.div>

          <motion.div
            className="mb-7 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.35, duration: shouldReduceMotion ? 0.01 : 0.45 }}
          >
            {trustPoints.map((point) => (
              <span
                key={point.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/75 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs"
              >
                <point.icon className="h-3.5 w-3.5 text-primary" />
                {point.label}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: shouldReduceMotion ? 0.01 : 0.55 }}
          >
            <Button asChild size="lg" className="h-12 px-7">
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-12 px-7">
              <Link href="/projects">
                See Case Studies <Eye className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {!isMobile && (
            <motion.p
              className="mt-12 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/85"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.65, duration: 0.4 }}
            >
              Scroll to explore the story
            </motion.p>
          )}
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes moveGrid {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 4rem 4rem;
          }
        }
        .bg-grid-pattern-animated {
          background-image: linear-gradient(
              to right,
              hsl(var(--border)) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
          background-size: 4rem 4rem;
          animation: moveGrid 20s linear infinite;
        }
        @media (max-width: 767px), (prefers-reduced-motion: reduce) {
          .bg-grid-pattern-animated {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
