import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';
import './tailwind.css'; // Assuming you're using Tailwind CSS

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using the new API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
