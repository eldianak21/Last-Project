// // src/Auth/PrivateRoute.js

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const token = localStorage.getItem('token'); // Check if the user is authenticated

//     return token ? <Outlet /> : <Navigate to="/login" />; // Redirect if not authenticated
// };

// export default PrivateRoute;

// src/Auth/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;