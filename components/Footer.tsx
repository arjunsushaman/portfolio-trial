'use client';

import { personal } from '@/data/personal';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.04] py-10">
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-syne font-bold text-lg text-white hover:text-accent transition-colors duration-300"
        >
          {personal.firstName}
          <span className="text-accent">.</span>
        </a>

        {/* Nav */}
        <nav className="flex flex-wrap items-center gap-6 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-grotesk text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Credit */}
        <p className="font-grotesk text-xs text-white/20 text-center">
          &copy; {year} {personal.name} &mdash; Built with Next.js & ☕
        </p>
      </div>
    </footer>
  );
}
