import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const DepartmentHeadManagement = () => {
  const [departmentHeads, setDepartmentHeads] = useState([
    { id: 1, name: "Jane Smith", department: "Engineering", feedback: "Excellent leadership skills." },
    { id: 2, name: "John Doe", department: "Marketing", feedback: "Great at team management." },
  ]);
  const [newHeadName, setNewHeadName] = useState("");
  const [newHeadDepartment, setNewHeadDepartment] = useState("");
  const [editHeadId, setEditHeadId] = useState(null);
  const [editHeadName, setEditHeadName] = useState("");
  const [editHeadDepartment, setEditHeadDepartment] = useState("");
  const [viewFeedbackId, setViewFeedbackId] = useState(null); // State to track which feedback to view
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        feedback: "", // Initialize with empty feedback
      };
      setDepartmentHeads([...departmentHeads, newHead]);
      setNewHeadName("");
      setNewHeadDepartment("");
      setSuccessMessage("Department head added successfully.");
      setErrorMessage("");
    }
  };

  const handleEditDepartmentHead = (id) => {
    const headToEdit = departmentHeads.find((head) => head.id === id);
    setEditHeadId(id);
    setEditHeadName(headToEdit.name);
    setEditHeadDepartment(headToEdit.department);
  };

  const handleUpdateDepartmentHead = () => {
    if (validateInputs(editHeadName, editHeadDepartment)) {
      setDepartmentHeads((prev) =>
        prev.map((head) =>
          head.id === editHeadId
            ? { ...head, name: editHeadName, department: editHeadDepartment }
            : head
        )
      );
      setEditHeadId(null);
      setEditHeadName("");
      setEditHeadDepartment("");
      setSuccessMessage("Department head updated successfully.");
      setErrorMessage("");
    }
  };

  const handleRemoveDepartmentHead = (id) => {
    if (window.confirm("Are you sure you want to remove this department head?")) {
      setDepartmentHeads(departmentHeads.filter((head) => head.id !== id));
      setSuccessMessage("Department head removed successfully.");
    }
  };

  const handleViewFeedback = (id) => {
    setViewFeedbackId(viewFeedbackId === id ? null : id); // Toggle feedback view
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Department Head Management</h2>

      {/* Navigation Bar */}
      <nav style={{ marginBottom: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/hr/dashboard">Dashboard</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/application-management">Application Management</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/candidate-profiles">Candidate Profiles</Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link to="/department-head-management">Department Head Management</Link>
          </li>
        </ul>
      </nav>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Add/Edit Department Head Form */}
      <div style={{ marginBottom: "20px" }}>
        <h3>{editHeadId ? "Edit Department Head" : "Add New Department Head"}</h3>
        <input
          type="text"
          placeholder="Department Head Name"
          value={editHeadId ? editHeadName : newHeadName}
          onChange={(e) =>
            editHeadId ? setEditHeadName(e.target.value) : setNewHeadName(e.target.value)
          }
          style={{ marginRight: "10px", padding: "8px", width: "calc(50% - 130px)" }}
        />
        <input
          type="text"
          placeholder="Department"
          value={editHeadId ? editHeadDepartment : newHeadDepartment}
          onChange={(e) =>
            editHeadId ? setEditHeadDepartment(e.target.value) : setNewHeadDepartment(e.target.value)
          }
          style={{ marginRight: "10px", padding: "8px", width: "calc(50% - 130px)" }}
        />
        <button onClick={editHeadId ? handleUpdateDepartmentHead : handleAddDepartmentHead}>
          {editHeadId ? "Update" : "Add"}
        </button>
      </div>

      {/* Department Heads List */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Department</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departmentHeads.map((head) => (
            <tr key={head.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{head.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{head.department}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => handleEditDepartmentHead(head.id)} style={{ marginRight: "10px" }}>
                  Edit
                </button>
                <button onClick={() => handleRemoveDepartmentHead(head.id)} style={{ color: "red" }}>
                  Remove
                </button>
                <button 
                  onClick={() => handleViewFeedback(head.id)} 
                  style={{ marginLeft: "10px", background: "transparent", border: "none", cursor: "pointer", color: "#3498db" }}
                >
                  🛎️ Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Section */}
      {viewFeedbackId && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "4px" }}>
          <h3>Feedback for {departmentHeads.find(head => head.id === viewFeedbackId)?.name}</h3>
          <p>{departmentHeads.find(head => head.id === viewFeedbackId)?.feedback || "No feedback available."}</p>
          <button onClick={() => setViewFeedbackId(null)} style={{ marginTop: "10px", background: "#e74c3c", color: "white", padding: "8px 15px", border: "none", borderRadius: "4px" }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default DepartmentHeadManagement;