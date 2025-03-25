import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", role: "HR Manager" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for admin

  // Temporary data
  const fetchUsers = () => {
    const temporaryUsers = [
      { id: 1, name: "Admin User", role: "Admin" },
      { id: 2, name: "John Doe", role: "HR Manager" },
      { id: 3, name: "Jane Smith", role: "Department Head" },
    ];
    setUsers(temporaryUsers);
  };

  useEffect(() => {
    fetchUsers(); // Fetch temporary data on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.name.trim()) {
      const newUserWithId = { id: users.length + 1, ...newUser };
      setUsers([...users, newUserWithId]);
      setNewUser({ name: "", role: "HR Manager" }); // Reset form
    }
  };

  const handleRemoveUser = (id) => {
    const userToRemove = users.find((user) => user.id === id);
    if (userToRemove && userToRemove.role === "HR Manager") {
      setUsers(users.filter((user) => user.id !== id));
    } else {
      alert("Only HR users can be removed.");
    }
  };

  // Filter users based on search query for name and role
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or role..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />

      {/* Navigation Links */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/admin-dashboard" style={{ marginRight: "15px" }}>
          Admin Dashboard
        </Link>
        <Link to="/job-posting-overview" style={{ marginRight: "15px" }}>
          Job Postings Overview
        </Link>
        <Link to="/application-overview">Application Overview</Link>
      </nav>

      {/* Admin can add HR users */}
      {isAdmin && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Enter HR user name"
            required
            style={{ marginRight: "10px" }}
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            style={{ marginRight: "10px" }}
            disabled // Admin can only add HR
          >
            <option value="HR Manager">HR Manager</option>
          </select>
          <button type="submit">Add HR User</button>
        </form>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Role</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.role}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {isAdmin && user.role === "HR Manager" && (
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    style={{ color: "red" }}
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
