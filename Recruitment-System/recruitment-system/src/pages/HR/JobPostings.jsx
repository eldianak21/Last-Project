import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddJobPosting from "./AddJobPosting";
import "./HrJobPostings.css";

const JobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dashboardLinks = [
    { to: "/job-postings", text: "Job Postings Overview", icon: "📋" },
    {
      to: "/application-management",
      text: "Application Management",
      icon: "📄",
    },
    { to: "/interview-scheduling", text: "Interview Scheduling", icon: "👤" },
    {
      to: "/department-head-management",
      text: "Interviewer Management",
      icon: "👔",
    },
    { to: "/result", text: "Results Dashboard", icon: "📊" },
  ];

  const fetchJobPostings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/job-postings");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJobPostings(data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const filteredJobPostings = jobPostings.filter((job) => {
    const title = job.Title || "";
    const status = job.Status || "";
    const matchesTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    return matchesTitle && matchesStatus;
  });

  const handleAddJob = async (newJob) => {
    try {
      const response = await fetch("http://localhost:5000/api/job-postings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error("Failed to add job posting");
      }

      const data = await response.json();
      setJobPostings((prev) => [...prev, data]);
      setSuccessMessage("Job successfully added!");
      setShowAddForm(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding job:", error);
      setError(error.message);
    }
  };

  const handleDeleteJobPosting = async (JobID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/job-postings/${JobID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job posting");
      }

      setJobPostings((prevJobPostings) =>
        prevJobPostings.filter((job) => job.JobID !== JobID)
      );
      setSuccessMessage("Job posting successfully deleted!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting job:", error);
      setError(error.message);
    }
  };

  return (
    <div className="hr-manager-container">
      <div className="hr-sidebar">
        <div className="hr-sidebar-header">
          <h2>HR Manager</h2>
        </div>
        <nav className="hr-nav">
          {dashboardLinks.map((link, index) => (
            <Link
              to={link.to}
              className={`hr-nav-link ${
                window.location.pathname === link.to ? "active" : ""
              }`}
              key={index}
            >
              <div className="hr-nav-icon">{link.icon}</div>
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="hr-main-content">
        <header className="hr-header">
          <h1>Job Postings Overview</h1>
          <div className="hr-header-actions">
            <button className="hr-notification-btn">
              <i className="fas fa-bell"></i>
              <span className="hr-badge">3</span>
            </button>
            <button className="hr-logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>

        <div className="hr-dashboard-content">
          {error && (
            <div className="hr-job-postings-alert hr-job-postings-error">
              Error: {error}
            </div>
          )}

          {successMessage && (
            <div className="hr-job-postings-alert hr-job-postings-success">
              {successMessage}
            </div>
          )}

          {isLoading ? (
            <div>Loading job postings...</div>
          ) : showAddForm ? (
            <AddJobPosting
              onAddJob={handleAddJob}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <>
              <div className="hr-job-postings-controls">
                <input
                  type="text"
                  placeholder="Search Job Titles"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="hr-job-postings-search"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="hr-job-postings-filter"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>

                <button
                  onClick={() => setShowAddForm(true)}
                  className="hr-job-postings-add-btn"
                >
                  Add New Job
                </button>
              </div>

              <div className="hr-job-postings-table-container">
                <table className="hr-job-postings-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Experience</th>
                      <th>Deadline</th>
                      <th>Applications</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobPostings.length > 0 ? (
                      filteredJobPostings.map((job) => (
                        <tr key={job.JobID}>
                          <td>
                            <strong>{job.Title}</strong>
                          </td>
                          <td>{job.EmploymentType || "N/A"}</td>
                          <td>
                            {job.MinExperienceYears
                              ? `${job.MinExperienceYears}+ years`
                              : "N/A"}
                          </td>
                          <td>
                            {job.Deadline
                              ? new Date(job.Deadline).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td>{job.Applications || 0}</td>
                          <td>
                            <Link
                              to={`/job-details/${job.JobID}`}
                              className="hr-job-postings-action-link"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleDeleteJobPosting(job.JobID)}
                              className="hr-job-postings-action-btn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="hr-job-postings-empty">
                          {jobPostings.length === 0
                            ? "No job postings available."
                            : "No jobs match your search criteria."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostings;
