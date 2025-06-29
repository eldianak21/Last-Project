import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./VerifyCode.css";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Extract email from query parameters
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      setError("Email not found in the URL.");
    }
  }, [location.search]);

  const handleVerify = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, code: code }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        login();
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Code verification failed.");
      }
    } catch (err) {
      setError("An error occurred while verifying your code.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Welcome to Jimma University Recruitment Hub</h1>
        <p>Verify your account by entering the code sent to your email.</p>
      </div>
      <div className="right-section">
        {email && (
          <form
            className="verify-code-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
          >
            <label htmlFor="code">Verification Code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit">Verify</button>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
          </form>
        )}
        {!email && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default VerifyCode;
