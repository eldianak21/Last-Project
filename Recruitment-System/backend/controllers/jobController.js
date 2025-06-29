// // controllers/jobController.js
// const db = require("../config/db");

// // Fetch all job postings
// const getJobPostings = async (req, res) => {
//   try {
//     const [results] = await db.query("SELECT * FROM JobPostings");
//     console.log("Fetched job postings:", results); // Log the results
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching job postings:", err); // Log the error
//     return res.status(500).json({ error: err.message });
//   }
// };

// // Fetch job details by ID
// const getJobById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [results] = await db.query(
//       "SELECT * FROM JobPostings WHERE JobID = ?",
//       [id]
//     );
//     if (results.length === 0)
//       return res.status(404).json({ message: "Job not found" });
//     res.json(results[0]);
//   } catch (err) {
//     console.error("Error fetching job by ID:", err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// // Submit an application
// const submitApplication = async (req, res) => {
//   const { userId } = req.body; // Assume userId is passed in the request body
//   const { jobId } = req.params;
//   const resumePath = req.file.path;

//   try {
//     const query = `
//             INSERT INTO Applications (UserID, JobID, Resume, Status)
//             VALUES (?, ?, ?, 'Submitted')
//         `;
//     const [result] = await db.query(query, [userId, jobId, resumePath]);
//     res.status(201).json({
//       message: "Application submitted successfully",
//       applicationId: result.insertId,
//     });
//   } catch (err) {
//     console.error("Error submitting application:", err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// module.exports = {
//   getJobPostings,
//   getJobById,
//   submitApplication,
// };

// controllers/jobController.js
const db = require("../config/db");

// Fetch all job postings
const getJobPostings = async (req, res) => {
  try {
    const query = `
      SELECT
        JobPostings.*,
        COUNT(Applications.JobID) AS Applications
      FROM
        JobPostings
      LEFT JOIN
        Applications ON JobPostings.JobID = Applications.JobID
      GROUP BY
        JobPostings.JobID
      ORDER BY
        JobPostings.JobID DESC;
    `;

    const [results] = await db.query(query);
    console.log("Fetched job postings:", results); // Log the results
    res.json(results);
  } catch (err) {
    console.error("Error fetching job postings:", err); // Log the error
    return res.status(500).json({ error: err.message });
  }
};

// Fetch job details by ID
const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query(
      "SELECT * FROM JobPostings WHERE JobID = ?",
      [id]
    );
    if (results.length === 0)
      return res.status(404).json({ message: "Job not found" });
    res.json(results[0]);
  } catch (err) {
    console.error("Error fetching job by ID:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Submit an application
const submitApplication = async (req, res) => {
  const { userId } = req.body; // Assume userId is passed in the request body
  const { jobId } = req.params;
  const resumePath = req.file.path;

  try {
    const query = `
      INSERT INTO Applications (UserID, JobID, Resume, Status)
      VALUES (?, ?, ?, 'Submitted')
    `;
    const [result] = await db.query(query, [userId, jobId, resumePath]);
    res.status(201).json({
      message: "Application submitted successfully",
      applicationId: result.insertId,
    });
  } catch (err) {
    console.error("Error submitting application:", err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteJobPosting = async (req, res) => {
  const { id } = req.params;
  try {
    // First, delete applications associated with the job posting
    await db.query("DELETE FROM Applications WHERE JobID = ?", [id]);

    // Then, delete the job posting itself
    const [result] = await db.query("DELETE FROM JobPostings WHERE JobID = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job posting not found" });
    }

    res.json({ message: "Job posting deleted successfully" });
  } catch (err) {
    console.error("Error deleting job posting:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getJobPostings,
  getJobById,
  submitApplication,
  deleteJobPosting, // Add the new function to the exports
};
