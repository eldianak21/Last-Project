// const bcrypt = require("bcrypt");
// const db = require("../config/db");

// // Get all users
// const getInterviewers = async (req, res) => {
//   try {
//     console.log("Fetching interviewers from database...");

//     // MySQL version with ? placeholder
//     const result = await db.query(
//       `SELECT
//         UserID AS id,
//         FirstName AS firstName,
//         LastName AS lastName,
//         Email AS email,
//         Role AS role
//        FROM users
//        WHERE Role = ?`, // MySQL uses ? for parameters
//       ["Interviewer"] // Parameter value
//     );

//     console.log("Query executed. Row count:", result[0].length);
//     console.log("Sample interviewer:", result[0][0]);

//     if (result[0].length > 0) {
//       res.json(result[0]);
//     } else {
//       console.warn("No interviewers found with Role='Interviewer'");
//       res.json([]);
//     }
//   } catch (error) {
//     console.error("MySQL error details:", {
//       message: error.message,
//       sql: error.sql, // MySQL2 provides this
//       stack: error.stack,
//     });
//     res.status(500).json({
//       error: "Database operation failed",
//       details: error.message,
//     });
//   }
// };
// const addInterviewer = async (req, res) => {
//   const { firstName, lastName, email, role } = req.body; // Extract fields
//   const defaultPassword = "DefaultPassword123"; // Set a default password
//   const hashedPassword = await bcrypt.hash(defaultPassword, 10);

//   // Generate a username
//   const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

//   // Set default role to "Interviewer" if not provided
//   const userRole = role || "Interviewer"; // Use provided role or default to "Interviewer"

//   try {
//     await db.query(
//       "INSERT INTO Users (Username, Email, PasswordHash, Role, FirstName, LastName, requiresPasswordChange) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [username, email, hashedPassword, userRole, firstName, lastName, true] // Use the determined userRole
//     );
//     res.send({ message: "Interviewer user added successfully." });
//   } catch (error) {
//     console.error("Error adding HR user:", error);
//     res
//       .status(500)
//       .send({ message: "Failed to add Interviewer.", error: error.message });
//   }
// };

// // Remove User
// const removeInterviewer = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // No need for localStorage in backend - token is in headers
//     await db.query("DELETE FROM users WHERE UserID = ?", [id]);
//     res.status(200).json({
//       success: true,
//       message: "Interviewer removed successfully",
//     });
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to remove interviewer",
//       error: error.message,
//     });
//   }
// };

// // Export functions
// module.exports = {
//   getInterviewers,
//   addInterviewer,
//   removeInterviewer,
// };

const bcrypt = require("bcrypt");
const db = require("../config/db");

// Get all interviewers
const getInterviewers = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        u.UserID,
        u.FirstName,
        u.LastName,
        u.Email,
        d.DepartmentName
      FROM Users u
      JOIN Interviewers i ON u.UserID = i.UserID
      LEFT JOIN Departments d ON i.DepartmentID = d.DepartmentID
      WHERE u.Role = 'Interviewer'`
    );

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching interviewers:", error);
    res.status(500).send({ message: "Failed to fetch interviewers" });
  }
};

// Add interviewer
const addInterviewer = async (req, res) => {
  const { firstName, lastName, email, departmentID } = req.body;
  const defaultPassword = "DefaultPassword123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

  try {
    const userResult = await db.query(
      "INSERT INTO Users (Username, Email, PasswordHash, Role, FirstName, LastName, RequiresPasswordChange) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        email,
        hashedPassword,
        "Interviewer",
        firstName,
        lastName,
        true,
      ]
    );

    const userID = userResult[0].insertId; // Get the inserted user's ID
    await db.query(
      "INSERT INTO Interviewers (UserID, DepartmentID) VALUES (?, ?)",
      [userID, departmentID]
    );

    res.send({ message: "Interviewer added successfully." });
  } catch (error) {
    console.error("Error adding interviewer:", error);
    res
      .status(500)
      .send({ message: "Failed to add Interviewer.", error: error.message });
  }
};

// Remove interviewer
const removeInterviewer = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Interviewers WHERE UserID = ?", [id]);
    await db.query("DELETE FROM Users WHERE UserID = ?", [id]);
    res.status(200).json({ message: "Interviewer removed successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "Failed to remove interviewer", error: error.message });
  }
};

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Departments");
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).send({ message: "Failed to fetch departments" });
  }
};

module.exports = {
  getInterviewers,
  addInterviewer,
  removeInterviewer,
  getDepartments,
};
