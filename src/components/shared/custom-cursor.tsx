'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMotionMode } from '@/components/providers/motion-mode-provider';

export function CustomCursor() {
  const { mode } = useMotionMode();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const targetPositionRef = useRef({ x: -100, y: -100 });
  const smoothPositionRef = useRef({ x: -100, y: -100 });
  const animationFrameRef = useRef<number | null>(null);
  const hoverStateRef = useRef(false);
  const visibilityStateRef = useRef(false);

  const updateTransform = (element: HTMLDivElement | null, x: number, y: number) => {
    if (!element) return;
    element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  useEffect(() => {
    hoverStateRef.current = isHovering;
  }, [isHovering]);

  useEffect(() => {
    visibilityStateRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const coarsePointerMedia = window.matchMedia('(pointer: coarse)');
    const hoverMedia = window.matchMedia('(hover: hover)');
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopMedia = window.matchMedia('(min-width: 768px)');

    const updateEnabledState = () => {
      const enabled =
        mode !== 'minimal' &&
        desktopMedia.matches &&
        hoverMedia.matches &&
        !coarsePointerMedia.matches &&
        !reducedMotionMedia.matches;

      setIsEnabled(enabled);
    };

    updateEnabledState();
    coarsePointerMedia.addEventListener('change', updateEnabledState);
    hoverMedia.addEventListener('change', updateEnabledState);
    reducedMotionMedia.addEventListener('change', updateEnabledState);
    desktopMedia.addEventListener('change', updateEnabledState);

    return () => {
      coarsePointerMedia.removeEventListener('change', updateEnabledState);
      hoverMedia.removeEventListener('change', updateEnabledState);
      reducedMotionMedia.removeEventListener('change', updateEnabledState);
      desktopMedia.removeEventListener('change', updateEnabledState);
    };
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    if (isEnabled) {
      root.setAttribute('data-custom-cursor', 'true');
      return () => root.removeAttribute('data-custom-cursor');
    }

    root.removeAttribute('data-custom-cursor');
    return undefined;
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      setIsHovering(false);
      targetPositionRef.current = { x: -100, y: -100 };
      smoothPositionRef.current = { x: -100, y: -100 };
      updateTransform(dotRef.current, -100, -100);
      updateTransform(outlineRef.current, -100, -100);
      return;
    }

    const runOutlineAnimation = () => {
      const smoothPosition = smoothPositionRef.current;
      const targetPosition = targetPositionRef.current;
      const smoothing = mode === 'butter' ? 0.14 : 0.18;

      smoothPosition.x += (targetPosition.x - smoothPosition.x) * smoothing;
      smoothPosition.y += (targetPosition.y - smoothPosition.y) * smoothing;

      updateTransform(outlineRef.current, smoothPosition.x, smoothPosition.y);
      animationFrameRef.current = window.requestAnimationFrame(runOutlineAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetPositionRef.current = { x: event.clientX, y: event.clientY };
      updateTransform(dotRef.current, event.clientX, event.clientY);

      if (!visibilityStateRef.current) {
        visibilityStateRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const nextHoverState = Boolean(
        target.closest('a, button, input, textarea, select, [data-cursor-hover], label[for]')
      );

      if (nextHoverState !== hoverStateRef.current) {
        hoverStateRef.current = nextHoverState;
        setIsHovering(nextHoverState);
      }
    };

    const handleMouseLeave = () => {
      visibilityStateRef.current = false;
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    animationFrameRef.current = window.requestAnimationFrame(runOutlineAnimation);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isEnabled, mode]);

  if (!isEnabled) return null;

  return (
    <div className={cn(
      'pointer-events-none fixed inset-0 z-[9999] hidden transition-opacity duration-300 md:block mix-blend-difference',
      isVisible ? 'opacity-100' : 'opacity-0'
      )}>
      <div
        ref={dotRef}
        className={cn(
          'absolute h-2 w-2 rounded-full bg-white transition-transform duration-200 ease-out will-change-transform',
          isHovering ? 'scale-0' : 'scale-100'
        )}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
      <div
        ref={outlineRef}
        className={cn(
          'absolute h-10 w-10 rounded-full border-2 border-white transition-[opacity,transform] duration-200 ease-out will-change-transform',
          isHovering ? 'scale-150 opacity-50' : 'scale-100'
        )}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
    </div>
  );
}
