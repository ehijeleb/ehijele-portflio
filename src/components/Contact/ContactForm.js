import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../Navbar';
import MouseGlow from '../MouseGlow';
import { EASE_OUT_EXPO, SPRING_SNAPPY, AnimatedArrow } from '../../animations';

const HEROTOFU_ENDPOINT =
  'https://public.herotofu.com/v1/7bf7df50-6d53-11ef-95a6-6f38c376f913';

const formStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fieldSlide = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

const inputClass =
  'w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-treasure/60 focus:ring-1 focus:ring-treasure/30 transition-colors duration-200';

function ContactForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const form = e.currentTarget;
    if (form._gotcha?.value) return; // honeypot tripped

    setStatus('submitting');
    setErrorMsg(null);

    try {
      const data = new FormData(form);
      const res = await fetch(HEROTOFU_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen text-white bg-base"
      style={{
        backgroundImage: 'radial-gradient(350px at var(--mx, -1000px) var(--my, -1000px), rgba(245, 158, 11, 0.13), transparent 70%)',
      }}
    >
      <MouseGlow />
      <Navbar />

      {/* Drifting ambient blob */}
      {!reduce && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-amber-500/4 rounded-full blur-3xl"
            animate={{ x: [0, 22, -14, 0], y: [0, -20, 26, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          />
        </div>
      )}

      <div id="main" className="max-w-lg mx-auto px-6 pt-36 pb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-treasure tracking-[0.3em] uppercase mb-3">Contact</p>
          <h1 className="font-display text-4xl font-black text-white mb-2">Get in Touch</h1>
          <p className="text-slate-400 mb-10">Have a question or want to work together? Drop me a message.</p>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            {status === 'success' ? (
              <motion.div
                role="status"
                aria-live="polite"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={reduce ? undefined : { duration: 0.5, ease: EASE_OUT_EXPO }}
                className="text-center py-6"
              >
                <div className="w-12 h-12 rounded-full bg-treasure/20 text-treasure mx-auto mb-4 flex items-center justify-center" aria-hidden="true">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-xl font-bold text-white mb-1">Message sent</h2>
                <p className="text-slate-400 text-sm mb-5">
                  Thanks — I'll get back to you as soon as I can.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-treasure hover:text-treasure-400 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70 rounded"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} acceptCharset="UTF-8" noValidate>
                <motion.div
                  className="space-y-5"
                  variants={formStagger}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={fieldSlide}>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="Name"
                      id="name"
                      autoComplete="name"
                      className={inputClass}
                      required
                      placeholder="Your Name"
                    />
                  </motion.div>

                  <motion.div variants={fieldSlide}>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="Email"
                      id="email"
                      autoComplete="email"
                      className={inputClass}
                      required
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div variants={fieldSlide}>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="Subject"
                      id="subject"
                      className={inputClass}
                      required
                      placeholder="What's this about?"
                    />
                  </motion.div>

                  <motion.div variants={fieldSlide}>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="Message"
                      id="message"
                      rows={5}
                      className={`${inputClass} resize-none`}
                      required
                      placeholder="Your message..."
                    />
                  </motion.div>

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-lg px-3 py-2"
                    >
                      {errorMsg || 'Something went wrong. Please try again.'}
                    </p>
                  )}

                  <motion.div variants={fieldSlide}>
                    <motion.button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-treasure hover:bg-treasure-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 font-bold rounded-lg transition-colors duration-200 text-sm shadow-treasure-glow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70"
                      initial="rest"
                      animate="rest"
                      whileHover={reduce || status === 'submitting' ? undefined : 'nudge'}
                      whileFocus={reduce || status === 'submitting' ? undefined : 'nudge'}
                      whileTap={reduce || status === 'submitting' ? undefined : { scale: 0.97 }}
                      transition={SPRING_SNAPPY}
                    >
                      {status === 'submitting' ? (
                        <>
                          <motion.span
                            aria-hidden="true"
                            className="inline-block w-3.5 h-3.5 border-2 border-slate-900/40 border-t-slate-900 rounded-full"
                            animate={reduce ? undefined : { rotate: 360 }}
                            transition={reduce ? undefined : { repeat: Infinity, ease: 'linear', duration: 0.8 }}
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message <AnimatedArrow distance={5} />
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Honeypot — bots fill it, humans don't */}
                  <div
                    style={{ textIndent: '-99999px', whiteSpace: 'nowrap', overflow: 'hidden', position: 'absolute' }}
                    aria-hidden="true"
                  >
                    <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
                  </div>
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactForm;
