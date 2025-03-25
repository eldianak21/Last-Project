import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobApplications, setNewJobApplications] = useState(0);
  const [editJobId, setEditJobId] = useState(null);
  const [editJobTitle, setEditJobTitle] = useState("");
  const [editJobApplications, setEditJobApplications] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchJobPostings = () => {
    // Temporary job postings for demonstration
    const temporaryJobPostings = [
      { id: 1, title: "Software Engineer", applications: 5, status: "Open" },
      { id: 2, title: "Product Manager", applications: 2, status: "Open" },
      { id: 3, title: "UX Designer", applications: 3, status: "Closed" },
    ];
    setJobPostings(temporaryJobPostings);
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const handleAddJobPosting = () => {
    if (newJobTitle.trim()) {
      const newJob = {
        id: jobPostings.length + 1,
        title: newJobTitle,
        applications: newJobApplications,
        status: "Open",
      };
      setJobPostings([...jobPostings, newJob]);
      setNewJobTitle("");
      setNewJobApplications(0);
    }
  };

  const handleEditJobPosting = (id) => {
    const jobToEdit = jobPostings.find((job) => job.id === id);
    setEditJobId(id);
    setEditJobTitle(jobToEdit.title);
    setEditJobApplications(jobToEdit.applications);
  };

  const handleUpdateJobPosting = () => {
    setJobPostings((prev) =>
      prev.map((job) =>
        job.id === editJobId
          ? { ...job, title: editJobTitle, applications: editJobApplications }
          : job
      )
    );
    setEditJobId(null);
    setEditJobTitle("");
    setEditJobApplications(0);
  };

  const handleDeleteJobPosting = (id) => {
    setJobPostings(jobPostings.filter((job) => job.id !== id));
  };

  const handleChangeStatus = (id) => {
    setJobPostings((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, status: job.status === "Open" ? "Closed" : "Open" }
          : job
      )
    );
  };

  const filteredJobPostings = jobPostings.filter((job) => {
    const matchesTitle = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    return matchesTitle && matchesStatus;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Postings Overview</h2>

      {/* Navigation Bar */}
      <nav style={{ marginBottom: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/hr-dashboard">Dashboard</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/application-management">Application Management</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/candidate-profiles">Candidate Profiles</Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link to="/department-head-management">
              Department Head Management
            </Link>
          </li>
        </ul>
      </nav>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Job Titles"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", width: "100%", padding: "10px" }}
      />

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      >
        <option value="All">All Statuses</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>

      {/* Add Job Posting Form */}
      <div style={{ marginBottom: "20px" }}>
        <h3>{editJobId ? "Edit Job Posting" : "Add New Job Posting"}</h3>
        <input
          type="text"
          placeholder="Job Title"
          value={editJobId ? editJobTitle : newJobTitle}
          onChange={(e) =>
            editJobId
              ? setEditJobTitle(e.target.value)
              : setNewJobTitle(e.target.value)
          }
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Applications"
          value={editJobId ? editJobApplications : newJobApplications}
          onChange={(e) =>
            editJobId
              ? setEditJobApplications(e.target.value)
              : setNewJobApplications(e.target.value)
          }
          style={{ marginRight: "10px" }}
        />
        <button
          onClick={editJobId ? handleUpdateJobPosting : handleAddJobPosting}
        >
          {editJobId ? "Update Job" : "Add Job"}
        </button>
      </div>

      {/* Job Postings Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Applications
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredJobPostings.map((job) => (
            <tr key={job.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {job.title}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {job.applications}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {job.status}
                <button
                  onClick={() => handleChangeStatus(job.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Change Status
                </button>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => handleEditJobPosting(job.id)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteJobPosting(job.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobPostings;
