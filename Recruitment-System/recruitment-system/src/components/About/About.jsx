import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-page">
            <section className="hero-section">
                <h1>About Jimma University Recruitment Hub</h1>
                <p>Discover our commitment to excellence and innovation in recruitment.</p>
            </section>
            <section className="mission">
                <h2>Our Mission</h2>
                <p>To attract, develop, and retain the best talent to support the university's goals and objectives.</p>
            </section>
            <section className="team">
                <h2>Meet Our Team</h2>
                <div className="team-member">
                    <h3>Recruitment Team Lead</h3>
                    <p>Human Resources</p>
                    <p>+251-XXX-XXXX</p>
                    <p>
                        <strong>Email:</strong>
                        <a href="mailto:recruitment@ju.edu.et" style={{ color: '#4b3d3d', textDecoration: 'none' }}>
                            recruitment@ju.edu.et
                        </a>
                    </p>
                </div>
                <div className="team-member">
                    <h3>HR Coordinator</h3>
                    <p>Human Resources</p>
                    <p>+251-XXX-XXXX</p>
                    <p>
                        <strong>Email:</strong>
                        <a href="mailto:hr.coordinator@ju.edu.et" style={{ color: '#4b3d3d', textDecoration: 'none' }}>
                            hr.coordinator@ju.edu.et
                        </a>
                    </p>
                </div>
            </section>
            <section className="values">
                <h2>Our Values</h2>
                <ul>
                    <li>Integrity: We uphold the highest ethical standards.</li>
                    <li>Excellence: We strive for continuous improvement and innovation.</li>
                    <li>Transparency: We ensure open and clear communication.</li>
                </ul>
            </section>
            <section className="cta">
                <h2>Ready to Join Our Team?</h2>
                <Link to="/contact">
                    <button className="cta-button">Contact Us</button>
                </Link>
            </section>
        </div>
    );
};

export default About;