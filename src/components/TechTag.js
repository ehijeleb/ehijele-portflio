import React from 'react';

const TAG_COLORS = {
  'Next.js':      'bg-slate-700 text-slate-200 border-slate-600',
  'React':        'bg-blue-950 text-blue-300 border-blue-800',
  'React Native': 'bg-blue-950 text-blue-300 border-blue-800',
  'Python':       'bg-yellow-950 text-yellow-300 border-yellow-800',
  'Flask':        'bg-slate-800 text-slate-300 border-slate-600',
  'JavaScript':   'bg-yellow-950 text-yellow-300 border-yellow-800',
  'TypeScript':   'bg-blue-950 text-blue-300 border-blue-900',
  'Supabase':     'bg-emerald-950 text-emerald-300 border-emerald-800',
  'PostgreSQL':   'bg-sky-950 text-sky-300 border-sky-800',
  'Tailwind CSS': 'bg-cyan-950 text-cyan-300 border-cyan-800',
  'Vite':         'bg-purple-950 text-purple-300 border-purple-800',
  'Expo':         'bg-slate-800 text-slate-300 border-slate-600',
  'Scikit-learn': 'bg-orange-950 text-orange-300 border-orange-800',
  'Node.js':      'bg-green-950 text-green-300 border-green-800',
  'Spotipy':      'bg-green-950 text-green-300 border-green-800',
  'HTML':         'bg-orange-950 text-orange-300 border-orange-800',
  'CSS':          'bg-blue-950 text-blue-300 border-blue-800',
};

function TechTag({ tech }) {
  const colorClass = TAG_COLORS[tech] || 'bg-slate-800 text-slate-300 border-slate-600';
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium border ${colorClass}`}>
      {tech}
    </span>
  );
}

export default TechTag;
