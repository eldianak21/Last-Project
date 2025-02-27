// ForgotPassword.js
import React from 'react';
import './SignIn.css';

const ForgotPassword = () => {
    const handleResetPassword = (e) => {
        e.preventDefault();
        // Add password reset logic here
    };

    return (
        <div className="login-container">
            <h1>Reset Password</h1>
            <form className="login-form" onSubmit={handleResetPassword}>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" required />
                <button type="submit" className="next-button">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;