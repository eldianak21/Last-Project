import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/user-management" style={{ marginRight: "15px" }}>
          User Management
        </Link>
        <Link to="/job-posting-overview" style={{ marginRight: "15px" }}>
          Job Postings Overview
        </Link>
        <Link to="/application-overview">Application Overview</Link>
      </nav>

      <div>
        <h2>Welcome to the Admin Dashboard</h2>
        <p>
          Select an option from the menu above to manage users, job postings, or
          applications.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
