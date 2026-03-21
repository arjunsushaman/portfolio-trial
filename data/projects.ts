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
    title: 'Cho Asia',
    client: 'Restaurant Web App',
    category: 'CMS/WordPress',
    description:
      'eCommerce and booking ecosystem for a UK-based Pan-Asian restaurant using WordPress, Elementor Pro, and WooCommerce. Integrated real-time online ordering and automated seat reservations, optimized with Yoast SEO to drive local digital growth.',
    tech: ['Wordpress', 'Elementor Pro', 'Yoast SEO', 'WooCommerce', 'WP Rocket'],
    imageUrl: '/projects/choasia.png',
    liveUrl: 'https://choasia.com/',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Swasti Lifecare',
    client: 'Clinic',
    category: 'Web App',
    description:
      'A modern, responsive web application for a clinic, featuring appointment booking, service information, and patient testimonials. The site is built with Next.js and Tailwind CSS, ensuring fast load times and a seamless user experience.',
    tech: ['Next.js', 'EmailJS', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: '/projects/swasti.png',
    liveUrl: 'https://swastilifecare.in/',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Lead By Sethulekshmi',
    client: 'Counselling Center',
    category: 'Web App',
    description:
      'Developed a responsive React web app for a psychology practice featuring seamless online appointment booking and SEO optimization. Engineered with a mobile-first UI and accessible design to streamline patient onboarding and clinical reach.',
    tech: ['React', 'EmailJS', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: '/projects/leadbysethulekshmi.png',
    liveUrl: 'https://www.leadbysethulekshmi.com/',
    featured: false,
  },
  {
    id: 'proj-4',
    title: 'Find your Spark',
    client: 'Service Marketplace',
    category: 'Web App',
    description:
      'Engineered a high-fidelity service marketplace MVP to help a startup secure early-stage investor funding. Developed the core listing engine, user matching logic, and a scalable architecture designed for rapid post-funding growth.',
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
    imageUrl: '/projects/marketplace.png',
    liveUrl: 'https://find-your-spark-74.vercel.app/',
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'Maple Hook Studio',
    client: 'Shopify Store',
    category: 'eCommerce',
    description:
      'Developed a custom Shopify storefront for an artisanal crochet brand, featuring high-conversion product pages and a seamless Stripe checkout.',
    tech: ['Shopify', 'Stripe', 'Klaviyo'],
    imageUrl: '/projects/shopify.png',
    liveUrl: 'https://maple-hook-studio.myshopify.com/',
    featured: true,
  },
];
