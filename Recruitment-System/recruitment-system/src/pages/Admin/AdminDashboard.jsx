import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/user-management" className="nav-link active">
            <i className="fas fa-users"></i>
            <span>User Management</span>
          </Link>
          <Link to="/job-posting-overview" className="nav-link">
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
          <h1>Dashboard Overview</h1>
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
          <div className="welcome-card">
            <h2>Welcome to the Admin Dashboard</h2>
            <p>
              Select an option from the menu to manage users, job postings, or
              applications.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-info">
                <h3>24</h3>
                <p>Active Users</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <div className="stat-info">
                <h3>15</h3>
                <p>Open Positions</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="stat-info">
                <h3>42</h3>
                <p>New Applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;