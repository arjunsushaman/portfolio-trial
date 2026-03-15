'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, Pencil, Code2, Rocket, ArrowRight, Clock } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

const STEP_DURATION = 5000; // ms per step

const steps = [
  {
    number: '01',
    title: 'Discovery',
    tagline: 'Understanding the why.',
    description:
      'Deep-dive into your goals, users, and competitive landscape. We align on scope, success metrics, and technical constraints before a single line of code is written.',
    duration: '1–2 weeks',
    icon: Search,
    deliverables: [
      'User research summary',
      'Competitive audit report',
      'Technical scoping document',
      'Project timeline & milestones',
    ],
    color: 'from-accent/10 to-transparent',
  },
  {
    number: '02',
    title: 'Design',
    tagline: 'Making it pixel-perfect.',
    description:
      'High-fidelity Figma prototypes, design tokens, and component specs. I translate your brand vision into a system ready for engineering — with every state, edge case, and interaction defined.',
    duration: '2–3 weeks',
    icon: Pencil,
    deliverables: [
      'Interactive Figma prototype',
      'Full design system & tokens',
      'Component specifications',
      '2 rounds of revisions',
    ],
    color: 'from-blue-500/8 to-transparent',
  },
  {
    number: '03',
    title: 'Build',
    tagline: 'Engineering with precision.',
    description:
      'Iterative development with weekly demos on a private staging environment. Clean, typed code with full test coverage. Performance-first architecture that scales as your business does.',
    duration: '4–8 weeks',
    icon: Code2,
    deliverables: [
      'Weekly Loom walkthroughs',
      'Private staging environment',
      'Documented GitHub PRs',
      'Full TypeScript + tests',
    ],
    color: 'from-violet-500/8 to-transparent',
  },
  {
    number: '04',
    title: 'Launch',
    tagline: 'Ship with confidence.',
    description:
      'Zero-downtime deployment, SEO audit, Core Web Vitals check, and a 30-day post-launch support window. Your product goes live knowing every detail has been verified.',
    duration: '1 week + 30-day support',
    icon: Rocket,
    deliverables: [
      'Lighthouse performance report',
      'Sitemap & SEO submission',
      '30-day Slack support channel',
      'Deployment runbook',
    ],
    color: 'from-emerald-500/8 to-transparent',
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Smooth auto-advance with RAF-based progress
  const tick = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!paused) {
        progressRef.current = Math.min(progressRef.current + (delta / STEP_DURATION) * 100, 100);
        setProgress(progressRef.current);

        if (progressRef.current >= 100) {
          progressRef.current = 0;
          setProgress(0);
          lastTimeRef.current = 0;
          setActive((a) => (a + 1) % steps.length);
        }
      } else {
        lastTimeRef.current = timestamp;
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [paused]
  );

  useEffect(() => {
    if (!inView) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, tick]);

  const handleStepClick = (i: number) => {
    setActive(i);
    progressRef.current = 0;
    setProgress(0);
    lastTimeRef.current = 0;
  };

  const ActiveIcon = steps[active].icon;

  return (
    <section
      id="process"
      ref={ref}
      className="section-padding"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-wide">
        <SectionHeader
          eyebrow="Process"
          heading="How I Work"
          subheading="A battle-tested 4-step process that delivers predictable results, every time."
          index="04"
        />

        {/* ── Desktop: split panel ── */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-0 rounded-2xl overflow-hidden border border-white/[0.06]">

          {/* Left: step navigator */}
          <div className="bg-surface/60 border-r border-white/[0.06] flex flex-col">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;

              return (
                <motion.button
                  key={step.number}
                  onClick={() => handleStepClick(i)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={cn(
                    'relative flex items-center gap-4 px-6 py-5 text-left transition-all duration-300 group border-b border-white/[0.05] last:border-0',
                    isActive ? 'bg-accent/[0.05]' : 'hover:bg-white/[0.02]'
                  )}
                >
                  {/* Active left border */}
                  <div
                    className={cn(
                      'absolute left-0 top-0 bottom-0 w-[2px] rounded-r transition-all duration-300',
                      isActive ? 'bg-accent' : 'bg-transparent'
                    )}
                  />

                  {/* Icon */}
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300',
                    isActive ? 'bg-accent/15 ring-1 ring-accent/25' : 'bg-white/[0.04] group-hover:bg-white/[0.07]'
                  )}>
                    <Icon size={16} className={cn(
                      'transition-colors duration-300',
                      isActive ? 'text-accent' : 'text-white/35 group-hover:text-white/60'
                    )} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] text-white/20 tracking-[0.2em] mb-0.5">{step.number}</p>
                    <p className={cn(
                      'font-syne font-bold text-base transition-colors duration-300 leading-tight',
                      isActive ? 'text-white' : 'text-white/45 group-hover:text-white/70'
                    )}>
                      {step.title}
                    </p>
                  </div>

                  {/* Active arrow */}
                  <ArrowRight
                    size={14}
                    className={cn(
                      'flex-shrink-0 transition-all duration-300',
                      isActive ? 'text-accent opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'
                    )}
                  />

                  {/* Per-step progress bar at bottom */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.04]">
                      <div
                        className="h-full bg-accent/50 origin-left"
                        style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                      />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right: content panel */}
          <div className="relative overflow-hidden bg-background min-h-[420px]">
            {/* Ambient gradient unique per step */}
            <div className={cn(
              'absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-700 pointer-events-none',
              steps[active].color
            )} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative z-10 p-10 h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Top row: big decorative number + icon */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-accent/12 ring-1 ring-accent/20 flex items-center justify-center">
                        <ActiveIcon size={20} className="text-accent" />
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-white/30 tracking-[0.2em]">
                        <Clock size={10} />
                        {steps[active].duration}
                      </div>
                    </div>
                    <p className="font-mono text-[10px] text-accent/60 tracking-[0.3em] uppercase mb-2">
                      Step {steps[active].number}
                    </p>
                    <h3 className="font-syne text-4xl font-bold text-white leading-tight mb-1">
                      {steps[active].title}
                    </h3>
                    <p className="font-grotesk text-white/40 text-sm italic">
                      {steps[active].tagline}
                    </p>
                  </div>

                  {/* Large decorative step number */}
                  <div className="font-syne font-black text-[7rem] leading-none text-white/[0.04] select-none -mt-2">
                    {steps[active].number}
                  </div>
                </div>

                {/* Description */}
                <p className="font-grotesk text-white/60 text-base leading-relaxed mb-8 max-w-lg">
                  {steps[active].description}
                </p>

                {/* Deliverables */}
                <div className="mt-auto">
                  <p className="font-mono text-[9px] text-white/25 tracking-[0.25em] uppercase mb-4">
                    What you receive
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {steps[active].deliverables.map((item, i) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                      >
                        <div className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span className="font-grotesk text-xs text-white/50">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Step dots navigation at bottom right */}
                <div className="flex items-center gap-2 mt-8 justify-end">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleStepClick(i)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === active ? '20px' : '5px',
                        height: '3px',
                        backgroundColor: i === active ? '#00fff5' : 'rgba(255,255,255,0.15)',
                      }}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: horizontal step tabs + card ── */}
        <div className="lg:hidden">
          {/* Step tab strip */}
          <div className="flex gap-1 mb-6 p-1 bg-surface/50 rounded-xl border border-white/[0.05]">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;
              return (
                <button
                  key={step.number}
                  onClick={() => handleStepClick(i)}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-lg transition-all duration-300',
                    isActive ? 'bg-accent/10 ring-1 ring-accent/20' : 'hover:bg-white/[0.03]'
                  )}
                >
                  <Icon size={15} className={isActive ? 'text-accent' : 'text-white/30'} />
                  <span className={cn(
                    'font-mono text-[8px] tracking-[0.15em] uppercase transition-colors duration-300',
                    isActive ? 'text-accent' : 'text-white/30'
                  )}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="card-glass rounded-2xl p-7 relative overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Ambient glow */}
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none', steps[active].color)} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/12 ring-1 ring-accent/20 flex items-center justify-center">
                    <ActiveIcon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-accent/60 tracking-[0.25em] uppercase">Step {steps[active].number}</p>
                    <h3 className="font-syne text-2xl font-bold text-white">{steps[active].title}</h3>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 font-mono text-[9px] text-white/25 tracking-wide">
                    <Clock size={9} />
                    {steps[active].duration}
                  </div>
                </div>

                <p className="font-grotesk text-white/55 text-sm leading-relaxed mb-6">
                  {steps[active].description}
                </p>

                {/* Deliverables */}
                <div>
                  <p className="font-mono text-[9px] text-white/20 tracking-[0.25em] uppercase mb-3">What you receive</p>
                  <div className="grid grid-cols-2 gap-2">
                    {steps[active].deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                        <span className="font-grotesk text-xs text-white/45">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bar for mobile auto-advance */}
                <div className="mt-6 h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent/50 origin-left"
                    style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
