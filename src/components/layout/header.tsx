
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import { MobileNav } from './mobile-nav';
import { AnimatedDiv } from '../shared/animated-div';
import { MotionModeToggle } from '../motion-mode-toggle';
import { primaryNavLinks } from '@/data/site';
import { useIsMobile } from '@/hooks/use-mobile';

export const navLinks = primaryNavLinks;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const isLinkActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      const activeButton = navRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
      if (!activeButton) {
        setIndicatorStyle({ left: 0, width: 0, opacity: 0 });
        return;
      }

      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        opacity: 1,
      });
    };

    const timer = window.setTimeout(updateIndicator, 40);
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMobile
          ? 'border-b border-border/55 bg-background/78 shadow-sm shadow-primary/10 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <AnimatedDiv className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between"
          initial={false}
          animate={
            shouldReduceMotion
              ? { height: isScrolled ? (isMobile ? 58 : 68) : isMobile ? 64 : 80, opacity: 1 }
              : { height: isScrolled ? (isMobile ? 58 : 68) : isMobile ? 64 : 80, opacity: 1 }
          }
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo />
          
          <div className="hidden md:flex items-center gap-3">
            <motion.nav
              ref={navRef}
              className="relative flex items-center gap-1 rounded-full border border-border/70 bg-background/70 p-1 shadow-sm backdrop-blur-md"
              initial={false}
              animate={shouldReduceMotion ? { scale: 1 } : { scale: isScrolled ? 0.97 : 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute rounded-full bg-primary shadow-lg shadow-primary/35 transition-all duration-300 ease-in-out"
                style={{ ...indicatorStyle, height: 'calc(100% - 8px)', top: '4px' }}
              />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={isLinkActive(link.href)}
                  aria-current={isLinkActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'relative z-10 rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-colors',
                    isLinkActive(link.href)
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
            <MotionModeToggle />
            <ThemeToggle />
            <span className="hidden items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 lg:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available
            </span>
            <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/25">
              <Link href="/contact">Hire Me</Link>
            </Button>
          </div>
        
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <MobileNav />
          </div>
        </motion.div>
      </AnimatedDiv>
    </header>
  );
}
