import Link from 'next/link';
import { Logo } from './logo';
import { Github, Twitter, Linkedin, ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { AnimatedDiv } from '../shared/animated-div';
import { footerNavLinks, profile, socialLinks } from '@/data/site';

function getSocialIcon(label: (typeof socialLinks)[number]['label']) {
  switch (label) {
    case 'GitHub':
      return Github;
    case 'Twitter':
      return Twitter;
    case 'LinkedIn':
      return Linkedin;
    default:
      return Github;
  }
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-card/80">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="container relative mx-auto px-4 py-12">
        <AnimatedDiv className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="space-y-5 md:col-span-5">
            <Logo />
            <p className="max-w-md text-sm text-muted-foreground">
              I build fast, reliable, and conversion-focused digital products that look premium and perform in production.
            </p>
            <Button asChild className="rounded-full px-6">
              <Link href="/contact">
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </h3>
            <nav className="grid grid-cols-2 gap-2 sm:max-w-xs">
              {footerNavLinks.map((link) => (
                <Button key={link.href} variant="link" asChild className="justify-start px-0 text-muted-foreground hover:text-foreground">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </h3>
            <div className="mb-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.label);
                return (
                  <Button key={link.label} variant="ghost" size="icon" asChild className="rounded-full border border-border/70 bg-background/70 hover:border-primary/40 hover:bg-primary/10">
                    <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay="0.08s" className="mt-10 border-t border-border/70 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </AnimatedDiv>
      </div>
    </footer>
  );
}
