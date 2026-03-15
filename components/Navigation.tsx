'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { personal } from '@/data/personal';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => { if (s) observer.observe(s); });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-[9990] transition-all duration-500',
          scrolled ? 'card-glass border-b border-white/[0.05] py-3' : 'bg-transparent py-5'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Scroll progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.03]">
          <motion.div
            className="h-full bg-accent/60 origin-left"
            style={{ width: `${scrollProgress}%`, transition: 'width 80ms linear' }}
          />
        </div>

        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-syne font-bold text-lg tracking-tight text-white hover:text-accent transition-colors duration-300"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            {personal.firstName}
            <span className="text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={cn(
                    'font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300 relative group',
                    isActive ? 'text-accent' : 'text-white/40 hover:text-white/80'
                  )}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent transition-all duration-300',
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-40 group-hover:scale-100'
                    )}
                  />
                </a>
              );
            })}
            <a
              href={`mailto:${personal.email}`}
              className="font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 border border-accent/30 text-accent rounded-full hover:bg-accent hover:text-background transition-all duration-300"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[9985] bg-background/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background noise texture */}
            <div className="absolute inset-0 noise-overlay opacity-[0.02]" aria-hidden="true" />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={cn(
                  'font-syne text-4xl font-bold transition-colors duration-300',
                  activeSection === link.href ? 'text-accent' : 'text-white/65 hover:text-white'
                )}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1 }}
              >
                <span className="font-mono text-[10px] text-white/20 tracking-[0.2em] mr-3 align-middle">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${personal.email}`}
              className="font-mono text-sm tracking-[0.15em] uppercase px-7 py-3.5 bg-accent text-background rounded-full font-semibold mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 + 0.1 }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
