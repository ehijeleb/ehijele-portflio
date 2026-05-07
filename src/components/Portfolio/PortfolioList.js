import React, { useState } from 'react';
import { motion } from 'framer-motion';
import projects from '../../data/projects';
import ProjectDetailModal from './ProjectDetailModal';
import Navbar from '../Navbar';
import TechTag from '../TechTag';
import MouseGlow from '../MouseGlow';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function ProjectCard({ project, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden cursor-pointer flex flex-col group hover:border-amber-400/40 transition-colors duration-200"
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="h-44 bg-slate-700 overflow-hidden flex-shrink-0">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-600 text-5xl font-black">{project.title.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
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
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white font-medium transition-colors"
          >
            <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioList() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [featuredImgError, setFeaturedImgError] = useState(false);

  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

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

      {/* Header — pt accounts for the floating navbar height */}
      <header className="border-b border-slate-800 pt-36 pb-16 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/4 rounded-full blur-3xl" />
        </div>
        <motion.p
          className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.p>
        <motion.h1
          className="text-4xl lg:text-5xl font-black text-white mb-3"
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

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Featured */}
        {featured && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">Featured</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>
            <motion.div
              className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden cursor-pointer group hover:border-amber-400/40 transition-colors duration-300 flex flex-col md:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(featured)}
            >
              <div className="md:w-5/12 h-56 md:h-auto bg-slate-700 overflow-hidden flex-shrink-0">
                {!featuredImgError ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={() => setFeaturedImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-slate-600 text-7xl font-black">{featured.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center md:w-7/12">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-50 transition-colors">
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
                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  {featured.live_link && (
                    <a
                      href={featured.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      ↗ Live Demo
                    </a>
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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {rest.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
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
