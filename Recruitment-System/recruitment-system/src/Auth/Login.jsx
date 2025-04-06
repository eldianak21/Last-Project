// // // src/Auth/Login.jsx
// // import React, { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom'; // Ensure Link is imported
// // import { useAuth } from './AuthContext';
// // import './Login.css';

// // const Login = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const { login } = useAuth();
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         const response = await fetch('http://localhost:5000/api/login', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({ username: email, password }),
// //         });

// //         if (!response.ok) {
// //             const errorData = await response.json();
// //             setErrorMessage(errorData.message || 'Login failed. Please try again.');
// //             return;
// //         }

// //         login(); // Log in the user
// //         navigate('/submit-cv'); // Redirect to CV submission after successful login
// //     };

// //     return (
// //         <div className="container">
// //             <div className="left-section">
// //                 <h1>Welcome Back</h1>
// //                 <p>Please log in to continue</p>
// //             </div>
// //             <div className="right-section">
// //                 <form className="login-form" onSubmit={handleSubmit}>
// //                     <label>Email</label>
// //                     <input 
// //                         type="email" 
// //                         value={email} 
// //                         onChange={(e) => setEmail(e.target.value)} 
// //                         required 
// //                     />
// //                     <label>Password</label>
// //                     <input 
// //                         type="password" 
// //                         value={password} 
// //                         onChange={(e) => setPassword(e.target.value)} 
// //                         required 
// //                     />
// //                     {errorMessage && <p className="error-message">{errorMessage}</p>}
// //                     <button type="submit" className="next-button">Next</button>
// //                 </form>
// //                 <p className="forgot-password">
// //                     <Link to="/forgot-password">Forgot Password?</Link>
// //                 </p>
// //                 <p className="sign-up">
// //                     Don't have an account? <Link to="/sign-up">Sign up here</Link>
// //                 </p>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;

// // Login.jsx

// // Login.jsx

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import './Login.css';
// import * as jwtDecodeModule from 'jwt-decode'; // Correct import

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username: username, password }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             setErrorMessage(errorData.message || 'Login failed. Please try again.');
//             return;
//         }

//         const data = await response.json();
//         const token = data.token;
//         localStorage.setItem('token', token);

//         try {
//             const decodedToken = jwtDecodeModule.default(token); // Correct usage of jwtDecode
//             localStorage.setItem('userRole', decodedToken.role);
//         } catch (error) {
//             console.error("Error decoding token:", error);
//             setErrorMessage("Error decoding token. Login may still succeed.");
//         }

//         login();
//         navigate('/submit-cv');
//     };

//     return (
//         <div className="container">
//             <div className="left-section">
//                 <h1>Welcome Back</h1>
//                 <p>Please log in to continue</p>
//             </div>
//             <div className="right-section">
//                 <form className="login-form" onSubmit={handleSubmit}>
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     {errorMessage && <p className="error-message">{errorMessage}</p>}
//                     <button type="submit" className="next-button">Next</button>
//                 </form>
//                 <p className="forgot-password">
//                     <Link to="/forgot-password">Forgot Password?</Link>
//                 </p>
//                 <p className="sign-up">
//                     Don't have an account? <Link to="/sign-up">Sign up here</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;


// // src/Auth/Login.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import './Login.css';
// import jwtDecode from 'jwt-decode'; // Correct import

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username: username, password }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             setErrorMessage(errorData.message || 'Login failed. Please try again.');
//             return;
//         }

//         const data = await response.json();
//         const token = data.token;
//         localStorage.setItem('token', token);

//         try {
//             const decodedToken = jwtDecode(token); // Correct usage here
//             const userRole = decodedToken.role;
//             localStorage.setItem('userRole', userRole);

//             login();
//             console.log("User Role:", userRole);

