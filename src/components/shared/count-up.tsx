'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from '@/hooks/use-in-view';

interface CountUpProps {
  end: number;
  duration?: number;
  start?: number;
}

export function CountUp({ end, duration = 2000, start = 0 }: CountUpProps) {
  const [count, setCount] = useState(start);
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * (end - start) + start);
        setCount(currentCount);
        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(step);
        }
      };
      animationFrameId.current = requestAnimationFrame(step);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isInView, end, start, duration]);

  return <span ref={ref}>{count}</span>;
}
