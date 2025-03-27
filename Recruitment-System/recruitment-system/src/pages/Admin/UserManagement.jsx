import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "HR Manager" });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isAdmin] = useState(true);

  const fetchUsers = () => {
    const temporaryUsers = [
      { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", lastActive: "Today" },
      { id: 2, name: "John Doe", email: "john@example.com", role: "HR Manager", lastActive: "2 days ago" },
      { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Department Head", lastActive: "1 week ago" },
    ];
    setUsers(temporaryUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.name.trim() && newUser.email.trim()) {
      const newUserWithId = { 
        id: users.length + 1, 
        ...newUser,
        lastActive: "Today"
      };
      setUsers([...users, newUserWithId]);
      setNewUser({ name: "", email: "", role: "HR Manager" });
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleClass = (role) => {
    switch (role) {
      case "Admin":
        return "role-admin";
      case "HR Manager":
        return "role-hr";
      case "Department Head":
        return "role-dept";
      default:
        return "";
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/user-management" className="nav-link active">
            <i className="fas fa-users"></i>
            <span>User Management</span>
          </Link>
          <Link to="/job-posting-overview" className="nav-link">
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
          <h1>User Management</h1>
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
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filter-dropdown">
              <select value={roleFilter} onChange={handleRoleFilter}>
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Department Head">Department Head</option>
              </select>
            </div>
          </div>

          {isAdmin && (
            <div className="add-user-form">
              <h3>Add New HR User</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    disabled
                  >
                    <option value="HR Manager">HR Manager</option>
                  </select>
                </div>
                <button type="submit" className="primary-btn">
                  <i className="fas fa-user-plus"></i> Add User
                </button>
              </form>
            </div>
          )}

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${getRoleClass(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.lastActive}</td>
                    <td>
                      <button className="action-btn edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      {isAdmin && user.role === "HR Manager" && (
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleRemoveUser(user.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;