import React from 'react';

// Three muted families so cards stay calm and the amber CTA stays loud:
//   language → warm slate
//   framework / library → cool slate
//   infra / data → mid slate
const TAG_FAMILY = {
  language: 'bg-slate-800 text-slate-200 border-slate-600',
  framework: 'bg-slate-800/70 text-slate-300 border-slate-700',
  infra: 'bg-slate-900 text-slate-400 border-slate-700',
};

const TAG_TO_FAMILY = {
  // languages
  'Python': 'language',
  'JavaScript': 'language',
  'TypeScript': 'language',
  'HTML': 'language',
  'CSS': 'language',
  // frameworks / libraries
  'React': 'framework',
  'React Native': 'framework',
  'Next.js': 'framework',
  'Flask': 'framework',
  'Tailwind CSS': 'framework',
  'Vite': 'framework',
  'Expo': 'framework',
  'Scikit-learn': 'framework',
  'Spotipy': 'framework',
  'Node.js': 'framework',
  // infra / data
  'Supabase': 'infra',
  'PostgreSQL': 'infra',
};

function TechTag({ tech }) {
  const family = TAG_TO_FAMILY[tech] || 'framework';
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border ${TAG_FAMILY[family]}`}>
      {tech}
    </span>
  );
}

export default TechTag;
