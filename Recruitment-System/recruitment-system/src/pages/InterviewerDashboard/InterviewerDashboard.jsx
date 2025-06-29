// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../Auth/AuthContext";
// import "./InterviewerDashboard.css";

// const InterviewerDashboard = () => {
//   const { userId, isAuthenticated } = useAuth();
//   const [interviews, setInterviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showEvaluationForm, setShowEvaluationForm] = useState(null);
//   const [evaluation, setEvaluation] = useState({
//     communication_skills: 0,
//     technical_skills: 0,
//     notes: "",
//   });
//   const [activeTab, setActiveTab] = useState("pending");

//   const fetchInterviews = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await fetch(
//         `http://localhost:5000/api/interviewer/interviews/${userId}`
//       );
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to fetch interviews");
//       }
//       const data = await response.json();
//       setInterviews(data);
//     } catch (err) {
//       console.error("Error fetching interviews:", err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       fetchInterviews();
//     }
//   }, [userId, isAuthenticated]);

//   const handleEvaluationSubmit = async (applicationId) => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/interviewer/evaluations",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             application_id: applicationId,
//             communication_skills: evaluation.communication_skills || null,
//             technical_skills: evaluation.technical_skills || null,
//             notes: evaluation.notes || null,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to submit evaluation");
//       }

//       alert("Evaluation submitted successfully!");
//       setActiveTab("evaluated"); // Switch to Evaluated tab
//       resetEvaluationForm();
//       fetchInterviews(); // Refresh the list after submission
//     } catch (err) {
//       console.error("Error submitting evaluation:", err);
//       alert(err.message);
//     }
//   };

