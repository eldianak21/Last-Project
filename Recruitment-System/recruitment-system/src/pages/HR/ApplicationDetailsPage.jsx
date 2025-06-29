import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ApplicationDetailsPage.css"; // Import your CSS file for styling
const ApplicationDetailsPage = () => {
  const { applicationId } = useParams();
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");
  const [zoomLink, setZoomLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add full URL in development
        const appResponse = await fetch(
          `http://localhost:5000/api/view/${applicationId}`
        );

        // First check if response is OK
        if (!appResponse.ok) {
          const errorText = await appResponse.text();
          throw new Error(
            `HTTP error! status: ${appResponse.status}, ${errorText}`
          );
        }

        // Then try to parse as JSON
        const appData = await appResponse.json();
        setApplicationDetails(appData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load application details. Please try again later.");
      }
    };

    fetchData();
  }, [applicationId]);

  if (!applicationDetails) {
    return <div>Loading...</div>;
  }

  const handleAddInterview = async () => {
    try {
      const response = await fetch(`/api/interviews`, {
        // Changed the endpoint to /api/interviews
        method: "POST", // Changed the method to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: applicationDetails.ApplicationID, // Send the ApplicationID as UserID
          InterviewDate: interviewDate,
          InterviewTime: interviewTime,
          InterviewLocation: interviewLocation,
          ZoomLink: zoomLink,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add interview");
      }

      // Optionally, refresh the application details after successful update
      // fetchData(); // Re-fetch the data to show the updated HR details
      alert("Interview details added successfully!");
    } catch (error) {
      console.error("Error adding interview:", error);
      alert("Error adding interview details!");
    }
  };

  return (
    <div className="application-details-container">
      <h1>Application Details</h1>
      <p>First Name: {applicationDetails.FirstName}</p>
      <p>Last Name: {applicationDetails.LastName}</p>
      <p>Email: {applicationDetails.Email}</p>
      <h2>Interview Details</h2>
      <label>Interview Date:</label>
      <input
        type="date"
        value={interviewDate}
        onChange={(e) => setInterviewDate(e.target.value)}
      />
      <br />
      <label>Interview Time:</label>
      <input
        type="time"
        value={interviewTime}
        onChange={(e) => setInterviewTime(e.target.value)}
      />
      <br />
      <label>Interview Location:</label>
      <input
        type="text"
        value={interviewLocation}
        onChange={(e) => setInterviewLocation(e.target.value)}
      />
      <br />
      <label>Zoom Link:</label>
      <input
        type="text"
        value={zoomLink}
        onChange={(e) => setZoomLink(e.target.value)}
      />
      <br />
      <button onClick={handleAddInterview}>Add Interview</button>
    </div>
  );
};

export default ApplicationDetailsPage;
