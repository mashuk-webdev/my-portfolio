export type NavLink = {
  href: string;
  label: string;
};

export const profile = {
  name: 'Mashuk',
  title: 'Full-Stack Developer',
  location: 'Delhi, India',
  email: 'mdmashuk042@gmail.com',
  phone: '+919205838459',
  social: {
    linkedin: 'https://www.linkedin.com/in/md-mashuk-45b041361/',
    github: 'https://github.com/mashuk-webdev',
    twitter: 'https://x.com/mashuk69773',
    twitterHandle: '@mashuk69773',
  },
} as const;

export const primaryNavLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export const footerNavLinks: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const socialLinks = [
  { href: profile.social.github, label: 'GitHub' },
  { href: profile.social.twitter, label: 'Twitter' },
  { href: profile.social.linkedin, label: 'LinkedIn' },
] as const;
