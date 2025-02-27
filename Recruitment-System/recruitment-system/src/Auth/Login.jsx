import React from 'react';
import './Login.css'; // Make sure to create this CSS file

const Login = () => {
    const handleGoogleSignIn = () => {
        // This function should handle Google sign-in
        window.open("https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email", "_self");
    };

    return (
        <div className="login-container">
            <h1>Sign in to access Recruit</h1>
            <form className="login-form">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" required />
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button type="submit" className="next-button">Next</button>
            </form>

            <div className="social-login">
                <p>OR Sign in using</p>
                <button onClick={handleGoogleSignIn} className="google-sign-in">
                    <span className="material-icons" style={{ fontSize: '20px' }}>google</span>
                </button>
            </div>

            <footer>
                <p>Already have an account? <a href="/signup">Sign up</a></p>
            </footer>
        </div>
    );
};

export default Login;