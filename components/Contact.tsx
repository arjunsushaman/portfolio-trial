'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { personal } from '@/data/personal';
import { fadeInUp } from '@/lib/animations';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const res = await fetch(personal.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const inputClass =
    'w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 font-grotesk text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all duration-300';

  const socials = [
    { label: 'GitHub', href: personal.socials[0].href, Icon: Github },
    { label: 'LinkedIn', href: personal.socials[1].href, Icon: Linkedin },
    { label: 'Twitter', href: personal.socials[2].href, Icon: Twitter },
  ];

  return (
    <section id="contact" ref={ref} className="section-padding border-t border-white/[0.04]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <SectionHeader
              eyebrow="Contact"
              heading="Let's Build Something Great"
              subheading="Have a project in mind? I'd love to hear about it. Fill out the form or reach me directly."
              className="mb-10"
            />

            <motion.div
              className="space-y-4 mb-10"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 font-grotesk text-white/60 hover:text-accent transition-colors duration-300 group"
              >
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-lg group-hover:border-accent/40 transition-colors duration-300">
                  @
                </span>
                {personal.email}
              </a>
              <p className="flex items-center gap-3 font-grotesk text-white/40 text-sm pl-0">
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-base">
                  📍
                </span>
                {personal.location}
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex gap-4"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/40 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  className="card-glass rounded-2xl p-10 flex flex-col items-center text-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle size={48} className="text-accent" />
                  <h3 className="font-syne text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="font-grotesk text-white/50 text-sm max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', budget: '', message: '' }); }}
                    className="mt-4 font-grotesk text-sm text-accent border-b border-accent/40 hover:border-accent transition-colors duration-300"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="card-glass rounded-2xl p-8 flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-grotesk text-xs text-white/40 mb-2 block">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-grotesk text-xs text-white/40 mb-2 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-grotesk text-xs text-white/40 mb-2 block">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" className="bg-[#111]">Select a range</option>
                      <option value="< $5k" className="bg-[#111]">Under $5,000</option>
                      <option value="$5k–$15k" className="bg-[#111]">$5,000 – $15,000</option>
                      <option value="$15k–$30k" className="bg-[#111]">$15,000 – $30,000</option>
                      <option value="$30k+" className="bg-[#111]">$30,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-grotesk text-xs text-white/40 mb-2 block">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm font-grotesk">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-background font-grotesk font-semibold text-sm rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
