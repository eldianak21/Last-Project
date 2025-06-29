// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./InterviewerManagement.css";

// const InterviewerManagement = () => {
//   const [interviewers, setInterviewers] = useState([]);
//   const [newInterviewer, setNewInterviewer] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     role: "Interviewer",
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(null);

//   const dashboardLinks = [
//     { to: "/job-postings", text: "Job Postings Overview", icon: "📋" },
//     {
//       to: "/application-management",
//       text: "Application Management",
//       icon: "📄",
//     },
//     { to: "/candidate-profiles", text: "Candidate Profiles", icon: "👤" },
//     {
//       to: "/department-head-management",
//       text: "Interviewer Management",
//       icon: "👔",
//     },
//     { to: "/result", text: "Results Dashboard", icon: "📊" },
//   ];

//   const fetchInterviewers = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:5000/api/hr/interviewers",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setInterviewers(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching interviewers:", error);
//       setError("Failed to load interviewers. Please try again.");
//       setInterviewers([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInterviewers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewInterviewer({ ...newInterviewer, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:5000/api/hr/add-interviewer",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newInterviewer),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add interviewer");
//       }

//       await fetchInterviewers();
//       setNewInterviewer({
//         firstName: "",
//         lastName: "",
//         email: "",
//         role: "Interviewer",
//       });
//     } catch (error) {
//       console.error("Error adding interviewer:", error);
//       setError(error.message);
//     }
//   };

//   const handleRemoveInterviewer = async (id) => {
//     if (!window.confirm("Are you sure you want to remove this interviewer?")) {
//       return;
//     }

//     setIsRemoving(id);
//     setError(null);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:5000/api/hr/interviewers/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to remove interviewer");
//       }

//       await fetchInterviewers();
//     } catch (error) {
//       console.error("Error removing interviewer:", error);
//       setError(error.message);
//     } finally {
//       setIsRemoving(null);
//     }
//   };

//   const filteredInterviewers = interviewers.filter((interviewer) => {
//     const fullName =
//       `${interviewer.firstName} ${interviewer.lastName}`.toLowerCase();
//     return fullName.includes(searchQuery.toLowerCase());
//   });

//   return (
//     <div className="hr-manager-container">
//       <div className="hr-sidebar">
//         <div className="hr-sidebar-header">
//           <h2>HR Manager</h2>
//         </div>
//         <nav className="hr-nav">
//           {dashboardLinks.map((link, index) => (
//             <Link
//               to={link.to}
//               className={`hr-nav-link ${
//                 window.location.pathname === link.to ? "active" : ""
//               }`}
//               key={index}
//             >
//               <div className="hr-nav-icon">{link.icon}</div>
//               <span>{link.text}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       <div className="hr-main-content">
//         <header className="hr-header">
//           <h1>Interviewer Management</h1>
//           <div className="hr-header-actions">
//             <button className="hr-notification-btn">
//               <i className="fas fa-bell"></i>
//               <span className="hr-badge">3</span>
//             </button>
//             <button className="hr-logout-btn">
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </div>
//         </header>

//         <div className="hr-dashboard-content">
//           {error && <div className="hr-alert hr-alert-danger">{error}</div>}

//           <div className="hr-form-card">
//             <h2>Add New Interviewer</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="hr-form-row">
//                 <div className="hr-form-group">
//                   <label>First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={newInterviewer.firstName}
//                     onChange={handleInputChange}
//                     className="hr-form-input"
//                     required
//                   />
//                 </div>
//                 <div className="hr-form-group">
//                   <label>Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={newInterviewer.lastName}
//                     onChange={handleInputChange}
//                     className="hr-form-input"
//                     required
//                   />
//                 </div>
//                 <div className="hr-form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={newInterviewer.email}
//                     onChange={handleInputChange}
//                     className="hr-form-input"
//                     required
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="hr-form-btn"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Adding..." : "Add Interviewer"}
//               </button>
//             </form>
//           </div>

//           <div className="hr-interviewers-list">
//             <div className="hr-search-bar">
//               <input
//                 type="text"
//                 placeholder="Search interviewers by name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="hr-search-input"
//               />
//             </div>

