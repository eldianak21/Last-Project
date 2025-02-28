// Home.js
import React from 'react';
import './Home.css'; // Create a Home.css file for styles
import exampleImage1 from '../../assets/three.jpg'; // Replace with actual image path
import exampleImage2 from '../../assets/four.jpg'; // Replace with actual image path

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <h1>Welcome to Jimma University</h1>
                    <h1>Recruitment Hub</h1>
                    <p>Your gateway to finding the best opportunities at Jimma University.</p>
                    <button className="action-button">Get Started</button>
                </div>
            </header>

            <section className="features-section">
                <div className="features-left">
                    <h2>Main Features</h2>
                    <div className="feature-item">
                        <h3>Job Posting and Application</h3>
                        <p>HR Officers can create job vacancies, and applicants can submit applications online.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Application Screening</h3>
                        <p>HR Officers can review applications and shortlist candidates for interviews.</p>
                    </div>
                    <div className="feature-item">
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
                    <div className="feature-item">
                        <h3>User Management</h3>
                        <p>System Administrators manage user accounts, roles, and permissions.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Track Application Status</h3>
                        <p>Applicants can track the status of their applications and receive notifications.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Schedule Interviews</h3>
                        <p>HR Officers can schedule interviews and inform candidates of their status.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Jimma University. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;