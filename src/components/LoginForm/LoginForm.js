import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.status === 200) {
            localStorage.setItem('token', data.token);
            alert('Logged in successfully');
            navigate('/dashboard');
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
