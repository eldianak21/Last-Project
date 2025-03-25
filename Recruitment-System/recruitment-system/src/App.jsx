// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import JobPosting from './components/JobPosting/JobPosting';
import JobDescription from './components/JobPosting/JobDescription';
import CVSubmission from './Auth/CVSubmission';
import { AuthProvider } from './Auth/AuthContext';
import Footer from './components/Footer/Footer';
import ForgotPassword from './Auth/ForgotPassword';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
            
                    <Route path="/forgot-password" element={< ForgotPassword/>} />
                    <Route path="/job-posting" element={<JobPosting />} />
                    <Route path="/job-description/:id" element={<JobDescription />} />
                    <Route path="/submit-cv" element={<CVSubmission />} />
                </Routes>
               <Footer/>
            </Router>
        </AuthProvider>
    );
};

export default App;