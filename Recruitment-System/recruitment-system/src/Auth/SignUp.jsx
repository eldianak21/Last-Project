// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import "./SignUp.css";

// const SignUp = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [firstName, setFirstName] = useState(""); // New state for first name
//   const [lastName, setLastName] = useState(""); // New state for last name
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           phone,
//           firstName,
//           lastName,
//           password,
//         }), // Include firstName and lastName
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Network response was not ok");
//       }

//       login();
//       navigate("/");
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="left-section">
//         <h1>Welcome to Jimma University Recruitment Hub</h1>
//         <p>
//           Sign up to access powerful tools for managing candidates, scheduling
//           interviews, and tracking progress—all in one place.
//         </p>
//       </div>
//       <div className="right-section">
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             id="firstName"
//             required
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />

//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             id="lastName"
//             required
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />

//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             required
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             id="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label htmlFor="phone">Phone number</label>
//           <input
//             type="tel"
//             id="phone"
//             required
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {errorMessage && <p className="error-message">{errorMessage}</p>}

//           <button type="submit">Register</button>
//         </form>

//         <div className="login-redirect">
//           <p>Already have an account?</p>
//           <Link to="/login" className="login-button">
//             <button>Login</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          firstName,
          lastName,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );
      // Redirect to the verification code page, passing the email
      navigate(`/verify-code?email=${data.email}`); // Corrected line
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Welcome to Jimma University Recruitment Hub</h1>
        <p>
          Sign up to access powerful tools for managing candidates, scheduling
          interviews, and tracking progress—all in one place.
        </p>
      </div>
      <div className="right-section">
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            id="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <button type="submit">Register</button>
        </form>

        <div className="login-redirect">
          <p>Already have an account?</p>
          <Link to="/login" className="login-button">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
