'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'project' | 'link';

interface CursorMeta {
  state: CursorState;
  label: string;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [meta, setMeta] = useState<CursorMeta>({ state: 'default', label: '' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 130, damping: 20 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches;
    setIsTouch(touch);
    if (touch) return;

    const handleMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('[data-cursor]') as HTMLElement | null;
      const cursorType = closest?.getAttribute('data-cursor') ?? '';

      // Check the element chain for meaning
      const isProjectRow = !!target.closest('[data-cursor="project"]') || cursorType === 'project';
      const isExternalLink = (target.tagName === 'A' && (target as HTMLAnchorElement).target === '_blank') ||
        !!target.closest('a[target="_blank"]');
      const isButton = target.tagName === 'BUTTON' || !!target.closest('button');
      const isLink = target.tagName === 'A' || !!target.closest('a');

      if (isProjectRow) {
        setMeta({ state: 'project', label: 'VIEW' });
      } else if (isExternalLink) {
        setMeta({ state: 'link', label: 'OPEN ↗' });
      } else if (isButton || isLink) {
        setMeta({ state: 'hover', label: '' });
      } else {
        setMeta({ state: 'default', label: '' });
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  const isExpanded = meta.state === 'project' || meta.state === 'link';
  const isHovering = meta.state !== 'default';

  return (
    <>
      {/* Dot — zero lag */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[99999]"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* Ring — spring lag */}
      <motion.div
        className="fixed pointer-events-none z-[99998] rounded-full flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          width: isExpanded ? 72 : isHovering ? 48 : 36,
          height: isExpanded ? 72 : isHovering ? 48 : 36,
          borderColor: isHovering ? 'rgba(0,255,245,0.7)' : 'rgba(0,255,245,0.35)',
          backgroundColor: isExpanded ? 'rgba(0,255,245,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <motion.div className="border rounded-full absolute inset-0" style={{ borderColor: 'inherit' }} />
      </motion.div>

      {/* Cursor label */}
      <AnimatePresence>
        {meta.label && (
          <motion.div
            className="fixed pointer-events-none z-[99997] font-mono text-[8px] tracking-[0.2em] text-accent whitespace-nowrap"
            style={{
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '150%',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            {meta.label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
