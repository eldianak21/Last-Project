// JobPosting.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './JobPosting.css';

const JobPosting = () => {
    const jobListings = [
        { title: 'Product Marketer', date: '2/24/2024', id: 1 },
        { title: 'Product Marketing Intern', date: '2/24/2024', id: 2 },
        { title: 'Web Developer', date: '1/24/2025', id: 3 },
        // Add more job listings as needed
    ];

    // Function to parse date strings into Date objects
    const parseDate = (dateString) => {
        const [month, day, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
    };

    // Sort job listings by date (latest first)
    const sortedJobListings = jobListings.slice().sort((a, b) => {
        return parseDate(b.date) - parseDate(a.date);
    });

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
                </div>
                <button className="search-button">Search</button>
            </div>

            <div className="job-listings">
                {sortedJobListings.map((job) => (
                    <div className="job-listing" key={job.id}>
                        <h4>{job.title}</h4>
                        <p>{job.date}</p>
                        {/* Use Link to navigate to Job Description page */}
                        <Link to={`/job-description/${job.id}`}>
                            <button className="view-job-button">View Job</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobPosting;