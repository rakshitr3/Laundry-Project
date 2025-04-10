import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register'; // Import Register component
import App from './App'; 
import FirstPage from './dashboard/firstPage'; 
import SecondPage from './dashboard/secondPage';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Default route for Login */}
        <Route path="/register" element={<Register />} /> {/* Route to the Register page */}
        <Route path="/dashboard" element={<FirstPage />} /> {/* Route to the Dashboard page */}
        <Route path="/create" element={<SecondPage />} /> {/* Route to the Dashboard page */}
      </Routes>
    </Router>
  );
}

export default Routing;
