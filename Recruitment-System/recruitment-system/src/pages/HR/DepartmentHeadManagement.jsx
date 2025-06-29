// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const DepartmentHeadManagement = () => {
//   const [departmentHeads, setDepartmentHeads] = useState([
//     { id: 1, name: "Jane Smith", department: "Engineering", feedback: "Excellent leadership skills." },
//     { id: 2, name: "John Doe", department: "Marketing", feedback: "Great at team management." },
//   ]);
//   const [newHeadName, setNewHeadName] = useState("");
//   const [newHeadDepartment, setNewHeadDepartment] = useState("");
//   const [editHeadId, setEditHeadId] = useState(null);
//   const [editHeadName, setEditHeadName] = useState("");
//   const [editHeadDepartment, setEditHeadDepartment] = useState("");
//   const [viewFeedbackId, setViewFeedbackId] = useState(null); // State to track which feedback to view
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const validateInputs = (name, department) => {
//     if (!name || !department) {
//       setErrorMessage("Both name and department are required.");
//       return false;
//     }
//     const exists = departmentHeads.some(
//       (head) => head.name === name && head.department === department
//     );
//     if (exists) {
//       setErrorMessage("This department head already exists.");
//       return false;
//     }
//     return true;
//   };

//   const handleAddDepartmentHead = () => {
//     if (validateInputs(newHeadName, newHeadDepartment)) {
//       const newHead = {
//         id: departmentHeads.length + 1,
//         name: newHeadName,
//         department: newHeadDepartment,
//         feedback: "", // Initialize with empty feedback
//       };
//       setDepartmentHeads([...departmentHeads, newHead]);
//       setNewHeadName("");
//       setNewHeadDepartment("");
//       setSuccessMessage("Department head added successfully.");
//       setErrorMessage("");
//     }
//   };

//   const handleEditDepartmentHead = (id) => {
//     const headToEdit = departmentHeads.find((head) => head.id === id);
//     setEditHeadId(id);
//     setEditHeadName(headToEdit.name);
//     setEditHeadDepartment(headToEdit.department);
//   };

//   const handleUpdateDepartmentHead = () => {
//     if (validateInputs(editHeadName, editHeadDepartment)) {
//       setDepartmentHeads((prev) =>
//         prev.map((head) =>
//           head.id === editHeadId
//             ? { ...head, name: editHeadName, department: editHeadDepartment }
//             : head
//         )
//       );
//       setEditHeadId(null);
//       setEditHeadName("");
//       setEditHeadDepartment("");
//       setSuccessMessage("Department head updated successfully.");
//       setErrorMessage("");
//     }
//   };

//   const handleRemoveDepartmentHead = (id) => {
//     if (window.confirm("Are you sure you want to remove this department head?")) {
//       setDepartmentHeads(departmentHeads.filter((head) => head.id !== id));
//       setSuccessMessage("Department head removed successfully.");
//     }
//   };

//   const handleViewFeedback = (id) => {
//     setViewFeedbackId(viewFeedbackId === id ? null : id); // Toggle feedback view
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Department Head Management</h2>

//       {/* Navigation Bar */}
//        <nav style={{ marginBottom: "20px" }}>
//         <ul style={{ listStyleType: "none", padding: 0 }}>
//           <li style={{ display: "inline", marginRight: "20px" }}>
//             <Link to="/hr-dashboard">Dashboard</Link>
//           </li>
//            <li style={{ display: "inline", marginRight: "20px" }}>
//             <Link to="/job-postings">Job Postings</Link>
//           </li>
//           <li style={{ display: "inline", marginRight: "20px" }}>
//             <Link to="/candidate-profiles">Candidate Profiles</Link>
//           </li>
//           <li style={{ display: "inline", marginRight: "20px" }}>
//             <Link to="/application-management">
//               Application Management
//             </Link>
//           </li>
//           <li style={{ display: "inline", marginRight: "20px" }}>
//             <Link to="/result">Result</Link>
//           </li>
//         </ul>
//       </nav>

//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

//       {/* Add/Edit Department Head Form */}
//       <div style={{ marginBottom: "20px" }}>
//         <h3>{editHeadId ? "Edit Department Head" : "Add New Department Head"}</h3>
//         <input
//           type="text"
//           placeholder="Department Head Name"
//           value={editHeadId ? editHeadName : newHeadName}
//           onChange={(e) =>
//             editHeadId ? setEditHeadName(e.target.value) : setNewHeadName(e.target.value)
//           }
//           style={{ marginRight: "10px", padding: "8px", width: "calc(50% - 130px)" }}
//         />
//         <input
//           type="text"
//           placeholder="Department"
//           value={editHeadId ? editHeadDepartment : newHeadDepartment}
//           onChange={(e) =>
//             editHeadId ? setEditHeadDepartment(e.target.value) : setNewHeadDepartment(e.target.value)
//           }
//           style={{ marginRight: "10px", padding: "8px", width: "calc(50% - 130px)" }}
//         />
//         <button onClick={editHeadId ? handleUpdateDepartmentHead : handleAddDepartmentHead}>
//           {editHeadId ? "Update" : "Add"}
//         </button>
//       </div>

//       {/* Department Heads List */}
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           marginBottom: "20px",
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Department</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departmentHeads.map((head) => (
//             <tr key={head.id}>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>{head.name}</td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>{head.department}</td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 <button onClick={() => handleEditDepartmentHead(head.id)} style={{ marginRight: "10px" }}>
//                   Edit
//                 </button>
//                 <button onClick={() => handleRemoveDepartmentHead(head.id)} style={{ color: "red" }}>
//                   Remove
//                 </button>
//                 <button
//                   onClick={() => handleViewFeedback(head.id)}
//                   style={{ marginLeft: "10px", background: "transparent", border: "none", cursor: "pointer", color: "#3498db" }}
//                 >
//                   🛎️ Feedback
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Feedback Section */}
//       {viewFeedbackId && (
//         <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "4px" }}>
//           <h3>Feedback for {departmentHeads.find(head => head.id === viewFeedbackId)?.name}</h3>
//           <p>{departmentHeads.find(head => head.id === viewFeedbackId)?.feedback || "No feedback available."}</p>
//           <button onClick={() => setViewFeedbackId(null)} style={{ marginTop: "10px", background: "#e74c3c", color: "white", padding: "8px 15px", border: "none", borderRadius: "4px" }}>
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DepartmentHeadManagement;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HrDepartmentHeadManagement.css";

const DepartmentHeadManagement = () => {
  const [departmentHeads, setDepartmentHeads] = useState([
    {
      id: 1,
      name: "Jane Smith",
      department: "Engineering",
      feedback: "Excellent leadership skills.",
      icon: "👩‍💼",
    },
    {
      id: 2,
      name: "John Doe",
      department: "Marketing",
      feedback: "Great at team management.",
      icon: "👨‍💼",
    },
  ]);
  const [newHeadName, setNewHeadName] = useState("");
  const [newHeadDepartment, setNewHeadDepartment] = useState("");
  const [editHeadId, setEditHeadId] = useState(null);
  const [editHeadName, setEditHeadName] = useState("");
  const [editHeadDepartment, setEditHeadDepartment] = useState("");
  const [viewFeedbackId, setViewFeedbackId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dashboardLinks = [
    { to: "/job-postings", text: "Job Postings Overview", icon: "📋" },
    {
      to: "/application-management",
      text: "Application Management",
      icon: "📄",
    },
    { to: "/candidate-profiles", text: "Candidate Profiles", icon: "👤" },
    {
      to: "/department-head-management",
      text: "Interviewer Management",
      icon: "👔",
    },
    { to: "/result", text: "Results Dashboard", icon: "📊" },
  ];

  const validateInputs = (name, department) => {
    if (!name || !department) {
      setErrorMessage("Both name and department are required.");
      return false;
    }
    const exists = departmentHeads.some(
      (head) => head.name === name && head.department === department
    );
    if (exists) {
      setErrorMessage("This department head already exists.");
      return false;
    }
    return true;
  };

  const handleAddDepartmentHead = () => {
    if (validateInputs(newHeadName, newHeadDepartment)) {
      const newHead = {
        id: departmentHeads.length + 1,
        name: newHeadName,
        department: newHeadDepartment,
        feedback: "",
        icon: "👤",
      };
      setDepartmentHeads([...departmentHeads, newHead]);
      setNewHeadName("");
      setNewHeadDepartment("");
      setSuccessMessage("Department head added successfully.");
      setErrorMessage("");
    }
  };

  const handleEditDepartmentHead = (id, newName, newDepartment) => {
    if (validateInputs(newName, newDepartment)) {
      setDepartmentHeads((prev) =>
        prev.map((head) =>
          head.id === id
            ? { ...head, name: newName, department: newDepartment }
            : head
        )
      );
      setEditHeadId(null);
      setSuccessMessage("Department head updated successfully.");
      setErrorMessage("");
    }
  };

  const handleRemoveDepartmentHead = (id) => {
    if (
      window.confirm("Are you sure you want to remove this department head?")
    ) {
      setDepartmentHeads(departmentHeads.filter((head) => head.id !== id));
      setSuccessMessage("Department head removed successfully.");
    }
  };

  const handleViewFeedback = (id) => {
    setViewFeedbackId(viewFeedbackId === id ? null : id);
  };

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
          {errorMessage && (
            <div
              className="hr-summary-card"
              style={{ color: "#e74c3c", borderLeft: "4px solid #e74c3c" }}
            >
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div
              className="hr-summary-card"
              style={{ color: "#2ecc71", borderLeft: "4px solid #2ecc71" }}
            >
              {successMessage}
            </div>
          )}

          <div className="hr-form-card">
            <h3>{editHeadId ? "Edit Interviewer" : "Add New Interviewer"}</h3>
            <div className="hr-form-row">
              <input
                type="text"
                placeholder="Interviewer Name"
                value={editHeadId ? editHeadName : newHeadName}
                onChange={(e) =>
                  editHeadId
                    ? setEditHeadName(e.target.value)
                    : setNewHeadName(e.target.value)
                }
                className="hr-form-input"
              />
              <input
                type="text"
                placeholder="Department"
                value={editHeadId ? editHeadDepartment : newHeadDepartment}
                onChange={(e) =>
                  editHeadId
                    ? setEditHeadDepartment(e.target.value)
                    : setNewHeadDepartment(e.target.value)
                }
                className="hr-form-input"
              />
              <button
                onClick={
                  editHeadId
                    ? () =>
                        handleEditDepartmentHead(
                          editHeadId,
                          editHeadName,
                          editHeadDepartment
                        )
                    : handleAddDepartmentHead
                }
                className="hr-form-btn"
              >
                {editHeadId ? "Update" : "Add"}
              </button>
              {editHeadId && (
                <button
                  onClick={() => setEditHeadId(null)}
                  className="hr-logout-btn"
                  style={{ backgroundColor: "#95a5a6" }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="hr-cards-grid">
            {departmentHeads.map((head) => (
              <div className="hr-dashboard-card" key={head.id}>
                <div className="hr-card-icon">{head.icon}</div>
                <div className="hr-card-title">{head.name}</div>
                <div className="hr-card-subtitle">{head.department}</div>
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "15px" }}
                >
                  <button
                    onClick={() => {
                      setEditHeadId(head.id);
                      setEditHeadName(head.name);
                      setEditHeadDepartment(head.department);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#3498db",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveDepartmentHead(head.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#e74c3c",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleViewFeedback(head.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#2ecc71",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hr-summary-card">
            <h3>Interviewer Summary</h3>
            <div className="hr-summary-item">
              <span className="hr-summary-count">{departmentHeads.length}</span>{" "}
              Total Interviewers
            </div>
            <div className="hr-summary-item">
              <span className="hr-summary-count">
                {
                  departmentHeads.filter((h) => h.department === "Engineering")
                    .length
                }
              </span>{" "}
              Engineering Department
            </div>
            <div className="hr-summary-item">
              <span className="hr-summary-count">
                {
                  departmentHeads.filter((h) => h.department === "Marketing")
                    .length
                }
              </span>{" "}
              Marketing Department
            </div>
          </div>

          {viewFeedbackId && (
            <div className="hr-summary-card">
              <h3>
                Feedback for{" "}
                {departmentHeads.find((h) => h.id === viewFeedbackId)?.name}
              </h3>
              <p>
                {departmentHeads.find((h) => h.id === viewFeedbackId)
                  ?.feedback || "No feedback available."}
              </p>
              <button
                onClick={() => setViewFeedbackId(null)}
                className="hr-logout-btn"
                style={{ marginTop: "15px" }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeadManagement;