//             switch (userRole) {
//                 case 'Admin':
//                     navigate('/admin-dashboard');
//                     break;
//                 case 'HR Officer':
//                     navigate('/hr-tools');
//                     break;
//                 case 'Applicant':
//                     navigate('/submit-cv');
//                     break;
//                 case 'Department Head':
//                     navigate('/department-head-dashboard');
//                     break;
//                 default:
//                     navigate('/dashboard');
//             }
//         } catch (error) {
//             console.error("Error decoding token:", error);
//             setErrorMessage("Error decoding token. Login may still succeed.");
//             navigate('/dashboard');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="left-section">
//                 <h1>Welcome Back</h1>
//                 <p>Please log in to continue</p>
//             </div>
//             <div className="right-section">
//                 <form className="login-form" onSubmit={handleSubmit}>
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     {errorMessage && <p className="error-message">{errorMessage}</p>}
//                     <button type="submit" className="next-button">Next</button>
//                 </form>
//                 <p className="forgot-password">
//                     <Link to="/forgot-password">Forgot Password?</Link>
//                 </p>
//                 <p className="sign-up">
//                     Don't have an account? <Link to="/sign-up">Sign up here</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import './Login.css';
// import jwtDecode from 'jwt-decode'; // Correct import

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             setErrorMessage(errorData.message || 'Login failed. Please try again.');
//             return;
//         }

//         const data = await response.json();
//         const token = data.token;
//         localStorage.setItem('token', token);

//         try {
//             const decodedToken = jwtDecode(token);
//             const userRole = decodedToken.role;
//             localStorage.setItem('userRole', userRole);

//             login();

//             if (data.requiresChange) {
//                 navigate('/change-password', { state: { username } });
//             } else {
//                 switch (userRole) {
//                     case 'Admin':
//                         navigate('/admin-dashboard');
//                         break;
//                     case 'HR Officer':
//                         navigate('/hr-tools');
//                         break;
//                     case 'Applicant':
//                         navigate('/submit-cv');
//                         break;
//                     case 'Department Head':
//                         navigate('/department-head-dashboard');
//                         break;
//                     default:
//                         navigate('/dashboard');
//                 }
//             }
//         } catch (error) {
//             console.error("Error decoding token:", error);
//             setErrorMessage("Error decoding token. Login may still succeed.");
//             navigate('/dashboard');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="left-section">
//                 <h1>Welcome Back</h1>
//                 <p>Please log in to continue</p>
//             </div>
//             <div className="right-section">
//                 <form className="login-form" onSubmit={handleSubmit}>
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     {errorMessage && <p className="error-message">{errorMessage}</p>}
//                     <button type="submit" className="next-button">Next</button>
//                 </form>
//                 <p className="forgot-password">
//                     <Link to="/forgot-password">Forgot Password?</Link>
//                 </p>
//                 <p className="sign-up">
//                     Don't have an account? <Link to="/sign-up">Sign up here</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';
import jwtDecode from 'jwt-decode'; // Correct import for decoding JWT

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Login failed. Please try again.');
            return;
        }

        const data = await response.json();
        const token = data.token;

        // Store token and decode for user role
        localStorage.setItem('token', token);
        try {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;
            localStorage.setItem('userRole', userRole);

            login(); // Call the login function from AuthContext

            // Redirect based on user role
            if (data.requiresChange) {
                navigate('/change-password', { state: { username } });
            } else {
                switch (userRole) {
                    case 'Admin':
                        navigate('/admin-dashboard');
                        break;
                    case 'HR Officer':
                        navigate('/hr-dashboard');
                        break;
                    case 'Applicant':
                        navigate('/submit-cv');
                        break;
                    case 'Department Head':
                        navigate('/department-head-dashboard');
                        break;
                    default:
                        navigate('/dashboard');
                }
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setErrorMessage("Error decoding token. Login may still succeed.");
            navigate('/dashboard'); // Default redirect
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                <h1>Welcome Back</h1>
                <p>Please log in to continue</p>
            </div>
            <div className="right-section">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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