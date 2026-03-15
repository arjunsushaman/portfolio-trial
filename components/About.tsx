'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { personal } from '@/data/personal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });

  // Parallax scroll through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Quote mark drifts upward faster than the page scroll — creates depth
  const rawQuoteY = useTransform(scrollYProgress, [0, 1], [60, -100]);
  const quoteY = useSpring(rawQuoteY, { stiffness: 60, damping: 18 });

  // Bio text has a very slight parallax
  const rawBioY = useTransform(scrollYProgress, [0, 1], [20, -30]);
  const bioY = useSpring(rawBioY, { stiffness: 60, damping: 18 });

  // Stats column moves slightly slower than the bio
  const rawStatsY = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const statsY = useSpring(rawStatsY, { stiffness: 60, damping: 18 });

  // Ambient orbs float at different rates
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-30, 60]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [40, -50]);

  // 3D perspective tilt on stat cards
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
    el.style.transition = 'transform 0.1s ease-out';
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.transition = 'transform 0.4s ease-out';
  };

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">

      {/* Ambient orbs — parallax */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.025] blur-[120px] translate-x-1/2 -translate-y-1/3"
          style={{ y: orb1Y }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.018] blur-[100px] -translate-x-1/3 translate-y-1/3"
          style={{ y: orb2Y }}
        />
      </div>

      <div className="container-wide relative z-10">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[10px] text-white/20 tracking-[0.25em]">01</span>
          <div className="w-8 h-px bg-accent/50" />
          <span className="font-mono text-[10px] text-accent/70 tracking-[0.3em] uppercase">About</span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">

          {/* Left: Bio */}
          <motion.div style={{ y: bioY }}>
            {/* Decorative quote mark — parallax float */}
            <motion.div
              className="font-syne font-bold text-[8rem] md:text-[10rem] leading-none text-accent/15 select-none mb-0 -ml-2"
              aria-hidden="true"
              style={{ y: quoteY, willChange: 'transform' }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              &ldquo;
            </motion.div>

            {/* Heading */}
            <div className="overflow-hidden -mt-8 mb-6">
              <motion.h2
                className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-white"
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              >
                Code as a<br />
                <span className="text-gradient">craft.</span>
              </motion.h2>
            </div>

            {/* Bio text */}
            <motion.p
              className="font-grotesk text-white/55 text-base md:text-lg leading-relaxed mb-5"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              {personal.bio}
            </motion.p>

            <motion.p
              className="font-grotesk text-white/35 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              When I&apos;m not pushing pixels, I&apos;m reading about design systems,
              contributing to open-source, or obsessing over the latest performance APIs.
              The best code is invisible — it just works, beautifully.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.48 }}
            >
              <p className="font-mono text-[10px] text-white/25 tracking-wider">
                — {personal.name}, {personal.tagline}
              </p>
              <div className="h-px w-10 bg-white/10 hidden sm:block" />
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 font-grotesk text-sm text-accent group"
              >
                <span className="border-b border-accent/35 pb-0.5 group-hover:border-accent transition-colors duration-300">
                  Let&apos;s talk about your project
                </span>
                <span className="text-accent/50 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Stats — parallax + 3D tilt on hover */}
          <motion.div
            className="grid grid-cols-2 gap-5"
            style={{ y: statsY, willChange: 'transform' }}
          >
            {personal.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="card-glass rounded-2xl p-7 flex flex-col gap-4 group cursor-default"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.1 }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                {/* Accent corner dot */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent/50 transition-colors duration-300" />

                <div className="font-syne text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-grotesk text-sm text-white/40">{stat.label}</p>
                <div className="h-px bg-gradient-to-r from-accent/40 to-transparent group-hover:from-accent/65 transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
