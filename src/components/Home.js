import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import Navbar from './Navbar';
import TechTag from './TechTag';
import MouseGlow from './MouseGlow';
import projects from '../data/projects';

const SKILLS = [
  { name: 'Python',      src: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  { name: 'JavaScript',  src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
  { name: 'TypeScript',  src: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
  { name: 'React',       src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  { name: 'Next.js',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg' },
  { name: 'PostgreSQL',  src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' },
  { name: 'Tailwind CSS',src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Git',         src: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg' },
  { name: 'HTML',        src: 'https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg' },
];

const stripHtml = (html) => html?.replace(/<[^>]+>/g, '').trim() || '';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function WritingPreview() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://ehijele.substack.com/feed')
      .then(r => r.json())
      .then(data => {
        if (data.status === 'ok' && data.items?.length) {
          setArticles(data.items.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-8 py-20 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-3">Writing</p>
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Latest Articles</h2>
          <a
            href="https://substack.com/@ehijele"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            All articles →
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-slate-800 rounded-xl h-52 animate-pulse" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.a
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-400/50 transition-all duration-200 group block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <p className="text-xs text-slate-500 mb-3 font-mono">
                  {new Date(article.pubDate).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
                <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors mb-3 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {stripHtml(article.description).slice(0, 140)}
                </p>
              </motion.a>
            ))}
          </div>
        ) : (
          <motion.a
            href="https://substack.com/@ehijele"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-8 py-6 bg-slate-800 border border-slate-700 hover:border-amber-400/50 rounded-xl transition-all duration-200 group"
            whileHover={{ y: -2 }}
          >
            <div>
              <p className="text-white font-semibold group-hover:text-amber-400 transition-colors">
                Read my writing on Substack
              </p>
              <p className="text-slate-400 text-sm mt-1">Articles on software, tech &amp; more</p>
            </div>
            <span className="text-amber-400 text-xl">→</span>
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}

function Home() {
  const typedEl = useRef(null);
  const [featuredImgError, setFeaturedImgError] = useState(false);
  const featured = projects.find(p => p.featured);

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [
        'Benedict Ibhawaegbele.',
        'Full-Stack Developer.',
        'CS Student @ Exeter.',
        'Software Engineer.',
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 2200,
      loop: true,
      showCursor: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor: '#0f172a',
        backgroundImage: 'radial-gradient(350px at var(--mx, -1000px) var(--my, -1000px), rgba(245, 158, 11, 0.13), transparent 70%)',
      }}
    >
      <MouseGlow />
      <Navbar />

      {/* Hero — pt accounts for the floating navbar height */}
      <section className="relative flex items-center justify-center min-h-[92vh] overflow-hidden pt-28">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[520px] h-[520px] bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="text-center px-8 z-10 max-w-4xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-amber-400 font-mono text-xs tracking-[0.35em] uppercase mb-6"
            variants={fadeUp}
          >
            Software Engineer
          </motion.p>

          <motion.h1
            className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight"
            style={{ minHeight: '1.2em' }}
            variants={fadeUp}
          >
            <span ref={typedEl} />
          </motion.h1>

          <motion.p
            className="text-slate-400 text-lg lg:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
            variants={fadeUp}
          >
            Computer Science student at the University of Exeter.
            Building things that matter, one project at a time.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-4"
            variants={fadeUp}
          >
            <a
              href="https://www.linkedin.com/in/benedict-ibhawaegbele-6b585b1aa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-400/40 rounded-lg transition-all duration-200 text-sm font-medium text-slate-300 hover:text-white"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="LinkedIn"
                className="w-4 h-4"
              />
              LinkedIn
            </a>
            <a
              href="https://github.com/ehijeleb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-400/40 rounded-lg transition-all duration-200 text-sm font-medium text-slate-300 hover:text-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="/projects"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-all duration-200 text-sm"
            >
              Set Sail →
            </a>
          </motion.div>
        </motion.div>

        {/* Wave transition to content */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path
              d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
              fill="#020617"
            />
          </svg>
        </div>
      </section>

      {/* Content */}
      <div className="bg-slate-950">

        {/* About */}
        <section className="max-w-5xl mx-auto px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-3">About</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Who am I?</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              Hi, I'm Benedict — a Computer Science student at the University of Exeter.
              I'm passionate about building innovative and efficient software, with experience spanning
              web applications, data-driven tools, and mobile development. Always learning, always building.
            </p>
          </motion.div>
        </section>

        {/* Skills */}
        <section className="max-w-5xl mx-auto px-8 py-20 border-t border-slate-800">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-3">Skills</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">My Toolkit</h2>
            <motion.div
              className="flex flex-wrap gap-7"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {SKILLS.map(({ name, src }) => (
                <motion.div
                  key={name}
                  className="flex flex-col items-center gap-2.5 group cursor-default"
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.18 } }}
                >
                  <div className="w-14 h-14 bg-slate-800 rounded-xl p-3 flex items-center justify-center border border-slate-700 group-hover:border-amber-400/60 group-hover:bg-slate-700 transition-all duration-200">
                    <img src={src} alt={name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-amber-400 font-medium transition-colors duration-200">
                    {name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Project */}
        {featured && (
          <section className="max-w-5xl mx-auto px-8 py-20 border-t border-slate-800">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-3">Featured</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">Latest Work</h2>
              <motion.a
                href="/projects"
                className="block bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden group transition-colors duration-300 hover:border-amber-400/40"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 h-56 overflow-hidden bg-slate-700 flex-shrink-0">
                    {!featuredImgError ? (
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        onError={() => setFeaturedImgError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-slate-600 text-6xl font-black">
                          {featured.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center md:w-3/5">
                    <span className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-3">
                      Featured Project
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-50 transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{featured.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {featured.technologies.map(t => <TechTag key={t} tech={t} />)}
                    </div>
                  </div>
                </div>
              </motion.a>
              <div className="mt-8 text-center">
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors duration-200 text-sm"
                >
                  View all projects →
                </a>
              </div>
            </motion.div>
          </section>
        )}

        {/* Writing / Substack */}
        <WritingPreview />

        {/* Footer */}
        <footer className="border-t border-slate-800 py-10 text-center">
          <p className="text-slate-600 text-sm">⚓ Benedict Ibhawaegbele · {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