//             <h2>Current Interviewers</h2>
//             {isLoading ? (
//               <div className="hr-loading-message">Loading interviewers...</div>
//             ) : filteredInterviewers.length > 0 ? (
//               <table className="hr-interviewers-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredInterviewers.map((interviewer) => (
//                     <tr key={interviewer.id}>
//                       <td>{`${interviewer.firstName} ${interviewer.lastName}`}</td>
//                       <td>{interviewer.email}</td>
//                       <td>{interviewer.role}</td>
//                       <td>
//                         <button
//                           className="hr-action-btn hr-danger-btn"
//                           onClick={() =>
//                             handleRemoveInterviewer(interviewer.id)
//                           }
//                           disabled={isRemoving === interviewer.id}
//                         >
//                           {isRemoving === interviewer.id
//                             ? "Removing..."
//                             : "Remove"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="hr-no-results">
//                 {searchQuery
//                   ? "No matching interviewers found"
//                   : "No interviewers found"}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewerManagement;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./InterviewerManagement.css";

const InterviewerManagement = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newInterviewer, setNewInterviewer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    departmentID: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(null);

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

  const fetchInterviewers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/hr/interviewers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setInterviewers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching interviewers:", error);
      setError("Failed to load interviewers. Please try again.");
      setInterviewers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/hr/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchInterviewers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterviewer({ ...newInterviewer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/hr/add-interviewer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newInterviewer),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add interviewer");
      }

      await fetchInterviewers();
      setNewInterviewer({
        firstName: "",
        lastName: "",
        email: "",
        departmentID: "",
      });
    } catch (error) {
      console.error("Error adding interviewer:", error);
      setError(error.message);
    }
  };

  const handleRemoveInterviewer = async (id) => {
    if (!window.confirm("Are you sure you want to remove this interviewer?")) {
      return;
    }

    setIsRemoving(id);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/hr/interviewers/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove interviewer");
      }

      await fetchInterviewers();
    } catch (error) {
      console.error("Error removing interviewer:", error);
      setError(error.message);
    } finally {
      setIsRemoving(null);
    }
  };

  const filteredInterviewers = interviewers.filter((interviewer) => {
    const fullName =
      `${interviewer.firstName} ${interviewer.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="hr-manager-container">
      <div className="hr-sidebar">
        <div className="hr-sidebar-header">
          <h2>HR Manager</h2>
        </div>
        <nav className="hr-nav">
          {dashboardLinks.map((link, index) => (
            <Link
              to={link.to}
              className={`hr-nav-link ${
                window.location.pathname === link.to ? "active" : ""
              }`}
              key={index}
            >
              <div className="hr-nav-icon">{link.icon}</div>
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="hr-main-content">
        <header className="hr-header">
          <h1>Interviewer Management</h1>
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
          {error && <div className="hr-alert hr-alert-danger">{error}</div>}

          <div className="hr-form-card">
            <h2>Add New Interviewer</h2>
            <form onSubmit={handleSubmit}>
              <div className="hr-form-row">
                <div className="hr-form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={newInterviewer.firstName}
                    onChange={handleInputChange}
                    className="hr-form-input"
                    required
                  />
                </div>
                <div className="hr-form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={newInterviewer.lastName}
                    onChange={handleInputChange}
                    className="hr-form-input"
                    required
                  />
                </div>
                <div className="hr-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newInterviewer.email}
                    onChange={handleInputChange}
                    className="hr-form-input"
                    required
                  />
                </div>
                <div className="hr-form-group">
                  <label>Department</label>
                  <select
                    name="departmentID"
                    value={newInterviewer.departmentID}
                    onChange={handleInputChange}
                    className="hr-form-input"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.DepartmentID} value={dept.DepartmentID}>
                        {dept.DepartmentName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="hr-form-btn"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Interviewer"}
              </button>
            </form>
          </div>

          <div className="hr-interviewers-list">
            <div className="hr-search-bar">
              <input
                type="text"
                placeholder="Search interviewers by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hr-search-input"
              />
            </div>

            <h2>Current Interviewers</h2>
            {isLoading ? (
              <div className="hr-loading-message">Loading interviewers...</div>
            ) : filteredInterviewers.length > 0 ? (
              <table className="hr-interviewers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInterviewers.map((interviewer) => (
                    <tr key={interviewer.UserID}>
                      <td>{`${interviewer.FirstName} ${interviewer.LastName}`}</td>
                      <td>{interviewer.Email}</td>
                      <td>{interviewer.DepartmentName}</td>
                      <td>
                        <button
                          className="hr-action-btn hr-danger-btn"
                          onClick={() =>
                            handleRemoveInterviewer(interviewer.UserID)
                          }
                          disabled={isRemoving === interviewer.UserID}
                        >
                          {isRemoving === interviewer.UserID
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="hr-no-results">
                {searchQuery
                  ? "No matching interviewers found"
                  : "No interviewers found"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerManagement;
