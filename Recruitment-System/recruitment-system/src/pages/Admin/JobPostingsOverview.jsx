import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobPostingsOverview.css";

const JobPostingsOverview = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchJobPostings = () => {
    const temporaryJobPostings = [
      {
        id: 1,
        title: "Software Engineer",
        department: "IT",
        status: "Open",
        applicants: 12,
        posted: "2023-05-01",
      },
      {
        id: 2,
        title: "Product Manager",
        department: "Product",
        status: "Closed",
        applicants: 8,
        posted: "2023-04-15",
      },
      {
        id: 3,
        title: "UX Designer",
        department: "Design",
        status: "Open",
        applicants: 5,
        posted: "2023-05-10",
      },
    ];
    setJobPostings(temporaryJobPostings);
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredJobPostings = jobPostings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    return status === "Open" ? "status-open" : "status-closed";
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/user-management" className="nav-link">
            <i className="fas fa-users"></i>
            <span>User Management</span>
          </Link>
          <Link to="/job-posting-overview" className="nav-link active">
            <i className="fas fa-briefcase"></i>
            <span>Job Postings</span>
          </Link>
          <Link to="/application-overview" className="nav-link">
            <i className="fas fa-file-alt"></i>
            <span>Applications</span>
          </Link>
        </nav>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Job Postings Overview</h1>
          <div className="header-actions">
            <button className="add-job-btn">
              <i className="fas fa-plus"></i> New Job
            </button>
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="filters-container">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search job postings..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filter-dropdown">
              <select value={statusFilter} onChange={handleStatusFilter}>
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Posted</th>
                  <th>Applicants</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobPostings.map((job) => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.title}</td>
                    <td>{job.department}</td>
                    <td>{job.posted}</td>
                    <td>{job.applicants}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="action-btn delete-btn">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingsOverview;