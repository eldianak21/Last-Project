import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ApplicationOverview = () => {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Temporary data
  const fetchApplications = () => {
    const temporaryApplications = [
      {
        id: 1,
        applicant: "Alice Johnson",
        jobTitle: "Software Engineer",
        status: "Under Review",
      },
      {
        id: 2,
        applicant: "Bob Brown",
        jobTitle: "Product Manager",
        status: "Accepted",
      },
      {
        id: 3,
        applicant: "Charlie Green",
        jobTitle: "UX Designer",
        status: "Rejected",
      },
    ];
    setApplications(temporaryApplications);
  };

  useEffect(() => {
    fetchApplications(); // Fetch temporary data on component mount
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter applications based on search query for applicant name, job title, and status
  const filteredApplications = applications.filter(
    (app) =>
      app.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Application Overview</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by applicant name, job title, or status..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />

      {/* Navigation Links */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/admin-dashboard" style={{ marginRight: "15px" }}>
          Admin Dashboard
        </Link>
        <Link to="/user-management" style={{ marginRight: "15px" }}>
          User Management
        </Link>
        <Link to="/job-posting-overview" style={{ marginRight: "15px" }}>
          Job Postings Overview
        </Link>
      </nav>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Applicant
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Job Title
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => (
            <tr key={app.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {app.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {app.applicant}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {app.jobTitle}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {app.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationOverview;
