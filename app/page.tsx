'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import GlowDivider from '@/components/ui/GlowDivider';
import SectionCounter from '@/components/ui/SectionCounter';
import ScrollSkew from '@/components/ui/ScrollSkew';

// Lazy-load the particle background so it doesn't block initial paint
const ParticleBackground = dynamic(
  () => import('@/components/ParticleBackground'),
  { ssr: false }
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrollProvider>
      <CustomCursor />

      {/* Global WebGL particle network — behind all content */}
      <ParticleBackground />

      <Preloader onComplete={() => setIsLoaded(true)} />

      {isLoaded && (
        <>
          <Navigation />
          <SectionCounter />
          <ScrollSkew>
            <main>
              <Hero />
              <GlowDivider />
              <About />
              <GlowDivider />
              <Skills />
              <GlowDivider />
              <Projects />
              <GlowDivider />
              <Process />
              <GlowDivider />
              <Testimonials />
              <GlowDivider />
              <Contact />
            </main>
            <Footer />
          </ScrollSkew>
        </>
      )}
    </SmoothScrollProvider>
  );
}
