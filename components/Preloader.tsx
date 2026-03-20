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
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 700);
    }, 2500);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onComplete]);

  const letters = personal.name.split('');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99997] flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(0,255,245,0.05)_0%,transparent_70%)]" />
          </div>

          {/* Letter-by-letter name reveal */}
          <div className="overflow-hidden mb-3 relative z-10 px-4 md:px-0">
            <motion.div
              className="flex flex-wrap justify-center gap-[2px] md:flex-nowrap"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
              }}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
                  variants={{
                    hidden: { y: '110%' },
                    visible: { y: '0%', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            className="font-mono text-[10px] text-white/35 tracking-[0.4em] uppercase mb-14 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.7 } }}
          >
            {personal.tagline}
          </motion.p>

          {/* Progress */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
          >
            <div className="w-40 h-px bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${progress}%`, transition: 'width 40ms linear' }}
              />
            </div>
            <span className="font-mono text-[10px] text-white/25 tabular-nums tracking-widest">
              {String(progress).padStart(3, '0')}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
