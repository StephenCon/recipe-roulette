// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TokenChecker from './components/TokenChecker';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; // Assuming you have a Login page

/**
 * Main application component.
 * Sets up client-side routing and includes the TokenChecker component.
 */
function App() {
    return (
        <div className="App">
            {/* Set up client-side routing using BrowserRouter */}
            <Router>
                {/* TokenChecker is added here */}
                <TokenChecker />
                {/* Define application routes and corresponding components */}
                <Routes>
                    <Route path="/" element={<Home />} />                 {/* Home route */}
                    <Route path="/dashboard" element={<Dashboard />} />   {/* Dashboard route */}
                    <Route path="/login" element={<Login />} />           {/* Login route */}
                </Routes>
            </Router>
        </div>
    );
}

// Export App component for use in other parts of the application
export default App;
