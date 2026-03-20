'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillCard from '@/components/ui/SkillCard';

// All individual skills for the marquee
const allSkills = [
  'React', 'Next.js', 'Angular', 'React Native', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'WebGL',
  'Shopify', 'Strapi', 'CMS', 'WordPress', 'Elementor', 'WebSockets', 'Contentful', 'Stripe',
  'GraphQL', 'REST APIs', 'Vercel', 'Figma', 'Git', 'Jest', 'Vitest', 'CI/CD',
  'Vue.js', 'Node.js', 'Supabase', 'Prisma',
];
const tickerA = [...allSkills, ...allSkills];
const tickerB = [...allSkills].reverse().concat([...allSkills].reverse());

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Ambient orb */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[120px] translate-x-1/3" />
      </div>

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="Skills"
          heading="My Toolkit"
          subheading="Carefully chosen tools and technologies I reach for to build world-class digital products."
          index="02"
        />
      </div>

      {/* ── Dual-direction tech marquee ── */}
      <div ref={ref} className="mb-14 md:mb-16 space-y-2 overflow-hidden">
        {/* Row A — left scroll */}
        <motion.div
          className="opacity-0"
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex animate-ticker whitespace-nowrap py-1">
            {tickerA.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-0 mx-1.5"
              >
                <span className="font-mono text-[10px] px-3.5 py-1.5 rounded-full border border-white/[0.07] text-white/30 tracking-[0.15em] hover:border-accent/35 hover:text-accent/70 transition-all duration-200 cursor-default whitespace-nowrap">
                  {skill}
                </span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Row B — right scroll (reverse direction) */}
        <motion.div
          className="opacity-0"
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex animate-ticker-reverse whitespace-nowrap py-1">
            {tickerB.map((skill, i) => (
              <span key={i} className="inline-flex items-center gap-0 mx-1.5">
                <span className="font-mono text-[10px] px-3.5 py-1.5 rounded-full border border-white/[0.05] text-white/18 tracking-[0.15em] whitespace-nowrap">
                  {skill}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Category cards ── */}
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
