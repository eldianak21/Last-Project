// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./CVSubmission.css";

// const CVSubmission = () => {
//   const { id: jobId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     phone1: "",
//     firstName: "",
//     lastName: "",
//     experienceYears: "",
//     highestQualification: "",
//     resume: null,
//     scannedDocuments: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionMessage, setSubmissionMessage] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [showRejectionPopup, setShowRejectionPopup] = useState(false);
//   const [rejectionReasons, setRejectionReasons] = useState([]);

//   useEffect(() => {
//     const fetchJobTitle = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch job title");
//         }
//         const data = await response.json();
//         setJobTitle(data.Title);
//       } catch (error) {
//         console.error("Error fetching job title:", error);
//         setSubmissionMessage("Failed to load job title.");
//         setJobTitle("Job Title Not Found");
//       }
//     };

//     fetchJobTitle();
//   }, [jobId]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.phone1) newErrors.phone1 = "Phone is required";
//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.lastName) newErrors.lastName = "Last name is required";
//     if (!formData.experienceYears)
//       newErrors.experienceYears = "Experience is required";
//     if (!formData.highestQualification)
//       newErrors.highestQualification = "Qualification is required";
//     if (!formData.resume) newErrors.resume = "Resume is required";
//     if (!formData.scannedDocuments)
//       newErrors.scannedDocuments = "Scanned documents are required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const getUserId = async (email) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/getUserId?email=${encodeURIComponent(email)}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch user ID");
//       }
//       const data = await response.json();
//       return data.userId;
//     } catch (error) {
//       console.error("Error fetching user ID:", error);
//       throw error;
//     }
//   };

//   const handleParseResumeAndCheckEligibility = async () => {
//     if (!formData.resume) {
//       setSubmissionMessage("Please upload a resume");
//       setErrors({ ...errors, resume: "Resume is required" });
//       return false;
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append("resume", formData.resume);

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/applications/parse-resume/${jobId}`,
//         {
//           method: "POST",
//           body: formDataToSend,
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Eligibility check failed");
//       }

//       return data.meetsRequirements;
//     } catch (error) {
//       setSubmissionMessage(error.message);
//       return false;
//     }
//   };

//   const submitApplication = async () => {
//     try {
//       const userId = await getUserId(formData.email);

//       const formDataToSend = new FormData();
//       formDataToSend.append("userId", userId);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("jobId", jobId);
//       formDataToSend.append("firstName", formData.firstName);
//       formDataToSend.append("lastName", formData.lastName);
//       formDataToSend.append("phone1", formData.phone1);
//       formDataToSend.append("experienceYears", formData.experienceYears);
//       formDataToSend.append(
//         "highestQualification",
//         formData.highestQualification
//       );
//       formDataToSend.append("resume", formData.resume);
//       if (formData.scannedDocuments) {
//         formDataToSend.append("scannedDocuments", formData.scannedDocuments);
//       }

//       const response = await fetch(
//         `http://localhost:5000/api/applications/${jobId}`,
//         {
//           method: "POST",
//           body: formDataToSend,
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Submission failed");
//       }

//       const data = await response.json();

//       if (data.meetsRequirements) {
//         setSubmissionMessage(
//           "Application submitted successfully! You are eligible."
//         );
//         await new Promise((resolve) => setTimeout(resolve, 0));
//         navigate("/interview-selection", { replace: true });
//       } else {
//         setShowRejectionPopup(true);
//         setSubmissionMessage(
//           "Application submitted, but you do not meet the requirements for this position."
//         );
//         setRejectionReasons(data.reasons || ["Unknown reason."]);
//       }

//       return true;
//     } catch (error) {
//       console.error("Submission error:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setSubmissionMessage("");

//     if (!validateForm()) {
//       setSubmissionMessage("Please fix form errors");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       setSubmissionMessage("Checking eligibility...");
//       const isEligible = await handleParseResumeAndCheckEligibility();

//       if (!isEligible) {
//         setShowRejectionPopup(true);
//         setSubmissionMessage(
//           "You do not meet the requirements for this position"
//         );
//         return;
//       }

//       setSubmissionMessage("Submitting application...");
//       const submissionSuccess = await submitApplication();

