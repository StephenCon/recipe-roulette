// Import necessary libraries and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

// Define the LoginForm component
const LoginForm = () => {
    // Define state variables for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Define the handleSubmit function to be called on form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Send a POST request to the login endpoint
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Parse the JSON response from the server
        const data = await response.json();

        // Check the response status and act accordingly
        if (response.status === 200) {
            // On successful login, store the token, notify the user, and redirect to the dashboard
            localStorage.setItem('token', data.token);
            alert('Logged in successfully');
            navigate('/dashboard');
        } else {
            // On failed login, notify the user
            alert('Login failed');
        }
    };

    // Render the login form
    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <div className='form-group'>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='form-control'
                />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control'
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

// Export the LoginForm component as default export
export default LoginForm;