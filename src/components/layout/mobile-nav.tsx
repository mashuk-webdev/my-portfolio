
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Logo } from './logo';
import { navLinks } from './header';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';
import { MotionModeToggle } from '../motion-mode-toggle';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isLinkActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full border border-border/70">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col border-l border-border/60 bg-card/95 backdrop-blur-xl">
        <SheetHeader>
          <Logo />
          <SheetTitle className="sr-only">Main Menu</SheetTitle>
          <SheetDescription className="sr-only">A list of navigation links for the website.</SheetDescription>
        </SheetHeader>
        
        <nav className="mt-8 flex flex-grow flex-col justify-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              aria-current={isLinkActive(link.href) ? 'page' : undefined}
              className={cn(
                'relative rounded-2xl border px-4 py-3 text-lg font-semibold tracking-tight transition-all duration-300',
                isLinkActive(link.href)
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-border/80 hover:bg-background/80 hover:text-foreground'
              )}
            >
              {link.label}
              {isLinkActive(link.href) && (
                <span className="absolute inset-y-3 left-1 w-1 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-4 py-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to work
            </div>
            <Button asChild onClick={() => setIsOpen(false)} size="lg" className="w-full max-w-xs rounded-full shadow-lg shadow-primary/25">
              <Link href="/contact">Hire Me</Link>
            </Button>
            <div className="flex items-center gap-2 pt-4">
              <MotionModeToggle />
              <ThemeToggle />
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
