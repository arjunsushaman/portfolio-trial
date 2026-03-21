'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects, Project } from '@/data/projects';
import { cn } from '@/lib/utils';

const filters = ['All', 'Web App', 'eCommerce', 'CMS/WordPress'] as const;
type Filter = typeof filters[number];

// ─── Desktop list row ────────────────────────────────────────────────────────
function ProjectListRow({
  project,
  index,
  onHover,
  isHovered,
}: {
  project: Project;
  index: number;
  onHover: (id: string | null) => void;
  isHovered: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
    >
      <a
        href={project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : undefined}
        target={project.liveUrl && project.liveUrl !== '#' ? '_blank' : undefined}
        rel="noopener noreferrer"
        className={cn(
          'group flex items-center justify-between gap-6 py-7 border-b transition-all duration-300',
          isHovered
            ? 'border-accent/30'
            : 'border-white/[0.06] hover:border-white/[0.12]'
        )}
        data-cursor="project"
        onMouseEnter={() => onHover(project.id)}
        onMouseLeave={() => onHover(null)}
        onClick={(e) => {
          if (!project.liveUrl || project.liveUrl === '#') e.preventDefault();
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-7 min-w-0">
          <span className="font-mono text-[10px] text-white/20 tracking-[0.2em] flex-shrink-0 w-5">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <h3 className={cn(
              'font-syne text-2xl md:text-3xl font-bold transition-colors duration-300 leading-tight',
              isHovered ? 'text-accent' : 'text-white group-hover:text-accent'
            )}>
              {project.title}
            </h3>
            <p className="font-mono text-[10px] text-white/30 mt-1 tracking-wide">
              {project.client}&nbsp;·&nbsp;{project.category}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <div className="hidden xl:flex gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span key={tech} className="font-mono text-[9px] px-2.5 py-1 rounded border border-white/[0.06] text-white/25 tracking-wide">
                {tech}
              </span>
            ))}
          </div>
          <ArrowUpRight size={18} className={cn(
            'transition-all duration-300 flex-shrink-0',
            isHovered ? 'text-accent translate-x-0.5 -translate-y-0.5' : 'text-white/20 group-hover:text-accent'
          )} />
        </div>
      </a>
    </motion.div>
  );
}

// ─── Projects section ────────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);
  const hoveredProject = projects.find((p) => p.id === hoveredId) ?? null;

  return (
    <section id="projects" className="section-padding">
      <div className="container-wide">

        {/* Header + filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeader
            eyebrow="Work"
            heading="Selected Projects"
            subheading="Client work that made a measurable difference."
            index="03"
            className="mb-0"
          />
          <div className="flex gap-2 flex-wrap mb-14 md:mb-20">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'font-mono text-[10px] px-4 py-2 rounded-full border transition-all duration-300 tracking-wide',
                  activeFilter === filter
                    ? 'bg-accent text-background border-accent'
                    : 'border-white/10 text-white/40 hover:text-white hover:border-white/25'
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ── Desktop: editorial list + sticky image preview ── */}
        <div className="hidden lg:grid lg:grid-cols-[3fr_2fr] gap-16 items-start">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Column headers */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <span className="font-mono text-[9px] text-white/20 tracking-[0.25em] uppercase pl-12">Project</span>
                  <span className="font-mono text-[9px] text-white/20 tracking-[0.25em] uppercase">Stack</span>
                </div>

                {filtered.map((project, i) => (
                  <ProjectListRow
                    key={project.id}
                    project={project}
                    index={i}
                    onHover={setHoveredId}
                    isHovered={hoveredId === project.id}
                  />
                ))}

                {filtered.length === 0 && (
                  <div className="py-20 text-center">
                    <p className="font-mono text-xs text-white/25">No projects in this category.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky image preview panel */}
          <div className="sticky top-32 self-start">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-[16/9] card-glass">
              <AnimatePresence mode="wait">
                {hoveredProject ? (
                  <motion.div
                    key={hoveredProject.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={hoveredProject.imageUrl}
                      alt={hoveredProject.title}
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                    {/* Layer 1: full-image darkening vignette — works on both light & dark images */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                    {/* Layer 2: solid dark scrim behind the text so copy is always legible */}
                    <div className="absolute bottom-0 left-0 right-0 p-5"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 60%, transparent 100%)' }}
                    >
                      <p className="font-mono text-[9px] text-white/60 tracking-[0.2em] uppercase mb-1">{hoveredProject.client}</p>
                      <p className="font-syne text-lg font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{hoveredProject.title}</p>
                      <p className="font-grotesk text-xs text-white/70 mt-1 line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{hoveredProject.description}</p>
                      {hoveredProject.liveUrl && hoveredProject.liveUrl !== '#' && (
                        <a
                          href={hoveredProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[9px] text-accent mt-3 tracking-wide hover:opacity-70 transition-opacity"
                        >
                          <ExternalLink size={10} />
                          Visit Site
                        </a>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full border border-white/[0.07] flex items-center justify-center">
                      <ArrowUpRight size={16} className="text-white/20" />
                    </div>
                    <p className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase">Hover a project</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Mobile/tablet: card grid ── */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
