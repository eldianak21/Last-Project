// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./HrApplicationManagement.css";

// const ApplicationManagement = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedJobTitle, setSelectedJobTitle] = useState("All");
//   const [emailMessage, setEmailMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedApplications, setSelectedApplications] = useState({});
//   const [emailSending, setEmailSending] = useState(false);
//   const [emailStatus, setEmailStatus] = useState("");

//   const [interviewDate, setInterviewDate] = useState("");
//   const [interviewTime, setInterviewTime] = useState("");
//   const [interviewLocation, setInterviewLocation] = useState("");
//   const [zoomLink, setZoomLink] = useState("");

//   const navigate = useNavigate();

//   const dashboardLinks = [
//     { to: "/job-postings", text: "Job Postings Overview", icon: "📋" },
//     {
//       to: "/application-management",
//       text: "Application Management",
//       icon: "📄",
//     },
//     { to: "/candidate-profiles", text: "Candidate Profiles", icon: "👤" },
//     {
//       to: "/department-head-management",
//       text: "Interviewer Management",
//       icon: "👔",
//     },
//     { to: "/result", text: "Results Dashboard", icon: "📊" },
//   ];

//   const fetchApplications = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/application-data"
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setApplications(data);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const getDefaultMessage = (jobTitle) => {
//     return `Dear [Applicant Name],\n\nThank you for your interest in the ${jobTitle} position.\n\nWe are currently reviewing applications.\n\nBest regards,\nHR Team`;
//   };

//   const filteredApplications = applications.filter((app) => {
//     const matchesJobTitle =
//       selectedJobTitle === "All" || app.JobTitle === selectedJobTitle;
//     const matchesSearchTerm =
//       searchTerm === "" ||
//       app.JobTitle.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesJobTitle && matchesSearchTerm;
//   });

//   const handleJobTitleChange = (jobTitle) => {
//     setSelectedJobTitle(jobTitle);
//     setEmailMessage(getDefaultMessage(jobTitle));
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const sendEmail = async (email, subject, message) => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/email/send-email",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             to: email,
//             subject: subject,
//             text: message,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `Failed to send email to ${email}: ${response.status} - ${errorText}`
//         );
//       }

//       const data = await response.json();
//       console.log(`Email sent successfully to ${email}:`, data);
//       return true;
//     } catch (error) {
//       console.error(`Error sending email to ${email}:`, error);
//       setEmailStatus(`Error sending to ${email}: ${error.message}`); // Set specific error message
//       return false;
//     }
//   };

//   const handleSendEmail = async () => {
//     setEmailSending(true); // Disable the button while sending
//     setEmailStatus(""); // Clear any previous status messages
//     const subject = "Application Update";
//     let allSuccessful = true;

//     // Iterate over selected applications only
//     for (const appId in selectedApplications) {
//       if (selectedApplications[appId]) {
//         const app = applications.find(
//           (a) => a.ApplicationID === parseInt(appId)
//         ); // Find the application object

//         if (app) {
//           const personalizedMessage = emailMessage.replace(
//             "[Applicant Name]",
//             `${app.FirstName} ${app.LastName}`
//           );

//           const success = await sendEmail(
//             app.Email,
//             subject,
//             personalizedMessage
//           );
//           if (!success) {
//             allSuccessful = false;
//           }
//         }
//       }
//     }

//     setEmailSending(false); // Re-enable the button

//     if (allSuccessful) {
//       setEmailStatus("Emails sent successfully to selected applicants!"); // Set success message
//     } else {
//       setEmailStatus(
//         "Some emails failed to send. Check the console for more information."
//       ); // Set generic error message
//     }
//   };

//   const handleCheckboxChange = (appId) => {
//     setSelectedApplications((prevSelected) => ({
//       ...prevSelected,
//       [appId]: !prevSelected[appId],
//     }));
//   };

//   const uniqueJobTitles = [
//     "All",
//     ...new Set(applications.map((app) => app.JobTitle)),
//   ];

//   const handleViewApplication = (applicationId) => {
//     navigate(`/application-details/${applicationId}`);
//   };

//   const handleScheduleInterview = async () => {
//     // Gather data for all selected applications
//     const selectedAppIds = Object.keys(selectedApplications).filter(
//       (key) => selectedApplications[key] === true
//     );

//     if (selectedAppIds.length === 0) {
//       alert(
//         "Please select at least one application to schedule interviews for."
//       );
//       return;
//     }

//     // Iterate over selected applications and schedule interviews
//     for (const appId of selectedAppIds) {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/interview-schedule",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               ApplicationID: appId,
//               InterviewDate: interviewDate,
//               InterviewTime: interviewTime,
//               InterviewLocation: interviewLocation,
//               ZoomLink: zoomLink,
//             }),
//           }
//         );

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error(
//             `Failed to schedule interview for ApplicationID ${appId}: ${response.status} - ${errorText}`
//           );
//           alert(
//             `Failed to schedule interview for ApplicationID ${appId}. Check the console for details.`
//           );
//           continue; // Move to the next application if this one fails
//         }

//         const data = await response.json();
//         console.log(
//           `Interview scheduled successfully for ApplicationID ${appId}:`,
//           data
//         );
//       } catch (error) {
//         console.error(
//           `Error scheduling interview for ApplicationID ${appId}:`,
//           error
//         );
//         alert(
//           `Error scheduling interview for ApplicationID ${appId}. Check the console for details.`
//         );
//       }
//     }

//     alert("Interviews scheduled successfully for all selected applicants!");

//     // Clear the selected applications and input fields after successful scheduling
//     setSelectedApplications({});
//     setInterviewDate("");
//     setInterviewTime("");
//     setInterviewLocation("");
//     setZoomLink("");
//   };
//   return (
//     <div className="hr-application-container">
//       <div className="hr-application-sidebar">
//         <div className="hr-application-sidebar-header">
//           <h2>HR Manager</h2>
//         </div>
//         <nav className="hr-application-nav">
//           {dashboardLinks.map((link, index) => (
//             <Link
//               to={link.to}
//               className={`hr-application-nav-link ${
//                 window.location.pathname === link.to ? "active" : ""
//               }`}
//               key={index}
//             >
//               <div className="hr-application-nav-icon">{link.icon}</div>
//               <span>{link.text}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       <div className="hr-application-main">
//         <header className="hr-application-header">
//           <h1>Application Management</h1>
//           <div className="hr-application-header-actions">
//             <button className="hr-application-notification-btn">
//               <i className="fas fa-bell"></i>
//               <span className="hr-application-badge">3</span>
//             </button>
//             <button className="hr-application-logout-btn">
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </div>
//         </header>

//         <div className="hr-application-content">
//           <div className="hr-application-controls">
//             <select
//               value={selectedJobTitle}
//               onChange={(e) => handleJobTitleChange(e.target.value)}
//               className="hr-application-filter"
//             >
//               {uniqueJobTitles.map((title) => (
//                 <option key={title} value={title}>
//                   {title || "N/A"}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="text"
//               placeholder="Search Job Title"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="hr-application-search"
//             />
//           </div>

//           <div className="hr-application-table-container">
//             <table className="hr-application-table">
//               <thead>
//                 <tr>
//                   <th>Select</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Resume</th>
//                   <th>Experience</th>
//                   <th>Qualification</th>
//                   <th>Documents</th>
//                   <th>Job Title</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredApplications.map((app) => (
//                   <tr key={app.ApplicationID}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={!!selectedApplications[app.ApplicationID]}
//                         onChange={() => handleCheckboxChange(app.ApplicationID)}
//                       />
//                     </td>
//                     <td>{app.FirstName}</td>
//                     <td>{app.LastName}</td>
//                     <td>{app.Email}</td>
//                     <td>{app.Phone1}</td>
//                     <td>{app.Resume || "N/A"}</td>
//                     <td>{app.ExperienceYears || "N/A"}</td>
//                     <td>{app.HighestQualification || "N/A"}</td>
//                     <td>{app.ScannedDocuments || "N/A"}</td>
//                     <td>{app.JobTitle || "N/A"}</td>
//                     <td>
//                       <button
//                         onClick={() => handleViewApplication(app.ApplicationID)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="hr-application-interview-section">
//             <h3>Schedule Interview</h3>
//             <label>Interview Date:</label>
//             <input
//               type="date"
//               value={interviewDate}
//               onChange={(e) => setInterviewDate(e.target.value)}
//             />
//             <label>Interview Time:</label>
//             <input
//               type="time"
//               value={interviewTime}
//               onChange={(e) => setInterviewTime(e.target.value)}
//             />
//             <label>Interview Location:</label>
//             <input
//               type="text"
//               value={interviewLocation}
//               onChange={(e) => setInterviewLocation(e.target.value)}
//             />
//             <label>Zoom Link:</label>
//             <input
//               type="text"
//               value={zoomLink}
//               onChange={(e) => setZoomLink(e.target.value)}
//             />
//             <button
//               onClick={handleScheduleInterview}
//               className="hr-application-schedule-btn"
//             >
//               Schedule Interview for Selected
//             </button>
//           </div>

//           <div className="hr-application-email-section">
//             <h3>Send Email</h3>
//             <textarea
//               value={emailMessage}
//               onChange={(e) => setEmailMessage(e.target.value)}
//               placeholder="Enter your message here..."
//               className="hr-application-textarea"
//             />
//             <button
//               onClick={handleSendEmail}
//               className="hr-application-send-btn"
//               disabled={emailSending}
//             >
//               {emailSending
//                 ? "Sending..."
//                 : "Send Email to Selected Applicants"}
//             </button>
//             {emailStatus && <div className="email-status">{emailStatus}</div>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationManagement;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./HrApplicationManagement.css";

// const ApplicationManagement = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedJobTitle, setSelectedJobTitle] = useState("All");
//   const [emailMessage, setEmailMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedApplications, setSelectedApplications] = useState({});
//   const [emailSending, setEmailSending] = useState(false);
//   const [emailStatus, setEmailStatus] = useState("");

//   const [interviewDate, setInterviewDate] = useState("");
//   const [interviewTime, setInterviewTime] = useState("");
//   const [interviewLocation, setInterviewLocation] = useState("");
//   const [zoomLink, setZoomLink] = useState("");

//   const navigate = useNavigate();

//   const dashboardLinks = [
//     { to: "/job-postings", text: "Job Postings Overview", icon: "📋" },
//     {
//       to: "/application-management",
//       text: "Application Management",
//       icon: "📄",
//     },
//     // { to: "/candidate-profiles", text: "Candidate Profiles", icon: "👤" },
//     {
//       to: "/department-head-management",
//       text: "Interviewer Management",
//       icon: "👔",
//     },
//     { to: "/result", text: "Results Dashboard", icon: "📊" },
//   ];

//   const fetchApplications = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/application-data"
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setApplications(data);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const getDefaultMessage = (jobTitle) => {
//     return `Dear [Applicant Name],\n\nThank you for your interest in the ${jobTitle} position.\n\nWe are currently reviewing applications.\n\nBest regards,\nHR Team`;
//   };

//   const filteredApplications = applications.filter((app) => {
//     const matchesJobTitle =
//       selectedJobTitle === "All" || app.JobTitle === selectedJobTitle;
//     const matchesSearchTerm =
//       searchTerm === "" ||
//       app.JobTitle.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesJobTitle && matchesSearchTerm;
//   });

//   const handleJobTitleChange = (jobTitle) => {
//     setSelectedJobTitle(jobTitle);
//     setEmailMessage(getDefaultMessage(jobTitle));
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const sendEmail = async (email, subject, message) => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/email/send-email",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             to: email,
//             subject: subject,
//             text: message,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `Failed to send email to ${email}: ${response.status} - ${errorText}`
//         );
//       }

//       const data = await response.json();
//       console.log(`Email sent successfully to ${email}:`, data);
//       return true;
//     } catch (error) {
//       console.error(`Error sending email to ${email}:`, error);
//       setEmailStatus(`Error sending to ${email}: ${error.message}`); // Set specific error message
//       return false;
//     }
//   };

//   const handleSendEmail = async () => {
//     setEmailSending(true); // Disable the button while sending
//     setEmailStatus(""); // Clear any previous status messages
//     const subject = "Application Update";
//     let allSuccessful = true;

//     // Iterate over selected applications only
//     for (const appId in selectedApplications) {
//       if (selectedApplications[appId]) {
//         const app = applications.find(
//           (a) => a.ApplicationID === parseInt(appId)
//         ); // Find the application object

//         if (app) {
//           const personalizedMessage = emailMessage.replace(
//             "[Applicant Name]",
//             `${app.FirstName} ${app.LastName}`
//           );

//           const success = await sendEmail(
//             app.Email,
//             subject,
//             personalizedMessage
//           );
//           if (!success) {
//             allSuccessful = false;
//           }
//         }
//       }
//     }

//     setEmailSending(false); // Re-enable the button

//     if (allSuccessful) {
//       setEmailStatus("Emails sent successfully to selected applicants!"); // Set success message
//     } else {
//       setEmailStatus(
//         "Some emails failed to send. Check the console for more information."
//       ); // Set generic error message
//     }
//   };

//   const handleCheckboxChange = (appId) => {
//     setSelectedApplications((prevSelected) => ({
//       ...prevSelected,
//       [appId]: !prevSelected[appId],
//     }));
//   };

//   const uniqueJobTitles = [
//     "All",
//     ...new Set(applications.map((app) => app.JobTitle)),
//   ];

//   const handleViewApplication = (applicationId) => {
//     navigate(`/result/evaluations/${applicationId}`);
//   };

//   const handleScheduleInterview = async () => {
//     // Gather data for all selected applications
//     const selectedAppIds = Object.keys(selectedApplications).filter(
//       (key) => selectedApplications[key] === true
//     );

//     if (selectedAppIds.length === 0) {
//       alert(
//         "Please select at least one application to schedule interviews for."
//       );
//       return;
//     }

//     // Iterate over selected applications and schedule interviews
//     for (const appId of selectedAppIds) {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/interview-schedule",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               ApplicationID: appId,
//               InterviewDate: interviewDate,
//               InterviewTime: interviewTime,
//               InterviewLocation: interviewLocation,
//               ZoomLink: zoomLink,
//             }),
//           }
//         );

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error(
//             `Failed to schedule interview for ApplicationID ${appId}: ${response.status} - ${errorText}`
//           );
//           alert(
//             `Failed to schedule interview for ApplicationID ${appId}. Check the console for details.`
//           );
//           continue; // Move to the next application if this one fails
//         }

//         const data = await response.json();
//         console.log(
//           `Interview scheduled successfully for ApplicationID ${appId}:`,
//           data
//         );
//       } catch (error) {
//         console.error(
//           `Error scheduling interview for ApplicationID ${appId}:`,
//           error
//         );
//         alert(
//           `Error scheduling interview for ApplicationID ${appId}. Check the console for details.`
//         );
//       }
//     }

//     alert("Interviews scheduled successfully for all selected applicants!");

//     // Clear the selected applications and input fields after successful scheduling
//     setSelectedApplications({});
//     setInterviewDate("");
//     setInterviewTime("");
//     setInterviewLocation("");
//     setZoomLink("");
//   };

//   return (
//     <div className="hr-application-container">
//       <div className="hr-application-sidebar">
//         <div className="hr-application-sidebar-header">
//           <h2>HR Manager</h2>
//         </div>
//         <nav className="hr-application-nav">
//           {dashboardLinks.map((link, index) => (
//             <Link
//               to={link.to}
//               className={`hr-application-nav-link ${
//                 window.location.pathname === link.to ? "active" : ""
//               }`}
//               key={index}
//             >
//               <div className="hr-application-nav-icon">{link.icon}</div>
//               <span>{link.text}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       <div className="hr-application-main">
//         <header className="hr-application-header">
//           <h1>Application Management</h1>
//           <div className="hr-application-header-actions">
//             <button className="hr-application-notification-btn">
//               <i className="fas fa-bell"></i>
//               <span className="hr-application-badge">3</span>
//             </button>
//             <button className="hr-application-logout-btn">
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </div>
//         </header>

//         <div className="hr-application-content">
//           <div className="hr-application-controls">
//             <select
//               value={selectedJobTitle}
//               onChange={(e) => handleJobTitleChange(e.target.value)}
//               className="hr-application-filter"
//             >
//               {uniqueJobTitles.map((title) => (
//                 <option key={title} value={title}>
//                   {title || "N/A"}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="text"
//               placeholder="Search Job Title"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="hr-application-search"
//             />
//           </div>

//           <div className="hr-application-table-container">
//             <table className="hr-application-table">
//               <thead>
//                 <tr>
//                   <th>Select</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Resume</th>
//                   <th>Experience</th>
//                   <th>Qualification</th>
//                   <th>Documents</th>
//                   <th>Job Title</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredApplications.map((app) => (
//                   <tr key={app.ApplicationID}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={!!selectedApplications[app.ApplicationID]}
//                         onChange={() => handleCheckboxChange(app.ApplicationID)}
//                       />
//                     </td>
//                     <td>{app.FirstName}</td>
//                     <td>{app.LastName}</td>
//                     <td>{app.Email}</td>
//                     <td>{app.Phone1}</td>
//                     <td>
//                       {app.Resume ? (
//                         <a
//                           href={`http://localhost:5000/uploads/${app.Resume}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           View Resume
//                         </a>
//                       ) : (
//                         "N/A"
//                       )}
//                     </td>
//                     <td>{app.ExperienceYears || "N/A"}</td>
//                     <td>{app.HighestQualification || "N/A"}</td>
//                     <td>
//                       {app.ScannedDocuments ? (
//                         <a
//                           href={`http://localhost:5000/uploads/${app.ScannedDocuments}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           View Document
//                         </a>
//                       ) : (
//                         "N/A"
//                       )}
//                     </td>
//                     <td>{app.JobTitle || "N/A"}</td>
//                     <td>
//                       <button
//                         onClick={() => handleViewApplication(app.ApplicationID)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="hr-application-interview-section">
//             <h3>Schedule Interview</h3>
//             <label>Interview Date:</label>
//             <input
//               type="date"
//               value={interviewDate}
//               onChange={(e) => setInterviewDate(e.target.value)}
//             />
//             <label>Interview Time:</label>
//             <input
//               type="time"
//               value={interviewTime}
//               onChange={(e) => setInterviewTime(e.target.value)}
//             />
//             <label>Interview Location:</label>
//             <input
//               type="text"
//               value={interviewLocation}
//               onChange={(e) => setInterviewLocation(e.target.value)}
//             />
//             <label>Zoom Link:</label>
//             <input
//               type="text"
//               value={zoomLink}
//               onChange={(e) => setZoomLink(e.target.value)}
//             />
//             <button
//               onClick={handleScheduleInterview}
//               className="hr-application-schedule-btn"
//             >
//               Schedule Interview for Selected
//             </button>
//           </div>

//           <div className="hr-application-email-section">
//             <h3>Send Email</h3>
//             <textarea
//               value={emailMessage}
//               onChange={(e) => setEmailMessage(e.target.value)}
//               placeholder="Enter your message here..."
//               className="hr-application-textarea"
//             />
//             <button
//               onClick={handleSendEmail}
//               className="hr-application-send-btn"
//               disabled={emailSending}
//             >
//               {emailSending
//                 ? "Sending..."
//                 : "Send Email to Selected Applicants"}
//             </button>
//             {emailStatus && <div className="email-status">{emailStatus}</div>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationManagement;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HrApplicationManagement.css";

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("All");
  const [emailMessage, setEmailMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplications, setSelectedApplications] = useState({});
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");

  const navigate = useNavigate();

  const dashboardLinks = [
    { to: "/job-postings", text: "Job Postings Overview", icon: "📋" },
    {
      to: "/application-management",
      text: "Application Management",
      icon: "📄",
    },
    {
      to: "/department-head-management",
      text: "Interviewer Management",
      icon: "👔",
    },
    { to: "/interview-scheduling", text: "Interview Scheduling", icon: "👤" },
    { to: "/result", text: "Results Dashboard", icon: "📊" },
  ];

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/application-data"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getDefaultMessage = (jobTitle) => {
    return `Dear [Applicant Name],\n\nThank you for your interest in the ${jobTitle} position.\n\nWe are currently reviewing applications.\n\nBest regards,\nHR Team`;
  };

  const filteredApplications = applications.filter((app) => {
    const matchesJobTitle =
      selectedJobTitle === "All" || app.JobTitle === selectedJobTitle;
    const matchesSearchTerm =
      searchTerm === "" ||
      app.JobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJobTitle && matchesSearchTerm;
  });

  const handleJobTitleChange = (jobTitle) => {
    setSelectedJobTitle(jobTitle);
    setEmailMessage(getDefaultMessage(jobTitle));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sendEmail = async (email, subject, message) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/email/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: email,
            subject: subject,
            text: message,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to send email to ${email}: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log(`Email sent successfully to ${email}:`, data);
      return true;
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
      setEmailStatus(`Error sending to ${email}: ${error.message}`);
      return false;
    }
  };

  const handleSendEmail = async () => {
    setEmailSending(true);
    setEmailStatus("");
    const subject = "Application Update";
    let allSuccessful = true;

    for (const appId in selectedApplications) {
      if (selectedApplications[appId]) {
        const app = applications.find(
          (a) => a.ApplicationID === parseInt(appId)
        );

        if (app) {
          const personalizedMessage = emailMessage.replace(
            "[Applicant Name]",
            `${app.FirstName} ${app.LastName}`
          );

          const success = await sendEmail(
            app.Email,
            subject,
            personalizedMessage
          );
          if (!success) {
            allSuccessful = false;
          }
        }
      }
    }

    setEmailSending(false);

    if (allSuccessful) {
      setEmailStatus("Emails sent successfully to selected applicants!");
    } else {
      setEmailStatus(
        "Some emails failed to send. Check the console for more information."
      );
    }
  };

  const handleCheckboxChange = (appId) => {
    setSelectedApplications((prevSelected) => ({
      ...prevSelected,
      [appId]: !prevSelected[appId],
    }));
  };

  const uniqueJobTitles = [
    "All",
    ...new Set(applications.map((app) => app.JobTitle)),
  ];

  const handleViewApplication = (applicationId) => {
    navigate(`/result/evaluations/${applicationId}`);
  };

  return (
    <div className="hr-application-container">
      <div className="hr-application-sidebar">
        <div className="hr-application-sidebar-header">
          <h2>HR Manager</h2>
        </div>
        <nav className="hr-application-nav">
          {dashboardLinks.map((link, index) => (
            <Link
              to={link.to}
              className={`hr-application-nav-link ${
                window.location.pathname === link.to ? "active" : ""
              }`}
              key={index}
            >
              <div className="hr-application-nav-icon">{link.icon}</div>
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="hr-application-main">
        <header className="hr-application-header">
          <h1>Application Management</h1>
          <div className="hr-application-header-actions">
            <button className="hr-application-notification-btn">
              <i className="fas fa-bell"></i>
              <span className="hr-application-badge">3</span>
            </button>
            <button className="hr-application-logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>

        <div className="hr-application-content">
          <div className="hr-application-controls">
            <select
              value={selectedJobTitle}
              onChange={(e) => handleJobTitleChange(e.target.value)}
              className="hr-application-filter"
            >
              {uniqueJobTitles.map((title) => (
                <option key={title} value={title}>
                  {title || "N/A"}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search Job Title"
              value={searchTerm}
              onChange={handleSearchChange}
              className="hr-application-search"
            />
          </div>

          <div className="hr-application-table-container">
            <table className="hr-application-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Resume</th>
                  <th>Experience</th>
                  <th>Qualification</th>
                  <th>Documents</th>
                  <th>Job Title</th>
                  <th>Score</th> {/* New column for Score */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.ApplicationID}>
                    <td>
                      <input
                        type="checkbox"
                        checked={!!selectedApplications[app.ApplicationID]}
                        onChange={() => handleCheckboxChange(app.ApplicationID)}
                      />
                    </td>
                    <td>{app.FirstName}</td>
                    <td>{app.LastName}</td>
                    <td>{app.Email}</td>
                    <td>{app.Phone1}</td>
                    <td>
                      {app.Resume ? (
                        <a
                          href={`http://localhost:5000/uploads/${app.Resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{app.ExperienceYears || "N/A"}</td>
                    <td>{app.HighestQualification || "N/A"}</td>
                    <td>
                      {app.ScannedDocuments ? (
                        <a
                          href={`http://localhost:5000/uploads/${app.ScannedDocuments}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Document
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{app.JobTitle || "N/A"}</td>
                    <td>{app.Score || "N/A"}</td> {/* Display the Score */}
                    <td>
                      <button
                        onClick={() => handleViewApplication(app.ApplicationID)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hr-application-email-section">
            <h3>Send Email</h3>
            <textarea
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              placeholder="Enter your message here..."
              className="hr-application-textarea"
            />
            <button
              onClick={handleSendEmail}
              className="hr-application-send-btn"
              disabled={emailSending}
            >
              {emailSending
                ? "Sending..."
                : "Send Email to Selected Applicants"}
            </button>
            {emailStatus && <div className="email-status">{emailStatus}</div>}
          </div>
          <Link to="/interview-scheduling" className="schedule-interview-link">
            Schedule Interviews for Selected Applicants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationManagement;
