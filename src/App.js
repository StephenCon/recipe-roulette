// External imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Internal imports
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm/LoginForm';
import './App.css';  // Simplified the import path as it's relative to the current file

/**
 * Main application component.
 * Sets up routing for the application.
 */
function App() {
    return (
        <div className="App">
            {/* Set up client-side routing using BrowserRouter */}
            <BrowserRouter>
                {/* Define application routes and corresponding components */}
                <Routes>
                    <Route path="/" element={<Home />} />         {/* Home route */}
                    <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
                    <Route path="/login" element={<LoginForm />} />     {/* Login route */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// Export App component for use in other parts of the application
export default App;
