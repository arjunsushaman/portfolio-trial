'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUpRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { personal } from '@/data/personal';
import { letterVariant, letterContainer } from '@/lib/animations';
import BudgetSelect from '@/components/BudgetSelect';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const socialDefs = [
  { label: 'GitHub', icon: 'github', Icon: Github },
  { label: 'LinkedIn', icon: 'linkedin', Icon: Linkedin },
  { label: 'Twitter', icon: 'twitter', Icon: Twitter },
];

// ─── Floating-label input ─────────────────────────────────────────────────────
function Field({
  label,
  name,
  type = 'text',
  required,
  value,
  onChange,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        aria-label={label}
        className="peer w-full rounded-xl px-4 pt-6 pb-2.5 font-grotesk text-sm text-white/90 focus:outline-none transition-all duration-200"
        style={{
          background: focused ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${focused ? 'rgba(0,255,245,0.45)' : value ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(0,255,245,0.06), 0 0 24px rgba(0,255,245,0.04)' : 'none',
        }}
      />
      {/* Floating label */}
      <label
        htmlFor={name}
        className={`absolute left-4 pointer-events-none font-mono uppercase tracking-[0.18em] transition-all duration-200 ${lifted
          ? 'top-2 text-[8px] ' + (focused ? 'text-accent/70' : 'text-white/30')
          : 'top-1/2 -translate-y-1/2 text-[10px] text-white/25'
          }`}
      >
        {label}
      </label>
      {hint && !value && !focused && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] text-white/12 pointer-events-none">
          {hint}
        </span>
      )}
    </div>
  );
}

