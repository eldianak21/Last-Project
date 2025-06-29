// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./UserManagement.css";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     // Removed username field
//     role: "HR Officer",
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [roleFilter, setRoleFilter] = useState("All");
//   const [isAdmin] = useState(true); // This could be determined based on the user's role

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/admin/users", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!response.ok) {
//         console.error(`HTTP error! status: ${response.status}`);
//         return;
//       }

//       const data = await response.json();
//       console.log("Data from backend:", data);
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleRoleFilter = (e) => {
//     setRoleFilter(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       newUser.firstName.trim() &&
//       newUser.lastName.trim() &&
//       newUser.email.trim()
//     ) {
//       try {
//         const response = await fetch("http://localhost:5000/api/admin/add-hr", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(newUser), // Send the newUser object (without username)
//         });

//         if (response.ok) {
//           fetchUsers();
//           setNewUser({
//             firstName: "",
//             lastName: "",
//             email: "",
//             role: "HR Officer",
//           });
//           alert("HR User added successfully!");
//         } else {
//           const errorData = await response.json();
//           alert(
//             `Failed to add HR User: ${errorData.message || "Unknown error"}`
//           );
//         }
//       } catch (error) {
//         console.error("Error adding HR User:", error);
//         alert("An error occurred while adding the user.");
//       }
//     } else {
//       alert("Please fill in all required fields."); // Inform user about missing fields
//     }
//   };

//   const handleRemoveUser = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/admin/users/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (response.ok) {
//         fetchUsers();
//         alert("HR User removed successfully!");
//       } else {
//         const errorData = await response.json();
//         alert(
//           `Failed to remove HR User: ${errorData.message || "Unknown error"}`
//         );
//       }
//     } catch (error) {
//       console.error("Error removing HR User:", error);
//       alert("An error occurred while removing the user.");
//     }
//   };

//   const filteredUsers = users.filter((user) => {
//     const name = user.name || "";
//     const email = user.email || "";

//     const matchesSearch =
//       name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       email.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesRole = roleFilter === "All" || user.role === roleFilter;

//     return matchesSearch && matchesRole;
//   });

//   const getRoleClass = (role) => {
//     switch (role) {
//       case "Admin":
//         return "role-admin";
//       case "HR Officer":
//         return "role-hr";
//       case "Department Head":
//         return "role-dept";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="admin-container">
//       <div className="admin-sidebar">
//         <div className="sidebar-header">
//           <h2>Admin Panel</h2>
//         </div>
//         <nav className="sidebar-nav">
//           <Link to="/user-management" className="nav-link active">
//             <i className="fas fa-users"></i>
//             <span>User Management</span>
//           </Link>
//           <Link to="/job-posting-overview" className="nav-link">
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
//           <h1>User Management</h1>
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
//                 id="searchUsers"
//                 name="searchUsers"
//                 placeholder="Search users..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 autoComplete="off"
//               />
//             </div>
//             <div className="filter-dropdown">
//               <select
//                 id="roleFilter"
//                 name="roleFilter"
//                 value={roleFilter}
//                 onChange={handleRoleFilter}
//               >
//                 <option value="All">All Roles</option>
//                 <option value="Admin">Admin</option>
//                 <option value="HR Officer">HR Officer</option>
//                 <option value="Interviewer">Interviewer</option>
//               </select>
//             </div>
//           </div>

//           {isAdmin && (
//             <div className="add-user-form">
//               <h3>Add New HR User</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     id="newUserFirstName"
//                     name="firstName"
//                     value={newUser.firstName}
//                     onChange={handleInputChange}
//                     placeholder="First Name"
//                     required
//                     autoComplete="given-name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     id="newUserLastName"
//                     name="lastName"
//                     value={newUser.lastName}
//                     onChange={handleInputChange}
//                     placeholder="Last Name"
//                     required
//                     autoComplete="family-name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     id="newUserEmail"
//                     name="email"
//                     value={newUser.email}
//                     onChange={handleInputChange}
//                     placeholder="Email"
//                     required
//                     autoComplete="email"
//                   />
//                 </div>
//                 {/* Removed Username Field */}
//                 <div className="form-group">
//                   <select
//                     id="newUserRole"
//                     name="role"
//                     value={newUser.role}
//                     onChange={handleInputChange}
//                     disabled
//                   >
//                     <option value="HR Officer">HR Officer</option>
//                   </select>
//                 </div>
//                 <button type="submit" className="primary-btn">
//                   <i className="fas fa-user-plus"></i> Add User
//                 </button>
//               </form>
//             </div>
//           )}

//           <div className="data-table-container">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Last Active</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <tr key={user.id}>
//                       <td>{user.id}</td>
//                       <td>{user.name}</td>
//                       <td>{user.email}</td>
//                       <td>
//                         <span
//                           className={`role-badge ${getRoleClass(user.role)}`}
//                         >
//                           {user.role}
//                         </span>
//                       </td>
//                       <td>{user.lastActive}</td>
//                       <td>
//                         <button className="action-btn edit-btn">
//                           <i className="fas fa-edit"></i>
//                         </button>
//                         {isAdmin && user.role === "HR Officer" && (
//                           <button
//                             className="action-btn delete-btn"
//                             onClick={() => handleRemoveUser(user.id)}
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6">No users found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // Removed username field
    role: "HR Officer",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isAdmin] = useState(true); // This could be determined based on the user's role

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("Data from backend:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newUser.firstName.trim() &&
      newUser.lastName.trim() &&
      newUser.email.trim()
    ) {
      try {
        const response = await fetch("http://localhost:5000/api/admin/add-hr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newUser), // Send the newUser object (without username)
        });

        if (response.ok) {
          fetchUsers();
          setNewUser({
            firstName: "",
            lastName: "",
            email: "",
            role: "HR Officer",
          });
          alert("HR User added successfully!");
        } else {
          const errorData = await response.json();
          alert(
            `Failed to add HR User: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Error adding HR User:", error);
        alert("An error occurred while adding the user.");
      }
    } else {
      alert("Please fill in all required fields."); // Inform user about missing fields
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        fetchUsers();
        alert("HR User removed successfully!");
      } else {
        const errorData = await response.json();
        alert(
          `Failed to remove HR User: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error removing HR User:", error);
      alert("An error occurred while removing the user.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleClass = (role) => {
    switch (role) {
      case "Admin":
        return "role-admin";
      case "HR Officer":
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
          <Link to="/admin-dashboard" className="nav-link">
            <i className="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </Link>
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
                id="searchUsers"
                name="searchUsers"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoComplete="off"
              />
            </div>
            <div className="filter-dropdown">
              <select
                id="roleFilter"
                name="roleFilter"
                value={roleFilter}
                onChange={handleRoleFilter}
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="HR Officer">HR Officer</option>
                <option value="Interviewer">Interviewer</option>
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
                    id="newUserFirstName"
                    name="firstName"
                    value={newUser.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="newUserLastName"
                    name="lastName"
                    value={newUser.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                    autoComplete="family-name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="newUserEmail"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    autoComplete="email"
                  />
                </div>
                {/* Removed Username Field */}
                <div className="form-group">
                  <select
                    id="newUserRole"
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    disabled
                  >
                    <option value="HR Officer">HR Officer</option>
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`role-badge ${getRoleClass(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>{user.lastActive}</td>
                      <td>
                        <button className="action-btn edit-btn">
                          <i className="fas fa-edit"></i>
                        </button>
                        {isAdmin && user.role === "HR Officer" && (
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
