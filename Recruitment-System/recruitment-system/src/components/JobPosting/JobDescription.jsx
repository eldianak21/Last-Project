import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
import { useAuth } from "../../Auth/AuthContext"; // Import your Auth context
import "./JobDescription.css";

const JobDescription = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth(); // Get isAuthenticated from AuthContext
  const navigate = useNavigate(); // Hook for navigation
  const [job, setJob] = useState(null); // State to store job details
  const [error, setError] = useState(null); // State to track errors

  // Fetch job description from the backend
  useEffect(() => {
    const fetchJobDescription = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/job-postings/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job description:", error);
        setError(error.message);
      }
    };

    fetchJobDescription();
  }, [id]);

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Display error message
  }

  if (!job) {
    return <div>Loading...</div>; // Display loading state while fetching
  }

  // const handleApplyClick = () => {
  //   if (isAuthenticated) {
  //     navigate(`/submit-cv/${id}`); // Direct to CV submission with job ID if logged in
  //   } else {
  //     navigate("/sign-up"); // Direct to sign up if not logged in
  //   }
  // };

  const handleApplyClick = () => {
    if (isAuthenticated) {
      navigate(`/submit-cv/${id}`); // Direct to CV submission if logged in
    } else {
      localStorage.setItem("pendingJobId", id); // Store jobId before redirecting
      navigate("/sign-up"); // Direct to sign up/login if not logged in
    }
  };

  return (
    <div className="job-description-container">
      <header className="job-header">
        <h2>JIMMA UNIVERSITY | {job.EmploymentType || "Not Specified"}</h2>
        <h1>{job.Title}</h1>

        <div className="job-buttons">
          <button className="apply-button" onClick={handleApplyClick}>
            {isAuthenticated ? "Apply Now" : "Sign Up to Apply"}
          </button>
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
              <p>{job.Description}</p>
            </td>
            <td className="job-info">
              <h3>Job Details</h3>
              <p>
                <strong>Posted Date:</strong>{" "}
                {new Date(job.CreatedAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Employment Type:</strong>{" "}
                {job.EmploymentType || "Not Specified"}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobDescription;
