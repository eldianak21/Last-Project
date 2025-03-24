import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        });

        const data = await response.json();
        console.log(data); // Handle response from the server
    };

    return (
        <div className="container">
            <div className="left-section">
                <h1>Welcome to Jimma University Recruitment Hub</h1>
                <p>Log in to access powerful tools for managing candidates, scheduling interviews, and tracking progress—all in one place.</p>
            </div>
            <div className="right-section">
                <h1>Sign in to access Recruit</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button type="submit" className="next-button">Next</button>
                </form>

                <div className="forgot-password">
                    <p><a href="/forgot-password">Forgot Password?</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;