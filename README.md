# Portfolio Website

This project is a personal portfolio website that showcases projects and blog posts. It is built using React for the frontend and Django for the backend. The backend also uses PostgreSQL as the database and AWS S3 for media storage. The project is deployed using Render.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contact](#contact)

## Features

- **Project Showcase:** Displays a list of projects with details like description, technology used, and images.
- **Blog Posts:** Allows you to read blog posts on various topics.
- **Contact Form:** Users can send messages directly through the contact form.
- **Responsive Design:** The website is fully responsive and works on all devices.
- **Supabase Integration:** Backend management is powered by Supabase, providing a seamless experience.

## Technologies Used

### Frontend
- **React:** 
- **Tailwind CSS** 
- **React Router** 

### Backend
- **Supabase**
- **PostgreSQL** 
- **Supabase Storage**



### Deployment
- **Vercel** 

## Setup and Installation

### Prerequisites

 
- Node.js (for running the frontend)
- Supabase Account for backend setup

### Frontend

1. Clone the repository:

```bash
   git clone https://github.com/ehijeleb/ehijele-portflio.git
   cd portfolio/backend
```

2. Install the dependencies

```
   npm install
```


3. Set up environment variables ; Create a '.env' file:
```
    REACT_PUBLIC_SUPABASE_URL=your_supabase_url
    REACT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```



4.  Run development server

```
    npm start
```


### Supabase Setup

1. Create a new project in supabase


2. Set up database with the required tables


3. Set up authentication in Supabase if needed (optional)

4. Use Supabase's SQL editor to run queries or set up the schema (see the "API endpoints" section for specific routes)

## Usage

- Access the frontend at `http://localhost:3000`
- Manage content via supabase dashboard


## API Endpoints

- GET ` /api/portfolio/projects/`: retrieve all projects
- GET `/api/portfolio/featured-project/` : Retrieve the featured project
- GET `/api/blog/`: Retrieve all blog posts
- POST `/api/contact/` : Submit a contact form

## Contact 

For any inquiries, please reach out through the [Contact Form](https://portfolio-project-2-uc64.onrender.com/contact) or email at `benedict.ibha@gmail.com`