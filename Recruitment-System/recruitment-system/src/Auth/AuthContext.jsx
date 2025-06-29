// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // Add a loading state

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//     setIsLoading(false); // Set loading to false after checking the token
//   }, []);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//   };

//   const value = { isAuthenticated, login, logout, isLoading }; // Include isLoading in the context value

//   return (
//     <AuthContext.Provider value={value}>
//       {!isLoading && children} {/* Only render children when not loading */}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// export { AuthContext };

// import React, { createContext, useContext, useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token retrieved:", token); // Debug log

//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         console.log("Decoded token:", decodedToken); // Debug log
//         setIsAuthenticated(true);
//         setUserId(decodedToken.userId); // Ensure this matches the key in your token
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (userId) => {
//     console.log("Logging in user ID:", userId); // Debug log
//     setIsAuthenticated(true);
//     setUserId(userId);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUserId(null);
//     localStorage.removeItem("token");
//   };

//   const value = { isAuthenticated, userId, login, logout, isLoading };

//   return (
//     <AuthContext.Provider value={value}>
//       {!isLoading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// export { AuthContext };

// import React, { createContext, useContext, useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token retrieved:", token); // Debug log

//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         console.log("Decoded token:", decodedToken); // Debug log
//         setIsAuthenticated(true);
//         setUserId(decodedToken.userId); // Ensure this matches the key in your token
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (userId) => {
//     console.log("Logging in user ID:", userId); // Debug log
//     setIsAuthenticated(true);
//     setUserId(userId);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUserId(null);
//     localStorage.removeItem("token");
//   };

//   const value = { isAuthenticated, userId, login, logout, isLoading };

//   return (
//     <AuthContext.Provider value={value}>
//       {!isLoading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// export { AuthContext }; // This is the line that exports AuthContext

import React, { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token); // Debug log

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); // Debug log
        setIsAuthenticated(true);
        setUserId(decodedToken.userId); // Ensure this matches the key in your token
        localStorage.setItem("username", decodedToken.username); // Store the username
        console.log("Username stored:", decodedToken.username); // Debug log
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userId, username, role) => {
    console.log("Logging in user ID:", userId); // Debug log
    setIsAuthenticated(true);
    setUserId(userId);
    localStorage.setItem("username", username); // Store the username
    localStorage.setItem("userRole", role); // Store the user role
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Clear the username
  };

  const value = { isAuthenticated, userId, login, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
