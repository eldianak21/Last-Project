import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./JobPosting.css";
// import "./JobPosting.module.css";
const JobPosting = () => {
  const [jobListings, setJobListings] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // State to track errors
  const [searchTerm, setSearchTerm] = useState(""); // State for job title search
  const [dateFilter, setDateFilter] = useState(""); // State for date filter

  // Fetch job postings from the backend
  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/job-postings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("Fetched job listings:", data);

        if (Array.isArray(data)) {
          setJobListings(data);
        } else {
          throw new Error("Expected an array of job listings");
        }
      } catch (error) {
        console.error("Error fetching job listings:", error);
        setError(error.message);
      }
    };

    fetchJobListings();
  }, []);

  // Sort job listings by date (latest first)
  const sortedJobListings = jobListings.slice().sort((a, b) => {
    return new Date(b.CreatedAt) - new Date(a.CreatedAt); // Assuming 'Deadline' is a field in JobPostings
  });

  // Filter job listings based on search term and date
  const filteredJobListings = sortedJobListings.filter((job) => {
    const matchesTitle = job.Title.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const matchesDate = dateFilter
      ? new Date(job.CreatedAt).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString()
      : true;
    return matchesTitle && matchesDate;
  });

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Display error message
  }

  return (
    <div className="job-posting-container">
      <header className="header">
        <h1>We are more than a workplace.</h1>
        <p>
          Finding a meaningful and rewarding career can be a long journey. Our
          goal is to make that process easy for you.
        </p>
      </header>

      <div className="join-us">
        <h2>Join Us</h2>
        <h3>Current Openings</h3>
        <div className="filters">
          <input
            type="text"
            placeholder="What"
            className="filter-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <input
            type="date"
            className="filter-input"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)} // Update date filter
          />
        </div>
        <button className="search-button">Search</button>
      </div>

      <div className="job-listings">
        {filteredJobListings.map((job) => (
          <div className="job-listing" key={job.JobID}>
            <div className="job-details">
              <h4>{job.Title}</h4>
              <p className="job-date">
                {new Date(job.CreatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="job-actions">
              <Link to={`/job-description/${job.JobID}`}>
                <button className="view-job-button">View Job</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPosting;
