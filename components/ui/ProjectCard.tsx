'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/projects';
import { cardVariant } from '@/lib/animations';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 280, damping: 28 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      transition={{ delay: (index % 3) * 0.1 }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={ref}
        className="card-glass rounded-2xl overflow-hidden group cursor-pointer hover:border-white/[0.1] transition-colors duration-300"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10] md:aspect-[16/9] bg-surface">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="font-mono text-[9px] px-3 py-1 rounded-full bg-background/80 backdrop-blur text-accent border border-accent/20 tracking-wider uppercase">
              {project.category}
            </span>
          </div>
          {project.liveUrl && project.liveUrl !== '#' && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-background hover:bg-white transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={15} />
              </a>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-mono text-[9px] text-white/30 mb-1.5 tracking-wider uppercase">{project.client}</p>
              <h3 className="font-syne text-xl font-bold text-white leading-tight">{project.title}</h3>
            </div>
            <ArrowUpRight size={18} className="text-white/20 group-hover:text-accent transition-colors duration-300 mt-1 flex-shrink-0" />
          </div>
          <p className="font-grotesk text-sm text-white/45 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="font-mono text-[9px] px-2.5 py-1 rounded border border-white/[0.07] text-white/35 tracking-wide">
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="font-mono text-[9px] px-2.5 py-1 rounded border border-white/[0.05] text-white/20">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
