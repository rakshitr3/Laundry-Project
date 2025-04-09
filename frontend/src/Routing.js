// Routing.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register'; // Import Register component
import App from './App'; // Import the main App component

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Default route for Login */}
        <Route path="/register" element={<Register />} /> {/* Route to the Register page */}
      </Routes>
    </Router>
  );
}

export default Routing;
