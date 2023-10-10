import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <div className='form-group'>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='form-control' />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
