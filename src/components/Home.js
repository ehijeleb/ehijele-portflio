import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Navbar from './Navbar';
import TechTag from './TechTag';
import projects from '../data/projects';

const SKILLS = [
  { name: 'Python',      src: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  { name: 'JavaScript',  src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
  { name: 'TypeScript',  src: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
  { name: 'React',       src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  { name: 'Next.js',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'PostgreSQL',  src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' },
  { name: 'Tailwind CSS',src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Git',         src: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg' },
  { name: 'HTML',        src: 'https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg' },
];

function Home() {
  const typedElement = useRef(null);
  const [profileImgError, setProfileImgError] = useState(false);
  const [featuredImgError, setFeaturedImgError] = useState(false);

  const featured = projects.find(p => p.featured);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ["Hello, I'm Benedict Ibhawaegbele"],
      typeSpeed: 50,
      showCursor: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      {/* Hero */}
      <header className="bg-white border-b border-gray-100 py-16 px-8 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex-shrink-0">
          {!profileImgError ? (
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-28 h-28 lg:w-44 lg:h-44 rounded-full border-2 border-gray-200 object-cover"
              onError={() => setProfileImgError(true)}
            />
          ) : (
            <div className="w-28 h-28 lg:w-44 lg:h-44 rounded-full border-2 border-gray-200 bg-stone-800 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">BI</span>
            </div>
          )}
        </div>

        <div className="text-right ml-8">
          <h1 className="text-xl lg:text-4xl font-extrabold text-gray-900 mb-2">
            <span ref={typedElement} />
          </h1>
          <p className="text-sm lg:text-lg text-gray-500 mb-5">Software Engineer</p>
          <div className="flex justify-end items-center space-x-4">
            <a href="https://www.linkedin.com/in/benedict-ibhawaegbele-6b585b1aa/" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-7 h-7" />
            </a>
            <a href="https://github.com/ehijeleb" target="_blank" rel="noopener noreferrer">
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-7 h-7" />
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8">
        {/* About */}
        <section className="py-12 border-b border-gray-100">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-5 uppercase tracking-wide">About Me</h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl leading-relaxed text-justify">
            Hi, I'm Benedict Ibhawaegbele, a Computer Science student at the University of Exeter.
            I'm passionate about building innovative and efficient software, with experience spanning
            web applications, data-driven tools, and mobile development. I'm constantly learning and
            enjoy working on projects that create real impact.
          </p>
        </section>

        {/* Skills */}
        <section className="py-12 border-b border-gray-100">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 uppercase tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-8">
            {SKILLS.map(({ name, src }) => (
              <div key={name} className="flex flex-col items-center gap-2 group">
                <img
                  src={src}
                  alt={name}
                  className="w-12 h-12 object-contain transition-transform duration-150 group-hover:scale-110"
                />
                <span className="text-xs text-gray-500 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Project */}
        {featured && (
          <section className="py-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 uppercase tracking-wide">Featured Project</h2>
            <a
              href="/projects"
              className="block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-52 bg-gradient-to-br from-gray-800 to-gray-600 overflow-hidden">
                  {!featuredImgError ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                      onError={() => setFeaturedImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-5xl font-bold opacity-20">{featured.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-7 flex flex-col justify-center md:w-3/5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Featured</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{featured.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{featured.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {featured.technologies.map(t => <TechTag key={t} tech={t} />)}
                  </div>
                </div>
              </div>
            </a>
            <div className="mt-6 text-center">
              <a
                href="/projects"
                className="inline-block px-6 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors duration-150"
              >
                View all projects →
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Home;
