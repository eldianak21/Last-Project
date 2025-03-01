import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="container">
            <div className="left-section">
                <h1>Welcome to Jimma University Recruitment Hub</h1>
                <p>Log in to access powerful tools for managing candidates, scheduling interviews, and tracking progress—all in one place.</p>
            </div>
            <div className="right-section">
                <h1>Sign in to access Recruit</h1>
                <form className="login-form">
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" name="email" required />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <button type="submit" className="next-button">Next</button>
                </form>

                <div className="forgot-password">
                    <p><a href="/forgot-password">Forgot Password?</a></p>
                </div>

                {/* <footer>
                    <p>© 2024 Jimma University. All Rights Reserved.</p>
                </footer> */}
            </div>
        </div>
    );
};

export default Login;