//       if (submissionSuccess) {
//         setSubmissionMessage("Application submitted successfully!");
//         await new Promise((resolve) => setTimeout(resolve, 0));
//         navigate("/interview-selection", { replace: true });
//       }
//     } catch (error) {
//       setSubmissionMessage(error.message || "Application failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRejectionOkay = () => {
//     setShowRejectionPopup(false);
//     navigate("/");
//   };

//   return (
//     <div className="form-container">
//       <h1>Apply for Job: {jobTitle}</h1>

//       <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
//         <div className="form-group">
//           <label>Email*</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label>Phone*</label>
//           <input
//             type="tel"
//             name="phone1"
//             value={formData.phone1}
//             onChange={handleChange}
//           />
//           {errors.phone1 && <span className="error">{errors.phone1}</span>}
//         </div>

//         <div className="form-group">
//           <label>First Name*</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//           {errors.firstName && (
//             <span className="error">{errors.firstName}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Last Name*</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//           {errors.lastName && <span className="error">{errors.lastName}</span>}
//         </div>

//         <div className="form-group">
//           <label>Experience (Years)*</label>
//           <input
//             type="number"
//             name="experienceYears"
//             value={formData.experienceYears}
//             onChange={handleChange}
//             min="0"
//           />
//           {errors.experienceYears && (
//             <span className="error">{errors.experienceYears}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Highest Qualification*</label>
//           <input
//             type="text"
//             name="highestQualification"
//             value={formData.highestQualification}
//             onChange={handleChange}
//           />
//           {errors.highestQualification && (
//             <span className="error">{errors.highestQualification}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Upload Resume*</label>
//           <input
//             type="file"
//             name="resume"
//             onChange={handleChange}
//             accept=".pdf,.doc,.docx"
//           />
//           {errors.resume && <span className="error">{errors.resume}</span>}
//         </div>

//         <div className="form-group">
//           <label>Upload Scanned Documents (PDF)</label>
//           <input
//             type="file"
//             name="scannedDocuments"
//             onChange={handleChange}
//             accept=".pdf"
//           />
//           {errors.scannedDocuments && (
//             <span className="error">{errors.scannedDocuments}</span>
//           )}
//         </div>

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Processing..." : "Submit Application"}
//         </button>
//       </form>

//       {submissionMessage && !showRejectionPopup && (
//         <p className="submission-message">{submissionMessage}</p>
//       )}

//       {showRejectionPopup && (
//         <div className="rejection-popup">
//           <p className="rejection-message">
//             Thank you for applying for the {jobTitle} position.
//             <br />
//             After careful consideration of your application, we've determined
//             that your qualifications don't currently match the core requirements
//             we're seeking for this role.
//             <br />
//             While we appreciate the experience and skills you bring, we're
//             looking for candidates with more extensive experience.
//             <br />
//             {/* Here is the information you provided: */}
//           </p>
//           {/* <ul>
//             <li>Email: {formData.email}</li>
//             <li>Phone: {formData.phone1}</li>
//             <li>First Name: {formData.firstName}</li>
//             <li>Last Name: {formData.lastName}</li>
//             <li>Experience: {formData.experienceYears} years</li>
//             <li>Highest Qualification: {formData.highestQualification}</li>
//           </ul>
//           <p>Reasons for rejection:</p> */}
//           <ul>
//             {rejectionReasons.map((reason, index) => (
//               <li key={index}>{reason}</li>
//             ))}
//           </ul>
//           <h5>We encourage you to:</h5>
//           <p>
//             Review our current openings that may better align with your
//             background.
//           </p>
//           {/* <li>Consider gaining additional experience in [specific areas].</li> */}
//           <p>Apply again in the future as your skills develop.</p>
//           <p>
//             We genuinely appreciate the time and effort you put into your
//             application, and we wish you success in your job search.
//           </p>
//           <br />
//           <button onClick={handleRejectionOkay}>Okay</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CVSubmission;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./CVSubmission.css";

// const CVSubmission = () => {
//   const { id: jobId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     phone1: "",
//     firstName: "",
//     lastName: "",
//     experienceYears: "",
//     highestQualification: "",
//     resume: null,
//     scannedDocuments: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionMessage, setSubmissionMessage] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [showRejectionPopup, setShowRejectionPopup] = useState(false);
//   const [showMismatchPopup, setShowMismatchPopup] = useState(false);
//   const [mismatchMessages, setMismatchMessages] = useState([]);
//   const [rejectionReasons, setRejectionReasons] = useState([]);

