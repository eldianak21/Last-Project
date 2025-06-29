//

import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      let endpoint, body;

      if (step === 1) {
        endpoint = "/api/auth/password-reset/request-password-reset";
        body = { email };
      } else if (step === 2) {
        endpoint = "/api/auth/password-reset/verify-otp";
        body = { email, otp };
      } else {
        if (newPassword !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        endpoint = "/api/auth/password-reset/reset-password";
        body = { email, otp, newPassword };
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      setMessage({
        text: data.message,
        type: "success",
        data: data, // Include full response for debugging
      });

      if (step === 1) setStep(2);
      else if (step === 2) setStep(3);
      else {
        // Reset form on success
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setStep(1);
      }
    } catch (error) {
      setMessage({
        text: error.message || "An error occurred",
        type: "error",
      });
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Welcome to Our Platform</h1>
        <p>Reset your password to regain access to your account</p>
      </div>
      <div className="right-section">
        <h1>
          {step === 1 && "Reset Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Set New Password"}
        </h1>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
            {message.type === "error" && (
              <button
                onClick={() => setMessage({ text: "", type: "" })}
                className="dismiss-button"
              >
                ×
              </button>
            )}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                className="next-button"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p>We've sent a 6-digit OTP to your registered email.</p>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength="6"
                pattern="\d{6}"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="next-button"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="8"
                disabled={isLoading}
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
                disabled={isLoading}
              />

              <button
                type="submit"
                className="next-button"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
