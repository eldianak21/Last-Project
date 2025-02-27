// About.jsx
import React from 'react';
import './About.css'; // Create an About.css file for styles

const About = () => {
    return (
        <div className="about-container">
            <h1>About Jimma University Recruitment Hub</h1>
            <p>
                Jimma University is a premier institution in Ethiopia, dedicated to providing high-quality education and training.
                Our Recruitment Hub serves as a bridge between talented individuals and the opportunities available within the university.
            </p>
            <h2>Our Mission</h2>
            <p>
                Our mission is to attract, develop, and retain the best talent to support the university's goals and objectives.
                We strive to create a transparent and efficient recruitment process that serves both applicants and hiring departments.
            </p>
            <h2>What We Offer</h2>
            <ul>
                <li>Streamlined job postings and applications</li>
                <li>Comprehensive application screening</li>
                <li>Effective candidate evaluation processes</li>
                <li>User-friendly interface for both applicants and HR personnel</li>
            </ul>
            <h2>Contact Us</h2>
            <p>
                For more information, please reach out to us at <a href="mailto:contact@jimma.edu">contact@jimma.edu</a>.
            </p>
        </div>
    );
};

export default About;