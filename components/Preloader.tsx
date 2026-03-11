'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '@/data/personal';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    // Hide preloader after 2.5s
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 700);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const letters = personal.name.split('');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99997] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Name reveal */}
          <div className="overflow-hidden mb-8">
            <motion.div
              className="flex gap-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
              }}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-syne text-4xl md:text-6xl font-bold tracking-tight text-white"
                  variants={{
                    hidden: { y: '110%' },
                    visible: {
                      y: '0%',
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            className="font-grotesk text-sm text-white/40 tracking-[0.3em] uppercase mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.6 } }}
          >
            {personal.tagline}
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Counter */}
          <motion.span
            className="font-grotesk text-xs text-white/30 mt-3 tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
