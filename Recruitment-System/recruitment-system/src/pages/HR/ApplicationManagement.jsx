import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [emailMessage, setEmailMessage] = useState("");

  const fetchApplications = () => {
    const temporaryApplications = [
      { id: 1, jobId: 1, applicant: "Alice Johnson", status: "Under Review", email: "alice@example.com" },
      { id: 2, jobId: 2, applicant: "Bob Brown", status: "Accepted", email: "bob@example.com" },
      { id: 3, jobId: 1, applicant: "Charlie Green", status: "Rejected", email: "charlie@example.com" },
    ];
    setApplications(temporaryApplications);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getDefaultMessage = (status) => {
    switch (status) {
      case "Accepted":
        return `Dear [Applicant Name],\n\nWe are pleased to inform you that you have been accepted for the position of Job [Job ID].\n\nCongratulations!\n\nBest regards,\nHR Team`;
      case "Rejected":
        return `Dear [Applicant Name],\n\nThank you for your application for the position of Job [Job ID]. Unfortunately, we have decided to move forward with other candidates.\n\nWe appreciate your interest and wish you the best in your job search.\n\nBest regards,\nHR Team`;
      case "Under Review":
        return `Dear [Applicant Name],\n\nThank you for your application for the position of Job [Job ID]. Your application is currently under review.\n\nWe will get back to you shortly with an update.\n\nBest regards,\nHR Team`;
      default:
        return "";
    }
  };

  const filteredApplications = applications.filter(app => {
    if (selectedStatus === "All") return true;
    return app.status === selectedStatus;
  });

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setEmailMessage(getDefaultMessage(status)); // Set the default message based on the selected status
  };

  const handleSendEmail = () => {
    const messages = filteredApplications.map(app => {
      return emailMessage.replace("[Applicant Name]", app.applicant).replace("[Job ID]", app.jobId);
    });

    // Simulate sending emails
    filteredApplications.forEach((app, index) => {
      alert(`Email sent to: ${app.email}\nMessage:\n${messages[index]}`);
    });

    // Clear message after sending
    setEmailMessage("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#333" }}>Application Management</h2>
      {/* Navigation Bar */}
      <nav style={{ marginBottom: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/hr-dashboard">Dashboard</Link>
          </li>
           <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/job-postings">Job Postings</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/candidate-profiles">Candidate Profiles</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/department-head-management">
              Department Head Management
            </Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/result">Result</Link>
          </li>
        </ul>
      </nav>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          style={{ marginLeft: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="All">All</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
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
                {app.applicant}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {`Job ${app.jobId}`}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {app.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", border: "1px solid #ccc", borderRadius: "4px", padding: "15px", backgroundColor: "#f9f9f9" }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Send Email</h3>
        <textarea
          value={emailMessage}
          onChange={(e) => setEmailMessage(e.target.value)}
          rows="5"
          placeholder="Enter your message here..."
          style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", resize: "none" }}
        />
        <button 
          onClick={handleSendEmail}
          style={{
            marginTop: "10px",
            background: "#3498db", 
            color: "white", 
            padding: "10px 20px", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Send Email to Filtered Applicants
        </button>
      </div>
    </div>
  );
};

export default ApplicationManagement;