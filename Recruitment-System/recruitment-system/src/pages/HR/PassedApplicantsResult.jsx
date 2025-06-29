// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./InterviewResults.css";
// import "./HrJobPostings.css";

// const PassedApplicantsResult = () => {
//   const [passedApplicants, setPassedApplicants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   const dashboardLinks = [
//     { to: "/interview-scheduling", text: "Interview Scheduling", icon: "👤" },
//     { to: "/job-postings", text: "Job Postings", icon: "📋" },
//     { to: "/application-management", text: "Applications", icon: "📄" },
//     { to: "/interview-scheduling", text: "Interview Scheduling", icon: "👤" },
//     { to: "/department-head-management", text: "Interviewers", icon: "👔" },
//     { to: "/result", text: "Results", icon: "📊" },
//   ];

//   const fetchPassedApplicants = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch("http://localhost:5000/api/passed");

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(
//           errorData.message || `HTTP error! status: ${response.status}`
//         );
//       }

//       const data = await response.json();
//       console.log("API Response:", data); // Debug log

//       // Transform data to ensure consistent structure
//       const transformedData = data.map((item) => ({
//         id: item.id || item._id || Math.random().toString(36).substr(2, 9),
//         FirstName: item.firstName || item.FirstName || "Unknown",
//         LastName: item.lastName || item.LastName || "Applicant",
//         Email: item.email || item.Email || "no-email@example.com",
//         communication_skills:
//           item.communication || item.communication_skills || 0,
//         technical_skills: item.technical || item.technical_skills || 0,
//         total_score: item.total || item.total_score || 0,
//         evaluated_at:
//           item.date || item.evaluated_at || new Date().toISOString(),
//       }));

//       setPassedApplicants(transformedData);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateReport = async () => {
//     try {
//       setReportLoading(true);
//       setError(null);
//       const response = await fetch("http://localhost:5000/api/passed");

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(
//           errorData.message || `HTTP error! status: ${response.status}`
//         );
//       }

//       const data = await response.json();

//       const csvContent = [
//         "First Name,Last Name,Email,Communication,Technical,Total Score,Date",
//         ...data.map(
//           (a) =>
//             `${a.firstName || a.FirstName},${a.lastName || a.LastName},${
//               a.email || a.Email
//             },${a.communication || a.communication_skills},${
//               a.technical || a.technical_skills
//             },${a.total || a.total_score},${new Date(
//               a.date || a.evaluated_at
//             ).toLocaleDateString()}`
//         ),
//       ].join("\n");

//       const blob = new Blob([csvContent], { type: "text/csv" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `passed-applicants-${
//         new Date().toISOString().split("T")[0]
//       }.csv`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setSuccessMessage("Report downloaded successfully");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (err) {
//       console.error("Report generation error:", err);
//       setError("Report generation failed: " + err.message);
//     } finally {
//       setReportLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPassedApplicants();
//   }, []);

//   if (loading) return <div className="loading">Loading applicants...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="hr-dashboard">
//       <div className="sidebar">
//         <h2>HR Dashboard</h2>
//         <nav>
//           {dashboardLinks.map((link, i) => (
//             <Link
//               key={i}
//               to={link.to}
//               className={window.location.pathname === link.to ? "active" : ""}
//             >
//               <span>{link.icon}</span>
//               <span>{link.text}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       <div className="main-content">
//         <header>
//           <h1>Passed Applicants</h1>
//           <div className="actions">
//             <button onClick={generateReport} disabled={reportLoading}>
//               {reportLoading ? "Generating..." : "Download Report"}
//             </button>
//           </div>
//         </header>

//         {successMessage && <div className="success">{successMessage}</div>}
//         {error && <div className="error">{error}</div>}

//         <div className="applicants-list">
//           {passedApplicants.length > 0 ? (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Communication</th>
//                   <th>Technical</th>
//                   <th>Total</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {passedApplicants.map((applicant) => (
//                   <tr key={applicant.id}>
//                     <td>
//                       {applicant.FirstName} {applicant.LastName}
//                     </td>
//                     <td>{applicant.Email}</td>
//                     <td>{applicant.communication_skills}/5</td>
//                     <td>{applicant.technical_skills}/5</td>
//                     <td>{applicant.total_score}/10</td>
//                     <td>
//                       {new Date(applicant.evaluated_at).toLocaleDateString()}
//                     </td>
//                     <td>
//                       <span className="badge passed">Passed</span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="empty">
//               No passed applicants found
//               <div className="debug-info" style={{ display: "none" }}>
//                 Debug: {JSON.stringify(passedApplicants)}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PassedApplicantsResult;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InterviewResults.css";
import "./HrJobPostings.css";

const PassedApplicantsResult = () => {
  const [passedApplicants, setPassedApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const dashboardLinks = [
    { to: "/interview-scheduling", text: "Interview Scheduling", icon: "👤" },
    { to: "/job-postings", text: "Job Postings", icon: "📋" },
    { to: "/application-management", text: "Applications", icon: "📄" },
    { to: "/interview-scheduling", text: "Interview Scheduling", icon: "👤" },
    { to: "/department-head-management", text: "Interviewers", icon: "👔" },
    { to: "/result", text: "Results", icon: "📊" },
  ];

  // Fetch Passed Applicants from Backend API
  const fetchPassedApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/passed");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log

      // Transform data to ensure consistent structure
      const transformedData = data.map((item) => ({
        id: item.id || item._id || Math.random().toString(36).substr(2, 9),
        FirstName: item.FirstName || item.firstName || "Unknown",
        LastName: item.LastName || item.lastName || "Applicant",
        Email: item.Email || item.email || "no-email@example.com",
        communication_skills:
          item.communication_skills || item.communication || 0,
        technical_skills: item.technical_skills || item.technical || 0,
        total_score: item.total_score || item.total || 0,
        evaluated_at:
          item.evaluated_at || item.date || new Date().toISOString(),
      }));

      setPassedApplicants(transformedData);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate CSV Report of Passed Applicants
  const generateReport = async () => {
    try {
      setReportLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/passed");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      const csvContent = [
        "First Name,Last Name,Email,Communication,Technical,Total Score,Date",
        ...data.map(
          (a) =>
            `${a.FirstName || a.firstName},${a.LastName || a.lastName},${
              a.Email || a.email
            },${a.communication_skills || a.communication},${
              a.technical_skills || a.technical
            },${a.total_score || a.total},${new Date(
              a.evaluated_at || a.date
            ).toLocaleDateString()}`
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `passed-applicants-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccessMessage("Report downloaded successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Report generation error:", err);
      setError("Report generation failed: " + err.message);
    } finally {
      setReportLoading(false);
    }
  };

  // Send Email to Passed Applicants
  const sendEmailToApplicants = async () => {
    try {
      setEmailLoading(true);
      setErrorMessage(null);

      // Send email request to the correct endpoint
      const response = await fetch("http://localhost:5000/api/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You can send any additional data if required, for example, a flag for email sending
        body: JSON.stringify({ applicants: passedApplicants }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      setSuccessMessage("Emails sent successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Send email error:", err);
      setErrorMessage("Failed to send emails: " + err.message);
    } finally {
      setEmailLoading(false);
    }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchPassedApplicants();
  }, []);

  if (loading) return <div className="loading">Loading applicants...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="hr-dashboard">
      <div className="sidebar">
        <h2>HR Dashboard</h2>
        <nav>
          {dashboardLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className={window.location.pathname === link.to ? "active" : ""}
            >
              <span>{link.icon}</span>
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <header>
          <h1>Passed Applicants</h1>
          <div className="actions">
            <button onClick={generateReport} disabled={reportLoading}>
              {reportLoading ? "Generating..." : "Download Report"}
            </button>
            <button onClick={sendEmailToApplicants} disabled={emailLoading}>
              {emailLoading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </header>

        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}

        <div className="applicants-list">
          {passedApplicants.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Communication</th>
                  <th>Technical</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {passedApplicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>
                      {applicant.FirstName} {applicant.LastName}
                    </td>
                    <td>{applicant.Email}</td>
                    <td>{applicant.communication_skills}/5</td>
                    <td>{applicant.technical_skills}/5</td>
                    <td>{applicant.total_score}/10</td>
                    <td>
                      {new Date(applicant.evaluated_at).toLocaleDateString()}
                    </td>
                    <td>
                      <span className="badge passed">Passed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty">No passed applicants found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassedApplicantsResult;
