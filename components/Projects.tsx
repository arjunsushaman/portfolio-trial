'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

const filters = ['All', 'Web App', 'eCommerce', 'CMS/WordPress'] as const;
type Filter = typeof filters[number];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding border-t border-white/[0.04]">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <SectionHeader
            eyebrow="Work"
            heading="Selected Projects"
            subheading="A curated selection of client work that made a measurable difference."
            className="mb-0"
          />

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'font-grotesk text-sm px-4 py-2 rounded-full border transition-all duration-300',
                  activeFilter === filter
                    ? 'bg-accent text-background border-accent font-medium'
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-grotesk text-white/30 text-sm">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