// ─── Floating-label textarea ──────────────────────────────────────────────────
function MessageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const MAX = 500;

  return (
    <div className="relative">
      <textarea
        id="message"
        name="message"
        required
        rows={5}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={MAX}
        aria-label="Message"
        className="peer w-full rounded-xl px-4 pt-7 pb-8 font-grotesk text-sm text-white/90 focus:outline-none resize-none leading-relaxed transition-all duration-200"
        style={{
          background: focused ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${focused ? 'rgba(0,255,245,0.45)' : value ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(0,255,245,0.06), 0 0 24px rgba(0,255,245,0.04)' : 'none',
        }}
      />
      <label
        htmlFor="message"
        className={`absolute left-4 pointer-events-none font-mono uppercase tracking-[0.18em] transition-all duration-200 ${lifted
          ? 'top-2 text-[8px] ' + (focused ? 'text-accent/70' : 'text-white/30')
          : 'top-4 text-[10px] text-white/25'
          }`}
      >
        Message
      </label>
      {/* Char count — bottom right of textarea */}
      <span
        className={`absolute bottom-3 right-4 font-mono text-[8px] tabular-nums pointer-events-none transition-colors duration-200 ${focused ? 'text-white/25' : 'text-white/10'
          }`}
      >
        {value.length}/{MAX}
      </span>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', budget: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch(personal.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  const resolvedSocials = socialDefs.map((s) => ({
    ...s,
    href: personal.socials.find((ps) => ps.icon === s.icon)?.href ?? '#',
  }));

  const ctaWords = ["Let's", 'Build', 'Something', 'Great.'];

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full bg-accent/[0.022] blur-[150px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-16 lg:gap-20 items-start">

          {/* ── Left: CTA panel ───────────────────────── */}
          <div className="lg:pt-2">

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-[10px] text-white/18 tracking-[0.25em]">06</span>
              <div className="w-8 h-px bg-accent/50" />
              <span className="font-mono text-[10px] text-accent/65 tracking-[0.3em] uppercase">Contact</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              className="mb-10"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={letterContainer}
            >
              <h2 className="font-syne font-bold leading-[0.93] tracking-tight">
                {ctaWords.map((word, wi) => (
                  <div key={word} className="flex flex-wrap">
                    {word.split('').map((char, ci) => (
                      <span key={ci} className="overflow-clip inline-block">
                        <motion.span
                          className={`inline-block text-[10vw] md:text-[7vw] lg:text-[5.5vw] ${wi === 3 ? 'text-gradient' : 'text-white'
                            }`}
                          variants={letterVariant}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                    {wi < ctaWords.length - 1 && <span className="w-full" />}
                  </div>
                ))}
              </h2>
            </motion.div>

            {/* Email */}
            <motion.a
              href={`mailto:${personal.email}`}
              className="group inline-flex items-center gap-2 mb-3"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.5 }}
            >
              <span className="font-grotesk text-white/45 hover:text-accent transition-colors duration-300 text-sm border-b border-white/12 pb-0.5 group-hover:border-accent/40">
                {personal.email}
              </span>
              <ArrowUpRight size={14} className="text-accent/35 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>

            <motion.p
              className="font-mono text-[9px] text-white/18 tracking-[0.22em] uppercase mb-10"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.58 }}
            >
              {personal.location}
            </motion.p>

            {/* Meta cards */}
            <motion.div
              className="grid grid-cols-2 gap-3 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.62 }}
            >
              {[
                { label: 'Response time', value: 'Within 24 hrs' },
                { label: 'Availability', value: 'Open to work' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-3.5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <p className="font-mono text-[8px] text-white/18 tracking-[0.2em] uppercase mb-1">{label}</p>
                  <p className="font-grotesk text-xs text-white/50">{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div
              className="flex gap-2.5 mb-8"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.67 }}
            >
              {resolvedSocials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/25 hover:text-accent transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                  aria-label={label}
                >
                  <Icon size={13} />
                </a>
              ))}
            </motion.div>

            {/* Availability pill */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.73 }}
            >
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="font-mono text-[9px] text-white/28 tracking-[0.2em] uppercase">
                {personal.availability}
              </span>
            </motion.div>
          </div>

          {/* ── Right: Form ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <AnimatePresence mode="wait">

              {/* Success */}
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  className="rounded-2xl p-12 flex flex-col items-center text-center gap-5"
                  style={{ background: 'rgba(0,255,245,0.03)', border: '1px solid rgba(0,255,245,0.14)' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,255,245,0.08)', border: '1px solid rgba(0,255,245,0.2)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, delay: 0.1 }}
                  >
                    <CheckCircle size={24} className="text-accent" />
                  </motion.div>
                  <div>
                    <h3 className="font-syne text-xl font-bold text-white mb-2">Message sent!</h3>
                    <p className="font-grotesk text-sm text-white/40 max-w-xs leading-relaxed">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', budget: '', message: '' }); }}
                    className="font-mono text-[9px] text-accent/55 hover:text-accent border-b border-accent/25 hover:border-accent/55 pb-0.5 tracking-[0.15em] uppercase transition-all duration-300"
                  >
                    Send another
                  </button>
                </motion.div>

              ) : (

                /* Form card */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-7 flex flex-col gap-4"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Top accent rule */}
                  <div className="h-px -mx-7 -mt-7 mb-2 rounded-t-2xl bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      hint="required"
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      hint="required"
                    />
                  </div>

                  {/* Budget */}
                  <BudgetSelect
                    value={formData.budget}
                    onChange={(val) => setFormData((d) => ({ ...d, budget: val }))}
                  />

                  {/* Message */}
                  <MessageField value={formData.message} onChange={handleChange} />

                  {/* Error */}
                  <AnimatePresence>
                    {formState === 'error' && (
                      <motion.div
                        className="flex items-center gap-2 text-red-400/70 font-mono text-[10px] tracking-wide"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle size={12} />
                        Something went wrong — please email me directly.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="relative w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-syne font-bold text-sm text-background overflow-hidden group disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 mt-1"
                    style={{ background: 'rgb(0,255,245)' }}
                    onMouseEnter={(e) => { if (formState !== 'loading') (e.currentTarget.style.background = 'rgb(255,255,255)'); }}
                    onMouseLeave={(e) => { (e.currentTarget.style.background = 'rgb(0,255,245)'); }}
                  >
                    {/* Shimmer */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    {formState === 'loading' ? (
                      <><Loader2 size={15} className="animate-spin" />Sending…</>
                    ) : (
                      <>
                        Send Message
                        <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </>
                    )}
                  </button>

                  <p className="text-center font-mono text-[8px] text-white/12 tracking-[0.12em]">
                    Your details are kept private and never shared.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
