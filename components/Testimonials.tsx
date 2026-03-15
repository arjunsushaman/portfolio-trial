'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

const DURATION = 6500;

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const advance = useCallback((dir: 1 | -1 = 1) => {
    setActiveIndex((i) => (i + dir + testimonials.length) % testimonials.length);
    setProgress(0);
    startTimeRef.current = 0;
  }, []);

  useEffect(() => {
    if (isPaused || !inView) return;

    const tick = (time: number) => {
      if (startTimeRef.current === 0) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        advance(1);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, inView, activeIndex, advance]);

  const active = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-padding relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent/[0.02] blur-[130px]" />
      </div>

      <div className="container-wide relative z-10">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[10px] text-white/20 tracking-[0.25em]">05</span>
          <div className="w-8 h-px bg-accent/50" />
          <span className="font-mono text-[10px] text-accent/70 tracking-[0.3em] uppercase">Testimonials</span>
        </motion.div>

        {/* ── Cinematic quote area ── */}
        <div className="relative min-h-[340px] md:min-h-[300px]">

          {/* Giant decorative quote mark */}
          <motion.div
            className="absolute -top-8 -left-4 md:-left-8 font-syne font-bold select-none pointer-events-none leading-none"
            style={{
              fontSize: 'clamp(8rem, 18vw, 16rem)',
              color: 'rgba(0,255,245,0.06)',
              lineHeight: 1,
            }}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            &ldquo;
          </motion.div>

          {/* Quote content — animated crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative z-10 max-w-4xl"
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Quote text */}
              <blockquote
                className="font-syne font-semibold leading-[1.25] text-white/85 mb-10"
                style={{ fontSize: 'clamp(1.35rem, 2.8vw, 2.1rem)' }}
              >
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-accent/20">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-syne font-semibold text-white text-base">{active.name}</p>
                  <p className="font-mono text-[10px] text-white/35 tracking-wider mt-0.5">
                    {active.role} — {active.company}
                  </p>
                </div>
                {/* Accent line */}
                <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-[120px]" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center justify-between mt-14 md:mt-16">

          {/* Progress indicators */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); setProgress(0); startTimeRef.current = 0; }}
                className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === activeIndex ? '48px' : '20px', backgroundColor: 'rgba(255,255,255,0.08)' }}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                {i === activeIndex && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-accent rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => advance(-1)}
              className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-accent hover:border-accent/30 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => advance(1)}
              className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-accent hover:border-accent/30 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Counter */}
            <span className="font-mono text-[10px] text-white/20 tracking-[0.2em] ml-2">
              {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Small grid preview of all testimonials below (desktop) ── */}
        <div className="hidden lg:grid grid-cols-3 gap-5 mt-14 border-t border-white/[0.04] pt-10">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => { setActiveIndex(i); setProgress(0); startTimeRef.current = 0; }}
              className={`text-left p-5 rounded-2xl border transition-all duration-400 group ${
                i === activeIndex
                  ? 'border-accent/25 bg-accent/[0.04]'
                  : 'border-white/[0.05] bg-white/[0.01] hover:border-white/[0.1]'
              }`}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="32px" />
                </div>
                <div>
                  <p className={`font-syne font-semibold text-xs transition-colors duration-300 ${i === activeIndex ? 'text-white' : 'text-white/60'}`}>
                    {t.name}
                  </p>
                  <p className="font-mono text-[8px] text-white/25 tracking-wide">{t.company}</p>
                </div>
              </div>
              <p className={`font-grotesk text-xs leading-relaxed line-clamp-2 transition-colors duration-300 ${i === activeIndex ? 'text-white/50' : 'text-white/25'}`}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
}
