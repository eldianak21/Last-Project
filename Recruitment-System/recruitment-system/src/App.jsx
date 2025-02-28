// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import './App.css'; // Your existing styles
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import JobPosting from './components/JobPosting/JobPosting';

const App = () => {
    return (
        <Router>
            <Header /> {/* Header component is constant across all pages */}
            <Routes>
                <Route path="/" element={<Home/>} /> {/* Home page */}
                <Route path="/about" element={<About />} /> {/* About page */}
                <Route path="/sign-up" element={<SignUp/> } />
                <Route path="/login" element={<Login/> } />
                <Route path="/forgot-password" element={<ForgotPassword/> } />
                <Route path="/job-posting" element={<JobPosting/> } />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;