// import React, { useContext } from "react";
// import "./Header.css";
// import { FaSearch, FaUserCircle } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../Auth/AuthContext"; // Import your AuthContext

// const Header = () => {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const userRole = localStorage.getItem("userRole");
//   const username = localStorage.getItem("username");

//   const handleUsernameClick = () => {
//     if (isAuthenticated) {
//       switch (userRole) {
//         case "Admin":
//           navigate("/admin-dashboard");
//           break;
//         case "HR Officer":
//           navigate("/hr-dashboard");
//           break;
//         case "Interviewer":
//           navigate("/interviewer-dashboard");
//           break;
//         case "Applicant":
//           navigate("/applicant-dashboard");
//           break;
//         default:
//           navigate("/profile");
//       }
//     }
//   };

//   const handleAccountClick = () => {
//     // Always redirect to the login page
//     navigate("/login");
//   };

//   return (
//     <header className="navbar">
//       <div className="navbar-content">
//         <h1 className="logo">Recruit Hub</h1>
//         <nav className="nav-links">
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About Us</Link>
//             </li>
//             <li>
//               <Link to="/job-posting">Job Posting</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//           </ul>
//         </nav>
//         <div className="search-account">
//           <input type="text" placeholder="Search..." className="search-bar" />
//           <FaSearch className="search-icon" />
//           {isAuthenticated && username && (
//             <span
//               className="username"
//               onClick={handleUsernameClick}
//               style={{ cursor: "pointer" }}
//             >
//               Welcome, {username}
//             </span>
//           )}
//           <FaUserCircle
//             className="account-icon"
//             onClick={handleAccountClick}
//             style={{ cursor: "pointer" }}
//           />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import "./Header.css";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext"; // Import your AuthContext

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const username = localStorage.getItem("username");

  console.log("Retrieved username:", username); // Debug log
  console.log("isAuthenticated:", isAuthenticated); // Debug log
  console.log("Retrieved userRole:", userRole); // Debug log

  const handleUsernameClick = () => {
    if (isAuthenticated) {
      console.log("Navigating based on role:", userRole); // Debug log
      switch (userRole) {
        case "Admin":
          navigate("/admin-dashboard");
          break;
        case "HR Officer":
          navigate("/hr-dashboard");
          break;
        case "Interviewer":
          navigate("/interviewer-dashboard");
          break;
        case "Applicant":
          navigate("/applicant-dashboard");
          break;
        default:
          console.log("No valid role found, navigating to profile."); // Debug log
          navigate("/profile");
      }
    }
  };
  const handleAccountClick = () => {
    // Always redirect to the login page
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1 className="logo">Recruit Hub</h1>
        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/job-posting">Job Posting</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="search-account">
          {/* <input type="text" placeholder="Search..." className="search-bar" /> */}
          {/* <FaSearch className="search-icon" /> */}
          {isAuthenticated && username && (
            <span
              className="username"
              onClick={handleUsernameClick}
              style={{ cursor: "pointer" }}
            >
              Welcome, {username}
            </span>
          )}
          <FaUserCircle
            className="account-icon"
            onClick={handleAccountClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
