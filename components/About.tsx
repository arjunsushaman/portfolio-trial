'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '@/data/personal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section id="about" ref={ref} className="section-padding border-t border-white/[0.04]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <motion.p
              className="font-grotesk text-xs tracking-[0.3em] uppercase text-accent mb-4"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              About
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h2
                className="font-syne text-5xl md:text-6xl font-bold text-white leading-[1.05]"
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Code as a
                <br />
                <span className="text-gradient">craft.</span>
              </motion.h2>
            </div>

            <motion.p
              className="font-grotesk text-white/60 text-base md:text-lg leading-relaxed mb-6"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              {personal.bio}
            </motion.p>

            <motion.p
              className="font-grotesk text-white/40 text-sm leading-relaxed"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              When I&apos;m not pushing pixels, I&apos;m reading about design systems, contributing to
              open-source, or obsessing over the latest performance APIs. I believe the best code
              is invisible — it just works, beautifully.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-8"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
            >
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 font-grotesk text-sm text-accent border-b border-accent/40 pb-0.5 hover:border-accent transition-colors duration-300"
              >
                Let&apos;s talk about your project →
              </a>
            </motion.div>
          </div>

          {/* Right: Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {personal.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="card-glass rounded-2xl p-8 flex flex-col justify-between"
                variants={fadeInUp}
                custom={i}
              >
                <div className="font-syne text-5xl md:text-6xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-grotesk text-sm text-white/40">{stat.label}</p>
                {/* Accent line */}
                <div className="mt-6 h-px bg-gradient-to-r from-accent/40 to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
