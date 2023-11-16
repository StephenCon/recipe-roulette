// Import necessary libraries and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

// Define the LoginForm component
const LoginForm = () => {
    // Define state variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Define the handleSubmit function to be called on form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Basic validation for email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email) || password.length < 6) {
            alert('Please enter a valid email and ensure password is at least 6 characters long.');
            return;
        }

        // Send a POST request to the login endpoint
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Parse the JSON response from the server
        const data = await response.json();

        // Check the response status and act accordingly
        if (response.status === 200) {
            // On successful login, store the token, notify the user, and redirect to the dashboard
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } else {
            // On failed login, redirect the user to the login page
            alert('Login failed, please try again.');  // Updated alert message
            /* navigate('/loginform'); */
        }
    };

    // Render the login form
    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <div className='mb-3'>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control'
                />
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </div>
            <div className="mb-3 text-center border-bottom"></div>
            <div className="mb-3 d-flex justify-content-between">
                <button className="btn btn-danger me-2">
                    <i className="fab fa-google me-2"></i> Log in with Google
                </button>
                <button className="btn btn-primary">
                    <i className="fab fa-facebook-f me-2"></i> Log in with Facebook
                </button>
            </div>
        </form>
    );
};

// Export the LoginForm component as default export
export default LoginForm;
