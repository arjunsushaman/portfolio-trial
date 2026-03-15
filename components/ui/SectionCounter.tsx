'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionCounter() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers = sections.map((section, index) => {
      const el = document.getElementById(section.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setActiveIndex(index);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <div className="fixed right-5 bottom-8 z-[900] hidden lg:flex flex-col items-end gap-1.5" aria-hidden="true">
      {/* Section label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={sections[activeIndex].label}
          className="font-mono text-[8px] text-white/20 tracking-[0.2em] uppercase mb-0.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {sections[activeIndex].label}
        </motion.span>
      </AnimatePresence>

      {/* Vertical dots */}
      <div className="flex flex-col items-center gap-1.5">
        {sections.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              document.getElementById(sections[i].id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-1 rounded-full transition-all duration-400"
            animate={{
              height: i === activeIndex ? 20 : 4,
              backgroundColor: i === activeIndex ? 'rgba(0,255,245,0.7)' : 'rgba(255,255,255,0.12)',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Counter */}
      <span className="font-mono text-[8px] text-white/15 tracking-[0.15em] mt-0.5">
        {String(activeIndex + 1).padStart(2, '0')}/{String(sections.length).padStart(2, '0')}
      </span>
    </div>
  );
}
