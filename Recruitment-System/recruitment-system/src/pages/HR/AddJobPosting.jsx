import React, { useState } from "react";

const AddJobPosting = ({ onAddJob, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    deadline: "",
    minExperienceYears: 0,
    requiredQualifications: "",
    requiredSkills: "",
    employmentType: "Full-time",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      createdAt: new Date().toISOString(),
      applications: 0,
      status: "Open",
    };
    onAddJob(jobData); // Call the API through the parent component
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Add New Job Posting</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", minHeight: "100px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Qualifications:
          </label>
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", minHeight: "100px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Responsibilities:
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", minHeight: "100px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Deadline:
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Minimum Experience Years:
          </label>
          <input
            type="number"
            name="minExperienceYears"
            value={formData.minExperienceYears}
            onChange={handleChange}
            min="0"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Required Qualifications:
          </label>
          <input
            type="text"
            name="requiredQualifications"
            value={formData.requiredQualifications}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Required Skills:
          </label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Employment Type:
          </label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0f0f0",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#5A7BBD",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobPosting;
