import React from 'react';
import { useLocation } from 'react-router-dom';

const LINKS = [
  { href: '/', label: 'Home', external: false },
  { href: '/projects', label: 'Projects', external: false },
  { href: 'https://substack.com/@ehijele', label: 'Writing', external: true },
  { href: '/contact', label: 'Contact', external: false },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 rounded-2xl py-3 px-6 flex justify-between items-center shadow-xl shadow-black/30">
      <a
        href="/"
        className="text-amber-400 font-black text-xl tracking-widest hover:text-amber-300 transition-colors duration-200"
        title="B.D.I."
      >
        BI
      </a>
      <ul className="flex space-x-8">
        {LINKS.map(({ href, label, external }) => {
          const isActive = !external && location.pathname === href;
          return (
            <li key={href}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`text-sm font-medium transition-all duration-150 relative pb-0.5 ${
                  isActive
                    ? 'text-amber-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
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
