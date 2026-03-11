export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Web App' | 'eCommerce' | 'CMS/WordPress' | 'Web App';
  description: string;
  tech: string[];
  imageUrl: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Vanta Dashboard',
    client: 'SaaS Startup',
    category: 'Web App',
    description:
      'A real-time analytics dashboard with complex data visualizations, role-based access control, and websocket-driven live updates. Reduced client reporting time by 60%.',
    tech: ['Next.js', 'TypeScript', 'Recharts', 'Tailwind', 'Supabase'],
    imageUrl: 'https://picsum.photos/seed/proj-1/800/500',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Ember Supply Co.',
    client: 'DTC Brand',
    category: 'eCommerce',
    description:
      'Headless Shopify storefront with custom 3D product viewer, cart animations, and optimistic UI. Achieved sub-2s LCP and 40% checkout conversion improvement.',
    tech: ['Next.js', 'Shopify Hydrogen', 'Three.js', 'Framer Motion'],
    imageUrl: 'https://picsum.photos/seed/proj-2/800/500',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Meridian Magazine',
    client: 'Media Publisher',
    category: 'CMS/WordPress',
    description:
      'High-traffic editorial site on headless WordPress with Next.js frontend, ISR caching, and custom Gutenberg blocks. Handles 500K+ monthly visitors with 99.9% uptime.',
    tech: ['Next.js', 'WordPress', 'GraphQL', 'ACF', 'Vercel'],
    imageUrl: 'https://picsum.photos/seed/proj-3/800/500',
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'proj-4',
    title: 'Finlo Banking App',
    client: 'Fintech Startup',
    category: 'Web App',
    description:
      'Consumer banking web app with end-to-end encryption, biometric auth flows, and WCAG 2.1 AA accessibility compliance. Passed SOC 2 Type II audit.',
    tech: ['React', 'TypeScript', 'Plaid API', 'Stytch Auth', 'Tailwind'],
    imageUrl: 'https://picsum.photos/seed/proj-4/800/500',
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'Bloom Botanicals',
    client: 'Lifestyle Brand',
    category: 'eCommerce',
    description:
      'Shopify Plus store redesign with custom subscription flow, loyalty rewards integration, and immersive product pages. Increased average order value by 35%.',
    tech: ['Shopify Liquid', 'Alpine.js', 'GSAP', 'Klaviyo'],
    imageUrl: 'https://picsum.photos/seed/proj-5/800/500',
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'Arcadia Agency',
    client: 'Creative Agency',
    category: 'CMS/WordPress',
    description:
      'Award-winning agency portfolio on WordPress with WebGL transitions, custom page builder, and a headless CMS setup for the blog. Nominated for Awwwards SOTD.',
    tech: ['WordPress', 'ACF', 'Three.js', 'GSAP', 'PHP'],
    imageUrl: 'https://picsum.photos/seed/proj-6/800/500',
    liveUrl: '#',
    featured: false,
  },
];
