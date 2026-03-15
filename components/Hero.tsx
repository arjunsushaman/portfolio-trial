'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Linkedin } from 'lucide-react';
import { personal } from '@/data/personal';
import { letterVariant, letterContainer } from '@/lib/animations';
import MagneticButton from '@/components/ui/MagneticButton';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

const skills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Shopify', 'WordPress', 'Figma → Code', 'GraphQL', 'Three.js',
  'Vercel', 'Contentful', 'Supabase', 'GSAP', 'Stripe',
];
const ticker = [...skills, ...skills];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Scroll progress through the hero section ──────────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Multi-layer headline parallax — each line moves at a different rate
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]); // front / fastest
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]); // middle
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -70]);  // back / slowest

  // Sub-content fades and rises as you scroll
  const subOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // 3D canvas fades + gently scales as you scroll past hero
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const canvasScale  = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Ambient orbs drift independently
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const renderLetters = (text: string, className?: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="overflow-clip inline-block">
        <motion.span
          className={`inline-block ${className ?? ''}`}
          variants={shouldReduceMotion ? undefined : letterVariant}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      </span>
    ));

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden" id="hero">

      {/* ── Three.js canvas — fades + scales on scroll ── */}
      {mounted && !isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: canvasOpacity, scale: canvasScale }}
        >
          <HeroCanvas />
        </motion.div>
      )}

      {/* ── Scanline grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,245,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,245,0.016) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 30%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Ambient orbs — parallax layers ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-accent/[0.04] blur-[140px] translate-x-1/4 -translate-y-1/4"
          style={{ y: orb1Y }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[110px] -translate-x-1/4 translate-y-1/4"
          style={{ y: orb2Y }}
        />
        {/* Horizontal scan line */}
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            top: '35%',
            background: 'linear-gradient(90deg, transparent, rgba(0,255,245,0.08) 30%, rgba(0,255,245,0.12) 50%, rgba(0,255,245,0.08) 70%, transparent)',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="container-wide relative z-10 flex flex-col flex-1 pt-36 pb-0">

        {/* Availability badge */}
        <motion.div
          className="flex items-center gap-3 mb-14"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">
            {personal.availability}
          </span>
        </motion.div>

        {/* ── Headline — multi-layer parallax ── */}
        <div className="mb-auto">
          <motion.h1
            className="font-syne font-bold leading-[0.93] tracking-tight"
            initial="hidden"
            animate="visible"
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : letterContainer}
          >
            {/* Line 1 — moves fastest (closest to viewer) */}
            <motion.div
              className="flex flex-wrap text-[13vw] md:text-[10.5vw] lg:text-[9.5vw] text-white"
              style={{ y: y1, willChange: 'transform' }}
            >
              {renderLetters('Crafting')}
            </motion.div>

            {/* Line 2 — medium speed */}
            <motion.div
              className="flex flex-wrap text-[13vw] md:text-[10.5vw] lg:text-[9.5vw] ml-[4vw] md:ml-[7vw]"
              style={{ y: y2, willChange: 'transform' }}
            >
              {renderLetters('Digital', 'text-stroke')}
            </motion.div>

            {/* Line 3 — slowest (furthest back) */}
            <motion.div
              className="flex flex-wrap text-[13vw] md:text-[10.5vw] lg:text-[9.5vw] text-accent ml-[1.5vw] md:ml-[2.5vw]"
              style={{ y: y3, willChange: 'transform' }}
            >
              {renderLetters('Excellence.')}
            </motion.div>
          </motion.h1>
        </div>

        {/* ── Sub-content — fades out on scroll ── */}
        <motion.div
          className="mt-10"
          style={{ opacity: subOpacity, y: subY }}
        >
          {/* Ruled line */}
          <motion.div
            className="h-px bg-white/10 mb-8 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6">
            {/* Left: tagline + location */}
            <motion.div
              className="max-w-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <p className="font-grotesk text-white/55 text-base md:text-lg leading-relaxed mb-2">
                {personal.subTagline}
              </p>
              <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase">
                {personal.location}
              </p>
            </motion.div>

            {/* Right: socials + CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
            >
              {/* Social icons */}
              {personal.socials.length > 0 && (
                <div className="flex items-center gap-3">
                  {personal.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/35 hover:text-accent hover:border-accent/40 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Linkedin size={14} />
                    </a>
                  ))}
                  <div className="h-5 w-px bg-white/10" />
                </div>
              )}

              {/* CTAs */}
              <div className="flex gap-3">
                <MagneticButton>
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-background font-grotesk font-semibold rounded-full hover:bg-white transition-colors duration-300 text-sm"
                  >
                    View Work
                    <ArrowDown size={14} />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={`mailto:${personal.email}`}
                    className="inline-flex items-center gap-2 px-7 py-3 border border-white/15 text-white/60 font-grotesk font-medium rounded-full hover:border-accent/50 hover:text-accent transition-all duration-300 text-sm"
                  >
                    Get In Touch
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Skills ticker ── */}
      <motion.div
        className="relative z-10 border-t border-white/[0.04] overflow-hidden"
        style={{ opacity: subOpacity }}
      >
        <div className="flex animate-ticker whitespace-nowrap py-3.5">
          {ticker.map((skill, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-5">
              <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-white/20">
                {skill}
              </span>
              <span className="text-accent/30 text-[8px]">✦</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
