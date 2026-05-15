import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const LINKS = [
  { href: '/', label: 'Home', external: false },
  { href: '/projects', label: 'Projects', external: false },
  { href: 'https://substack.com/@ehijele', label: 'Writing', external: true },
  { href: '/contact', label: 'Contact', external: false },
];

// Nautical compass — Log Pose easter egg for those who know
function CompassRose() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      title="Log Pose"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={reduce ? undefined : { duration: 22, repeat: Infinity, ease: 'linear' }}
      className="opacity-70 hidden sm:block flex-shrink-0"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="0.8" opacity="0.4" />
        <path d="M12,2 L10.5,11 L12,9 L13.5,11 Z" fill="#f59e0b" />
        <path d="M12,22 L13.5,13 L12,15 L10.5,13 Z" fill="#f59e0b" opacity="0.28" />
        <path d="M22,12 L13,10.5 L15,12 L13,13.5 Z" fill="#f59e0b" opacity="0.28" />
        <path d="M2,12 L11,13.5 L9,12 L11,10.5 Z" fill="#f59e0b" opacity="0.28" />
        <circle cx="12" cy="12" r="1.6" fill="#f59e0b" />
        <circle cx="12" cy="12" r="0.7" fill="#020617" />
      </svg>
    </motion.div>
  );
}

function Navbar() {
  const location = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 rounded-2xl py-3 px-4 sm:px-6 flex justify-between items-center shadow-xl shadow-black/30"
    >
      <div className="flex items-center gap-2.5">
        <motion.a
          href="/"
          className="font-display text-treasure font-black text-xl tracking-widest hover:text-treasure-400 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70 rounded"
          aria-label="Home — Benedict Ibhawaegbele"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          BI
        </motion.a>
        <CompassRose />
      </div>

      <ul className="flex space-x-5 sm:space-x-8">
        {LINKS.map(({ href, label, external }) => {
          const isActive = !external && location.pathname === href;
          return (
            <li key={href}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium transition-all duration-150 relative pb-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70 rounded ${
                  isActive ? 'text-treasure' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-treasure rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
