// src/Auth/Logout.jsx
import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    navigate("/login"); // Redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
