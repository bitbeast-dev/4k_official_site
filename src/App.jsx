import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Categories from '../pages/Categories';
import Dashboard from '../pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      {/* Put ToastContainer OUTSIDE of Routes */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Optional: your navbar can also stay outside so it persists */}
     

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
