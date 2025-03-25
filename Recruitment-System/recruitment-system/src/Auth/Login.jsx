// src/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Ensure Link is imported
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Login failed. Please try again.');
            return;
        }

        login(); // Log in the user
        navigate('/submit-cv'); // Redirect to CV submission after successful login
    };

    return (
        <div className="container">
            <div className="left-section">
                <h1>Welcome Back</h1>
                <p>Please log in to continue</p>
            </div>
            <div className="right-section">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="next-button">Next</button>
                </form>
                <p className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
                <p className="sign-up">
                    Don't have an account? <Link to="/sign-up">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;