//   useEffect(() => {
//     const fetchJobTitle = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch job title");
//         }
//         const data = await response.json();
//         setJobTitle(data.Title);
//       } catch (error) {
//         console.error("Error fetching job title:", error);
//         setSubmissionMessage("Failed to load job title.");
//         setJobTitle("Job Title Not Found");
//       }
//     };

//     fetchJobTitle();
//   }, [jobId]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.phone1) newErrors.phone1 = "Phone is required";
//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.lastName) newErrors.lastName = "Last name is required";
//     if (!formData.experienceYears)
//       newErrors.experienceYears = "Experience is required";
//     if (!formData.highestQualification)
//       newErrors.highestQualification = "Qualification is required";
//     if (!formData.resume) newErrors.resume = "Resume is required";
//     if (!formData.scannedDocuments)
//       newErrors.scannedDocuments = "Scanned documents are required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const getUserId = async (email) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/getUserId?email=${encodeURIComponent(email)}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch user ID");
//       }
//       const data = await response.json();
//       return data.userId;
//     } catch (error) {
//       console.error("Error fetching user ID:", error);
//       throw error;
//     }
//   };

//   // In validateParsedData function
//   const validateParsedData = (parsedData, formData) => {
//     const messages = [];

//     // Skip validation if parsed data is empty
//     if (!parsedData.personalInfo) {
//       return messages;
//     }

//     // Normalize all strings for comparison
//     const normalize = (str) =>
//       str ? str.trim().toLowerCase().replace(/\s+/g, "") : "";

//     // Email validation
//     const resumeEmail = normalize(parsedData.personalInfo.email);
//     const formEmail = normalize(formData.email);
//     if (resumeEmail && formEmail && resumeEmail !== formEmail) {
//       messages.push(
//         `Email mismatch: Resume shows ${parsedData.personalInfo.email} vs form ${formData.email}`
//       );
//     }

//     // Phone validation (only if both exist)
//     const resumePhone = normalize(parsedData.personalInfo.phone);
//     const formPhone = normalize(formData.phone1);
//     if (resumePhone && formPhone && resumePhone !== formPhone) {
//       messages.push(
//         `Phone mismatch: Resume shows ${parsedData.personalInfo.phone} vs form ${formData.phone1}`
//       );
//     }

//     // Similar improvements for first/last name validation...

//     return messages;
//   };

//   // In handleParseResumeAndCheckEligibility
//   const handleParseResumeAndCheckEligibility = async () => {
//     try {
//       if (!formData.resume) {
//         setErrors({ ...errors, resume: "Resume is required" });
//         throw new Error("Please upload a resume");
//       }

//       const formDataToSend = new FormData();
//       formDataToSend.append("resume", formData.resume);
//       formDataToSend.append("email", formData.email); // Add email for validation

//       const response = await fetch(
//         `http://localhost:5000/api/applications/parse-resume/${jobId}`,
//         {
//           method: "POST",
//           body: formDataToSend,
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Eligibility check failed");
//       }

//       const { parsedData, meetsRequirements, score } = await response.json();

//       // Debug logs
//       console.log("Parsed resume data:", parsedData);
//       console.log("Eligibility result:", { meetsRequirements, score });

//       // Validate parsed data against form data
//       const validationMessages = validateParsedData(parsedData, formData);
//       if (validationMessages.length > 0) {
//         setMismatchMessages(validationMessages);
//         setShowMismatchPopup(true);
//         return false;
//       }

//       return meetsRequirements;
//     } catch (error) {
//       console.error("Eligibility check error:", error);
//       setSubmissionMessage(error.message);
//       return false;
//     }
//   };

//   const submitApplication = async () => {
//     try {
//       const userId = await getUserId(formData.email);

//       const formDataToSend = new FormData();
//       formDataToSend.append("userId", userId);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("jobId", jobId);
//       formDataToSend.append("firstName", formData.firstName);
//       formDataToSend.append("lastName", formData.lastName);
//       formDataToSend.append("phone1", formData.phone1);
//       formDataToSend.append("experienceYears", formData.experienceYears);
//       formDataToSend.append(
//         "highestQualification",
//         formData.highestQualification
//       );
//       formDataToSend.append("resume", formData.resume);
//       if (formData.scannedDocuments) {
//         formDataToSend.append("scannedDocuments", formData.scannedDocuments);
//       }

