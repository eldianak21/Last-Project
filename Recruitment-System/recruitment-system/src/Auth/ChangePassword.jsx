// src/Auth/ChangePassword.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username; // Get username from state

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, newPassword }),
        });

        if (response.ok) {
            alert('Password changed successfully!');
            navigate('/login'); // Redirect to login after successful change
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Failed to change password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>New Password</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Change Password</button>
        </form>
    );
};

export default ChangePassword;