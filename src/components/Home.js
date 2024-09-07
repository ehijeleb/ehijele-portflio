import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';  // Import your Supabase client

function Home() {
  const [featuredProject, setFeaturedProject] = useState(null);
  const [latestBlogPost, setLatestBlogPost] = useState(null);

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

    // Fetch the latest blog post from Supabase
    const fetchLatestBlogPost = async () => {
      const { data, error } = await supabase
        .from('blog_post')  // Assuming the table name is 'blog_post'
        .select('*')
        .order('created_at', { ascending: false })  // Get the latest post
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching latest blog post:', error);
      } else {
        setLatestBlogPost(data);
      }
    };

    fetchFeaturedProject();
    fetchLatestBlogPost();
  }, []);

  return (
    <div className="home">

      {/* Spinner CSS */}
      <style jsx>{`
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg">Explore my projects and read about my learning journey</p>
      </header>

      <section className="py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Featured Project</h2>
          {featuredProject ? (
            <div>
              <img
                src={featuredProject.image}  // Supabase image URL stored in the database
                alt={featuredProject.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{featuredProject.title}</h3>
              <p className="text-gray-600">{featuredProject.description}</p>
              <p className="mt-2"><strong>Technology:</strong> {featuredProject.technology}</p>
            </div>
          ) : (
            <div className="spinner"></div>
          )}
        </div>

        <div className="bg-card p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Latest Blog Post</h2>
          {latestBlogPost ? (
            <div>
              <img
                src={latestBlogPost.image}  // Supabase image URL stored in the database
                alt={latestBlogPost.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{latestBlogPost.title}</h3>
              <p className="text-gray-600">{latestBlogPost.excerpt}</p>
            </div>
          ) : (
            <div className="spinner"></div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
