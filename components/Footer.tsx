'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import { personal } from '@/data/personal';

const services = [
  'React', 'Next.js', 'TypeScript', 'UI Engineering', 'Shopify',
  'Performance', 'Three.js / WebGL', 'Framer Motion', 'GraphQL',
];
const ticker = [...services, ...services, ...services];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const socialIconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Ambient glow underneath big text */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-accent/[0.025] blur-[150px]" />
      </div>

      {/* Top services marquee */}
      <div className="border-y border-white/[0.04] overflow-hidden py-3.5">
        <div className="flex animate-ticker whitespace-nowrap">
          {ticker.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-5 mx-5">
              <span className="font-mono text-[9px] text-white/18 tracking-[0.3em] uppercase">{s}</span>
              <span className="text-accent/20 text-[7px]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Big statement typography ── */}
      <div className="container-wide pt-16 md:pt-24 pb-0 relative z-10">

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[10px] text-accent/50 tracking-[0.35em] uppercase mb-8 md:mb-10"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Open for collaboration
        </motion.p>

        {/* Headline: "Let's Build" */}
        <div className="overflow-hidden mb-1.5">
          <motion.div
            className="font-syne font-bold leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 10.5rem)' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <span className="text-white">Let&apos;s </span>
            <span className="text-stroke-accent">Build</span>
          </motion.div>
        </div>
        {/* Headline: "Together." */}
        <div className="overflow-hidden mb-16 md:mb-20">
          <motion.div
            className="font-syne font-bold leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 10.5rem)' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className="text-gradient">Together.</span>
          </motion.div>
        </div>

        {/* ── Info bar ── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-white/[0.05] pt-10 pb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Left: contact info */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[9px] text-white/22 tracking-[0.22em] uppercase">
              {personal.location}
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="group inline-flex items-center gap-2 font-syne text-xl md:text-2xl font-semibold text-white/75 hover:text-accent transition-colors duration-300"
            >
              {personal.email}
              <ArrowUpRight
                size={20}
                className="text-accent/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </a>
            {/* Socials */}
            <div className="flex items-center gap-2.5 mt-1">
              {personal.socials.map((social) => {
                const Icon = socialIconMap[social.icon] ?? Github;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: nav links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-mono text-[9px] text-white/22 hover:text-white/55 transition-colors duration-300 tracking-[0.22em] uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="border-t border-white/[0.03] relative z-10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-syne font-bold text-white/35 text-sm hover:text-accent transition-colors duration-300"
            >
              {personal.firstName}<span className="text-accent">.</span>
            </a>
            <span className="font-mono text-[9px] text-white/12 tracking-[0.15em]">
              &copy; {year} — All rights reserved.
            </span>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[9px] text-white/15 hover:text-accent/50 tracking-[0.15em] transition-colors duration-300 uppercase"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
