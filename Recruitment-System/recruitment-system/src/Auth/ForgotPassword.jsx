import React from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const handleResetPassword = (e) => {
        e.preventDefault();
        // Add password reset logic here
    };

    return (
        <div className="container">
            <div className="left-section">
                <h1>Welcome to Jimma University Recruitment Hub</h1>
                <p>Log in to access powerful tools for managing candidates, scheduling interviews, and tracking progress—all in one place.</p>
            </div>
            <div className="right-section">
                <h1>Reset Password</h1>
                <form className="login-form" onSubmit={handleResetPassword}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" name="email" required />
                    <button type="submit" className="next-button">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;