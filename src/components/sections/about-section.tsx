'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AnimatedDiv } from '../shared/animated-div';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  Code,
  Database,
  Cloud,
  PenTool,
  Rocket,
  Briefcase,
  Smile,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CountUp } from '../shared/count-up';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const stats = [
  { icon: Briefcase, value: 5, label: 'Years of Experience' },
  { icon: Award, value: 20, label: 'Projects Completed' },
  { icon: Smile, value: 15, label: 'Happy Clients' },
];

const skills = [
  { icon: Code, title: 'Frontend', description: 'Building beautiful and responsive user interfaces with React, Next.js, and Tailwind CSS.' },
  { icon: Database, title: 'Backend', description: 'Developing robust server-side applications and APIs with Node.js and Firebase.' },
  { icon: Cloud, title: 'Deployment', description: 'Deploying and managing applications on platforms like Vercel and Firebase Hosting.' },
  { icon: PenTool, title: 'WordPress/Shopify', description: 'Crafting custom themes and solutions for popular CMS and e-commerce platforms.' },
];

const techStack = [
    'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'HTML5 & CSS3', 'Tailwind CSS', 'Firebase', 'WordPress', 'Shopify', 'Git & GitHub',
    'SEO', 'Content Marketing', 'Google Analytics', 'Social Media Marketing', 'PPC Advertising', 'Email Marketing', 'Content Writing'
];
const coreStack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Firebase'];
const supportingStack = techStack.filter((tech) => !coreStack.includes(tech));
const homeHighlights = [
  {
    title: 'Best Fit Clients',
    value: 'Founders, creators, and growth-focused businesses that need speed with quality.',
  },
  {
    title: 'Typical Engagement',
    value: 'From strategy to launch in structured milestones with transparent communication.',
  },
  {
    title: 'Primary Focus',
    value: 'Conversion-ready UX, performance, and maintainable full-stack architecture.',
  },
];
const deliveryFramework = [
  {
    step: '1. Discover',
    detail: 'Understand goals, audience intent, and the specific conversion actions that matter.',
  },
  {
    step: '2. Design',
    detail: 'Create structure and UI direction that communicates trust and guides user decisions.',
  },
  {
    step: '3. Build',
    detail: 'Develop secure, performance-conscious features with clean reusable code.',
  },
  {
    step: '4. Optimize',
    detail: 'Refine UX, speed, and SEO after launch using real usage signals and iteration.',
  },
];
const proofPoints = [
  '20+ launched projects across service, e-commerce, and social-impact domains',
  'Up to 40% inquiry uplift on optimized conversion funnels',
  'Production-ready setup with SEO, security, and performance best practices',
];

interface AboutSectionProps {
  isHomePage?: boolean;
  showHeading?: boolean;
}

