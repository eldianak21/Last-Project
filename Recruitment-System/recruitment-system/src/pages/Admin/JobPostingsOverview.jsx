import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobPostingsOverview = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for admin

  // Temporary data
  const fetchJobPostings = () => {
    const temporaryJobPostings = [
      { id: 1, title: "Software Engineer", department: "IT", status: "Open" },
      {
        id: 2,
        title: "Product Manager",
        department: "Product",
        status: "Closed",
      },
      {
        id: 3,
        title: "UX Designer",
        department: "Design",
        status: "Open",
      },
    ];
    setJobPostings(temporaryJobPostings);
  };

  useEffect(() => {
    fetchJobPostings(); // Fetch temporary data on component mount
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter job postings based on search query for title, department, and status
  const filteredJobPostings = jobPostings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Postings Overview</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by job title, department, or status..."
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
        <Link to="/application-overview">Application Overview</Link>
      </nav>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Department
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobPostings.map((job) => (
            <tr key={job.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {job.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {job.title}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {job.department}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {job.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobPostingsOverview;