//       const eligibilityResponse = await fetch(
//         `http://localhost:5000/api/applications/${jobId}`,
//         {
//           method: "POST",
//           body: formDataToSend,
//         }
//       );

//       if (!eligibilityResponse.ok) {
//         const errorData = await eligibilityResponse.json();
//         throw new Error(errorData.message || "Submission failed");
//       }

//       const data = await eligibilityResponse.json();

//       if (data.meetsRequirements) {
//         setSubmissionMessage(
//           "Application submitted successfully! You are eligible."
//         );
//         await new Promise((resolve) => setTimeout(resolve, 0));
//         navigate("/interview-selection", { replace: true });
//       } else {
//         setShowRejectionPopup(true);
//         setSubmissionMessage(
//           "Application submitted, but you do not meet the requirements for this position."
//         );
//         setRejectionReasons(data.reasons || ["Unknown reason."]);
//       }

//       return true;
//     } catch (error) {
//       console.error("Submission error:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setSubmissionMessage("");
//     setIsSubmitting(true);

//     try {
//       // Step 1: Validate form
//       if (!validateForm()) {
//         setSubmissionMessage("Please fix form errors");
//         return;
//       }

//       // Step 2: Check eligibility
//       setSubmissionMessage("Checking eligibility...");
//       const isEligible = await handleParseResumeAndCheckEligibility();

//       if (!isEligible) {
//         return;
//       }

//       // Step 3: Submit application
//       setSubmissionMessage("Submitting application...");
//       await submitApplication();

//       // Step 4: Navigate on success
//       setSubmissionMessage("Application submitted successfully!");
//       navigate("/interview-selection");
//     } catch (error) {
//       console.error("Submission error:", error);
//       setSubmissionMessage(error.message || "Application failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRejectionOkay = () => {
//     setShowRejectionPopup(false);
//     navigate("/");
//   };

//   const handleMismatchOkay = () => {
//     setShowMismatchPopup(false);
//   };

//   return (
//     <div className="form-container">
//       <h1>Apply for Job: {jobTitle}</h1>

//       <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
//         <div className="form-group">
//           <label>Email*</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label>Phone*</label>
//           <input
//             type="tel"
//             name="phone1"
//             value={formData.phone1}
//             onChange={handleChange}
//           />
//           {errors.phone1 && <span className="error">{errors.phone1}</span>}
//         </div>

//         <div className="form-group">
//           <label>First Name*</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//           {errors.firstName && (
//             <span className="error">{errors.firstName}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Last Name*</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//           {errors.lastName && <span className="error">{errors.lastName}</span>}
//         </div>

//         <div className="form-group">
//           <label>Experience (Years)*</label>
//           <input
//             type="number"
//             name="experienceYears"
//             value={formData.experienceYears}
//             onChange={handleChange}
//             min="0"
//           />
//           {errors.experienceYears && (
//             <span className="error">{errors.experienceYears}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Highest Qualification*</label>
//           <input
//             type="text"
//             name="highestQualification"
//             value={formData.highestQualification}
//             onChange={handleChange}
//           />
//           {errors.highestQualification && (
//             <span className="error">{errors.highestQualification}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Upload Resume*</label>
//           <input
//             type="file"
//             name="resume"
//             onChange={handleChange}
//             accept=".pdf,.doc,.docx"
//           />
//           {errors.resume && <span className="error">{errors.resume}</span>}
//         </div>

//         <div className="form-group">
//           <label>Upload Scanned Documents (PDF)</label>
//           <input
//             type="file"
//             name="scannedDocuments"
//             onChange={handleChange}
//             accept=".pdf"
//           />
//           {errors.scannedDocuments && (
//             <span className="error">{errors.scannedDocuments}</span>
//           )}
//         </div>

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Processing..." : "Submit Application"}
//         </button>
//       </form>

//       {submissionMessage && !showRejectionPopup && !showMismatchPopup && (
//         <p className="submission-message">{submissionMessage}</p>
//       )}

