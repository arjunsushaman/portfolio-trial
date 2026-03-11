'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch device
    const touch = window.matchMedia('(hover: none)').matches;
    setIsTouch(touch);
    if (touch) return;

    const handleMove = (e: MouseEvent) => {
      // Dot: zero lag via direct DOM manipulation
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      // Ring: spring lag via motion values
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        getComputedStyle(target).cursor === 'pointer';
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot — zero lag */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[99999] transition-transform duration-0"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      {/* Ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] border border-accent/40"
        style={{
          x: ringX,
          y: ringY,
          willChange: 'transform',
        }}
        animate={{
          width: isHovering ? 52 : 40,
          height: isHovering ? 52 : 40,
          borderColor: isHovering ? 'rgba(0,255,245,0.8)' : 'rgba(0,255,245,0.4)',
        }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
    </>
  );
}
