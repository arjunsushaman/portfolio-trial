'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  className?: string;
  index?: string;
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  className,
  index,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  return (
    <div
      ref={ref}
      className={cn('mb-14 md:mb-20', align === 'center' && 'text-center', className)}
    >
      {(eyebrow || index) && (
        <motion.div
          className={cn('flex items-center gap-4 mb-5', align === 'center' && 'justify-center')}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {index && (
            <span className="font-mono text-[10px] text-white/20 tracking-[0.25em]">{index}</span>
          )}
          {eyebrow && (
            <>
              <div className="w-8 h-px bg-accent/50" />
              <span className="font-mono text-[10px] text-accent/70 tracking-[0.3em] uppercase">{eyebrow}</span>
            </>
          )}
        </motion.div>
      )}

      <div className="overflow-hidden">
        <motion.h2
          className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.04]"
          initial={{ y: '105%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {heading}
        </motion.h2>
      </div>

      {subheading && (
        <motion.p
          className="font-grotesk text-white/45 text-base md:text-lg mt-5 max-w-xl leading-relaxed"
          style={align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}
