'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, ShoppingCart, Settings } from 'lucide-react';
import { SkillCategory } from '@/data/skills';
import { cardVariant } from '@/lib/animations';

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
  const Icon = iconMap[category.icon] || Monitor;

  return (
    <motion.div
      ref={ref}
      className="card-glass rounded-2xl p-8 flex flex-col gap-6 hover:border-white/[0.12] transition-colors duration-500"
      variants={cardVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="font-syne text-lg font-semibold text-white">{category.title}</h3>
          <p className="font-grotesk text-sm text-white/50 mt-1">{category.description}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-4">
        {category.skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1.5">
              <span className="font-grotesk text-sm text-white/70">{skill.name}</span>
              <span className="font-grotesk text-xs text-accent/70">{skill.level}%</span>
            </div>
            <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1 + i * 0.08 + 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
