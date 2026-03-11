'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/animations';

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <div
      ref={ref}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <motion.p
          className="font-grotesk text-xs tracking-[0.3em] uppercase text-accent mb-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        {heading}
      </motion.h2>
      {subheading && (
        <motion.p
          className="font-grotesk text-white/50 text-base md:text-lg mt-4 max-w-xl leading-relaxed"
          style={align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}