export default function AboutSection({
  isHomePage = false,
  showHeading = true,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-18, 22]);
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [14, -10]);

  return (
    <section ref={sectionRef} id="about" className="bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4">
        {!showHeading && <h2 className="sr-only">About Details</h2>}
        {showHeading && (
          <motion.div style={{ y: textY }}>
            <AnimatedDiv>
              <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground text-center mt-4 max-w-3xl mx-auto">
                I help founders and growing businesses launch fast, conversion-focused digital products with strong engineering foundations.
              </p>
            </AnimatedDiv>
          </motion.div>
        )}

        <div className={cn('grid grid-cols-1 md:grid-cols-12 gap-12 items-center', showHeading ? 'mt-20' : 'mt-6')}>
          <div className="md:col-span-4 lg:col-span-3 flex justify-center">
            <motion.div className="relative group" style={{ y: imageY }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src="/profile-photo.png"
                alt="Mashuk Profile"
                width={300}
                height={400}
                className="relative w-64 md:w-[300px] h-auto rounded-2xl object-contain shadow-2xl border-2 border-primary/20 bg-background"
                priority
              />
            </motion.div>
          </div>

          <motion.div className="md:col-span-8 lg:col-span-9 space-y-8" style={{ y: textY }}>
            <AnimatedDiv delay="0.1s">
              <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m Mashuk, a full-stack developer focused on real outcomes, not just visuals. I combine product thinking, frontend polish, and backend reliability to build websites that are easy to use, fast to load, and ready for real business goals.
              </p>
            </AnimatedDiv>
            <AnimatedDiv delay="0.2s">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Rocket className="w-8 h-8 text-primary" />
                My Philosophy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Build with clarity, ship with quality, and measure impact. I prioritize clean architecture, deliberate UX decisions, and practical iteration so each release improves usability, performance, and conversion results.
              </p>
            </AnimatedDiv>
          </motion.div>
        </div>

        {isHomePage && (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {homeHighlights.map((item, index) => (
              <AnimatedDiv key={item.title} delay={`${index * 0.08}s`}>
                <Card className="h-full border-primary/15 bg-card/80 p-5 shadow-primary/5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.value}</p>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        )}

        <div className="my-24 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <AnimatedDiv delay={`${index * 0.1}s`} key={index}>
              <Card className="text-center p-6 bg-card border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-shadow">
                <stat.icon className="w-10 h-10 mx-auto text-primary mb-3" />
                <p className="text-4xl font-bold">
                  <CountUp end={stat.value} />+
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            </AnimatedDiv>
          ))}
        </div>

        <div className="mt-24">
          <AnimatedDiv>
            <h3 className="text-3xl font-bold text-center mb-4">How I Work</h3>
            <p className="mx-auto max-w-2xl text-center text-muted-foreground">
              A structured process to reduce ambiguity, improve quality, and move from idea to live product efficiently.
            </p>
          </AnimatedDiv>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {deliveryFramework.map((item, index) => (
              <AnimatedDiv key={item.step} delay={`${index * 0.08}s`}>
                <Card className="h-full border-primary/15 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{item.step}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <AnimatedDiv>
            <h3 className="text-3xl font-bold text-center mb-4">Proof of Impact</h3>
          </AnimatedDiv>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {proofPoints.map((point, index) => (
              <AnimatedDiv key={point} delay={`${index * 0.08}s`}>
                <Card className="h-full border-primary/15 bg-primary/5 p-5">
                  <p className="text-sm leading-relaxed text-foreground">{point}</p>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <AnimatedDiv>
            <h3 className="text-3xl font-bold text-center mb-12">Core Competencies</h3>
          </AnimatedDiv>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <AnimatedDiv delay={`${index * 0.1}s`} key={index}>
                <Card className="text-center group p-6 transition-all duration-300 hover:bg-card/80 hover:-translate-y-2 border-2 border-transparent hover:border-primary h-full">
                  <CardHeader className="p-0 items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      <skill.icon className="w-10 h-10 text-primary transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl mb-2">{skill.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground text-sm">{skill.description}</p>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </div>

        {!isHomePage && (
          <div className="mt-24">
            <AnimatedDiv>
              <h3 className="text-3xl font-bold text-center mb-4">My Tech Stack</h3>
              <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
                Core tools I use most, followed by supporting technologies for marketing, analytics, and growth execution.
              </p>
              <h4 className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Core Stack
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                {coreStack.map((tech, index) => (
                  <AnimatedDiv delay={`${index * 0.05}s`} key={tech}>
                    <Badge variant="secondary" className="border border-primary/25 bg-primary/10 px-4 py-2 text-base hover:scale-105">
                      {tech}
                    </Badge>
                  </AnimatedDiv>
                ))}
              </div>
              <h4 className="mb-4 mt-10 text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Supporting Stack
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {supportingStack.map((tech, index) => (
                  <AnimatedDiv delay={`${index * 0.04}s`} key={tech}>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer border border-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:border-primary"
                    >
                      {tech}
                    </Badge>
                  </AnimatedDiv>
                ))}
              </div>
            </AnimatedDiv>
          </div>
        )}
        
        {isHomePage && (
          <AnimatedDiv className="text-center mt-16">
            <Button asChild size="lg">
              <Link href="/about">Learn More About Me</Link>
            </Button>
          </AnimatedDiv>
        )}
      </div>
    </section>
  );
}
