// Import necessary libraries
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A higher-order component that wraps around children components to provide 
 * authentication-based navigation. If the user is authenticated (has a token), 
 * it renders the children components; otherwise, it redirects the user to the login page.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The children components to be wrapped.
 * @returns {React.ReactNode} - The children components or a redirection to the login page.
 */
const AuthWrapper = ({ children }) => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    // Check if token exists and decide what to render
    return token ? children : <Navigate to="/login" replace />;
};

// Export AuthWrapper for use in other parts of the application
export default AuthWrapper;
