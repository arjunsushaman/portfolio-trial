'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Applies a subtle skewY to its children based on scroll velocity —
 * the iconic "Locomotive Scroll" feel. Snaps back instantly when idle.
 */
export default function ScrollSkew({ children }: { children: React.ReactNode }) {
  const skew = useMotionValue(0);
  const smoothSkew = useSpring(skew, { stiffness: 380, damping: 48, mass: 0.5 });
  const lastY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const y = window.scrollY;
      const velocity = y - lastY.current;
      lastY.current = y;
      // Clamp to ±1.2°, scale velocity gently
      skew.set(Math.max(-1.2, Math.min(1.2, velocity * 0.022)));
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [skew]);

  return (
    <motion.div style={{ skewY: smoothSkew }}>
      {children}
    </motion.div>
  );
}
