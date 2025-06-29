const db = require("../config/db");

// Function to add a new job posting
exports.addJobPosting = async (req, res) => {
  const {
    title,
    description,
    qualifications,
    responsibilities,
    deadline,
    minExperienceYears,
    requiredQualifications,
    requiredSkills,
    employmentType, // Added employmentType
  } = req.body;

  const query =
    "INSERT INTO JobPostings (Title, Description, Qualifications, Responsibilities, Deadline, MinExperienceYears, RequiredQualifications, RequiredSkills, EmploymentType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const [result] = await db.query(query, [
      title,
      description,
      qualifications,
      responsibilities,
      deadline,
      minExperienceYears,
      requiredQualifications,
      requiredSkills,
      employmentType, // Added employmentType
    ]);

    // Send back the response with the new job ID
    return res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error("Error inserting job posting:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Function to get all job postings
exports.getJobPostings = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM JobPostings");
    res.json(results);
  } catch (err) {
    console.error("Error fetching job postings:", err);
    return res.status(500).json({ error: err.message });
  }
};
