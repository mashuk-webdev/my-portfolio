import {
  BarChart3,
  Bot,
  Code,
  Layout,
  LifeBuoy,
  Search,
  type LucideIcon,
  ShoppingCart,
  Newspaper,
  Lightbulb,
} from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  summary: string;
  details: string;
  timeline: string;
  deliverable: string;
  idealFor: string;
  startingAt: string;
  outcomes: string[];
}

export const services: ServiceItem[] = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    summary:
      'Plan, build, and launch complete web products with clean architecture and production-grade quality.',
    timeline: '4-8 weeks',
    deliverable: 'Web app + deployment',
    idealFor: 'Founders, SaaS MVPs, and businesses moving from no-code to scalable products.',
    startingAt: 'Starting at INR 75k',
    outcomes: [
      'Production-ready app with secure backend and API layer',
      'Responsive frontend optimized for performance',
      'Deployment handoff with maintainable codebase',
    ],
    details:
      'I handle the full implementation cycle: architecture, database modeling, backend logic, frontend build, QA, and deployment. You get one accountable execution path from idea to launch.',
  },
  {
    icon: Layout,
    title: 'UI/UX Design and Strategy',
    summary:
      'Design interfaces that communicate value clearly, reduce friction, and improve user action rates.',
    timeline: '1-3 weeks',
    deliverable: 'Wireframes + UI system',
    idealFor: 'Teams with unclear conversion flow, weak hierarchy, or outdated interface design.',
    startingAt: 'Starting at INR 25k',
    outcomes: [
      'Clear page structure with high-intent user journeys',
      'Reusable design patterns for consistent product experience',
      'Improved CTA visibility and content hierarchy',
    ],
    details:
      'This service focuses on structure before visuals. I map user intent, define page goals, and turn them into high-clarity screens with conversion-aware UX decisions.',
  },
  {
    icon: Search,
    title: 'SEO and Performance Optimization',
    summary:
      'Improve technical SEO and loading performance so the right audience can find and use your site faster.',
    timeline: '1-2 weeks',
    deliverable: 'Technical audit + fixes',
    idealFor: 'Websites with low organic visibility, poor speed scores, or weak technical foundations.',
    startingAt: 'Starting at INR 18k',
    outcomes: [
      'Faster pages with better Core Web Vitals',
      'Stronger metadata, structure, and crawlability',
      'Actionable SEO and performance improvement roadmap',
    ],
    details:
      'I optimize crawlability and runtime behavior together: metadata quality, semantic structure, internal linking, media optimization, caching strategy, and frontend performance tuning.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Build and Conversion',
    summary:
      'Build or refine e-commerce experiences with stronger catalog clarity and conversion-focused checkout flow.',
    timeline: '3-6 weeks',
    deliverable: 'Store setup + conversion flow',
    idealFor: 'Brands facing low conversion, weak product discovery, or checkout drop-offs.',
    startingAt: 'Starting at INR 55k',
    outcomes: [
      'Improved product page clarity and trust structure',
      'Better category/filter journeys for faster discovery',
      'Checkout flow improvements to reduce drop-off',
    ],
    details:
      'I focus on business outcomes, not just storefront design. The work includes taxonomy, product page UX, trust layers, and conversion-critical checkout improvements.',
  },
  {
    icon: Newspaper,
    title: 'CMS Website Development',
    summary:
      'Create flexible CMS-driven websites that non-technical teams can update without breaking design quality.',
    timeline: '2-4 weeks',
    deliverable: 'Editable CMS site',
    idealFor: 'Teams needing frequent content updates with structured, scalable page templates.',
    startingAt: 'Starting at INR 35k',
    outcomes: [
      'Modular page sections for easier content publishing',
      'Cleaner admin workflows for non-technical editors',
      'Design consistency preserved across new pages',
    ],
    details:
      'I build CMS structures that balance flexibility and control. Your team can publish confidently while layout quality, readability, and performance remain stable.',
  },
  {
    icon: Lightbulb,
    title: 'Content and Messaging Strategy',
    summary:
      'Define positioning and page messaging that builds trust quickly and moves visitors toward action.',
    timeline: '1-2 weeks',
    deliverable: 'Messaging blueprint',
    idealFor: 'Founders and service businesses with unclear value communication on web pages.',
    startingAt: 'Starting at INR 15k',
    outcomes: [
      'Sharper service positioning and offer clarity',
      'Conversion-oriented copy blocks for key pages',
      'Stronger case-study and proof narrative structure',
    ],
    details:
      'I turn vague messaging into practical, conversion-focused content frameworks for home, services, and case-study pages with SEO-aware structure.',
  },
  {
    icon: Bot,
    title: 'AI Integration and Automation',
    summary:
      'Integrate practical AI features and workflow automations that save time and improve service quality.',
    timeline: '1-3 weeks',
    deliverable: 'AI workflow integration',
    idealFor: 'Teams that want AI-assisted support, content workflows, or smart form/process automation.',
    startingAt: 'Starting at INR 30k',
    outcomes: [
      'AI-assisted flows integrated into real product journeys',
      'Reduced repetitive manual work in operations',
      'Safer, scoped implementation with fallback behavior',
    ],
    details:
      'I implement AI where it creates measurable value, not hype. This includes assistant flows, prompt pipelines, structured outputs, and integration with your existing app/backend logic.',
  },
  {
    icon: LifeBuoy,
    title: 'Maintenance and Support Retainer',
    summary:
      'Keep your website or app stable, updated, and secure with ongoing technical support after launch.',
    timeline: 'Monthly',
    deliverable: 'Retainer support plan',
    idealFor: 'Businesses that need reliable updates, bug fixes, monitoring, and incremental improvements.',
    startingAt: 'Starting at INR 12k/month',
    outcomes: [
      'Faster bug resolution and release turnaround',
      'Reduced risk from outdated dependencies and regressions',
      'Consistent product health with proactive maintenance',
    ],
    details:
      'I provide structured post-launch support including bug fixes, dependency updates, light feature iterations, performance checks, and technical guidance for roadmap decisions.',
  },
  {
    icon: BarChart3,
    title: 'Analytics and CRO Setup',
    summary:
      'Set up tracking and conversion experiments so product decisions are driven by real user behavior.',
    timeline: '1-2 weeks',
    deliverable: 'Tracking + CRO baseline',
    idealFor: 'Products with traffic but unclear funnel visibility or weak conversion performance.',
    startingAt: 'Starting at INR 20k',
    outcomes: [
      'Reliable event tracking across key user journeys',
      'Clear funnel visibility for drop-off diagnosis',
      'Prioritized CRO actions based on measurable data',
    ],
    details:
      'I define event strategy, implement analytics instrumentation, and structure conversion measurement so you can identify bottlenecks and optimize the highest-impact steps first.',
  },
];
