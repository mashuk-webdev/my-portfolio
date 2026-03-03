
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { getSiteUrl } from '@/lib/site-url';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { PageTransitionProvider } from '@/components/providers/page-transition-provider';
import { MotionModeProvider } from '@/components/providers/motion-mode-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/shared/custom-cursor';
import { ScrollProgress } from '@/components/shared/scroll-progress';
import { profile } from '@/data/site';

const siteUrl = getSiteUrl();
const socialImage = '/profile-photo.png';
const socialImageAbsoluteUrl = new URL(socialImage, siteUrl).toString();
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim();
const metadataVerification: Metadata['verification'] | undefined =
  googleSiteVerification || bingSiteVerification
    ? {
        ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
        ...(bingSiteVerification
          ? { other: { 'msvalidate.01': bingSiteVerification } }
          : {}),
      }
    : undefined;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: siteUrl,
  image: socialImageAbsoluteUrl,
  jobTitle: profile.title,
  sameAs: [
    profile.social.linkedin,
    profile.social.github,
    profile.social.twitter,
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mashuk Portfolio',
  url: siteUrl,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  applicationName: 'Mashuk Portfolio',
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    'Full-Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Portfolio',
    'Web Developer',
  ],
  title: {
    default: 'Mashuk - Full-Stack Developer',
    template: '%s | Mashuk',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    shortcut: '/icon.png?v=2',
    icon: '/icon.png?v=2',
    apple: '/apple-icon.png?v=2',
  },
  description:
    'Personal portfolio of Mashuk, a full-stack developer, showcasing projects, skills, and services.',
  openGraph: {
    title: 'Mashuk - Full-Stack Developer',
    description: 'Welcome to my digital space. Explore my work, skills, and get in touch.',
    url: siteUrl,
    siteName: 'Mashuk Portfolio',
    images: [
      {
        url: socialImage,
        width: 1152,
        height: 1536,
        alt: `${profile.name} profile photo`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mashuk - Full-Stack Developer',
    description: 'Personal portfolio of Mashuk, a full-stack developer.',
    site: profile.social.twitterHandle,
    creator: profile.social.twitterHandle,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: metadataVerification,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1724' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased')}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MotionModeProvider>
            <ScrollProgress />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <CustomCursor />
            <Header />
            <PageTransitionProvider>{children}</PageTransitionProvider>
            <Footer />
            <Toaster />
          </MotionModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
