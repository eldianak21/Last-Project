import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./InterviewResults.css";
import "./HrJobPostings.css";

const InterviewResults = () => {
  const { id } = useParams();
  const [evaluations, setEvaluations] = useState([]);
  const [applicantData, setApplicantData] = useState({
    FirstName: "",
    LastName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [overallStatus, setOverallStatus] = useState(null);
  const [passedApplicants, setPassedApplicants] = useState([]);
  const [showPassedApplicants, setShowPassedApplicants] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

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
    // { to: "/interview-scheduling", text: "Interview Scheduling", icon: "👤" },
    { to: "/result", text: "Results Dashboard", icon: "📊" },
  ];

  const fetchPassedApplicants = async () => {
    try {
      setReportLoading(true);
      const response = await fetch("http://localhost:5000/api/passed");
      if (!response.ok) throw new Error("Failed to fetch passed applicants");
      const data = await response.json();
      setPassedApplicants(data);
      return data;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setReportLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      const applicants =
        passedApplicants.length > 0
          ? passedApplicants
          : await fetchPassedApplicants();

      if (applicants.length === 0) {
        setSuccessMessage("No passed applicants found");
        return;
      }

      const headers =
        "First Name,Last Name,Email,Total Score,Communication,Technical,Evaluation Date\n";
      const csvContent = applicants.reduce((csv, applicant) => {
        return (
          csv +
          `${applicant.FirstName},${applicant.LastName},${applicant.Email},` +
          `${applicant.total_score},${applicant.communication_skills},` +
          `${applicant.technical_skills},${new Date(
            applicant.evaluated_at
          ).toLocaleDateString()}\n`
        );
      }, headers);

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `passed_applicants_report_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccessMessage("Report generated successfully!");
    } catch (error) {
      setError("Failed to generate report: " + error.message);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       if (id) {
  //         const applicantResponse = await fetch(
  //           `http://localhost:5000/api/applicants/${id}`
  //         );
  //         if (!applicantResponse.ok)
  //           throw new Error("Failed to fetch applicant data");
  //         const applicantData = await applicantResponse.json();
  //         setApplicantData(applicantData);

  //         const evaluationsResponse = await fetch(
  //           `http://localhost:5000/api/evaluations/${id}`
  //         );
  //         if (!evaluationsResponse.ok)
  //           throw new Error("Failed to fetch evaluations");
  //         const evaluationsData = await evaluationsResponse.json();
  //         setEvaluations(evaluationsData);

  //         if (evaluationsData.length > 0) {
  //           const totalScores = evaluationsData.map(
  //             (evaluation) => evaluation.total_score || 0
  //           );
  //           const averageScore =
  //             totalScores.reduce((a, b) => a + b, 0) / totalScores.length;
  //           setOverallStatus(averageScore >= 7 ? "Pass" : "Fail");
  //         }
  //       }

  //       await fetchPassedApplicants();
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch passed applicants if not already fetched
        await fetchPassedApplicants();

        if (id) {
          const applicantResponse = await fetch(
            `http://localhost:5000/api/applicants/${id}`
          );
          if (!applicantResponse.ok)
            throw new Error("Failed to fetch applicant data");
          const applicantData = await applicantResponse.json();
          setApplicantData(applicantData);

          const evaluationsResponse = await fetch(
            `http://localhost:5000/api/evaluations/${id}`
          );
          if (!evaluationsResponse.ok)
            throw new Error("Failed to fetch evaluations");
          const evaluationsData = await evaluationsResponse.json();
          setEvaluations(evaluationsData);

          if (evaluationsData.length > 0) {
            const totalScores = evaluationsData.map(
              (evaluation) => evaluation.total_score || 0
            );
            const averageScore =
              totalScores.reduce((a, b) => a + b, 0) / totalScores.length;
            setOverallStatus(averageScore >= 7 ? "Pass" : "Fail");
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="hr-manager-container">
      <div className="hr-sidebar">
        <div className="hr-sidebar-header">
          <h2>HR Manager</h2>
        </div>
        <nav className="hr-nav">
          {dashboardLinks.map((link, index) => (
            <Link
              to={link.to}
              className={`hr-nav-link ${
                window.location.pathname === link.to ? "active" : ""
              }`}
              key={index}
            >
              <div className="hr-nav-icon">{link.icon}</div>
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="hr-main-content">
        <header className="hr-header">
          <h1>
            {id
              ? `Evaluation Results for ${applicantData.FirstName} ${applicantData.LastName}`
              : "Passed Applicants Dashboard"}
          </h1>
          <div className="hr-header-actions">
            <button className="hr-notification-btn">
              <i className="fas fa-bell"></i>
              <span className="hr-badge">3</span>
            </button>
            <button className="hr-logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>

        <div className="hr-dashboard-content">
          {error && (
            <div className="hr-job-postings-alert hr-job-postings-error">
              Error: {error}
            </div>
          )}

          {successMessage && (
            <div className="hr-job-postings-alert hr-job-postings-success">
              {successMessage}
            </div>
          )}

          <div className="dashboard-controls">
            {id && (
              <button
                onClick={() => setShowPassedApplicants(!showPassedApplicants)}
                className="toggle-view-btn"
              >
                {showPassedApplicants
                  ? "View Current Applicant"
                  : "View All Passed Applicants"}
              </button>
            )}
            <button
              onClick={generateReport}
              className="generate-report-btn"
              disabled={reportLoading}
            >
              {reportLoading ? "Generating..." : "Download Report"}
            </button>
          </div>

          {showPassedApplicants || !id ? (
            <>
              <h2 className="passed-applicants-title">
                Passed Applicants ({passedApplicants.length})
              </h2>
              {passedApplicants.length === 0 ? (
                <div className="hr-job-postings-empty">
                  No passed applicants found.
                </div>
              ) : (
                <div className="table-container">
                  <table className="results-table hr-job-postings-table">
                    <thead>
                      <tr>
                        <th>Applicant Name</th>
                        <th>Email</th>
                        <th>Communication</th>
                        <th>Technical</th>
                        <th>Total Score</th>
                        <th>Evaluated At</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passedApplicants.map((applicant) => (
                        <tr key={applicant.id || applicant.evaluation_id}>
                          <td>
                            {applicant.FirstName} {applicant.LastName}
                          </td>
                          <td>{applicant.Email}</td>
                          <td>{applicant.communication_skills}/5</td>
                          <td>{applicant.technical_skills}/5</td>
                          <td>{applicant.total_score}/10</td>
                          <td>
                            {new Date(
                              applicant.evaluated_at
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <span className="status-badge pass">Pass</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              {overallStatus && (
                <div className="result-summary">
                  <div
                    className={`status-badge ${overallStatus.toLowerCase()}`}
                  >
                    Overall Status: {overallStatus}
                  </div>
                </div>
              )}

              {evaluations.length === 0 ? (
                <div className="hr-job-postings-empty">
                  No evaluations found for {applicantData.FirstName}.
                </div>
              ) : (
                <div className="table-container">
                  <table className="results-table hr-job-postings-table">
                    <thead>
                      <tr>
                        <th>Communication</th>
                        <th>Technical</th>
                        <th>Total Score</th>
                        <th>Comments</th>
                        <th>Evaluated At</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evaluations.map((evaluation) => {
                        const status =
                          evaluation.total_score >= 7 ? "Pass" : "Fail";
                        return (
                          <tr key={evaluation.id || evaluation.evaluation_id}>
                            <td>{evaluation.communication_skills}/5</td>
                            <td>{evaluation.technical_skills}/5</td>
                            <td>{evaluation.total_score}/10</td>
                            <td className="comments-cell">
                              {evaluation.notes}
                            </td>
                            <td>
                              {new Date(
                                evaluation.evaluated_at
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              <span
                                className={`status-badge ${status.toLowerCase()}`}
                              >
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;
