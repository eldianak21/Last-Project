// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import "./Login.css";
// import jwtDecode from "jwt-decode";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const { login, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // If already authenticated, clear the form
//     if (isAuthenticated) {
//       setUsername("");
//       setPassword("");
//     }
//   }, [isAuthenticated]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Login failed. Please try again.");
//         return;
//       }

//       const data = await response.json();
//       const token = data.token;
//       const requiresChange = data.requiresChange;
//       const returnedUsername = data.username;

//       localStorage.setItem("token", token);

//       try {
//         const decodedToken = jwtDecode(token);
//         const userRole = decodedToken.role;

//         localStorage.setItem("userRole", userRole);
//         localStorage.setItem("username", returnedUsername);

//         login();

//         if (
//           (userRole === "HR Officer" || userRole === "Interviewer") &&
//           requiresChange
//         ) {
//           navigate("/change-password", {
//             state: {
//               username: decodedToken.username,
//               role: userRole,
//             },
//           });
//           return;
//         }

//         switch (userRole) {
//           case "Admin":
//             navigate("/admin-dashboard");
//             break;
//           case "HR Officer":
//             navigate("/hr-dashboard");
//             break;
//           case "Applicant":
//             var storedJobId = localStorage.getItem("pendingJobId");
//             localStorage.removeItem("pendingJobId");

//             if (storedJobId) {
//               navigate(`/submit-cv/${storedJobId}`);
//             } else {
//               navigate("/");
//             }
//             break;
//           case "Interviewer":
//             navigate("/interviewer-dashboard");
//             break;
//           default:
//             navigate("/");
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         setErrorMessage("Error decoding token. Login may still succeed.");
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrorMessage("Failed to connect to the server.");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("username");
//     navigate("/login");
//   };

//   return (
//     <div className="container">
//       <div className="left-section">
//         <h1>Welcome Back</h1>
//         <p>Please log in to continue</p>
//       </div>
//       <div className="right-section">
//         {!isAuthenticated ? (
//           <form className="login-form" onSubmit={handleSubmit}>
//             <label>Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <button type="submit" className="next-button">
//               Next
//             </button>
//           </form>
//         ) : (
//           <div>
//             <p>You are already logged in.</p>
//             <button className="logout-button" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         )}
//         <p className="forgot-password">
//           <Link to="/forgot-password">Forgot Password?</Link>
//         </p>
//         <p className="sign-up">
//           Don't have an account? <Link to="/sign-up">Sign up here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import "./Login.css";
// import jwtDecode from "jwt-decode";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const { login, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // If already authenticated, clear the form
//     if (isAuthenticated) {
//       setUsername("");
//       setPassword("");
//     }
//   }, [isAuthenticated]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(""); // Clear any previous error messages

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       // Check for response errors
//       if (!response.ok) {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Login failed. Please try again.");
//         return;
//       }

//       // Successful login
//       const data = await response.json();
//       const token = data.token;

//       if (token) {
//         // Store token in local storage
//         localStorage.setItem("token", token);
//         console.log("Token stored:", token); // Debug log

//         // Decode token to get user information
//         const decodedToken = jwtDecode(token);
//         console.log("Decoded token:", decodedToken); // Debug log

//         // Call the login function from AuthContext with userId
//         login(decodedToken.userId); // Pass userId to the login function

//         // Navigation logic based on user role
//         const requiresChange = decodedToken.requiresPasswordChange;
//         const returnedUsername = decodedToken.username;
//         const userRole = decodedToken.role;

//         if (
//           (userRole === "HR Officer" || userRole === "Interviewer") &&
//           requiresChange
//         ) {
//           navigate("/change-password", {
//             state: {
//               username: returnedUsername,
//               role: userRole,
//             },
//           });
//           return;
//         }

//         switch (userRole) {
//           case "Admin":
//             navigate("/admin-dashboard");
//             break;
//           case "HR Officer":
//             navigate("/hr-dashboard");
//             break;
//           case "Applicant":
//             const storedJobId = localStorage.getItem("pendingJobId");
//             localStorage.removeItem("pendingJobId");
//             if (storedJobId) {
//               navigate(`/submit-cv/${storedJobId}`);
//             } else {
//               navigate("/");
//             }
//             break;
//           case "Interviewer":
//             navigate("/interviewer-dashboard");
//             break;
//           default:
//             navigate("/");
//         }
//       } else {
//         setErrorMessage("No token received, login failed.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrorMessage("Failed to connect to the server.");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("username");
//     navigate("/login");
//   };

