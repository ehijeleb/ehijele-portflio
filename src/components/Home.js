import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Typed from 'typed.js';
import Navbar from './Navbar';
import TechTag from './TechTag';
import MouseGlow from './MouseGlow';
import projects from '../data/projects';
import JollyRoger from './JollyRoger';

// Deterministic particle data for hero floating dots
const PARTICLES = [
  { x: 8,  delay: 0,   dur: 9,  size: 2   },
  { x: 18, delay: 3.2, dur: 12, size: 2.5 },
  { x: 30, delay: 6,   dur: 8,  size: 1.5 },
  { x: 44, delay: 1.5, dur: 11, size: 3   },
  { x: 56, delay: 4.8, dur: 9,  size: 2   },
  { x: 67, delay: 0.7, dur: 13, size: 1.5 },
  { x: 75, delay: 7,   dur: 8,  size: 2.5 },
  { x: 84, delay: 2.5, dur: 10, size: 2   },
  { x: 92, delay: 5.3, dur: 11, size: 1.5 },
  { x: 22, delay: 8.5, dur: 9,  size: 3   },
];

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

// Magnetic wrapper — attracts toward the cursor on hover
function MagneticButton({ href, children, className, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 220, damping: 18 });
  const ySpring = useSpring(y, { stiffness: 220, damping: 18 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

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

  // Scroll-linked parallax for hero content
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0]);

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
        backgroundColor: '#080e1a',
        backgroundImage: 'radial-gradient(350px at var(--mx, -1000px) var(--my, -1000px), rgba(245, 158, 11, 0.13), transparent 70%)',
      }}
    >
      <MouseGlow />
      <Navbar />

      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[92vh] overflow-hidden pt-28">
          {/* Sky gradient — Grand Line horizon */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 130% 55% at 50% 0%, rgba(56,189,248,0.18) 0%, transparent 68%)',
          }}
        />

        {/* Ambient glow blobs — drift slowly */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/3 left-1/4 w-[520px] h-[520px] bg-amber-500/5 rounded-full blur-3xl"
            animate={{ x: [0, 28, -18, 0], y: [0, -18, 28, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          />
          {/* Ocean-blue blob — the sea */}
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: 'rgba(34,211,238,0.10)' }}
            animate={{ x: [0, -22, 14, 0], y: [0, 22, -28, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          />
        </div>

        {/* Floating particles — rise like sea foam */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-full bg-amber-400"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                opacity: 0.08,
                animation: `float-up ${p.dur}s ${p.delay}s infinite ease-in`,
              }}
            />
          ))}
        </div>

        {/* Jolly Roger — background watermark, if you know you know */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div style={{ animation: 'bob 7s 0.5s ease-in-out infinite' }}>
            <JollyRoger
              variant="watermark"
              className="w-[340px] h-[340px] opacity-[0.055]"
            />
          </div>
        </div>

        {/* Parallax wrapper — hero content drifts upward and fades on scroll */}
        <motion.div
          className="text-center px-8 z-10 max-w-4xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
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
              <MagneticButton
                href="/projects"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors duration-200 text-sm"
              >
                Set Sail →
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated wave transition — 3 parallax layers */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 88 }}>
          {/* Back layer — ocean cyan, slowest */}
          <div className="absolute bottom-0 w-[200%]" style={{ animation: 'wave-back 11s ease-in-out infinite' }}>
            <svg viewBox="0 0 2880 88" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path
                d="M0,48 C360,88 720,8 1080,48 C1440,88 1800,8 2160,48 C2520,88 2880,8 2880,48 L2880,88 L0,88 Z"
                fill="rgba(34,211,238,0.24)"
              />
            </svg>
          </div>
          {/* Mid layer — lighter cyan, medium speed */}
          <div className="absolute bottom-0 w-[200%]" style={{ animation: 'wave-mid 8s ease-in-out infinite' }}>
            <svg viewBox="0 0 2880 88" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path
                d="M0,52 C360,88 720,16 1080,52 C1440,88 1800,16 2160,52 C2520,88 2880,16 2880,52 L2880,88 L0,88 Z"
                fill="rgba(56,189,248,0.17)"
              />
            </svg>
          </div>
          {/* Front layer — solid dark, fastest */}
          <div className="absolute bottom-0 w-[200%]" style={{ animation: 'wave-front 6s ease-in-out infinite' }}>
            <svg viewBox="0 0 2880 88" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path
                d="M0,42 C360,88 720,4 1080,42 C1440,88 1800,4 2160,42 C2520,88 2880,4 2880,42 L2880,88 L0,88 Z"
                fill="#020617"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ backgroundColor: '#020617' }}>

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
            <div className="flex flex-wrap gap-7">
              {SKILLS.map(({ name, src }, i) => (
                <div
                  key={name}
                  style={{ animation: `bob ${3.0 + (i % 5) * 0.45}s ${(i * 0.38) % 2.8}s infinite ease-in-out` }}
                >
                  <motion.div
                    className="flex flex-col items-center gap-2.5 group cursor-default"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.09 }}
                    whileHover={{ y: -6, transition: { duration: 0.18 } }}
                  >
                    <div className="w-14 h-14 bg-slate-800 rounded-xl p-3 flex items-center justify-center border border-slate-700 group-hover:border-amber-400/60 group-hover:bg-slate-700 transition-all duration-200">
                      <img src={src} alt={name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-amber-400 font-medium transition-colors duration-200">
                      {name}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>
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
                <MagneticButton
                  href="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors duration-200 text-sm"
                >
                  View all projects →
                </MagneticButton>
              </div>
            </motion.div>
          </section>
        )}

        {/* Writing / Substack */}
        <WritingPreview />

        {/* Footer */}
        <footer className="border-t border-slate-800 py-10 text-center">
          <p className="text-slate-600 text-sm flex items-center justify-center gap-2">
            <JollyRoger variant="footer" className="w-5 h-5 opacity-60" />
            Benedict Ibhawaegbele · {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
