import React from 'react';

const HrDashboard = ({ selectedCandidates = [], interviewSchedules = [], parsedData = null }) => {
  console.log("Selected Candidates:", selectedCandidates);
  console.log("Interview Schedules:", interviewSchedules);
  console.log("Parsed Data:", parsedData);

  return (
    <div>
      <h2>Interview Schedules</h2>
      {selectedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Interview Date</th>
              <th>Interview Time</th>
              <th>Experience Years</th>
              <th>Highest Qualification</th>
            </tr>
          </thead>
          <tbody>
            {selectedCandidates.map(candidate => {
              const schedule = interviewSchedules.find(int => int.candidateId === candidate.email);
              const experienceYears = candidate.experienceYears || parsedData?.personalInfo?.experienceYears || "N/A";
              const highestQualification = candidate.highestQualification || parsedData?.personalInfo?.highestQualification || "N/A";

              return (
                <tr key={candidate.email}>
                  <td>{candidate.firstName} {candidate.lastName}</td>
                  <td>{candidate.email}</td>
                  <td>{schedule ? schedule.date : "Not Scheduled"}</td>
                  <td>{schedule ? schedule.time : "Not Scheduled"}</td>
                  <td>{experienceYears}</td>
                  <td>{highestQualification}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No candidates selected.</p>
      )}

      {/* Display parsed data if available */}
      {parsedData && (
        <div>
          <h3>Parsed Resume Data</h3>
          <h4>Personal Information</h4>
          <p>Name: {parsedData.personalInfo?.name || "N/A"}</p>
          <p>Email: {parsedData.personalInfo?.email || "N/A"}</p>
          <p>Phone: {parsedData.personalInfo?.phone || "N/A"}</p>

          <h4>Education</h4>
          <ul>
            {parsedData.education.length > 0 ? (
              parsedData.education.map((edu, index) => (
                <li key={index}>
                  {edu.degree} from {edu.institution} ({edu.year})
                </li>
              ))
            ) : (
              <li>No education information available.</li>
            )}
          </ul>

          <h4>Experience</h4>
          <ul>
            {parsedData.experience.length > 0 ? (
              parsedData.experience.map((exp, index) => (
                <li key={index}>
                  {exp.jobTitle} at {exp.company} for {exp.duration}
                </li>
              ))
            ) : (
              <li>No experience information available.</li>
            )}
          </ul>

          <h4>Skills</h4>
          <p>{parsedData.qualifications.length > 0 ? parsedData.qualifications.join(', ') : "No skills listed."}</p>
        </div>
      )}
    </div>
  );
};

export default HrDashboard;