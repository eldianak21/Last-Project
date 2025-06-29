import React from "react";
import { Link } from "react-router-dom";
import "./HrDashboard.css";

const HRManagerDashboard = () => {
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

  return (
    <div className="hr-manager-container">
      <div className="hr-sidebar">
        <div className="hr-sidebar-header">
          <h2>HR Manager</h2>
        </div>
        <nav className="hr-nav">
          {dashboardLinks.map((link, index) => (
            <Link to={link.to} className="hr-nav-link" key={index}>
              <div className="hr-nav-icon">{link.icon}</div>
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="hr-main-content">
        <header className="hr-header">
          <h1>Dashboard Overview</h1>
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
          <div className="hr-welcome-card">
            <h2>Welcome to HR Manager Dashboard</h2>
            <p>
              Manage job postings, applications, candidates, and interview
              processes from this centralized dashboard.
            </p>
          </div>

          <div className="hr-cards-grid">
            {dashboardLinks.map((link, index) => (
              <Link to={link.to} className="hr-dashboard-card" key={index}>
                <div className="hr-card-icon">{link.icon}</div>
                <div className="hr-card-title">{link.text}</div>
              </Link>
            ))}
          </div>

          <div className="hr-summary-card">
            <h3>Quick Overview</h3>
            <div className="hr-summary-item">
              <span className="hr-summary-count">5</span> New Applications
            </div>
            <div className="hr-summary-item">
              <span className="hr-summary-count">2</span> Interviews Today
            </div>
            <div className="hr-summary-item">
              <span className="hr-summary-count">3</span> Pending Approvals
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRManagerDashboard;
