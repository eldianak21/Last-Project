import React from "react";
import { useNavigate } from "react-router-dom";
import "./InterviewSelection.css";

const InterviewSelection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <div
      className="interview-container"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <h1>Congratulations!</h1>
      <p>You have successfully submitted your application. 🎉</p>
      <p>Click anywhere to go to Home Page.</p>
    </div>
  );
};

export default InterviewSelection;
