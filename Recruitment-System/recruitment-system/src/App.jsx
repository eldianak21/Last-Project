import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import JobPosting from './components/JobPosting/JobPosting';
import Contact from './components/Contact/Contact';
const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/job-posting" element={<JobPosting />} />
                <Route path="/contact-us" element={<Contact />} />
               
               
            </Routes>
        </Router>
    );
};

export default App;