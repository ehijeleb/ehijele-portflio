import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';  // Import your Supabase client

function PortfolioDetail() {
  // Extract the `id` parameter from the URL
  const { id } = useParams();
  // State to hold the project data
  const [project, setProject] = useState(null);
  // State to handle loading status
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch the project data when the component mounts
  useEffect(() => {
    // Fetch the project data from Supabase
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('project')  // Ensure this matches the table name in Supabase
        .select('*')
        .eq('id', id)  // Fetch the project by its id
        .single();  // Expect only one result

      if (error) {
        console.error('Error fetching project:', error);
        setLoading(false); // Stop loading even if there's an error
      } else {
        setProject(data); // Set the project data
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchProject();
  }, [id]);

  // Display a loading message while fetching data
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            width: '24px',
            height: '24px',
            border: '4px solid rgba(0, 0, 0, 0.1)',
            borderTop: '4px solid #000',
            borderRadius: '50%',
            animation: 'spinner 1s linear infinite',
          }}
        />
        <style>
          {`
          @keyframes spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          `}
        </style>
      </div>
    );
  }

  // Display a message if the project data is null
  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <div className="portfolio-detail">

      {/* Navigation Bar */}
      <nav className="bg-stone-900 py-4 px-8 flex justify-between items-center">
        <div className="text-neutral-500 font-bold">Benedict Ibhawaegbele</div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-500">Home</Link></li>
          <li><Link to="/projects" className="text-white hover:text-gray-500">Projects</Link></li>
          <li><Link to="/blog" className="text-white hover:text-gray-500">Blog</Link></li>
          <li><Link to="/contact" className="text-white hover:text-gray-500">Contact</Link></li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="bg-neutral-50 text-primary py-20 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      </header>

      {/* Project Detail Section */}
      <div className="project-detail p-8 flex flex-col items-center">
        <img
          src={project.image} // Using the image URL from the Supabase response
          alt={project.title}
          className="w-full max-w-3xl h-auto object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">{project.description}</p>
        <p><strong>Technology:</strong> {project.technology}</p>
        {project.details && (
          <p><strong>More Details:</strong> {project.details}</p>
        )}

        {project.github_link && (
          <p><strong>GitHub Link:</strong> <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{project.github_link}</a></p>
        )}
      </div>
    </div>
  );
}

export default PortfolioDetail;
