'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, ShoppingCart, Settings } from 'lucide-react';
import { SkillCategory } from '@/data/skills';

const iconMap: Record<string, React.ElementType> = {
  monitor: Monitor,
  'shopping-cart': ShoppingCart,
  settings: Settings,
};

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export default function SkillCard({ category, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const Icon = iconMap[category.icon] ?? Monitor;

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl p-8 flex flex-col gap-7 group overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
      whileHover={{
        borderColor: 'rgba(0,255,245,0.18)',
        background: 'rgba(255,255,255,0.035)',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12 }}
    >
      {/* Decorative large background number */}
      <div
        className="absolute bottom-4 right-5 font-syne font-bold text-[7rem] leading-none select-none pointer-events-none text-white/[0.025] group-hover:text-accent/[0.04] transition-colors duration-500"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Top edge glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/40 transition-all duration-500" />

      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(ellipse,rgba(0,255,245,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="font-mono text-[9px] text-accent/40 tracking-[0.3em] uppercase mb-2.5">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="font-syne text-xl font-semibold text-white leading-tight group-hover:text-white/95 transition-colors duration-300">
            {category.title}
          </h3>
          <p className="font-grotesk text-sm text-white/35 mt-2 leading-relaxed">{category.description}</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-accent/[0.14] group-hover:border-accent/25 transition-all duration-300">
          <Icon size={18} className="text-accent" />
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-white/[0.05] group-hover:bg-accent/[0.08] transition-colors duration-500 relative z-10" />

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill.name}
            className="font-mono text-[10px] px-3 py-1.5 rounded-lg border border-white/[0.07] text-white/45 hover:border-accent/40 hover:text-accent hover:bg-accent/[0.05] transition-all duration-200 cursor-default tracking-wide"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.35, delay: index * 0.08 + i * 0.04 + 0.3 }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
