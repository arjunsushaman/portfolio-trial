export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Frameworks',
    description: 'Building fast, accessible, and beautiful user interfaces.',
    icon: 'monitor',
    skills: [
      { name: 'React / Next.js', level: 98 },
      { name: 'JavaScript, TypeScript', level: 95 },
      { name: 'Tailwind CSS', level: 97 },
      { name: 'Framer Motion', level: 90 },
      { name: 'Vue / Angular', level: 80 },
      { name: 'Three.js / WebGL', level: 75 },
    ],
  },
  {
    id: 'cms',
    title: 'CMS & eCommerce',
    description: 'Content platforms and commerce solutions that scale.',
    icon: 'shopping-cart',
    skills: [
      { name: 'Shopify / Hydrogen', level: 92 },
      { name: 'WordPress / Elementor', level: 90 },
      { name: 'Contentful', level: 85 },
      { name: 'Sanity.io', level: 88 },
      { name: 'Strapi', level: 90 },
      { name: 'Stripe Integration', level: 85 },
      { name: 'WooCommerce', level: 80 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    description: 'Modern tooling for shipping quality code at speed.',
    icon: 'settings',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Figma → Code', level: 92 },
      { name: 'Vercel / Netlify', level: 93 },
      { name: 'GraphQL / REST', level: 88 },
      { name: 'Testing (Jest/Vitest)', level: 82 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Docker', level: 80 },
      { name: 'Vibe Coding', level: 99 }
    ],
  },
];
