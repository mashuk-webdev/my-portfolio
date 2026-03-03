'use client';

import { useReducedMotion } from 'framer-motion';
import { useMotionMode } from '@/components/providers/motion-mode-provider';

export function useMotionPreferences() {
  const { mode } = useMotionMode();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion || mode === 'minimal';

  return {
    mode,
    shouldReduceMotion,
    motionFactor: shouldReduceMotion ? 0 : mode === 'butter' ? 0.78 : 1,
    durationScale: shouldReduceMotion ? 0 : mode === 'butter' ? 1.12 : 1,
  };
}
