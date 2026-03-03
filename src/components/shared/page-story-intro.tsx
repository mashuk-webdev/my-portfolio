'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMotionPreferences } from '@/hooks/use-motion-preferences';

type PageStoryIntroProps = {
  chapter: string;
  title: string;
  description: string;
  className?: string;
};

export function PageStoryIntro({
  chapter,
  title,
  description,
  className,
}: PageStoryIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { shouldReduceMotion, motionFactor } = useMotionPreferences();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : isMobile ? [0, 20 * motionFactor] : [0, 56 * motionFactor]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    shouldReduceMotion
      ? [1, 1, 1]
      : isMobile
      ? [1, 0.96, 0.78 + (1 - motionFactor) * 0.12]
      : [1, 0.9, 0.55 + (1 - motionFactor) * 0.2]
  );
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? [1, 1]
      : isMobile
      ? [1, 1 + 0.01 * motionFactor]
      : [1, 1 + 0.04 * motionFactor]
  );
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : isMobile ? [0, 16 * motionFactor] : [0, 52 * motionFactor]
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative overflow-hidden bg-background',
        isMobile ? 'min-h-[58vh]' : 'min-h-[68vh] md:min-h-[74vh] lg:min-h-[80vh]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-end',
          isMobile
            ? 'relative min-h-[58vh] pb-10'
            : 'sticky top-0 min-h-[68vh] pb-14 md:min-h-[74vh] md:pb-16 lg:min-h-[80vh] lg:pb-20'
        )}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ y: bgY, scale: bgScale }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.2),transparent_45%),radial-gradient(circle_at_85%_10%,hsl(var(--accent)/0.18),transparent_42%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </motion.div>

        <motion.div
          className="container relative z-10 mx-auto px-4"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <p className="mb-3 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Chapter: {chapter}
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
