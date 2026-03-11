'use client';

import Image from 'next/image';
import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card-glass rounded-2xl p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
      {/* Decorative quote mark */}
      <span
        className="absolute top-4 right-6 font-syne text-8xl text-accent/10 select-none leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote */}
      <blockquote className="font-grotesk text-base md:text-lg text-white/70 leading-relaxed flex-1 mb-8 relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <p className="font-syne font-semibold text-white text-sm">{testimonial.name}</p>
          <p className="font-grotesk text-xs text-white/40">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
