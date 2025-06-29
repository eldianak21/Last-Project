// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./JobPostingsOverview.css"; // Keep the original styling

// const JobPostingsOverview = () => {
//   const [jobPostings, setJobPostings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchJobPostings = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:5000/api/job-postings");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setJobPostings(data);
//     } catch (error) {
//       console.error("Error fetching job postings:", error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobPostings();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleStatusFilter = (e) => {
//     setStatusFilter(e.target.value);
//   };

//   const filteredJobPostings = jobPostings.filter((job) => {
//     const title = job.Title || "";
//     const status = job.Status || "";
//     const matchesTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "All" || status === statusFilter;
//     return matchesTitle && matchesStatus;
//   });

//   const getStatusClass = (status) => {
//     return status === "Open" ? "status-open" : "status-closed";
//   };

//   return (
//     <div className="admin-container">
//       <div className="admin-sidebar">
//         <div className="sidebar-header">
//           <h2>Admin Panel</h2>
//         </div>
//         <nav className="sidebar-nav">
//           <Link to="/user-management" className="nav-link">
//             <i className="fas fa-users"></i>
//             <span>User Management</span>
//           </Link>
//           <Link to="/job-posting-overview" className="nav-link active">
//             <i className="fas fa-briefcase"></i>
//             <span>Job Postings</span>
//           </Link>
//           <Link to="/application-overview" className="nav-link">
//             <i className="fas fa-file-alt"></i>
//             <span>Applications</span>
//           </Link>
//         </nav>
//       </div>

//       <div className="admin-main">
//         <header className="admin-header">
//           <h1>Job Postings Overview</h1>
//           <div className="header-actions">
//             <button className="add-job-btn">
//               <i className="fas fa-plus"></i> New Job
//             </button>
//             <button className="notification-btn">
//               <i className="fas fa-bell"></i>
//               <span className="badge">3</span>
//             </button>
//           </div>
//         </header>

//         <div className="dashboard-content">
//           <div className="filters-container">
//             <div className="search-box">
//               <i className="fas fa-search"></i>
//               <input
//                 type="text"
//                 placeholder="Search job postings..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="filter-dropdown">
//               <select value={statusFilter} onChange={handleStatusFilter}>
//                 <option value="All">All Statuses</option>
//                 <option value="Open">Open</option>
//                 <option value="Closed">Closed</option>
//               </select>
//             </div>
//           </div>

//           {isLoading ? (
//             <div>Loading job postings...</div>
//           ) : error ? (
//             <div>Error: {error}</div>
//           ) : (
//             <div className="data-table-container">
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Type</th>
//                     <th>Experience</th>
//                     <th>Deadline</th>
//                     <th>Applications</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredJobPostings.map((job) => (
//                     <tr key={job.JobID}>
//                       <td>
//                         <strong>{job.Title}</strong>
//                       </td>
//                       <td>{job.EmploymentType || "N/A"}</td>
//                       <td>
//                         {job.MinExperienceYears
//                           ? `${job.MinExperienceYears}+ years`
//                           : "N/A"}
//                       </td>
//                       <td>
//                         {job.Deadline
//                           ? new Date(job.Deadline).toLocaleDateString()
//                           : "N/A"}
//                       </td>
//                       <td>{job.Applications || 0}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobPostingsOverview;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobPostingsOverview.css"; // Keep the original styling

const JobPostingsOverview = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredJobPostings = jobPostings.filter((job) => {
    const title = job.Title || "";
    const status = job.Status || "";
    const matchesTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    return matchesTitle && matchesStatus;
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
          <Link to="/admin-dashboard" className="nav-link">
            <i className="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </Link>
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
                value={searchTerm}
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

          {isLoading ? (
            <div>Loading job postings...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Experience</th>
                    <th>Deadline</th>
                    <th>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobPostings.map((job) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostingsOverview;
