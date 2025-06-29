// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./ApplicationOverview.css";

// const ApplicationOverview = () => {
//   const [applications, setApplications] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedJobTitle, setSelectedJobTitle] = useState("All"); // Added Job Title Filter
//   const [isLoading, setIsLoading] = useState(true); // Add loading state
//   const [error, setError] = useState(null); // Add error state

//   const fetchApplications = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/application-data"
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setApplications(data);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleJobTitleChange = (e) => {
//     setSelectedJobTitle(e.target.value);
//   };

//   const filteredApplications = applications.filter((app) => {
//     const matchesJobTitle =
//       selectedJobTitle === "All" || app.JobTitle === selectedJobTitle;
//     const matchesSearch =
//       searchQuery === "" ||
//       app.JobTitle.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesJobTitle && matchesSearch;
//   });

//   const uniqueJobTitles = [
//     "All",
//     ...new Set(applications.map((app) => app.JobTitle)),
//   ];

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
//           <Link to="/job-posting-overview" className="nav-link">
//             <i className="fas fa-briefcase"></i>
//             <span>Job Postings</span>
//           </Link>
//           <Link to="/application-overview" className="nav-link active">
//             <i className="fas fa-file-alt"></i>
//             <span>Applications</span>
//           </Link>
//         </nav>
//       </div>

//       <div className="admin-main">
//         <header className="admin-header">
//           <h1>Application Overview</h1>
//           <div className="header-actions">
//             <button className="notification-btn">
//               <i className="fas fa-bell"></i>
//               <span className="badge">3</span>
//             </button>
//             <button className="logout-btn">
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </div>
//         </header>

//         <div className="dashboard-content">
//           <div className="filters-container">
//             <div className="search-box">
//               <i className="fas fa-search"></i>
//               <input
//                 type="text"
//                 placeholder="Search applications..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="filter-dropdown">
//               <select value={selectedJobTitle} onChange={handleJobTitleChange}>
//                 {uniqueJobTitles.map((title) => (
//                   <option key={title} value={title}>
//                     {title || "All"}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {isLoading ? (
//             <div>Loading applications...</div>
//           ) : error ? (
//             <div>Error: {error}</div>
//           ) : (
//             <div className="data-table-container">
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>First Name</th>
//                     <th>Last Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Experience</th>
//                     <th>Qualification</th>
//                     <th>Job Title</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredApplications.map((app) => (
//                     <tr key={app.ApplicationID}>
//                       <td>{app.FirstName}</td>
//                       <td>{app.LastName}</td>
//                       <td>{app.Email}</td>
//                       <td>{app.Phone1}</td>
//                       <td>{app.ExperienceYears || "N/A"}</td>
//                       <td>{app.HighestQualification || "N/A"}</td>
//                       <td>{app.JobTitle || "N/A"}</td>
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

// export default ApplicationOverview;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ApplicationOverview.css";

const ApplicationOverview = () => {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("All"); // Added Job Title Filter
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/application-data"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleJobTitleChange = (e) => {
    setSelectedJobTitle(e.target.value);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesJobTitle =
      selectedJobTitle === "All" || app.JobTitle === selectedJobTitle;
    const matchesSearch =
      searchQuery === "" ||
      app.JobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesJobTitle && matchesSearch;
  });

  const uniqueJobTitles = [
    "All",
    ...new Set(applications.map((app) => app.JobTitle)),
  ];

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
              <select value={selectedJobTitle} onChange={handleJobTitleChange}>
                {uniqueJobTitles.map((title) => (
                  <option key={title} value={title}>
                    {title || "All"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div>Loading applications...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Experience</th>
                    <th>Qualification</th>
                    <th>Job Title</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.ApplicationID}>
                      <td>{app.FirstName}</td>
                      <td>{app.LastName}</td>
                      <td>{app.Email}</td>
                      <td>{app.Phone1}</td>
                      <td>{app.ExperienceYears || "N/A"}</td>
                      <td>{app.HighestQualification || "N/A"}</td>
                      <td>{app.JobTitle || "N/A"}</td>
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

export default ApplicationOverview;
