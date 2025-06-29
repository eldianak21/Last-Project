// const db = require("../config/db");

// exports.getApplications = async (req, res) => {
//   try {
//     const query = `
//       SELECT a.*, i.InterviewType, i.InterviewDate
//       FROM Applications a
//       LEFT JOIN interviews i ON a.UserID = i.UserID
//     `;
//     const [results] = await db.query(query);
//     res.json(results);
//   } catch (error) {
//     console.error("Database query failed:", error.message);
//     res
//       .status(500)
//       .json({ error: "Database query failed", details: error.message });
//   }
// };

// backend/controllers/applicationController.js

// backend/controllers/applicationController.js

// backend/controllers/applicationController.js

// const db = require("../config/db");

// exports.getApplications = async (req, res) => {
//   try {
//     const query = `
//       SELECT
//         a.*,
//         a.Resume,  -- Get Resume from the Applications table
//         j.Title AS JobTitle
//       FROM
//         Applications a
//       LEFT JOIN
//         JobPostings j ON a.JobID = j.JobID;
//     `;
//     const [results] = await db.query(query);
//     res.json(results);
//   } catch (error) {
//     console.error("Database query failed:", error.message);
//     res
//       .status(500)
//       .json({ error: "Database query failed", details: error.message });
//   }
// };

// backend/controllers/applicationController.js

// const db = require("../config/db");

// exports.getApplications = async (req, res) => {
//   try {
//     const query = `
//       SELECT
//         a.*,
//         a.Resume,
//         j.Title AS JobTitle
//       FROM
//         Applications a
//       LEFT JOIN
//         JobPostings j ON a.JobID = j.JobID;
//     `;
//     const [results] = await db.query(query);
//     res.json(results);
//   } catch (error) {
//     console.error("Database query failed:", error.message);
//     res
//       .status(500)
//       .json({ error: "Database query failed", details: error.message });
//   }
// };

// const db = require("../config/db");
// exports.getApplications = async (req, res) => {
//   try {
//     const query = `
//       SELECT
//         a.*,
//         a.Resume,
//         j.Title AS JobTitle
//       FROM
//         Applications a
//       LEFT JOIN
//         JobPostings j ON a.JobID = j.JobID
//       ORDER BY
//         a.Score DESC;  -- Assuming there's a Score column in Applications
//     `;
//     const [results] = await db.query(query);
//     res.json(results);
//   } catch (error) {
//     console.error("Database query failed:", error.message);
//     res
//       .status(500)
//       .json({ error: "Database query failed", details: error.message });
//   }
// };

const db = require("../config/db");

exports.getApplications = async (req, res) => {
  try {
    const query = `
      SELECT
        a.*,
        a.Resume,
        j.Title AS JobTitle
      FROM
        Applications a
      LEFT JOIN
        JobPostings j ON a.JobID = j.JobID
      ORDER BY
        a.Score DESC;  -- Sorting by Score
    `;
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error("Database query failed:", error.message);
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
};
