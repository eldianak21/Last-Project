// // import React from "react";
// // import { useParams, Link } from "react-router-dom";

// // const JobDetails = ({ jobs }) => {
// //   const { id } = useParams();
// //   const job = jobs.find((job) => job.id === parseInt(id));

// //   if (!job) {
// //     return <div>Job not found</div>;
// //   }

// //   return (
// //     <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
// //       <h2>{job.title}</h2>

// //       <div style={{ marginBottom: "20px" }}>
// //         <p>
// //           <strong>Status:</strong>{" "}
// //           <span style={{ color: job.status === "Open" ? "green" : "red" }}>
// //             {job.status}
// //           </span>
// //         </p>
// //         <p>
// //           <strong>Employment Type:</strong> {job.employmentType}
// //         </p>
// //         <p>
// //           <strong>Minimum Experience:</strong> {job.minExperienceYears} years
// //         </p>
// //         <p>
// //           <strong>Deadline:</strong>{" "}
// //           {new Date(job.deadline).toLocaleDateString()}
// //         </p>
// //         <p>
// //           <strong>Posted On:</strong>{" "}
// //           {new Date(job.createdAt).toLocaleDateString()}
// //         </p>
// //         <p>
// //           <strong>Applications:</strong> {job.applications}
// //         </p>
// //       </div>

// //       <div style={{ marginBottom: "20px" }}>
// //         <h3>Description</h3>
// //         <p>{job.description}</p>
// //       </div>

// //       <div style={{ marginBottom: "20px" }}>
// //         <h3>Responsibilities</h3>
// //         <p style={{ whiteSpace: "pre-line" }}>{job.responsibilities}</p>
// //       </div>

// //       <div style={{ marginBottom: "20px" }}>
// //         <h3>Qualifications</h3>
// //         <p style={{ whiteSpace: "pre-line" }}>{job.qualifications}</p>
// //       </div>

// //       <div style={{ marginBottom: "20px" }}>
// //         <h3>Required Skills</h3>
// //         <p>{job.requiredSkills}</p>
// //       </div>

// //       <div style={{ marginBottom: "20px" }}>
// //         <h3>Required Qualifications</h3>
// //         <p>{job.requiredQualifications}</p>
// //       </div>

// //       <Link
// //         to="/job-postings"
// //         style={{ display: "inline-block", marginTop: "20px" }}
// //       >
// //         Back to Job Postings
// //       </Link>
// //     </div>
// //   );
// // };

// // export default JobDetails;

// import React from "react";
// import { useParams, Link } from "react-router-dom";

// const JobDetails = ({ jobs }) => {
//   const { id } = useParams();
//   const job = jobs.find((job) => job.id === parseInt(id));

//   if (!job) {
//     return <div>Job not found</div>;
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
//       <h2>{job.title}</h2>

//       <div style={{ marginBottom: "20px" }}>
//         <p>
//           <strong>Status:</strong>{" "}
//           <span style={{ color: job.status === "Open" ? "green" : "red" }}>
//             {job.status}
//           </span>
//         </p>
//         <p>
//           <strong>Employment Type:</strong> {job.employmentType}
//         </p>
//         <p>
//           <strong>Minimum Experience:</strong> {job.minExperienceYears} years
//         </p>
//         <p>
//           <strong>Deadline:</strong>{" "}
//           {new Date(job.deadline).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Posted On:</strong>{" "}
//           {new Date(job.createdAt).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Applications:</strong> {job.applications}
//         </p>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <h3>Description</h3>
//         <p>{job.description}</p>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <h3>Responsibilities</h3>
//         <p style={{ whiteSpace: "pre-line" }}>{job.responsibilities}</p>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <h3>Qualifications</h3>
//         <p style={{ whiteSpace: "pre-line" }}>{job.qualifications}</p>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <h3>Required Skills</h3>
//         <p>{job.requiredSkills}</p>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <h3>Required Qualifications</h3>
//         <p>{job.requiredQualifications}</p>
//       </div>

//       <Link
//         to="/job-postings"
//         style={{ display: "inline-block", marginTop: "20px" }}
//       >
//         Back to Job Postings
//       </Link>
//     </div>
//   );
// };

// export default JobDetails;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams(); // Make sure this matches your route parameter
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (!id) {
          throw new Error("Job ID is undefined");
        }

        const response = await fetch(
          `http://localhost:5000/api/job-postings/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (isLoading) return <div>Loading job details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Details</h2>
      <Link to="/job-postings">Back to Job Postings</Link>

      <div style={{ marginTop: "20px" }}>
        <h3>{job.Title}</h3>
        <p>
          <strong>Description:</strong> {job.Description}
        </p>
        {/* Add other job details here */}
      </div>
    </div>
  );
};

export default JobDetails;
