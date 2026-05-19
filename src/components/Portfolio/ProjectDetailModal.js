import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import TechTag from '../TechTag';
import { useLenis } from '../../context/LenisContext';
import { EASE_OUT_EXPO, SPRING_SOFT, AnimatedArrow, NudgeOnHover } from '../../animations';

const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
  'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'
].join(',');

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  const [imgError, setImgError] = useState(false);
  const lenisRef = useLenis();
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocused = useRef(null);
  const reduce = useReducedMotion();

  // Lock body scroll + Lenis while open, restore on close
  useEffect(() => {
    const lenis = lenisRef?.current;
    if (isOpen) {
      previouslyFocused.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      lenis?.stop();
      // Move focus into the dialog after the open transition starts
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = '';
      lenis?.start();
      setImgError(false);
      // Return focus to the element that opened the modal
      previouslyFocused.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isOpen, lenisRef]);

  // Esc to close + Tab focus trap
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll(FOCUSABLE);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!project) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70"
            style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
          />

          {/* Modal shell — dead-centered via grid wrapper; only opacity + a small scale
              so the layoutId image/title FLIP doesn't fight a translated parent. */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-modal-title-${project.id}`}
            className="relative w-full max-w-2xl m-auto bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={reduce ? { duration: 0.2 } : { ...SPRING_SOFT, opacity: { duration: 0.2, ease: EASE_OUT_EXPO } }}
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700/80 hover:bg-slate-600 text-slate-400 hover:text-white transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70"
              aria-label={`Close ${project.title} details`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full h-52 bg-slate-700 overflow-hidden">
              {!imgError ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-slate-600 text-6xl font-black" aria-hidden="true">{project.title.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* Content with scroll-shadow hint */}
            <div className="relative">
              {/* Top fade hint */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-800 to-transparent z-10" aria-hidden="true" />
              {/* Bottom fade hint */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-800 to-transparent z-10" aria-hidden="true" />

              <div className="p-7 max-h-[60vh] overflow-y-auto">
                <h2
                  id={`project-modal-title-${project.id}`}
                  className="font-display text-2xl font-bold text-white mb-3"
                >
                  {project.title}
                </h2>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.3 }}
                >
                  <p className="text-slate-300 leading-relaxed mb-5">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(t => <TechTag key={t} tech={t} />)}
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-xl border border-slate-600 hover:border-slate-500 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                    </a>
                    {project.live_link && (
                      <NudgeOnHover
                        as={motion.a}
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-treasure hover:bg-treasure-400 text-slate-900 text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70"
                      >
                        <AnimatedArrow char="↗" distance={3} /> Live Demo
                      </NudgeOnHover>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectDetailModal;
