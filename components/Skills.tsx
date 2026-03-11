'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import SkillCard from '@/components/ui/SkillCard';
import { skillCategories } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="section-padding border-t border-white/[0.04]">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Skills"
          heading="My Toolkit"
          subheading="Carefully chosen tools and technologies I use to build world-class digital products."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
