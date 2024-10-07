import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProjectDetailModal from './ProjectDetailModal';  // Import the modal component

function PortfolioList() {
  const [projects, setProjects] = useState([]);
  const [featuredProject, setFeaturedProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of projects from Supabase
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('project')
        .select('*');

      if (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      } else {
        setProjects(data);
        setLoading(false);
      }
    };

    // Fetch the featured project
    const fetchFeaturedProject = async () => {
      const { data, error } = await supabase
        .from('project')
        .select('*')
        .eq('featured', true)
        .single();

      if (error) {
        console.error('Error fetching featured project:', error);
      } else {
        setFeaturedProject(data);
      }
    };

    fetchProjects();
    fetchFeaturedProject();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project); // Set the selected project
    setIsModalOpen(true);        // Open the modal
  };

  const closeModal = () => {
    setSelectedProject(null);    
    setIsModalOpen(false);       
  };


  const filteredProjects = projects.filter(
    (project) => featuredProject && project.id !== featuredProject.id
  );

  return (
    <div className="portfolio-list">
      <nav className="bg-stone-900 py-4 px-8 flex justify-between items-center">
        <div className="text-neutral-500 font-bold"></div>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white hover:text-gray-500">Home</a></li>
          <li><a href="/projects" className="text-white hover:text-gray-500">Projects</a></li>
          <li><a href="/contact" className="text-white hover:text-gray-500">Contact</a></li>
        </ul>
      </nav>

      <header className="bg-neutral-50 text-primary py-16 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-lg">Explore the projects I've built over time</p>
      </header>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="projects-section">
          {/* Featured Project */}
          {featuredProject && (
            <div className="featured-project bg-card p-4 rounded-lg shadow-lg mb-8" onClick={() => openModal(featuredProject)}>
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{featuredProject.title}</h3>
              <p className="text-gray-600">{featuredProject.description}</p>
              <p className="mt-2"><strong>Technology:</strong> {featuredProject.technology}</p>
            </div>
          )}

          {/* All Projects */}
          <div className="projects-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card bg-card p-4 rounded-lg shadow-lg" onClick={() => openModal(project)}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
                <p className="mt-2"><strong>Technology:</strong> {project.technology}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Component */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />

      {/* Spinner CSS */}
      <style jsx>{`
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
        }

        .spinner {
          margin: 0 auto;
          width: 24px;
          height: 24px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #000;
          border-radius: 50%;
          animation: spinner 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default PortfolioList;
