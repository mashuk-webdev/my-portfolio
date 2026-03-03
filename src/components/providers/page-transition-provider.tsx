'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useMotionPreferences } from '@/hooks/use-motion-preferences';

type PageTransitionProviderProps = {
  children: ReactNode;
};

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname();
  const { mode, shouldReduceMotion } = useMotionPreferences();
  const initialState = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 0, y: mode === 'butter' ? 6 : 8 };
  const animateState = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0 };
  const exitState = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 0, y: mode === 'butter' ? -6 : -8 };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main-content"
        key={pathname}
        className="min-h-screen"
        tabIndex={-1}
        initial={initialState}
        animate={animateState}
        exit={exitState}
        transition={{
          duration: shouldReduceMotion ? 0.01 : mode === 'butter' ? 0.42 : 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
