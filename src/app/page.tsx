import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/hero-section';
import { HomeStoryTracker } from '@/components/sections/home-story-tracker';

const AboutSection = dynamic(() => import('@/components/sections/about-section'));
const ServicesSection = dynamic(() => import('@/components/sections/services-section'));
const ProjectsSection = dynamic(() => import('@/components/sections/projects-section'));
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials-section'));
const CTASection = dynamic(() => import('@/components/sections/cta-section'));

export default function Home() {
  return (
    <>
      <HomeStoryTracker />
      <HeroSection />
      <AboutSection isHomePage={true} />
      <ServicesSection isHomePage={true} />
      <ProjectsSection isHomePage={true} />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