//       {showRejectionPopup && (
//         <div className="rejection-popup">
//           <p className="rejection-message">
//             Thank you for applying for the {jobTitle} position.
//             <br />
//             After careful consideration of your application, we've determined
//             that your qualifications don't currently match the core requirements
//             we're seeking for this role.
//             <br />
//             While we appreciate the experience and skills you bring, we're
//             looking for candidates with more extensive experience.
//           </p>
//           <ul>
//             {rejectionReasons.map((reason, index) => (
//               <li key={index}>{reason}</li>
//             ))}
//           </ul>
//           <h5>We encourage you to:</h5>
//           <p>
//             Review our current openings that may better align with your
//             background.
//           </p>
//           <p>Apply again in the future as your skills develop.</p>
//           <p>
//             We genuinely appreciate the time and effort you put into your
//             application, and we wish you success in your job search.
//           </p>
//           <br />
//           <button onClick={handleRejectionOkay}>Okay</button>
//         </div>
//       )}

//       {showMismatchPopup && (
//         <div className="mismatch-popup">
//           <p className="mismatch-message">Discrepancies found:</p>
//           <ul>
//             {mismatchMessages.map((message, index) => (
//               <li key={index}>{message}</li>
//             ))}
//           </ul>
//           <button onClick={handleMismatchOkay}>Okay</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CVSubmission;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CVSubmission.css";

