import React, { useState, useEffect } from "react";

function InterviewDetails({ applicationId, applicantEmail, applicantName }) {
  const [interview, setInterview] = useState(null); // Store interview details
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/applications/${applicationId}/interviews`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.length > 0) {
          // Assuming only one interview per applicant for now
          setInterview(data[0]);
          setInterviewDate(data[0].InterviewDate || "");
          setInterviewTime(data[0].InterviewTime || "");
          setInterviewLocation(data[0].InterviewLocation || "");
          setZoomLink(data[0].ZoomLink || "");
          setInterviewNotes(data[0].InterviewNotes || "");
        } else {
          // No interview scheduled yet
          setInterview(null);
        }
      } catch (e) {
        console.error("Error fetching interview details:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewDetails();
  }, [applicationId]);

  const handleSaveInterviewDetails = async () => {
    try {
      const interviewData = {
        interviewDate,
        interviewTime,
        interviewLocation,
        zoomLink,
        interviewNotes,
      };

      let apiEndpoint = `/api/applications/${applicationId}/interviews`;
      let method = "POST";

      if (interview) {
        // Update existing interview
        apiEndpoint = `/api/interviews/${interview.InterviewID}`;
        method = "PUT";
      }

      const response = await fetch(apiEndpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      // If creating a new interview, update the state with the new InterviewID
      if (!interview && method === "POST") {
        setInterview({
          InterviewID: responseData.interviewId,
          ...interviewData,
        });
      } else if (interview && method === "PUT") {
        // If updating, refresh the interview data from the server
        const fetchInterviewDetails = async () => {
          try {
            const response = await fetch(
              `/api/applications/${applicationId}/interviews`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.length > 0) {
              // Assuming only one interview per applicant for now
              setInterview(data[0]);
              setInterviewDate(data[0].InterviewDate || "");
              setInterviewTime(data[0].InterviewTime || "");
              setInterviewLocation(data[0].InterviewLocation || "");
              setZoomLink(data[0].ZoomLink || "");
              setInterviewNotes(data[0].InterviewNotes || "");
            } else {
              // No interview scheduled yet
              setInterview(null);
            }
          } catch (e) {
            console.error("Error fetching interview details:", e);
            setError(e.message);
          }
        };
        fetchInterviewDetails();
      }

      alert("Interview details saved successfully!");
    } catch (e) {
      console.error("Error saving interview details:", e);
      setError(e.message);
      alert("Failed to save interview details.");
    }
  };

  const handleSendInterviewDetailsEmail = async () => {
    try {
      if (!interview) {
        alert("Please save the interview details first.");
        return;
      }

      const response = await fetch("/api/email/send-interview-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: applicantEmail,
          subject: "Interview Invitation",
          applicantName: applicantName,
          interviewDate: interviewDate,
          interviewTime: interviewTime,
          interviewLocation: interviewLocation,
          zoomLink: zoomLink,
          interviewNotes: interviewNotes,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Interview details email sent successfully!");
    } catch (e) {
      console.error("Error sending interview details email:", e);
      setError(e.message);
      alert("Failed to send interview details email.");
    }
  };

  if (loading) {
    return <div>Loading interview details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Interview Details</h2>
      <label>Date:</label>
      <input
        type="date"
        value={interviewDate}
        onChange={(e) => setInterviewDate(e.target.value)}
      />
      <br />
      <label>Time:</label>
      <input
        type="time"
        value={interviewTime}
        onChange={(e) => setInterviewTime(e.target.value)}
      />
      <br />
      <label>Location:</label>
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
      <label>Notes:</label>
      <textarea
        value={interviewNotes}
        onChange={(e) => setInterviewNotes(e.target.value)}
      />
      <br />

      <button onClick={handleSaveInterviewDetails}>
        Save Interview Details
      </button>
      {interview && (
        <button onClick={handleSendInterviewDetailsEmail}>
          Send Interview Details Email
        </button>
      )}
    </div>
  );
}

export default InterviewDetails;
