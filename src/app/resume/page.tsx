
import type { Metadata } from 'next';
import { Briefcase, User, Mail, Phone, MapPin, Linkedin, Github, Twitter, Code, Link as LinkIcon } from 'lucide-react';
import { AnimatedDiv } from '@/components/shared/animated-div';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PageStoryIntro } from '@/components/shared/page-story-intro';
import { profile } from '@/data/site';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'The professional resume of Mashuk, a Full-Stack Developer.',
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: 'Resume',
    description: 'The professional resume of Mashuk, a Full-Stack Developer.',
    url: '/resume',
    type: 'profile',
  },
};

const resumeData = {
  name: profile.name,
  title: profile.title,
  contact: {
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    linkedin: profile.social.linkedin,
    github: profile.social.github,
    twitter: profile.social.twitter,
  },
  summary:
    'Outcome-focused Full-Stack Developer with freelance delivery experience since 2019. I help founders and growing teams ship fast, conversion-ready web products with clear UX, dependable engineering, and practical launch strategy.',
  impactHighlights: [
    '20+ client projects delivered across service, e-commerce, and NGO domains',
    'Up to 40% inquiry uplift through conversion-focused UX and messaging',
    '90+ PageSpeed outcomes on key landing and product pages',
  ],
  experience: [
    {
      title: 'Freelance Full-Stack Developer and Product Partner',
      company: 'Independent',
      period: '2019 - Present',
      summary:
        'Own end-to-end product delivery from discovery to launch for founders, service businesses, and organizations that need speed with production reliability.',
      highlights: [
        'Delivered 20+ websites and web apps with structured milestones and reliable handoff.',
        'Led architecture, UI implementation, testing, SEO setup, and deployment workflows.',
        'Improved lead quality and conversion rates through CTA hierarchy, trust sections, and friction reduction.',
        'Built secure contact and data workflows using validation, anti-spam layers, and rate limiting.',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Jamia Hamdard',
    period: '2022 - 2025',
    status: 'Graduated in 2025',
    relevantCoursework: 'Data Structures & Algorithms, Database Management, Object-Oriented Programming, Web Technologies.',
  },
  technicalSkills: [
    {
      category: 'Frontend',
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Responsive UI Architecture'],
    },
    {
      category: 'Backend and Data',
      skills: ['Node.js', 'Express.js', 'Firebase', 'Firestore', 'Server Actions', 'Form and API Validation'],
    },
    {
      category: 'Performance and SEO',
      skills: ['Core Web Vitals Optimization', 'Technical SEO', 'Metadata Strategy', 'Image and Render Optimization'],
    },
    {
      category: 'AI and Automation',
      skills: ['Genkit', 'Gemini API Integration', 'Prompt Workflows', 'Content and SEO Assistive Tools'],
    },
    {
      category: 'CMS & E-Commerce',
      skills: ['WordPress', 'WooCommerce', 'Shopify', 'Catalog UX', 'Checkout Flow Optimization'],
    },
    {
      category: 'Tools and Delivery',
      skills: ['Git and GitHub', 'Vercel', 'Firebase App Hosting', 'Google Analytics', 'Client Documentation'],
    },
  ],
  softSkills: [
    'Client Communication',
    'Problem Solving',
    'Execution Discipline',
    'Product Thinking',
    'Documentation and Handoffs',
  ],
  languages: [
    { name: 'English', proficiency: 'Professional Working Proficiency' },
    { name: 'Hindi', proficiency: 'Native or Bilingual Proficiency' },
  ],
  projects: (() => {
    const resumeProjectSlugs = [
      'shubhamkriti-jewels-commerce',
      'amiro-ecommerce',
      'anuvridhi-ngo',
    ];

    const curatedProjects = resumeProjectSlugs
      .map((slug) => projects.find((project) => project.slug === slug))
      .filter((project): project is (typeof projects)[number] => Boolean(project));

    if (curatedProjects.length === resumeProjectSlugs.length) {
      return curatedProjects;
    }

    return projects.filter((project) => project.projectType === 'Client').slice(0, 3);
  })(),
};

export default function ResumePage() {
  return (
    <>
      <PageStoryIntro
        chapter="Resume"
        title="Experience, Stack, and Delivery Mindset"
        description="A structured snapshot of my work history, core capabilities, and the technologies I use to ship fast and reliable products."
      />
      <div className="container mx-auto max-w-6xl px-4 pb-28">
        <AnimatedDiv className="bg-card p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl border shadow-primary/10">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{resumeData.name}</h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-medium mt-2">{resumeData.title}</h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <AnimatedDiv>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <a href={`mailto:${resumeData.contact.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"><Mail className="w-5 h-5 text-primary/80" /> {resumeData.contact.email}</a>
                <a href={`tel:${resumeData.contact.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"><Phone className="w-5 h-5 text-primary/80" /> {resumeData.contact.phone}</a>
                <div className="flex items-center gap-3 text-muted-foreground"><MapPin className="w-5 h-5 text-primary/80" /> {resumeData.contact.location}</div>
              </div>
            </AnimatedDiv>
            
            <Separator />
            
            <AnimatedDiv>
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <div className="space-y-3 text-sm">
                 <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5 text-primary/80" /> LinkedIn</a>
                 <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub"><Github className="w-5 h-5 text-primary/80" /> GitHub</a>
                 <a href={resumeData.contact.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5 text-primary/80" /> Twitter</a>
              </div>
            </AnimatedDiv>

            <Separator />

            <AnimatedDiv delay="0.1s">
              <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
              <div className="space-y-4">
                {resumeData.technicalSkills.map(group => (
                  <div key={group.category}>
                    <h4 className="font-semibold text-primary/90 mb-2 text-sm">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedDiv>

             <Separator />

            <AnimatedDiv delay="0.2s">
              <h3 className="text-xl font-bold mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.softSkills.map(skill => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </AnimatedDiv>

            <Separator />

            <AnimatedDiv delay="0.3s">
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <div>
                <h4 className="font-semibold">{resumeData.education.degree}</h4>
                <p className="text-muted-foreground text-sm">{resumeData.education.institution}</p>
                <p className="text-muted-foreground text-sm">{resumeData.education.period}</p>
                <p className="text-muted-foreground text-sm">{resumeData.education.status}</p>
                {resumeData.education.relevantCoursework && (
                    <p className="text-xs text-muted-foreground mt-2">
                        <strong>Relevant Coursework:</strong> {resumeData.education.relevantCoursework}
                    </p>
                )}
              </div>
            </AnimatedDiv>

            <Separator />

             <AnimatedDiv delay="0.4s">
              <h3 className="text-xl font-bold mb-4">Languages</h3>
               <div className="space-y-1">
                {resumeData.languages.map(lang => (
                  <div key={lang.name}>
                    <p className="font-semibold text-sm">{lang.name} <span className="text-xs text-muted-foreground">({lang.proficiency})</span></p>
                  </div>
                ))}
              </div>
            </AnimatedDiv>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-12">
            <AnimatedDiv delay="0.1s">
              <h3 className="flex items-center gap-3 text-2xl font-bold mb-4 text-primary"><User className="w-7 h-7" /> Summary</h3>
              <p className="text-muted-foreground leading-relaxed">{resumeData.summary}</p>
              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {resumeData.impactHighlights.map((item) => (
                  <div key={item} className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedDiv>

            <AnimatedDiv delay="0.2s">
              <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 text-primary"><Briefcase className="w-7 h-7" /> Work Experience</h3>
              <div className="space-y-8 relative before:absolute before:inset-y-0 before:w-0.5 before:bg-border before:left-3">
                {resumeData.experience.map((job) => (
                  <div key={`${job.company}-${job.period}`} className="pl-10 relative">
                    <div className="absolute left-0 top-1.5 w-3 h-3 bg-primary rounded-full border-4 border-card"></div>
                    <p className="text-sm text-muted-foreground mb-1">{job.period}</p>
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <p className="font-medium text-primary/90">{job.company}</p>
                    <p className="mt-2 text-muted-foreground leading-relaxed text-sm">{job.summary}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {job.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimatedDiv>

            <AnimatedDiv delay="0.3s">
              <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 text-primary"><Code className="w-7 h-7" /> Featured Projects</h3>
              <div className="space-y-6">
                {resumeData.projects.map((project) => (
                  <div key={project.slug} className="p-4 rounded-lg border bg-background/50 hover:border-primary/50 hover:bg-card/50 transition-all">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                        <h4 className="font-semibold">{project.title}</h4>
                        {project.links.live && (
                           <Button variant="link" size="sm" asChild className="p-0 h-auto">
                             <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                               View Project <LinkIcon className="ml-1 w-4 h-4" />
                              </a>
                           </Button>
                        )}
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">{project.summary}</p>
                    {project.impact && project.impact.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.impact.slice(0, 2).map((metric) => (
                          <Badge key={`${project.slug}-${metric.label}`} variant="outline" className="text-xs">
                            {metric.value} {metric.label}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {project.tech.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                    </div>
                  </div>
                ))}
                 <Button asChild className="w-full mt-4">
                    <Link href="/projects">View All Projects</Link>
                 </Button>
              </div>
            </AnimatedDiv>
          </div>
        </div>
        </AnimatedDiv>
      </div>
    </>
  );
}
