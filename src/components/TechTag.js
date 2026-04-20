import React from 'react';

const TAG_COLORS = {
  'Next.js':      'bg-gray-900 text-white',
  'React':        'bg-blue-100 text-blue-800',
  'React Native': 'bg-blue-100 text-blue-800',
  'Python':       'bg-yellow-100 text-yellow-800',
  'Flask':        'bg-gray-100 text-gray-700',
  'JavaScript':   'bg-yellow-50 text-yellow-700 border border-yellow-200',
  'TypeScript':   'bg-blue-50 text-blue-700 border border-blue-200',
  'Supabase':     'bg-emerald-100 text-emerald-800',
  'PostgreSQL':   'bg-sky-100 text-sky-800',
  'Tailwind CSS': 'bg-cyan-100 text-cyan-800',
  'Vite':         'bg-purple-100 text-purple-800',
  'Expo':         'bg-gray-100 text-gray-700',
  'Scikit-learn': 'bg-orange-100 text-orange-800',
  'Node.js':      'bg-green-100 text-green-800',
  'Spotipy':      'bg-green-100 text-green-800',
  'HTML':         'bg-orange-50 text-orange-700 border border-orange-200',
  'CSS':          'bg-blue-50 text-blue-700 border border-blue-200',
};

function TechTag({ tech }) {
  const colorClass = TAG_COLORS[tech] || 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}>
      {tech}
    </span>
  );
}

export default TechTag;
