import React from 'react';
import './JobPosting.css';

const JobPosting = () => {
    const jobListings = [
        { title: 'Product Marketer', date: '2/24/2024' },
        { title: 'Product Marketing Intern', date: '2/24/2024' },
        // Add more job listings as needed
    ];

    return (
        <div className="job-posting-container">
            <header className="header">
                <h1>We are more than a workplace.</h1>
                <p>We know that finding a meaningful and rewarding career can be a long journey. Our goal is to make that process easy for you and to create a work environment that’s enriching—one that you’ll look forward to every day.</p>
            </header>
            
            <div className="join-us">
                <h2>Join Us</h2>
                <h3>Current Openings</h3>
                <div className="filters">
                    <input type="text" placeholder="What" className="filter-input" />
                    <input type="text" placeholder="Where" className="filter-input" />
                    <button className="search-button">Search</button>
                </div>
            </div>

            <div className="job-listings">
                {jobListings.map((job, index) => (
                    <div className="job-listing" key={index}>
                        <h4>{job.title}</h4>
                        <p>{job.date}</p>
                        <button className="view-job-button">View Job</button>
                    </div>
                ))}
            </div>

            <footer className="footer">
                <p>Powered by JIMMA RECRUIT</p>
            </footer>
        </div>
    );
};

export default JobPosting;