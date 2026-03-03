'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { CSSProperties, HTMLAttributes } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { useMotionPreferences } from '@/hooks/use-motion-preferences';

interface AnimatedDivProps extends HTMLAttributes<HTMLDivElement> {
  delay?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function AnimatedDiv({
  className,
  children,
  delay = '0s',
  once = true,
  threshold,
  rootMargin,
  style,
  ...props
}: AnimatedDivProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const { mode, shouldReduceMotion } = useMotionPreferences();
  const { ref, isInView } = useInView<HTMLDivElement>({
    once,
    threshold,
    rootMargin,
  });
  const shouldShow = !hasMounted || isInView;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const transitionStyle = useMemo<CSSProperties>(
    () => ({
      transitionDelay: delay,
      ...style,
    }),
    [delay, style]
  );

  const mergedStyle: CSSProperties = {
    ...transitionStyle,
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transform-gpu transition-[opacity,transform] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
        mode === 'butter' ? 'duration-700' : 'duration-500',
        shouldShow
          ? 'opacity-100 translate-y-0'
          : shouldReduceMotion
          ? 'opacity-100 translate-y-0'
          : mode === 'butter'
          ? 'opacity-0 translate-y-5'
          : 'opacity-0 translate-y-6',
        className
      )}
      style={mergedStyle}
      {...props}
    >
      {children}
    </div>
  );
}
