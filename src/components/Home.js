import React, { useEffect, useState, useRef } from 'react';
import { supabase } from './supabaseClient';  // Import your Supabase client
import Typed from 'typed.js';

function Home() {
  const [featuredProject, setFeaturedProject] = useState(null);
  const typedElement = useRef(null);  // Create a reference for the typed element

  useEffect(() => {
    // Fetch the featured project from Supabase
    const fetchFeaturedProject = async () => {
      const { data, error } = await supabase
        .from('project')
        .select('*')
        .eq('featured', true)
        .single();  // Assuming there's only one featured project

      if (error) {
        console.error('Error fetching featured project:', error);
      } else {
        setFeaturedProject(data);
      }
    };

    fetchFeaturedProject();

    // Initialize the Typed.js effect on the header
    const typed = new Typed(typedElement.current, {
      strings: ["Hello, I'm Benedict Ibhawaegbele"],
      typeSpeed: 50,
      showCursor: true,  
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="home">
      <nav className="bg-stone-900 py-4 px-8 flex justify-between items-center">
        <div className="text-neutral-500 font-bold"></div>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white hover:text-gray-500">Home</a></li>
          <li><a href="/projects" className="text-white hover:text-gray-500">Projects</a></li>
          <li><a href="/contact" className="text-white hover:text-gray-500">Contact</a></li>
        </ul>
      </nav>

      <header className="text-primary py-24 px-8 flex items-center justify-between">
        {/* Static Image div */}
        <div className="ml-56">
          <img
            src="https://ysyvmxkeecxnnfoarkad.supabase.co/storage/v1/object/sign/project-images/1718257818818.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0LWltYWdlcy8xNzE4MjU3ODE4ODE4LmpwZyIsImlhdCI6MTcyNTgxNTk1MywiZXhwIjoxNzU3MzUxOTUzfQ._XxpPEF6fZRD2cPT4sl53oGa2PN7jvER3cdJRM1RYEI&t=2024-09-08T17%3A19%3A13.933Z"
            alt="Profile"
            className="w-48 h-48 rounded-full border border-black"
          />
        </div>

        {/* Typing Text div */}
        <div className="text-container text-right mr-32">
          <h1 className="text-4xl font-bold mb-2">
            <span ref={typedElement} />
          </h1>
          <h2 className="text-xl text-gray-600">
            An ambitious Software Engineer
          </h2>

          <div className="flex justify-end space-x-4 mt-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-8 h-8"/>
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-8 h-8"/>
            </a>
          </div>
        </div>
      </header>

      {/* About Me Section using Tailwind */}
      <section className="flex flex-col items-left justify-center py-8 px-8">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">ABOUT ME</h2>
        <p className="text-lg text-gray-700 max-w-3xl text-justify mb-6">
        Hi, I'm Benedict Ibhawaegbele, a Computer Science student at the University of Exeter. I am passionate about software engineering, with a strong interest in building innovative and efficient solutions. My skills include developing web applications and working on various web development projects. I am constantly seeking to improve my abilities and stay up-to-date with the latest technologies to build impactful and meaningful software.  
        </p>


      </section>

    </div>
  );
}

export default Home;
