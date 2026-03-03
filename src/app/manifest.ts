import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mashuk Portfolio',
    short_name: 'Mashuk',
    description:
      'Personal portfolio of Mashuk, a full-stack developer, showcasing projects, skills, and services.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F1724',
    theme_color: '#0F1724',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
