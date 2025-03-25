import React, { useState, useEffect } from "react";

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = () => {
    const temporaryApplications = [
      { id: 1, jobId: 1, applicant: "Alice Johnson", status: "Under Review" },
      { id: 2, jobId: 2, applicant: "Bob Brown", status: "Accepted" },
      { id: 3, jobId: 1, applicant: "Charlie Green", status: "Rejected" },
    ];
    setApplications(temporaryApplications);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Application Management</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Applicant
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Job Title
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {app.applicant}
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "8px" }}
              >{`Job ${app.jobId}`}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {app.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationManagement;
