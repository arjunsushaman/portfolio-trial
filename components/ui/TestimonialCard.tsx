'use client';

import Image from 'next/image';
import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card-glass rounded-2xl p-8 md:p-10 flex flex-col h-full relative overflow-hidden group hover:border-white/[0.1] transition-colors duration-500">
      {/* Ambient glow on hover */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[radial-gradient(ellipse,rgba(0,255,245,0.04)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative quote */}
      <span
        className="absolute top-4 right-6 font-syne text-[6rem] leading-none text-accent/8 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <blockquote className="font-grotesk text-base md:text-lg text-white/60 leading-relaxed flex-1 mb-8 relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Separator */}
      <div className="h-px bg-white/[0.05] mb-6 relative z-10" />

      {/* Author */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10">
          <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" sizes="44px" />
        </div>
        <div>
          <p className="font-syne font-semibold text-white text-sm">{testimonial.name}</p>
          <p className="font-mono text-[9px] text-white/35 tracking-wide mt-0.5">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
