import React, { useState } from 'react';
import './SignUpForm.css'; // Import the CSS file

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (username.length < 3 || password.length < 6) {
            alert('Username must be at least 3 characters and password at least 6 characters long.');
            return;
        }

        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
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
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default SignupForm;