//   const resetEvaluationForm = () => {
//     setShowEvaluationForm(null);
//     setEvaluation({
//       communication_skills: 0,
//       technical_skills: 0,
//       notes: "",
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEvaluation((prev) => ({
//       ...prev,
//       [name]: value ? parseInt(value, 10) : 0,
//     }));
//   };

//   const pendingInterviews = interviews.filter(
//     (interview) => !interview.evaluated
//   );
//   const evaluatedInterviews = interviews.filter(
//     (interview) => interview.evaluated
//   );

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       date: date.toLocaleDateString(),
//       time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     };
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Interviewer Dashboard</h1>
//       </header>

//       <div className="tabs">
//         <div
//           className={`tab ${activeTab === "pending" ? "active" : ""}`}
//           onClick={() => setActiveTab("pending")}
//         >
//           Pending Interviews
//           {pendingInterviews.length > 0 && (
//             <span className="tab-count">{pendingInterviews.length}</span>
//           )}
//         </div>
//         <div
//           className={`tab ${activeTab === "evaluated" ? "active" : ""}`}
//           onClick={() => setActiveTab("evaluated")}
//         >
//           Evaluated Interviews
//           {evaluatedInterviews.length > 0 && (
//             <span className="tab-count">{evaluatedInterviews.length}</span>
//           )}
//         </div>
//       </div>

//       <div className="dashboard-content">
//         {isLoading ? (
//           <div className="loading-container">
//             <div className="spinner"></div>
//             <p>Loading interviews...</p>
//           </div>
//         ) : error ? (
//           <div className="error-container">
//             <p>Error: {error}</p>
//             <button onClick={fetchInterviews}>Retry</button>
//           </div>
//         ) : (
//           <div className="interviews-grid">
//             {(activeTab === "pending" ? pendingInterviews : evaluatedInterviews)
//               .length === 0 ? (
//               <div className="no-interviews">
//                 <p>No {activeTab} interviews found</p>
//               </div>
//             ) : (
//               (activeTab === "pending"
//                 ? pendingInterviews
//                 : evaluatedInterviews
//               ).map((interview) => {
//                 const { date, time } = formatDateTime(interview.interview_date);
//                 return (
//                   <div
//                     key={interview.id}
//                     className={`interview-card ${
//                       interview.evaluated ? "evaluated-card" : ""
//                     }`}
//                   >
//                     <div className="interview-header">
//                       <h2>
//                         {interview.FirstName} {interview.LastName}
//                         {interview.evaluated && (
//                           <span className="evaluated-badge">Evaluated</span>
//                         )}
//                       </h2>
//                       <p>Application ID: {interview.ApplicationID}</p>
//                     </div>
//                     <div className="interview-details">
//                       <p>
//                         <strong>Date:</strong> {date} at {time}
//                       </p>
//                       <p>
//                         <strong>Location:</strong>{" "}
//                         {interview.interview_location}
//                       </p>
//                       <p>
//                         <strong>Position:</strong> {interview.position_name}
//                       </p>
//                     </div>

//                     {!interview.evaluated && (
//                       <button
//                         className="evaluate-btn"
//                         onClick={() =>
//                           setShowEvaluationForm(interview.ApplicationID)
//                         }
//                       >
//                         Evaluate
//                       </button>
//                     )}

//                     {showEvaluationForm === interview.ApplicationID && (
//                       <div className="evaluation-form">
//                         <h3>Evaluate Candidate</h3>
//                         <div className="form-group">
//                           <label>Communication Skills (1-10)</label>
//                           <input
//                             type="number"
//                             name="communication_skills"
//                             min="1"
//                             max="10"
//                             value={evaluation.communication_skills || ""}
//                             onChange={handleFormChange}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Technical Skills (1-10)</label>
//                           <input
//                             type="number"
//                             name="technical_skills"
//                             min="1"
//                             max="10"
//                             value={evaluation.technical_skills || ""}
//                             onChange={handleFormChange}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Notes</label>
//                           <textarea
//                             name="notes"
//                             value={evaluation.notes}
//                             onChange={(e) =>
//                               setEvaluation({
//                                 ...evaluation,
//                                 notes: e.target.value,
//                               })
//                             }
//                             placeholder="Enter your evaluation notes..."
//                           ></textarea>
//                         </div>
//                         <div className="form-actions">
//                           <button
//                             className="submit-btn"
//                             onClick={() =>
//                               handleEvaluationSubmit(interview.ApplicationID)
//                             }
//                           >
//                             Submit Evaluation
//                           </button>
//                           <button
//                             className="cancel-btn"
//                             onClick={() => setShowEvaluationForm(null)}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewerDashboard;

// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../Auth/AuthContext";
// import "./InterviewerDashboard.css";

// const InterviewerDashboard = () => {
//   const { userId, isAuthenticated } = useAuth();
//   const [interviews, setInterviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showEvaluationForm, setShowEvaluationForm] = useState(null);
//   const [evaluation, setEvaluation] = useState({
//     communication_skills: 0,
//     technical_skills: 0,
//     notes: "",
//   });
//   const [activeTab, setActiveTab] = useState("pending");

//   const fetchInterviews = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await fetch(
//         `http://localhost:5000/api/interviewer/interviews/${userId}`
//       );
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to fetch interviews");
//       }
//       const data = await response.json();
//       setInterviews(data);
//     } catch (err) {
//       console.error("Error fetching interviews:", err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       fetchInterviews();
//     }
//   }, [userId, isAuthenticated]);

//   const handleEvaluationSubmit = async (applicationId) => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/interviewer/evaluations",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             application_id: applicationId,
//             communication_skills: evaluation.communication_skills || null,
//             technical_skills: evaluation.technical_skills || null,
//             notes: evaluation.notes || null,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to submit evaluation");
//       }

//       alert("Evaluation submitted successfully!");
//       setActiveTab("evaluated"); // Switch to Evaluated tab
//       resetEvaluationForm();
//       fetchInterviews(); // Refresh the list after submission
//     } catch (err) {
//       console.error("Error submitting evaluation:", err);
//       alert(err.message);
//     }
//   };

//   const resetEvaluationForm = () => {
//     setShowEvaluationForm(null);
//     setEvaluation({
//       communication_skills: 0,
//       technical_skills: 0,
//       notes: "",
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEvaluation((prev) => ({
//       ...prev,
//       [name]: value ? parseInt(value, 10) : 0,
//     }));
//   };

//   const pendingInterviews = interviews.filter(
//     (interview) => !interview.evaluated
//   );
//   const evaluatedInterviews = interviews.filter(
//     (interview) => interview.evaluated
//   );

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       date: date.toLocaleDateString(),
//       time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     };
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Interviewer Dashboard</h1>
//       </header>

//       <div className="tabs">
//         <div
//           className={`tab ${activeTab === "pending" ? "active" : ""}`}
//           onClick={() => setActiveTab("pending")}
//         >
//           Pending Interviews
//           {pendingInterviews.length > 0 && (
//             <span className="tab-count">{pendingInterviews.length}</span>
//           )}
//         </div>
//         <div
//           className={`tab ${activeTab === "evaluated" ? "active" : ""}`}
//           onClick={() => setActiveTab("evaluated")}
//         >
//           Evaluated Interviews
//           {evaluatedInterviews.length > 0 && (
//             <span className="tab-count">{evaluatedInterviews.length}</span>
//           )}
//         </div>
//       </div>

//       <div className="dashboard-content">
//         {isLoading ? (
//           <div className="loading-container">
//             <div className="spinner"></div>
//             <p>Loading interviews...</p>
//           </div>
//         ) : error ? (
//           <div className="error-container">
//             <p>Error: {error}</p>
//             <button onClick={fetchInterviews}>Retry</button>
//           </div>
//         ) : (
//           <div className="interviews-grid">
//             {(activeTab === "pending" ? pendingInterviews : evaluatedInterviews)
//               .length === 0 ? (
//               <div className="no-interviews">
//                 <p>No {activeTab} interviews found</p>
//               </div>
//             ) : (
//               (activeTab === "pending"
//                 ? pendingInterviews
//                 : evaluatedInterviews
//               ).map((interview) => {
//                 const { date, time } = formatDateTime(interview.interview_date);
//                 return (
//                   <div
//                     key={interview.id}
//                     className={`interview-card ${
//                       interview.evaluated ? "evaluated-card" : ""
//                     }`}
//                   >
//                     <div className="interview-header">
//                       <h2>
//                         {interview.FirstName} {interview.LastName}
//                         {interview.evaluated && (
//                           <span className="evaluated-badge">Evaluated</span>
//                         )}
//                       </h2>
//                       <p>Application ID: {interview.ApplicationID}</p>
//                     </div>
//                     <div className="interview-details">
//                       <p>
//                         <strong>Date:</strong> {date} at {time}
//                       </p>
//                       <p>
//                         <strong>Location:</strong>{" "}
//                         {interview.interview_location}
//                       </p>
//                       <p>
//                         <strong>Position:</strong> {interview.position_name}
//                       </p>
//                     </div>

//                     {!interview.evaluated && (
//                       <button
//                         className="evaluate-btn"
//                         onClick={() =>
//                           setShowEvaluationForm(interview.ApplicationID)
//                         }
//                       >
//                         Evaluate
//                       </button>
//                     )}

//                     {showEvaluationForm === interview.ApplicationID && (
//                       <div className="evaluation-form">
//                         <h3>Evaluate Candidate</h3>
//                         <div className="form-group">
//                           <label>Communication Skills (1-10)</label>
//                           <input
//                             type="number"
//                             name="communication_skills"
//                             min="1"
//                             max="10"
//                             value={evaluation.communication_skills || ""}
//                             onChange={handleFormChange}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Technical Skills (1-10)</label>
//                           <input
//                             type="number"
//                             name="technical_skills"
//                             min="1"
//                             max="10"
//                             value={evaluation.technical_skills || ""}
//                             onChange={handleFormChange}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Notes</label>
//                           <textarea
//                             name="notes"
//                             value={evaluation.notes}
//                             onChange={(e) =>
//                               setEvaluation({
//                                 ...evaluation,
//                                 notes: e.target.value,
//                               })
//                             }
//                             placeholder="Enter your evaluation notes..."
//                           ></textarea>
//                         </div>
//                         <div className="form-actions">
//                           <button
//                             className="submit-btn"
//                             onClick={() =>
//                               handleEvaluationSubmit(interview.ApplicationID)
//                             }
//                           >
//                             Submit Evaluation
//                           </button>
//                           <button
//                             className="cancel-btn"
//                             onClick={() => setShowEvaluationForm(null)}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {/* Show evaluation details if already evaluated */}
//                     {interview.evaluated && (
//                       <div className="evaluation-details">
//                         <h3>Evaluation Details</h3>
//                         <p>
//                           <strong>Communication Skills:</strong>{" "}
//                           {interview.communication_skills}
//                         </p>
//                         <p>
//                           <strong>Technical Skills:</strong>{" "}
//                           {interview.technical_skills}
//                         </p>
//                         <p>
//                           <strong>Notes:</strong> {interview.notes}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewerDashboard;

import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import "./InterviewerDashboard.css";

const InterviewerDashboard = () => {
  const { userId, isAuthenticated } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEvaluationForm, setShowEvaluationForm] = useState(null);
  const [evaluation, setEvaluation] = useState({
    communication_skills: 0,
    technical_skills: 0,
    notes: "",
  });

  const fetchInterviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/api/interviewer/interviews/${userId}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch interviews");
      }
      const data = await response.json();
      // Filter to only show pending interviews
      setInterviews(data.filter((interview) => !interview.evaluated));
    } catch (err) {
      console.error("Error fetching interviews:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchInterviews();
    }
  }, [userId, isAuthenticated]);

  const handleEvaluationSubmit = async (applicationId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/interviewer/evaluations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            application_id: applicationId,
            communication_skills: evaluation.communication_skills || null,
            technical_skills: evaluation.technical_skills || null,
            notes: evaluation.notes || null,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit evaluation");
      }

      alert("Evaluation submitted successfully!");
      resetEvaluationForm();
      fetchInterviews(); // Refresh the list after submission
    } catch (err) {
      console.error("Error submitting evaluation:", err);
      alert(err.message);
    }
  };

  const resetEvaluationForm = () => {
    setShowEvaluationForm(null);
    setEvaluation({
      communication_skills: 0,
      technical_skills: 0,
      notes: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEvaluation((prev) => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : 0,
    }));
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Interviewer Dashboard</h1>
        <p>Pending Interviews: {interviews.length}</p>
      </header>

      <div className="dashboard-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading interviews...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error: {error}</p>
            <button onClick={fetchInterviews}>Retry</button>
          </div>
        ) : interviews.length === 0 ? (
          <div className="no-interviews">
            <p>No pending interviews found</p>
          </div>
        ) : (
          <div className="interviews-grid">
            {interviews.map((interview) => {
              const { date, time } = formatDateTime(interview.interview_date);
              return (
                <div key={interview.id} className="interview-card">
                  <div className="interview-header">
                    <h2>
                      {interview.FirstName} {interview.LastName}
                    </h2>
                    <p>Application ID: {interview.ApplicationID}</p>
                  </div>
                  <div className="interview-details">
                    <p>
                      <strong>Date:</strong> {date} at {time}
                    </p>
                    <p>
                      <strong>Location:</strong> {interview.interview_location}
                    </p>
                    <p>
                      <strong>Position:</strong> {interview.position_name}
                    </p>
                  </div>

                  <button
                    className="evaluate-btn"
                    onClick={() =>
                      setShowEvaluationForm(interview.ApplicationID)
                    }
                  >
                    Evaluate
                  </button>

                  {showEvaluationForm === interview.ApplicationID && (
                    <div className="evaluation-form">
                      <h3>Evaluate Candidate</h3>
                      <div className="form-group">
                        <label>Communication Skills (1-10)</label>
                        <input
                          type="number"
                          name="communication_skills"
                          min="1"
                          max="10"
                          value={evaluation.communication_skills || ""}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Technical Skills (1-10)</label>
                        <input
                          type="number"
                          name="technical_skills"
                          min="1"
                          max="10"
                          value={evaluation.technical_skills || ""}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Notes</label>
                        <textarea
                          name="notes"
                          value={evaluation.notes}
                          onChange={(e) =>
                            setEvaluation({
                              ...evaluation,
                              notes: e.target.value,
                            })
                          }
                          placeholder="Enter your evaluation notes..."
                        ></textarea>
                      </div>
                      <div className="form-actions">
                        <button
                          className="submit-btn"
                          onClick={() =>
                            handleEvaluationSubmit(interview.ApplicationID)
                          }
                        >
                          Submit Evaluation
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setShowEvaluationForm(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewerDashboard;
