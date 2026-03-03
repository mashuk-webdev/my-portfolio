export interface Project {
  title: string;
  slug: string;
  projectType?: 'Client' | 'Concept';
  legacySlugs?: string[];
  client?: string;
  industry?: string;
  timeline?: string;
  role?: string;
  scope?: string[];
  summary: string;
  tech: string[];
  impact?: Array<{
    label: string;
    value: string;
  }>;
  images: string[];
  links: {
    live?: string;
  };
  details: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  author?: string;
  image: string;
  tags: string[];
  content: string;
}
