import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const candidates = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    interviewResults: {
      departmentHead: null,
      hr: null,
    },
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    interviewResults: {
      departmentHead: null,
      hr: null,
    },
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    interviewResults: {
      departmentHead: null,
      hr: null,
    },
  },
];

const InterviewResults = () => {
  const [candidatesData, setCandidatesData] = useState(candidates);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [departmentHeadResult, setDepartmentHeadResult] = useState("");
  const [hrResult, setHrResult] = useState("");

  const handleSelectCandidate = (id) => {
    const candidate = candidatesData.find(c => c.id === id);
    setSelectedCandidateId(candidate.id);
    setDepartmentHeadResult(candidate.interviewResults.departmentHead || "");
    setHrResult(candidate.interviewResults.hr || "");
  };

  const handleSubmitResults = () => {
    setCandidatesData(prev => 
      prev.map(candidate => 
        candidate.id === selectedCandidateId
          ? {
              ...candidate,
              interviewResults: {
                departmentHead: departmentHeadResult,
                hr: hrResult,
              },
            }
          : candidate
      )
    );
    setSelectedCandidateId(null);
    setDepartmentHeadResult("");
    setHrResult("");
  };

  const getOverallResult = (candidate) => {
    const { departmentHead, hr } = candidate.interviewResults;
    if (departmentHead !== null && hr !== null) {
      const departmentHeadScore = parseFloat(departmentHead);
      const hrScore = parseFloat(hr);
      
      if (departmentHeadScore > 50 && hrScore > 50) {
        return "Overall Result: Pass";
      } else {
        return "Overall Result: Fail";
      }
    }
    return "Overall Result: Pending";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Interview Results</h2>
      
      {/* Navigation Bar */}
      <nav style={{ marginBottom: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/hr/dashboard">Dashboard</Link>
          </li>
          <li style={{ display: "inline", marginRight: "20px" }}>
            <Link to="/application-management">Application Management</Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link to="/candidate-profiles">Candidate Profiles</Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link
              to="/department-head-management"
              style={{
                display: "block",
                padding: "20px",
                backgroundColor: "#5a7bbd",
                color: "white",
                textAlign: "center",
                textDecoration: "none",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#4a6a9b")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#5a7bbd")
              }
            >
              Department Head Management
            </Link>
          </li>
        </ul>
      </nav>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Select Candidate</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Overall Result</th>
          </tr>
        </thead>
        <tbody>
          {candidatesData.map(candidate => (
            <tr key={candidate.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => handleSelectCandidate(candidate.id)}>View Results</button>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidate.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidate.email}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{getOverallResult(candidate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCandidateId && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "4px" }}>
          <h3>Interview Results for {candidatesData.find(c => c.id === selectedCandidateId)?.name}</h3>
          <div>
            <label>Department Head Result:</label>
            <input
              type="number"
              value={departmentHeadResult}
              onChange={(e) => setDepartmentHeadResult(e.target.value)}
              placeholder="Enter department head score"
              style={{ margin: "10px 0", padding: "8px", width: "100%" }}
            />
          </div>
          <div>
            <label>HR Result:</label>
            <input
              type="number"
              value={hrResult}
              onChange={(e) => setHrResult(e.target.value)}
              placeholder="Enter HR score"
              style={{ margin: "10px 0", padding: "8px", width: "100%" }}
            />
          </div>
          <button 
            onClick={handleSubmitResults}
            style={{ background: "#3498db", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px" }}
          >
            Submit Results
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewResults;