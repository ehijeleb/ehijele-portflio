const projects = [
  {
    id: 1,
    title: "SoleMate",
    description:
      "A business management platform for sneaker resellers. Track inventory, monitor sales, and visualise profit and revenue across your entire operation from a single dashboard.",
    technologies: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
    image: "/images/projects/solemate.jpg",
    github_link: "https://github.com/ehijeleb/SoleMate",
    live_link: "https://sole-mate-omega.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "BasketIQ",
    description:
      "A smart grocery list for UK Sainsbury's shoppers. Mark favourites with a restock cadence, tick items off in-store, and let BasketIQ flag what's due to buy each week from your purchase history.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Python"],
    image: "/images/projects/basketiq.jpg",
    github_link: "https://github.com/ehijeleb/BasketIQ",
    live_link: "https://basket-iq-ruby.vercel.app/groceries",
    featured: false,
  },
  {
    id: 3,
    title: "PLBets",
    description:
      "Real-time Premier League prediction dashboard powered by a multi-model ML ensemble. Analyses team form, head-to-head history, and live standings to generate explainable match outcome and goal predictions.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "XGBoost", "LightGBM", "SHAP", "Tailwind CSS"],
    image: "/images/projects/plbets.jpg",
    github_link: "https://github.com/ehijeleb/PLBetsV2",
    live_link: "https://pl-bets-v2.vercel.app/",
    featured: false,
  },
  {
    id: 4,
    title: "EdoRoad",
    description:
      "A construction tracking platform for monitoring road projects across Edo State, Nigeria. View ongoing and planned works with live status updates.",
    technologies: ["JavaScript", "Vite", "Tailwind CSS"],
    image: "/images/projects/edoroad.jpg",
    github_link: "https://github.com/ehijeleb/EdoRoad",
    live_link: "https://edo-road.vercel.app",
    featured: false,
  },
  {
    id: 5,
    title: "Spotify Stats",
    description:
      "Connect your Spotify account to explore personalised listening stats — top tracks, artists, and albums across 4-week, 6-month, and all-time windows with grid and list views.",
    technologies: ["Python", "Flask", "Spotipy", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/spotify-stats.jpg",
    github_link: "https://github.com/ehijeleb/spotify-stats-app",
    live_link: null,
    featured: false,
  },
  {
    id: 6,
    title: "Album Recommender",
    description:
      "An album discovery app that helps music lovers find new records tailored to their taste.",
    technologies: ["JavaScript", "React", "Node.js"],
    image: "/images/projects/album-recommender.jpg",
    github_link: "https://github.com/ehijeleb/Album-Recommender",
    live_link: "https://album-recommender.vercel.app",
    featured: false,
  },
  {
    id: 7,
    title: "ExeChange",
    description:
      "A cross-platform mobile marketplace app built with React Native and Expo, enabling users to buy and sell items within their local community.",
    technologies: ["TypeScript", "React Native", "Expo"],
    image: "/images/projects/exchange.jpg",
    github_link: "https://github.com/ehijeleb/ExeChange",
    live_link: null,
    featured: false,
  },
];

export default projects;
