// Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import exampleImage1 from '../../assets/three.jpg';
import exampleImage2 from '../../assets/four.jpg';

const Home = () => {
    const [activeFeature, setActiveFeature] = useState(null);

    const handleFeatureClick = (featureId) => {
        setActiveFeature(featureId);
    };

    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <h1>Welcome to Jimma University</h1>
                    <h1>Recruitment Hub</h1>
                    <p>Your gateway to finding the best opportunities at Jimma University.</p>
                    <Link to="/job-posting">
                        <button className="action-button">Get Started</button>
                    </Link>
                </div>
            </header>

            <section className="features-section">
                <div className="features-left">
                    <h2>Main Features</h2>
                    <div className={`feature-item ${activeFeature === 1 ? 'active' : ''}`} onClick={() => handleFeatureClick(1)}>
                        <h3>Job Posting and Application</h3>
                        <p>HR Officers can create job vacancies, and applicants can submit applications online.</p>
                    </div>
                    <div className={`feature-item ${activeFeature === 2 ? 'active' : ''}`} onClick={() => handleFeatureClick(2)}>
                        <h3>Application Screening</h3>
                        <p>HR Officers can review applications and shortlist candidates for interviews.</p>
                    </div>
                    <div className={`feature-item ${activeFeature === 3 ? 'active' : ''}`} onClick={() => handleFeatureClick(3)}>
                        <h3>Candidate Evaluation</h3>
                        <p>Department Heads evaluate candidates and provide rankings for final selection.</p>
                    </div>
                </div>
                <div className="features-right">
                    <img src={exampleImage1} alt="Recruitment Process" className="feature-image" />
                </div>
            </section>

            <section className="features-section">
                <div className="features-left">
                    <img src={exampleImage2} alt="Interview Process" className="feature-image" />
                </div>
                <div className="features-right">
                    <h2>Main Features</h2>
                    <div className={`feature-item ${activeFeature === 4 ? 'active' : ''}`} onClick={() => handleFeatureClick(4)}>
                        <h3>User Management</h3>
                        <p>System Administrators manage user accounts, roles, and permissions.</p>
                    </div>
                    <div className={`feature-item ${activeFeature === 5 ? 'active' : ''}`} onClick={() => handleFeatureClick(5)}>
                        <h3>Track Application Status</h3>
                        <p>Applicants can track the status of their applications and receive notifications.</p>
                    </div>
                    <div className={`feature-item ${activeFeature === 6 ? 'active' : ''}`} onClick={() => handleFeatureClick(6)}>
                        <h3>Schedule Interviews</h3>
                        <p>HR Officers can schedule interviews and inform candidates of their status.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;