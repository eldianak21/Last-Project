// JobDescription.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './JobDescription.css';

const JobDescription = () => {
    const { id } = useParams();

    const jobDescriptions = {
        1: {
            title: 'Product Marketer',
            description: 'Responsible for developing and executing marketing strategies to promote products.',
            postedDate: '2/24/2024',
            employmentType: 'Full-Time',
            remote: 'No',
        },
        2: {
            title: 'Product Marketing Intern',
            description: 'Assist in marketing efforts and support the marketing team in daily tasks.',
            postedDate: '2/24/2024',
            employmentType: 'Internship',
            remote: 'Yes',
        },
        3: {
            title: 'Web Developer',
            description: 'Develop and maintain web applications, ensuring optimal performance.',
            postedDate: '1/24/2025',
            employmentType: 'Part-Time', // Example of a part-time job
            remote: 'Yes',
        },
    };

    const job = jobDescriptions[id] || {};

    return (
        <div className="job-description-container">
            <header className="job-header">
                <h2>JIMMA UNIVERSITY | {job.employmentType}</h2> {/* Dynamic Employment Type */}
                <h1>{job.title}</h1>
               
                <div className="job-buttons">
                    <button className="apply-button">I'm interested</button>
                    <button className="share-button">Share job via email</button>
                </div>          
            </header>

            <div className="social-media-icons">
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-linkedin"></i>
                <i className="fab fa-whatsapp"></i>
                <i className="fab fa-telegram-plane"></i>
                <i className="fas fa-share-alt"></i>
            </div>
            <p className="job-listing">job posting &gt; job detail</p>

            <table className="job-details-table">
                <tbody>
                    <tr>
                        <td className="job-description">
                            <h3>Job Description</h3>
                            <p>{job.description}</p>
                        </td>
                        <td className="job-info">
                            <h3>Job Details</h3>
                            <p><strong>Posted Date:</strong> {job.postedDate}</p>
                            <p><strong>Employment Type:</strong> {job.employmentType}</p>
                            <p><strong>Remote:</strong> {job.remote}</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button className="apply-button">I'm interested</button>
        </div>
    );
};

export default JobDescription;