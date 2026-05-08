import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import MouseGlow from '../MouseGlow';

const formStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fieldSlide = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const inputClass =
  'w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-colors duration-200';

function ContactForm() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor: '#020617',
        backgroundImage: 'radial-gradient(350px at var(--mx, -1000px) var(--my, -1000px), rgba(245, 158, 11, 0.13), transparent 70%)',
      }}
    >
      <MouseGlow />
      <Navbar />

      {/* Drifting ambient blob */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-amber-500/4 rounded-full blur-3xl"
          animate={{ x: [0, 22, -14, 0], y: [0, -20, 26, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />
      </div>

      <div className="max-w-lg mx-auto px-6 pt-36 pb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-3">Contact</p>
          <h1 className="text-4xl font-black text-white mb-2">Get in Touch</h1>
          <p className="text-slate-400 mb-10">Have a question or want to work together? Drop me a message.</p>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <form
              action="https://public.herotofu.com/v1/7bf7df50-6d53-11ef-95a6-6f38c376f913"
              method="post"
              acceptCharset="UTF-8"
              target="_blank"
            >
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

                <motion.div variants={fieldSlide}>
                  <motion.button
                    type="submit"
                    className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors duration-200 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    Send Message →
                  </motion.button>
                </motion.div>

                {/* Honeypot field for spam prevention */}
                <div
                  style={{ textIndent: '-99999px', whiteSpace: 'nowrap', overflow: 'hidden', position: 'absolute' }}
                  aria-hidden="true"
                >
                  <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
                </div>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactForm;
