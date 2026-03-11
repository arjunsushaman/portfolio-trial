'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { personal } from '@/data/personal';
import { letterVariant, letterContainer } from '@/lib/animations';
import MagneticButton from '@/components/ui/MagneticButton';

// Dynamic import for Three.js — SSR must be false
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

const skills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Shopify', 'WordPress', 'Figma → Code', 'GraphQL', 'Three.js',
  'Vercel', 'Contentful', 'Supabase', 'GSAP', 'Stripe',
];

const ticker = [...skills, ...skills]; // duplicate for seamless loop

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headline1 = 'Crafting';
  const headline2 = 'Digital';
  const headline3 = 'Excellence.';

  const renderLetters = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="overflow-clip inline-block">
        <motion.span
          className="inline-block"
          variants={shouldReduceMotion ? undefined : letterVariant}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      </span>
    ));

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="hero">
      {/* 3D Canvas — desktop only */}
      {mounted && !isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <HeroCanvas />
        </div>
      )}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="container-wide relative z-10 pt-32 pb-24">
        {/* Availability badge */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-grotesk text-sm text-white/50 tracking-wide">
            {personal.availability}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : letterContainer}
        >
          <h1 className="font-syne font-bold leading-[1.0] tracking-tight">
            <div className="flex flex-wrap text-6xl md:text-8xl lg:text-[9rem] text-white">
              {renderLetters(headline1)}
            </div>
            <div className="flex flex-wrap text-6xl md:text-8xl lg:text-[9rem] text-white/30">
              {renderLetters(headline2)}
            </div>
            <div className="flex flex-wrap text-6xl md:text-8xl lg:text-[9rem] text-gradient">
              {renderLetters(headline3)}
            </div>
          </h1>
        </motion.div>

        {/* Sub text + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <p className="font-grotesk text-white/50 text-base md:text-lg leading-relaxed">
              {personal.subTagline}
            </p>
            <p className="font-grotesk text-white/30 text-sm mt-2">
              {personal.location}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <MagneticButton>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-grotesk font-semibold rounded-full hover:bg-white transition-colors duration-300 text-sm"
              >
                View My Work
                <ArrowDown size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-grotesk font-medium rounded-full hover:border-accent/60 hover:text-accent transition-all duration-300 text-sm"
              >
                Get In Touch
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          className="flex items-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          {personal.socials.map((social) => {
            const Icon = social.icon === 'github' ? Github : social.icon === 'linkedin' ? Linkedin : Twitter;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/40 transition-all duration-300"
                aria-label={social.label}
              >
                <Icon size={16} />
              </a>
            );
          })}
          <div className="h-px w-12 bg-white/10" />
          <span className="font-grotesk text-xs text-white/30 tracking-wide">Follow along</span>
        </motion.div>
      </div>

      {/* Skill Ticker */}
      <div className="absolute bottom-0 left-0 right-0 py-4 border-t border-white/[0.04] overflow-hidden bg-gradient-to-r from-background/80 via-transparent to-background/80">
        <div className="flex animate-ticker whitespace-nowrap">
          {ticker.map((skill, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-6">
              <span className="font-grotesk text-xs tracking-[0.2em] uppercase text-white/25">
                {skill}
              </span>
              <span className="text-accent/30 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
