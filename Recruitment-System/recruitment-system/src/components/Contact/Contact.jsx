import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle form submission logic here
        console.log('Form submitted:', formData);

        // Clear the form after submission
        setFormData({ name: '', email: '', message: '' });
        alert('Message Sent Successfully!'); // Inform the user
    };

    return (
        <div className="contact-page">
            <section className="hero-section">
                <h1>Contact Jimma University Recruitment Hub</h1>
                <p>We'd love to hear from you! Fill out the form below to reach us.</p>
            </section>
            <section className="contact-form">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Send Message</button>
                </form>
            </section>
            <section className="contact-info">
                <h2>Our Contact Information</h2>
                <p>
                    <strong>Address:</strong> Jimma University, Jimma, Ethiopia
                </p>
                <p>
                    <strong>Phone:</strong> +251-(0)47-111-2202
                </p>
                <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:ero@ju.edu.et">ero@ju.edu.et</a>
                </p>
            </section>
        </div>
    );
};

export default Contact;