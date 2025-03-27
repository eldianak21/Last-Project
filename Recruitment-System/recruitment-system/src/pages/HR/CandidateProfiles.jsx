import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const candidates = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "123-456-7890",
    qualifications: ["JavaScript", "React"],
    experience: [
      { jobTitle: "Frontend Developer", company: "Tech Corp", duration: "2019 - Present" },
      { jobTitle: "Intern", company: "Web Solutions", duration: "2018 - 2019" },
    ],
    education: [
      { degree: "Bachelor of Science", field: "Computer Science", institution: "University A", year: "2018" },
    ],
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "987-654-3210",
    qualifications: ["Java", "Spring"],
    experience: [
      { jobTitle: "Software Engineer", company: "Dev Studio", duration: "2020 - Present" },
    ],
    education: [
      { degree: "Bachelor of Science", field: "Software Engineering", institution: "University B", year: "2019" },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "555-555-5555",
    qualifications: ["JavaScript", "React"],
    experience: [],
    education: [],
  },
];

// Example interview schedules for candidates
const interviewSchedules = [
  {
    candidateId: 1,
    date: "2023-06-15",
    time: "10:00 AM",
    duration: "60 mins",
  },
  {
    candidateId: 2,
    date: "2023-06-16",
    time: "2:00 PM",
    duration: "45 mins",
  },
];

// Example department heads
const departmentHeads = [
  { id: 1, name: "Marketing Department" },
  { id: 2, name: "Software Development" },
  { id: 3, name: "Human Resources" },
];

const CandidateProfiles = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(departmentHeads[0].id);

  const qualifiedCandidates = candidates.filter(candidate =>
    candidate.qualifications.includes("JavaScript") || candidate.qualifications.includes("React")
  );

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidates(prev => {
      if (prev.includes(candidate)) {
        return prev.filter(c => c !== candidate);
      }
      return [...prev, candidate];
    });
  };

  const handleSubmitCandidates = () => {
    const candidatesToSend = selectedCandidates.map(candidate => {
      const interview = interviewSchedules.find(int => int.candidateId === candidate.id);
      return {
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        qualifications: candidate.qualifications,
        experience: candidate.experience,
        education: candidate.education,
        interview: interview ? {
          date: interview.date,
          time: interview.time,
          duration: interview.duration,
        } : null,
      };
    });

    // Here you would send candidatesToSend and selectedDepartment to the respective department head via API
    alert(`Candidates submitted to ${departmentHeads.find(d => d.id === selectedDepartment).name}: ${candidatesToSend.map(c => c.name).join(", ")}`);
    setSelectedCandidates([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Candidate Profiles</h2>
      {/* Navigation Bar */}
      <nav style={{ marginBottom: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/hr-dashboard">Dashboard</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/application-management">Application Management</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/job-postings">Job Postings</Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link to="/department-head-management">Department Head Management</Link>
          </li>
        </ul>
      </nav>

      {qualifiedCandidates.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Select</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Qualifications</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Experience</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Education</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Interview Schedule</th>
            </tr>
          </thead>
          <tbody>
            {qualifiedCandidates.map(candidate => {
              const interview = interviewSchedules.find(int => int.candidateId === candidate.id);
              return (
                <tr key={candidate.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate)}
                      onChange={() => handleSelectCandidate(candidate)}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidate.name}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidate.email}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidate.phone}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {candidate.qualifications.join(", ")}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {candidate.experience.map(exp => (
                      <div key={exp.jobTitle}>{exp.jobTitle} at {exp.company} ({exp.duration})</div>
                    ))}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {candidate.education.map(edu => (
                      <div key={edu.degree}>{edu.degree} in {edu.field} from {edu.institution} ({edu.year})</div>
                    ))}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {interview ? (
                      <>
                        {interview.date} at {interview.time} ({interview.duration})
                      </>
                    ) : (
                      "No scheduled interview"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No qualified candidates match the job requirements.</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <label htmlFor="department-select">Select Department Head:</label>
        <select
          id="department-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{ margin: "10px 0", padding: "8px", borderRadius: "4px" }}
        >
          {departmentHeads.map(department => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        {selectedCandidates.length > 0 && (
          <button 
            onClick={handleSubmitCandidates}
            style={{ background: "#3498db", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px" }}
          >
            Send Selected Candidates to Department Head
          </button>
        )}
      </div>
    </div>
  );
};

export default CandidateProfiles;