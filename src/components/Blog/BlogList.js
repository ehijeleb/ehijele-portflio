import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';  // Import your Supabase client

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    // Fetch blogs from Supabase
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blog_post')  // Ensure this matches the table name in Supabase
        .select('*');  // Fetch all fields from the blog_post table

      if (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false); // Stop loading even if there's an error
      } else {
        setBlogs(data);
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">

      <nav className="bg-stone-900 py-4 px-8 flex justify-between items-center">
        <div className="text-neutral-500 font-bold">Benedict Ibhawaegbele</div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-500">Home</Link></li>
          <li><Link to="/projects" className="text-white hover:text-gray-500">Projects</Link></li>
          <li><Link to="/blog" className="text-white hover:text-gray-500">Blog</Link></li>
          <li><Link to="/contact" className="text-white hover:text-gray-500">Contact</Link></li>
        </ul>
      </nav>

      <header className="bg-neutral-50 text-primary py-32 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">My Blog</h1>
        <p className="text-lg">Gain insight into how I built some of my projects</p>
      </header>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="blogs-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card bg-card p-4 rounded-lg shadow-lg">
              <Link to={`/blog/${blog.id}`}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-gray-600">{blog.excerpt}</p>
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

export default BlogList;
