import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Import your Supabase client

function PortfolioList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    // Fetch the list of projects from Supabase
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('project') // Ensure you use the correct table name ('project' in your case)
        .select('*'); // Fetch all fields

      if (error) {
        console.error('Error fetching projects:', error);
        setLoading(false); // Stop loading even if there's an error
      } else {
        setProjects(data);
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="portfolio-list">

    <nav className="bg-stone-900 py-4 px-8 flex justify-between items-center">
    <div className="text-neutral-500 font-bold">Benedict Ibhawaegbele</div>
    <ul className="flex space-x-4">
      <li><a href="/" className="text-white hover:text-gray-500">Home</a></li>
      <li><a href="/projects" className="text-white hover:text-gray-500">Projects</a></li>
      <li><a href="/blog" className="text-white hover:text-gray-500">Blog</a></li>
      <li><a href="/contact" className="text-white hover:text-gray-500">Contact</a></li>
    </ul>
    </nav>

      <header className="bg-neutral-50 text-primary py-32 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-lg">Explore the projects I've built over time</p>
      </header>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="projects-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {projects.map((project) => (
            <div key={project.id} className="project-card bg-card p-4 rounded-lg shadow-lg">
              <Link to={`/portfolio/${project.id}`}>
                <img
                  src={project.image}  // Ensure image paths are correctly stored in Supabase
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
                <p className="mt-2"><strong>Technology:</strong> {project.technology}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

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
