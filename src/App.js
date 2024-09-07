import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projects from './components/Portfolio/PortfolioList';
import PortfolioDetail from './components/Portfolio/PortfolioDetail';
import Home from './components/Home'; 
import BlogList from './components/Blog/BlogList'; 
import BlogDetail from './components/Blog/BlogDetail';  
import ContactForm from './components/Contact/ContactForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />  
        <Route path="/contact" element={<ContactForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
