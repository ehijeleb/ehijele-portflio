import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import MouseGlow from '../MouseGlow';

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

      <div className="max-w-lg mx-auto px-6 pt-36 pb-20">
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
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  name="Name"
                  id="name"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-colors duration-200"
                  required
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  name="Email"
                  id="email"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-colors duration-200"
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="Subject"
                  id="subject"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-colors duration-200"
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  name="Message"
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-colors duration-200 resize-none"
                  required
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors duration-200 text-sm"
              >
                Send Message →
              </button>

              {/* Honeypot field for spam prevention */}
              <div
                style={{ textIndent: '-99999px', whiteSpace: 'nowrap', overflow: 'hidden', position: 'absolute' }}
                aria-hidden="true"
              >
                <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactForm;