//   return (
//     <div className="container">
//       <div className="left-section">
//         <h1>Welcome Back</h1>
//         <p>Please log in to continue</p>
//       </div>
//       <div className="right-section">
//         {!isAuthenticated ? (
//           <form className="login-form" onSubmit={handleSubmit}>
//             <label>Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <button type="submit" className="next-button">
//               Next
//             </button>
//           </form>
//         ) : (
//           <div>
//             <p>You are already logged in.</p>
//             <button className="logout-button" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         )}
//         <p className="forgot-password">
//           <Link to="/forgot-password">Forgot Password?</Link>
//         </p>
//         <p className="sign-up">
//           Don't have an account? <Link to="/sign-up">Sign up here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Login.css";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setUsername("");
      setPassword("");
    }
  }, [isAuthenticated]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage("");

  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setErrorMessage(errorData.message || "Login failed. Please try again.");
  //       return;
  //     }

  //     const data = await response.json();
  //     const token = data.token;

  //     if (token) {
  //       localStorage.setItem("token", token);
  //       console.log("Token stored:", token); // Debug log

  //       const decodedToken = jwtDecode(token);
  //       console.log("Decoded token:", decodedToken); // Debug log
  //       login(decodedToken.userId); // Pass userId to the login function

  //       const requiresChange = decodedToken.requiresPasswordChange;
  //       const returnedUsername = decodedToken.username;
  //       const userRole = decodedToken.role;

  //       // Logic for navigation based on user role
  //       if (
  //         (userRole === "HR Officer" || userRole === "Interviewer") &&
  //         requiresChange
  //       ) {
  //         navigate("/change-password", {
  //           state: { username: returnedUsername, role: userRole },
  //         });
  //         return;
  //       }

  //       switch (userRole) {
  //         case "Admin":
  //           navigate("/admin-dashboard");
  //           break;
  //         case "HR Officer":
  //           navigate("/hr-dashboard");
  //           break;
  //         case "Applicant":
  //           const storedJobId = localStorage.getItem("pendingJobId");
  //           localStorage.removeItem("pendingJobId");
  //           if (storedJobId) {
  //             navigate(`/submit-cv/${storedJobId}`);
  //           } else {
  //             navigate("/");
  //           }
  //           break;
  //         case "Interviewer":
  //           navigate("/interviewer-dashboard");
  //           break;
  //         default:
  //           navigate("/");
  //       }
  //     } else {
  //       setErrorMessage("No token received, login failed.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setErrorMessage("Failed to connect to the server.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();
      const token = data.token;

      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored:", token); // Debug log

        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); // Debug log
        login(decodedToken.userId, decodedToken.username, decodedToken.role); // Pass userId, username, and role

        const requiresChange = decodedToken.requiresPasswordChange;

        // Logic for navigation based on user role
        if (
          (decodedToken.role === "HR Officer" ||
            decodedToken.role === "Interviewer") &&
          requiresChange
        ) {
          navigate("/change-password", {
            state: { username: decodedToken.username, role: decodedToken.role },
          });
          return;
        }

        switch (decodedToken.role) {
          case "Admin":
            navigate("/admin-dashboard");
            break;
          case "HR Officer":
            navigate("/hr-dashboard");
            break;
          case "Applicant":
            const storedJobId = localStorage.getItem("pendingJobId");
            localStorage.removeItem("pendingJobId");
            if (storedJobId) {
              navigate(`/submit-cv/${storedJobId}`);
            } else {
              navigate("/");
            }
            break;
          case "Interviewer":
            navigate("/interviewer-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        setErrorMessage("No token received, login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Failed to connect to the server.");
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Welcome Back</h1>
        <p>Please log in to continue</p>
      </div>
      <div className="right-section">
        {!isAuthenticated ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="next-button">
              Next
            </button>
          </form>
        ) : (
          <div>
            <p>You are already logged in.</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="sign-up">
          Don't have an account? <Link to="/sign-up">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
