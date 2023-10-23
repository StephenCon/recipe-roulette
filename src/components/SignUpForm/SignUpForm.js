import React, { useState } from 'react';
import './SignUpForm.css'; // Import the CSS file

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex pattern for email validation
        if (!emailPattern.test(email) || password.length < 6) {  // Updated validation
            alert('Please enter a valid email and ensure password is at least 6 characters long.');
            return;
        }

        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 201) {
            alert('User registered successfully');
        } else {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default SignupForm;
