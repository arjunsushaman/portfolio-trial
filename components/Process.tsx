'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Pencil, Code2, Rocket } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeInUp, lineExpand } from '@/lib/animations';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'Deep-dive into your goals, users, and competitive landscape. We align on scope, success metrics, and technical constraints before a single line of code is written.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Design',
    description:
      'High-fidelity Figma prototypes, design tokens, and component specs. I translate your brand vision into a pixel-perfect system ready for engineering.',
    icon: Pencil,
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Iterative development with weekly demos. Clean, typed code with full test coverage. Performance-first architecture that scales as your business does.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'Zero-downtime deployment, SEO audit, Core Web Vitals check, and a 30-day post-launch support window. Your site goes live with confidence.',
    icon: Rocket,
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section id="process" ref={ref} className="section-padding border-t border-white/[0.04]">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Process"
          heading="How I Work"
          subheading="A battle-tested 4-step process that delivers predictable results, every time."
          align="center"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[3.25rem] left-[calc(12.5%-0.5px)] right-[calc(12.5%)] h-px bg-white/[0.06] origin-left">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/40 to-accent/10 origin-left"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={lineExpand}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="flex flex-col items-start lg:items-center text-left lg:text-center"
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.15 }}
                >
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div className="w-[52px] h-[52px] rounded-full card-glass flex items-center justify-center ring-1 ring-white/[0.08] relative z-10 hover:ring-accent/40 transition-all duration-300 group">
                      <Icon size={20} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Step number */}
                  <p className="font-syne text-xs font-bold text-accent/50 tracking-[0.2em] mb-2">
                    {step.number}
                  </p>

                  {/* Title */}
                  <h3 className="font-syne text-xl font-bold text-white mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="font-grotesk text-sm text-white/50 leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
