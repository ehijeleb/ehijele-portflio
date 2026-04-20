import React from 'react';
import { useLocation } from 'react-router-dom';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-stone-900 py-4 px-8 flex justify-between items-center sticky top-0 z-40">
      <a href="/" className="text-white font-bold text-lg tracking-widest">BI</a>
      <ul className="flex space-x-6">
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={`text-sm font-medium transition-colors duration-150 ${
                location.pathname === href
                  ? 'text-white border-b border-white pb-0.5'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
