import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';  // Import your Supabase client

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the blog post from Supabase
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from('blog_post')  // Ensure this matches your Supabase table name
        .select('*')
        .eq('id', id)  // Fetch the blog post with the given id
        .single();  // Expect only one result

      if (error) {
        console.error('Error fetching blog:', error);
        setLoading(false); // Stop loading even if there's an error
      } else {
        setBlog(data);
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchBlog();
  }, [id]);

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

  if (!blog) {
    return <div>No blog found.</div>;
  }

  return (
    <div className="blog-detail">

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

      {/* Blog Detail Section */}
      <div className="blog-detail p-8 flex flex-col items-center">
        {/* Centered Image */}
        <img
          src={blog.image}  // Using the image URL from Supabase
          alt={blog.title}
          className="max-w-md h-auto object-contain rounded-lg mb-8"
        />

        {/* Left-Aligned Text */}
        <div className="w-full max-w-2xl text-left">
          <p className="text-gray-600 mb-4">
            {blog.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>

          <p><strong>Published on:</strong> {new Date(blog.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      
    </div>
  );
}

export default BlogDetail;
