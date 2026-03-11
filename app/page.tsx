'use client';

import { useEffect, useState } from 'react';
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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Preloader onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <>
          <Navigation />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Process />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </SmoothScrollProvider>
  );
}
