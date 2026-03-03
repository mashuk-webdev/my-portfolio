'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMotionPreferences } from '@/hooks/use-motion-preferences';

const chapters = [
  { id: 'home', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Clients' },
  { id: 'cta', label: 'CTA' },
];

function resolveActiveChapter(): string {
  const viewportAnchor = window.innerHeight * 0.34;
  let closestId = chapters[0].id;
  let smallestDistance = Number.POSITIVE_INFINITY;

  for (const chapter of chapters) {
    const section = document.getElementById(chapter.id);
    if (!section) continue;

    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - viewportAnchor);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestId = chapter.id;
    }
  }

  return closestId;
}

export function HomeStoryTracker() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const { mode, shouldReduceMotion } = useMotionPreferences();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: mode === 'butter' ? 72 : 90,
    damping: mode === 'butter' ? 30 : 28,
    mass: mode === 'butter' ? 0.4 : 0.35,
  });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const visibilityThreshold = 220;

    const updateActiveChapter = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        setIsVisible(window.scrollY > visibilityThreshold);
        const nextChapter = resolveActiveChapter();
        setActiveChapter((prevChapter) =>
          prevChapter === nextChapter ? prevChapter : nextChapter
        );
      });
    };

    updateActiveChapter();
    window.addEventListener('scroll', updateActiveChapter, { passive: true });
    window.addEventListener('resize', updateActiveChapter);

    return () => {
      window.removeEventListener('scroll', updateActiveChapter);
      window.removeEventListener('resize', updateActiveChapter);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  const activeLabel = useMemo(
    () => chapters.find((chapter) => chapter.id === activeChapter)?.label ?? chapters[0].label,
    [activeChapter]
  );

  if (isMobile) {
    return null;
  }

  return (
    <>
      <aside
        className={cn(
          'pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 lg:block',
          isVisible ? 'translate-x-0 opacity-60' : 'translate-x-6 opacity-0'
        )}
        aria-label="Story chapters"
      >
        <div className="pointer-events-auto relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-3 pl-5 shadow-lg backdrop-blur-sm transition-opacity duration-300 hover:opacity-100">
          <div className="absolute left-3 top-4 bottom-4 w-px bg-border" />
          <motion.div
            className="absolute left-3 top-4 bottom-4 w-px origin-top bg-gradient-to-b from-primary via-accent to-primary"
            style={{ scaleY: shouldReduceMotion ? scrollYProgress : smoothProgress }}
          />
          <ul className="space-y-2">
            {chapters.map((chapter) => {
              const isActive = chapter.id === activeChapter;

              return (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    aria-label={`Jump to ${chapter.label} section`}
                    className={cn(
                      'group flex items-center gap-3 rounded-full px-2 py-1 text-xs transition-colors',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full transition-all',
                        isActive
                          ? 'scale-125 bg-primary ring-4 ring-primary/20'
                          : 'bg-muted-foreground/40 group-hover:bg-primary/70'
                      )}
                    />
                    <span className="font-medium">{chapter.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div
        className={cn(
          'pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 lg:hidden',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        )}
      >
        <div className="rounded-full border bg-card/85 px-4 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-md">
          Chapter: {activeLabel}
        </div>
      </div>
    </>
  );
}
