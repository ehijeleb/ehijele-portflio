import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import projects from '../../data/projects';
import ProjectDetailModal from './ProjectDetailModal';
import Navbar from '../Navbar';
import TechTag from '../TechTag';
import MouseGlow from '../MouseGlow';
import { EASE_OUT_EXPO, SPRING_SOFT, AnimatedArrow, NudgeOnHover } from '../../animations';

function ProjectCard({ project, onOpen, animDelay = 0 }) {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${project.title}`}
      className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden cursor-pointer flex flex-col group hover:border-treasure/40 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.12),0_8px_32px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: animDelay * 0.06 }}
      whileHover={reduce ? undefined : { y: -6, transition: SPRING_SOFT }}
      onClick={onOpen}
      onKeyDown={handleKey}
    >
      {/* Image wrapper */}
      <div className="relative h-44 flex-shrink-0">
        <div className="absolute inset-0 bg-slate-700 overflow-hidden">
          {!imgError ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 group-hover:[filter:sepia(0.45)_brightness(0.82)] transition-all duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-slate-600 text-5xl font-black" aria-hidden="true">{project.title.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Wanted poster watermark — for those who know */}
        <div className="absolute bottom-2 right-3 text-treasure font-mono text-[8px] tracking-[0.55em] font-black uppercase opacity-0 group-hover:opacity-[0.16] transition-opacity duration-500 pointer-events-none select-none">
          WANTED
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-base font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 flex-1 mb-3 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map(t => <TechTag key={t} tech={t} />)}
        </div>

        <div className="flex gap-4 mt-auto" onClick={e => e.stopPropagation()}>
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70 rounded"
            onKeyDown={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          {project.live_link && (
            <NudgeOnHover
              as={motion.a}
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-treasure hover:text-treasure-400 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70 rounded"
              onKeyDown={(e) => e.stopPropagation()}
            >
              <AnimatedArrow char="↗" distance={3} /> Live Demo
            </NudgeOnHover>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioList() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [featuredImgError, setFeaturedImgError] = useState(false);
  const reduce = useReducedMotion();

  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  const handleFeaturedKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProject(featured);
    }
  };

  return (
    <div
      className="min-h-screen text-white bg-surface"
      style={{
        backgroundImage: 'radial-gradient(350px at var(--mx, -1000px) var(--my, -1000px), rgba(245, 158, 11, 0.13), transparent 70%)',
      }}
    >
      <MouseGlow />
      <Navbar />

      <header
        id="main"
        className="border-b border-slate-800 pt-36 pb-16 px-6 sm:px-8 text-center relative overflow-hidden"
      >
        {/* Sky horizon gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(56,189,248,0.14) 0%, transparent 70%)' }}
        />
        {!reduce && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <motion.div
              className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl"
              style={{ background: 'rgba(34,211,238,0.10)' }}
              animate={{ x: [0, 24, -16, 0], y: [0, -16, 20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            />
          </div>
        )}
        <motion.p
          className="text-xs font-mono text-treasure tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.p>
        <motion.h1
          className="font-display text-4xl lg:text-5xl font-black text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Projects
        </motion.h1>
        <motion.p
          className="text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Things I've built
        </motion.p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Featured */}
        {featured && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-treasure tracking-[0.3em] uppercase">Featured</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>
            <motion.div
              role="button"
              tabIndex={0}
              aria-label={`Open details for ${featured.title}`}
              className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden cursor-pointer group hover:border-treasure/40 transition-colors duration-300 flex flex-col md:flex-row focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              whileHover={reduce ? undefined : { y: -4, transition: SPRING_SOFT }}
              onClick={() => setSelectedProject(featured)}
              onKeyDown={handleFeaturedKey}
            >
              <div className="md:w-5/12 h-56 md:h-auto bg-slate-700 overflow-hidden flex-shrink-0">
                {!featuredImgError ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={() => setFeaturedImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-slate-600 text-7xl font-black" aria-hidden="true">{featured.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center md:w-7/12">
                <h2 className="font-display text-2xl font-bold text-white mb-3">
                  {featured.title}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-5">{featured.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.technologies.map(t => <TechTag key={t} tech={t} />)}
                </div>
                <div className="flex gap-5" onClick={e => e.stopPropagation()}>
                  <a
                    href={featured.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70 rounded"
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  {featured.live_link && (
                    <NudgeOnHover
                      as={motion.a}
                      href={featured.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-treasure hover:text-treasure-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-treasure/70 rounded"
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <AnimatedArrow char="↗" distance={3} /> Live Demo
                    </NudgeOnHover>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* All Projects */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono text-slate-500 tracking-[0.3em] uppercase">All Projects</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelectedProject(project)}
              animDelay={i}
            />
          ))}
        </div>
      </main>

      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}

export default PortfolioList;
