import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projects from './components/Portfolio/PortfolioList';
import Home from './components/Home';   
import ContactForm from './components/Contact/ContactForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} /> 
        <Route path="/contact" element={<ContactForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