const CVSubmission = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone1: "",
    firstName: "",
    lastName: "",
    experienceYears: "",
    highestQualification: "",
    resume: null,
    scannedDocuments: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [showRejectionPopup, setShowRejectionPopup] = useState(false);
  const [showMismatchPopup, setShowMismatchPopup] = useState(false);
  const [mismatchMessages, setMismatchMessages] = useState([]);
  const [rejectionReasons, setRejectionReasons] = useState([]);

  useEffect(() => {
    const fetchJobTitle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job title");
        }
        const data = await response.json();
        setJobTitle(data.Title);
      } catch (error) {
        console.error("Error fetching job title:", error);
        setSubmissionMessage("Failed to load job title.");
        setJobTitle("Job Title Not Found");
      }
    };

    fetchJobTitle();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone1) newErrors.phone1 = "Phone is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.experienceYears)
      newErrors.experienceYears = "Experience is required";
    if (!formData.highestQualification)
      newErrors.highestQualification = "Qualification is required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    if (!formData.scannedDocuments)
      newErrors.scannedDocuments = "Scanned documents are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getUserId = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getUserId?email=${encodeURIComponent(email)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user ID");
      }
      const data = await response.json();
      return data.userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };

  const validateParsedData = (parsedData, formData) => {
    const messages = [];
    if (!parsedData.personalInfo) {
      return messages;
    }

    const normalize = (str) =>
      str ? str.trim().toLowerCase().replace(/\s+/g, "") : "";

    const resumeEmail = normalize(parsedData.personalInfo.email);
    const formEmail = normalize(formData.email);
    if (resumeEmail && formEmail && resumeEmail !== formEmail) {
      messages.push(
        `Email mismatch: Resume shows ${parsedData.personalInfo.email} vs form ${formData.email}`
      );
    }

    const resumePhone = normalize(parsedData.personalInfo.phone);
    const formPhone = normalize(formData.phone1);
    if (resumePhone && formPhone && resumePhone !== formPhone) {
      messages.push(
        `Phone mismatch: Resume shows ${parsedData.personalInfo.phone} vs form ${formData.phone1}`
      );
    }

    return messages;
  };

  const handleParseResumeAndCheckEligibility = async () => {
    try {
      if (!formData.resume) {
        setErrors({ ...errors, resume: "Resume is required" });
        throw new Error("Please upload a resume");
      }

      setSubmissionMessage("Checking eligibility...");
      const formDataToSend = new FormData();
      formDataToSend.append("resume", formData.resume);
      formDataToSend.append("email", formData.email);

      const response = await fetch(
        `http://localhost:5000/api/applications/parse-resume/${jobId}`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check eligibility");
      }

      const { parsedData, meetsRequirements, score } = await response.json();

      console.log("Eligibility result:", { meetsRequirements, score });

      const validationMessages = validateParsedData(parsedData, formData);
      if (validationMessages.length > 0) {
        setMismatchMessages(validationMessages);
        setShowMismatchPopup(true);
        return false;
      }

      if (!meetsRequirements) {
        setSubmissionMessage(
          "We're sorry, but you don't meet the requirements for this position."
        );
        setRejectionReasons([
          "Insufficient years of experience",
          "Qualification not matching our needs",
          "Missing required skills",
        ]);
        setShowRejectionPopup(true);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Eligibility check error:", error);
      setSubmissionMessage("Error checking eligibility. Please try again.");
      return false;
    }
  };

  const submitApplication = async () => {
    try {
      const userId = await getUserId(formData.email);

      const formDataToSend = new FormData();
      formDataToSend.append("userId", userId);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("jobId", jobId);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("phone1", formData.phone1);
      formDataToSend.append("experienceYears", formData.experienceYears);
      formDataToSend.append(
        "highestQualification",
        formData.highestQualification
      );
      formDataToSend.append("resume", formData.resume);
      if (formData.scannedDocuments) {
        formDataToSend.append("scannedDocuments", formData.scannedDocuments);
      }

      const response = await fetch(
        `http://localhost:5000/api/applications/${jobId}`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Submission error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmissionMessage("");
    setIsSubmitting(true);

    try {
      if (!validateForm()) {
        setSubmissionMessage("Please fix form errors");
        return;
      }

      const isEligible = await handleParseResumeAndCheckEligibility();

      if (!isEligible) {
        return;
      }

      setSubmissionMessage("Submitting application...");
      await submitApplication();

      setSubmissionMessage("Application submitted successfully!");
      navigate("/interview-selection");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionMessage(error.message || "Application failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectionOkay = () => {
    setShowRejectionPopup(false);
    navigate("/");
  };

  const handleMismatchOkay = () => {
    setShowMismatchPopup(false);
  };

  return (
    <div className="form-container">
      <h1>Apply for Job: {jobTitle}</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone*</label>
          <input
            type="tel"
            name="phone1"
            value={formData.phone1}
            onChange={handleChange}
          />
          {errors.phone1 && <span className="error">{errors.phone1}</span>}
        </div>

        <div className="form-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label>Experience (Years)*</label>
          <input
            type="number"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleChange}
            min="0"
          />
          {errors.experienceYears && (
            <span className="error">{errors.experienceYears}</span>
          )}
        </div>

        <div className="form-group">
          <label>Highest Qualification*</label>
          <input
            type="text"
            name="highestQualification"
            value={formData.highestQualification}
            onChange={handleChange}
          />
          {errors.highestQualification && (
            <span className="error">{errors.highestQualification}</span>
          )}
        </div>

        <div className="form-group">
          <label>Upload Resume*</label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
          />
          {errors.resume && <span className="error">{errors.resume}</span>}
        </div>

        <div className="form-group">
          <label>Upload Scanned Documents (PDF)</label>
          <input
            type="file"
            name="scannedDocuments"
            onChange={handleChange}
            accept=".pdf"
          />
          {errors.scannedDocuments && (
            <span className="error">{errors.scannedDocuments}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Submit Application"}
        </button>
      </form>

      {submissionMessage && !showRejectionPopup && !showMismatchPopup && (
        <p className="submission-message">{submissionMessage}</p>
      )}

      {showRejectionPopup && (
        <div className="rejection-popup-overlay">
          <div className="rejection-popup">
            <h3 className="rejection-title">We're Sorry</h3>
            <p className="rejection-message">
              Your application for the {jobTitle} position wasn't successful.
            </p>

            <div className="rejection-reasons">
              <p>Reasons:</p>
              <ul>
                {rejectionReasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>

            <div className="rejection-advice">
              <p>What you can do next:</p>
              <ul>
                <li>Review other job openings that may be a better fit</li>
                <li>Consider gaining more experience in required areas</li>
                <li>Apply again in the future</li>
              </ul>
            </div>

            <button
              className="rejection-ok-button"
              onClick={handleRejectionOkay}
            >
              Understand
            </button>
          </div>
        </div>
      )}

      {showMismatchPopup && (
        <div className="mismatch-popup-overlay">
          <div className="mismatch-popup">
            <h3>Discrepancies Found</h3>
            <ul>
              {mismatchMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
            <button onClick={handleMismatchOkay}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVSubmission;
