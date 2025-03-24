import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        console.log('Form submitted'); // Debugging log

        // Fetch API call to signup
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, phone, password }), // Send correct fields
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();
            console.log(data); // Log the response from the server

            // Optionally handle success (e.g., redirect to login or show a success message)

        } catch (error) {
            console.error('Error during signup:', error);
            setErrorMessage(error.message); // Set the error message to display
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                <h1>Welcome to Jimma University Recruitment Hub</h1>
                <p>Log in to access powerful tools for managing candidates, scheduling interviews, and tracking progress—all in one place.</p>
            </div>
            <div className="right-section">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="phone">Phone number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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

                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

                    <button type="submit">Register</button>
                </form>

                <div className="login-redirect">
                    <p>Already have an account?</p>
                    <Link to="/login" className="login-button">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;