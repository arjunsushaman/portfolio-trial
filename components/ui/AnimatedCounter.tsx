'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ value, suffix = '', className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!inView) return;

    const controls = animate(motionValue, value, {
      duration: 2.0,
      ease: 'easeOut',
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.round(latest) + suffix;
        }
      },
    });

    return controls.stop;
  }, [inView, value, suffix, motionValue]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
