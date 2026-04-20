import React, { useState } from 'react';
import projects from '../../data/projects';
import ProjectDetailModal from './ProjectDetailModal';
import Navbar from '../Navbar';
import TechTag from '../TechTag';

function ProjectCard({ project, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
      onClick={onClick}
    >
      <div className="h-44 bg-gradient-to-br from-gray-800 to-gray-600 overflow-hidden flex-shrink-0">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-5xl font-bold opacity-20">{project.title.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 flex-1 mb-3 line-clamp-3 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map(t => <TechTag key={t} tech={t} />)}
        </div>

        <div className="flex gap-4 mt-auto" onClick={e => e.stopPropagation()}>
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black font-medium transition-colors"
          >
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="" className="w-4 h-4" />
            GitHub
          </a>
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PortfolioList() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [featuredImgError, setFeaturedImgError] = useState(false);

  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <header className="bg-white border-b border-gray-100 py-12 px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Projects</h1>
        <p className="text-gray-500">Things I've built</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured */}
        {featured && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">Featured</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col md:flex-row"
              onClick={() => setSelectedProject(featured)}
            >
              <div className="md:w-5/12 h-56 md:h-auto bg-gradient-to-br from-gray-800 to-gray-600 overflow-hidden flex-shrink-0">
                {!featuredImgError ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                    onError={() => setFeaturedImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white text-7xl font-bold opacity-20">{featured.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center md:w-7/12">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{featured.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-5">{featured.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.technologies.map(t => <TechTag key={t} tech={t} />)}
                </div>
                <div className="flex gap-5" onClick={e => e.stopPropagation()}>
                  <a
                    href={featured.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                  >
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="" className="w-4 h-4" />
                    GitHub
                  </a>
                  {featured.live_link && (
                    <a href={featured.live_link} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                      ↗ Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Projects */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">All Projects</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
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
