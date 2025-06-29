import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InterviewScheduling.css";

const InterviewScheduling = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState({});
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [interviewDepartmentID, setInterviewDepartmentID] = useState("");
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/application-data"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Add the validatedData mapping here
      const validatedData = data.map((app) => ({
        ApplicationID:
          app.ApplicationID || Math.random().toString(36).substr(2, 9),
        FirstName: app.FirstName || "",
        LastName: app.LastName || "",
        Email: app.Email || "",
        JobTitle: app.JobTitle || "Unknown",
        Status: app.Status || "New",
        AppliedDate: app.AppliedDate || new Date().toISOString(),
        Phone: app.Phone || "",
        ResumeURL: app.ResumeURL || "",
        Score: app.Score || 0, // Ensure Score is included
      }));

      setApplications(validatedData);
      setFilteredApplications(validatedData);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/hr/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched departments:", data);
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchDepartments();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, statusFilter, jobFilter, applications]);

  const filterApplications = () => {
    let filtered = [...applications];
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((app) => {
        const fullName = `${app.FirstName} ${app.LastName}`.toLowerCase();
        return (
          fullName.includes(searchLower) ||
          app.Email.toLowerCase().includes(searchLower) ||
          app.JobTitle.toLowerCase().includes(searchLower) ||
          (app.Phone && app.Phone.includes(searchTerm))
        );
      });
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.Status === statusFilter);
    }
    if (jobFilter !== "all") {
      filtered = filtered.filter((app) => app.JobTitle === jobFilter);
    }
    setFilteredApplications(filtered);
  };

  const handleCheckboxChange = (appId) => {
    setSelectedApplications((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

  const handleSelectAll = (e) => {
    const newSelected = {};
    filteredApplications.forEach((app) => {
      newSelected[app.ApplicationID] = e.target.checked;
    });
    setSelectedApplications(newSelected);
  };

  const calculateTimeSlots = () => {
    const slots = [];
    let currentTime = new Date(`${interviewDate}T${interviewTime}`);
    Object.keys(selectedApplications).forEach((appId) => {
      if (selectedApplications[appId]) {
        const app = applications.find(
          (a) => a.ApplicationID.toString() === appId
        );
        if (app) {
          slots.push({
            id: appId,
            name: `${app.FirstName} ${app.LastName}`,
            time: currentTime.toTimeString().substr(0, 5),
            date: interviewDate,
          });
          currentTime.setMinutes(currentTime.getMinutes() + 30);
        }
      }
    });
    return slots;
  };

  const handleScheduleInterview = async () => {
    const timeSlots = calculateTimeSlots();
    const selectedCount = timeSlots.length;

    if (selectedCount === 0) {
      alert("Please select at least one applicant");
      return;
    }

    if (
      !interviewDate ||
      !interviewTime ||
      !interviewLocation ||
      !interviewDepartmentID
    ) {
      alert("Please fill in all required interview details");
      return;
    }

    try {
      const interviewSlots = timeSlots.map((slot) => ({
        applicationId: slot.id,
        interviewDate: slot.date,
        interviewTime: slot.time,
        interviewLocation,
        zoomLink: zoomLink || null,
        department: interviewDepartmentID, // Ensure consistency
      }));

      const response = await fetch(
        "http://localhost:5000/api/interview-schedule/bulk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ interviews: interviewSlots }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      let confirmationMessage = `Successfully scheduled ${selectedCount} interviews:\n`;
      timeSlots.forEach((slot, index) => {
        confirmationMessage += `\n${index + 1}. ${slot.name} - ${
          slot.date
        } at ${slot.time}`;
      });

      alert(confirmationMessage);
      navigate("/application-management");
    } catch (err) {
      console.error("Error scheduling interviews:", err);
      alert(`Error scheduling interviews: ${err.message}`);
    }
  };

  const resetForm = () => {
    setSelectedApplications({});
    setInterviewDate("");
    setInterviewTime("");
    setInterviewLocation("");
    setZoomLink("");
    setInterviewDepartmentID("");
  };

  const jobTitles = [
    ...new Set(applications.map((app) => app.JobTitle).filter(Boolean)),
  ];
  const statusOptions = [
    "New",
    "Reviewed",
    "Interview Scheduled",
    "Hired",
    "Rejected",
  ];
  const timeSlots = calculateTimeSlots();
  const selectedCount =
    Object.values(selectedApplications).filter(Boolean).length;

  if (isLoading) return <div className="loading">Loading applications...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="interview-scheduling-container">
      <div className="interview-scheduling-sidebar">
        <div className="interview-scheduling-sidebar-header">
          <h2>HR Manager</h2>
        </div>
        <nav className="interview-scheduling-nav">
          <Link to="/job-postings" className="interview-scheduling-nav-link">
            📋 Job Postings Overview
          </Link>
          <Link
            to="/application-management"
            className="interview-scheduling-nav-link"
          >
            📄 Application Management
          </Link>
          <Link
            to="/department-head-management"
            className="interview-scheduling-nav-link"
          >
            👔 Interviewer Management
          </Link>
          <Link to="/result" className="interview-scheduling-nav-link">
            📊 Results Dashboard
          </Link>
        </nav>
      </div>

      <div className="interview-scheduling-main-content">
        <header className="interview-scheduling-header">
          <h1>Schedule Interviews</h1>
          <p>Select applicants and set interview details</p>
        </header>

        <div className="filter-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, email, or job..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-dropdowns">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              <option value="all">All Jobs</option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="applications-table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      filteredApplications.length > 0 &&
                      filteredApplications.every(
                        (app) => selectedApplications[app.ApplicationID]
                      )
                    }
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Score</th> {/* New Score Header */}
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app.ApplicationID}>
                    <td>
                      <input
                        type="checkbox"
                        checked={!!selectedApplications[app.ApplicationID]}
                        onChange={() => handleCheckboxChange(app.ApplicationID)}
                      />
                    </td>
                    <td>
                      {app.FirstName} {app.LastName}
                    </td>
                    <td>{app.Email || "-"}</td>
                    <td>{app.JobTitle}</td>
                    <td>
                      <span
                        className={`status-badge ${(app.Status || "")
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {app.Status}
                      </span>
                    </td>
                    <td>
                      {app.AppliedDate
                        ? new Date(app.AppliedDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{app.Score !== undefined ? app.Score : "-"}</td>{" "}
                    {/* Display Score */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">
                    No applications found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="interview-form-section">
          <h3>Interview Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="interviewDate">Interview Date*</label>
              <input
                type="date"
                id="interviewDate"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="interviewTime">First Interview Time*</label>
              <input
                type="time"
                id="interviewTime"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="interviewLocation">Interview Location*</label>
              <input
                type="text"
                id="interviewLocation"
                value={interviewLocation}
                onChange={(e) => setInterviewLocation(e.target.value)}
                placeholder="Office location or 'Virtual'"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zoomLink">Zoom Link (if virtual)</label>
              <input
                type="url"
                id="zoomLink"
                value={zoomLink}
                onChange={(e) => setZoomLink(e.target.value)}
                placeholder="https://zoom.us/j/..."
                pattern="https?://.+"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="interviewDepartment">Department*</label>
            <select
              id="interviewDepartment"
              value={interviewDepartmentID}
              onChange={(e) => setInterviewDepartmentID(e.target.value)}
              required
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.DepartmentID} value={dept.DepartmentID}>
                  {dept.DepartmentName}
                </option>
              ))}
            </select>
          </div>
          {selectedCount > 0 && interviewDate && interviewTime && (
            <div className="time-slots-preview">
              <h4>Scheduled Time Slots:</h4>
              {timeSlots.map((slot) => (
                <div key={slot.id}>
                  {slot.name} - {slot.date} at {slot.time}
                </div>
              ))}
            </div>
          )}

          <div className="form-actions">
            <button onClick={handleScheduleInterview} className="primary-btn">
              Schedule Interview{selectedCount > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduling;
