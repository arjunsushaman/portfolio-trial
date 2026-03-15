'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function GlowDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <div ref={ref} className="relative h-px overflow-visible">
      {/* Base line */}
      <div className="absolute inset-0 bg-white/[0.04]" />

      {/* Animated glow sweep */}
      <motion.div
        className="absolute inset-y-[-2px] left-0 right-0"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0,255,245,0.0) 20%, rgba(0,255,245,0.18) 50%, rgba(0,255,245,0.0) 80%, transparent 100%)',
            filter: 'blur(1px)',
          }}
        />
      </motion.div>

      {/* Center glow dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 0.6, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{ boxShadow: '0 0 12px 4px rgba(0,255,245,0.2)' }}
      />
    </div>
  );
}
