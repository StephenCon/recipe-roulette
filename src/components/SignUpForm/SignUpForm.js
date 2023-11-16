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

        if (response.status === 409) {
            alert('User already exists');
        } else if (response.status === 201) {
            alert('User registered successfully');
        } else {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <div className="mb-3">
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
            <div className="mb-3">
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
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </div>
            <div className="mb-3 text-center border-bottom"></div>
            <div className="mb-3 d-flex justify-content-between">
                <button className="btn btn-danger me-2">
                    <i className="fab fa-google me-2"></i> Sign up with Google
                </button>
                <button className="btn btn-primary">
                    <i className="fab fa-facebook-f me-2"></i> Sign up with Facebook
                </button>
            </div>
        </form>

    );
};

export default SignupForm;
