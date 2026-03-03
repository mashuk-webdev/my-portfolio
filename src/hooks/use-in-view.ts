'use client';

import { useState, useEffect, useRef } from 'react';

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useInView<T extends HTMLElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const initialRect = element.getBoundingClientRect();
    const initiallyVisible =
      initialRect.top <= viewportHeight * (1 - threshold) && initialRect.bottom >= 0;

    if (initiallyVisible) {
      setIsInView(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  return { ref, isInView };
}
