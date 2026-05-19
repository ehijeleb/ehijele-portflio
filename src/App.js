import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import Projects from './components/Portfolio/PortfolioList';
import Home from './components/Home';
import ContactForm from './components/Contact/ContactForm';
import { LenisProvider } from './context/LenisContext';
import { EASE_OUT_EXPO, AnimatedArrow, NudgeOnHover } from './animations';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.4,
    restDelta: 0.0005,
  });
  if (reduce) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-treasure z-50 origin-left pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

function PageTransition({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.985, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0,  scale: 1,     filter: 'blur(0px)' }}
      exit={{    opacity: 0, y: -8, scale: 0.99,  filter: 'blur(6px)' }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base text-white px-6 text-center">
      <p className="text-xs font-mono text-treasure tracking-[0.3em] uppercase mb-3">404</p>
      <h1 className="font-display text-4xl lg:text-5xl font-black mb-4">Off the map.</h1>
      <p className="text-slate-400 mb-8 max-w-sm">
        That page doesn't exist — even the Log Pose can't find it.
      </p>
      <NudgeOnHover
        as={motion(Link)}
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-treasure hover:bg-treasure-400 text-slate-900 font-bold rounded-lg transition-colors duration-200 text-sm"
      >
        Back to home <AnimatedArrow />
      </NudgeOnHover>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactForm /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <LenisProvider>
      <Router>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-treasure focus:text-slate-900 focus:font-semibold focus:rounded-md"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <AnimatedRoutes />
      </Router>
    </LenisProvider>
  );
}

export default App;
