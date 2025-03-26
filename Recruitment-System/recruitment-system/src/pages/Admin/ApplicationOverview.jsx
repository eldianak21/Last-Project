import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ApplicationOverview.css";

const ApplicationOverview = () => {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchApplications = () => {
    const temporaryApplications = [
      {
        id: 1,
        applicant: "Alice Johnson",
        jobTitle: "Software Engineer",
        status: "Under Review",
        date: "2023-05-15",
      },
      {
        id: 2,
        applicant: "Bob Brown",
        jobTitle: "Product Manager",
        status: "Accepted",
        date: "2023-05-10",
      },
      {
        id: 3,
        applicant: "Charlie Green",
        jobTitle: "UX Designer",
        status: "Rejected",
        date: "2023-05-05",
      },
    ];
    setApplications(temporaryApplications);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "status-accepted";
      case "Rejected":
        return "status-rejected";
      case "Under Review":
        return "status-pending";
      default:
        return "";
    }
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
          <Link to="/job-posting-overview" className="nav-link">
            <i className="fas fa-briefcase"></i>
            <span>Job Postings</span>
          </Link>
          <Link to="/application-overview" className="nav-link active">
            <i className="fas fa-file-alt"></i>
            <span>Applications</span>
          </Link>
        </nav>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Application Overview</h1>
          <div className="header-actions">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
            <button className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="filters-container">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filter-dropdown">
              <select value={statusFilter} onChange={handleStatusFilter}>
                <option value="All">All Statuses</option>
                <option value="Under Review">Under Review</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Applicant</th>
                  <th>Job Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.applicant}</td>
                    <td>{app.jobTitle}</td>
                    <td>{app.date}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn view-btn">
                        <i className="fas fa-eye"></i> View
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

export default ApplicationOverview;