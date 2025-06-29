// const db = require("../config/db");

// const getInterviews = async (req, res) => {
//   try {
//     // Verify table structures
//     const [interviewColumns] = await db.query("SHOW COLUMNS FROM interview");
//     const [applicationColumns] = await db.query(
//       "SHOW COLUMNS FROM applications"
//     );
//     const [evaluationColumns] = await db.query("SHOW COLUMNS FROM evaluations");

//     const interviewFields = interviewColumns.map((col) => col.Field);
//     const applicationFields = applicationColumns.map((col) => col.Field);
//     const evaluationFields = evaluationColumns.map((col) => col.Field);

//     console.log("Table columns:", {
//       interview: interviewFields,
//       applications: applicationFields,
//       evaluations: evaluationFields,
//     });

//     // Build query with correct column names
//     const query = `
//       SELECT
//         i.id,
//         i.application_id,
//         i.interview_date,
//         i.interview_time,
//         i.interview_location,
//         i.zoom_link,
//         'Pending' AS status,
//         ${
//           applicationFields.includes("FirstName") ? "a.FirstName" : "NULL"
//         } AS firstName,
//         ${
//           applicationFields.includes("LastName") ? "a.LastName" : "NULL"
//         } AS lastName,
//         ${applicationFields.includes("Email") ? "a.Email" : "NULL"} AS email,
//         ${applicationFields.includes("Phone1") ? "a.Phone1" : "NULL"} AS phone,
//         ${
//           evaluationFields.includes("communication_skills")
//             ? "e.communication_skills"
//             : "NULL"
//         } AS communication,
//         ${
//           evaluationFields.includes("technical_skills")
//             ? "e.technical_skills"
//             : "NULL"
//         } AS technical,
//         ${
//           evaluationFields.includes("notes") ? "e.notes" : "NULL"
//         } AS implementation_skills,
//         ${
//           evaluationFields.includes("total_score") ? "e.total_score" : "NULL"
//         } AS total_score,
//         ${
//           evaluationFields.includes("evaluated_at") ? "e.evaluated_at" : "NULL"
//         } AS evaluated_at
//       FROM interview i
//       JOIN applications a ON i.application_id = a.ApplicationID
//       LEFT JOIN evaluations e ON i.application_id = e.application_id
//       ORDER BY i.interview_date ASC, i.interview_time ASC
//     `;

//     const [interviews] = await db.query(query);

//     const formattedInterviews = interviews.map((interview) => ({
//       id: interview.id,
//       application_id: interview.application_id,
//       firstName: interview.firstName,
//       lastName: interview.lastName,
//       email: interview.email,
//       phone: interview.phone,
//       interview_date: interview.interview_date,
//       interview_time: interview.interview_time,
//       interview_location: interview.interview_location,
//       zoom_link: interview.zoom_link,
//       status: interview.status,
//       evaluation: interview.communication
//         ? {
//             communication: interview.communication,
//             technical: interview.technical,
//             implementation_skills: interview.implementation_skills,
//             total_score: interview.total_score,
//             evaluated_at: interview.evaluated_at,
//           }
//         : null,
//     }));

//     res.json({
//       success: true,
//       data: formattedInterviews,
//     });
//   } catch (error) {
//     console.error("Error fetching interviews:", {
//       message: error.message,
//       sql: error.sql,
//       stack: error.stack,
//     });

//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch interviews",
//       details:
//         process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// const submitEvaluation = async (req, res) => {
//   try {
//     const { application_id, communication, technical, notes } = req.body;

//     // Calculate total score
//     const total_score = ((communication + technical) / 2).toFixed(1);

//     // Check for existing evaluation
//     const [existing] = await db.query(
//       "SELECT * FROM evaluations WHERE application_id = ?",
//       [application_id]
//     );

//     if (existing.length > 0) {
//       return res.status(400).json({
//         success: false,
//         error: "Evaluation already exists for this application",
//       });
//     }

//     // Create new evaluation
//     const [result] = await db.query(
//       `INSERT INTO evaluations
//        (application_id, communication_skills, technical_skills, notes, total_score, evaluated_at)
//        VALUES (?, ?, ?, ?, ?, NOW())`,
//       [application_id, communication, technical, notes, total_score]
//     );

//     res.json({
//       success: true,
//       data: {
//         id: result.insertId,
//         application_id,
//         communication,
//         technical,
//         implementation_skills: notes,
//         total_score,
//         evaluated_at: new Date(),
//       },
//     });
//   } catch (error) {
//     console.error("Error submitting evaluation:", {
//       message: error.message,
//       stack: error.stack,
//     });

//     res.status(500).json({
//       success: false,
//       error: "Failed to submit evaluation",
//       details:
//         process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// module.exports = {
//   getInterviews,
//   submitEvaluation,
// };

// const db = require("../config/db");

// const getInterviews = async (req, res) => {
//   try {
//     const query = `
//       SELECT
//         i.id,
//         i.application_id,
//         i.interview_date,
//         i.interview_time,
//         i.interview_location,
//         i.zoom_link,
//         'Pending' AS status,
//         a.FirstName,
//         a.LastName,
//         a.Email,
//         a.Phone1 AS phone,
//         e.communication_skills AS communication,
//         e.technical_skills AS technical,
//         e.notes AS implementation_skills,
//         e.total_score,
//         e.evaluated_at
//       FROM interview i
//       JOIN applications a ON i.application_id = a.ApplicationID
//       LEFT JOIN evaluations e ON i.application_id = e.application_id
//       ORDER BY i.interview_date ASC, i.interview_time ASC
//     `;

//     const [interviews] = await db.query(query);

//     const formattedInterviews = interviews.map((interview) => ({
//       id: interview.id,
//       application_id: interview.application_id,
//       firstName: interview.FirstName,
//       lastName: interview.LastName,
//       email: interview.Email,
//       phone: interview.phone,
//       interview_date: interview.interview_date,
//       interview_time: interview.interview_time,
//       interview_location: interview.interview_location,
//       zoom_link: interview.zoom_link,
//       status: interview.status,
//       evaluation: interview.communication
//         ? {
//             communication: interview.communication,
//             technical: interview.technical,
//             implementation_skills: interview.implementation_skills,
//             total_score: interview.total_score,
//             evaluated_at: interview.evaluated_at,
//           }
//         : null,
//     }));

//     res.json({ success: true, data: formattedInterviews });
//   } catch (error) {
//     console.error("Error fetching interviews:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch interviews",
//       details:
//         process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// const submitEvaluation = async (req, res) => {
//   try {
//     const { application_id, communication, technical, notes } = req.body;
//     const total_score = ((communication + technical) / 2).toFixed(1);

//     // Check for existing evaluation
//     const [existing] = await db.query(
//       "SELECT * FROM evaluations WHERE application_id = ?",
//       [application_id]
//     );

//     if (existing.length > 0) {
//       return res.status(400).json({
//         success: false,
//         error: "Evaluation already exists for this application",
//       });
//     }

//     // Create new evaluation
//     const [result] = await db.query(
//       `INSERT INTO evaluations
//        (application_id, communication_skills, technical_skills, notes, total_score, evaluated_at)
//        VALUES (?, ?, ?, ?, ?, NOW())`,
//       [application_id, communication, technical, notes, total_score]
//     );

//     res.status(201).json({
//       success: true,
//       data: {
//         id: result.insertId,
//         application_id,
//         communication,
//         technical,
//         implementation_skills: notes,
//         total_score,
//         evaluated_at: new Date(),
//       },
//     });
//   } catch (error) {
//     console.error("Error submitting evaluation:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to submit evaluation",
//       details:
//         process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// module.exports = {
//   getInterviews,
//   submitEvaluation,
// };

// const db = require("../config/db");

// const getInterviews = async (req, res) => {
//   const { userId } = req.params;
//   console.log(`Received request for userId: ${userId}`);
//   try {
//     const query = `
//       SELECT i.id, i.interview_date, i.interview_time, i.interview_location, u.FirstName, u.LastName, a.ApplicationID
//       FROM interview AS i
//       JOIN applications AS a ON i.application_id = a.ApplicationID
//       JOIN interviewers AS it ON it.DepartmentID = i.department
//       JOIN users AS u ON a.UserID = u.UserID
//       WHERE it.UserID = ?
//     `;

//     console.log(`Executing query for interviewerId: ${userId}`);
//     const [interviews] = await db.execute(query, [userId]);

//     if (interviews.length === 0) {
//       return res.status(404).json({ message: "No interviews found." });
//     }

//     res.json(interviews);
//   } catch (error) {
//     console.error("Error fetching interviews:", error);
//     res.status(500).json({ message: "Error fetching interviews." });
//   }
// };

// // Submit evaluation
// const submitEvaluation = async (req, res) => {
//   const { applicationId, communication_skills, technical_skills, notes } =
//     req.body;

//   console.log("Received evaluation data:", {
//     applicationId,
//     communication_skills,
//     technical_skills,
//     notes,
//   });

//   try {
//     const totalScore =
//       parseInt(communication_skills) + parseInt(technical_skills);
//     const [result] = await db.execute(
//       `
//             INSERT INTO evaluations (application_id, communication_skills, technical_skills, notes, total_score)
//             VALUES (?, ?, ?, ?, ?)
//             `,
//       [applicationId, communication_skills, technical_skills, notes, totalScore]
//     );

//     res.status(201).json({
//       message: "Evaluation submitted successfully!",
//       evaluationId: result.insertId,
//     });
//   } catch (error) {
//     console.error("Error submitting evaluation:", error);
//     res.status(500).json({ message: "Error submitting evaluation." });
//   }
// };

// module.exports = { getInterviews, submitEvaluation };

const db = require("../config/db");

const getInterviews = async (req, res) => {
  const { userId } = req.params;
  console.log(`Received request for userId: ${userId}`);
  try {
    const query = `
      SELECT i.id, i.interview_date, i.interview_time, i.interview_location, u.FirstName, u.LastName, a.ApplicationID
      FROM interview AS i
      JOIN applications AS a ON i.application_id = a.ApplicationID
      JOIN interviewers AS it ON it.DepartmentID = i.department
      JOIN users AS u ON a.UserID = u.UserID
      WHERE it.UserID = ?
    `;

    console.log(`Executing query for interviewerId: ${userId}`);
    const [interviews] = await db.execute(query, [userId]);

    if (interviews.length === 0) {
      return res.status(404).json({ message: "No interviews found." });
    }

    res.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ message: "Error fetching interviews." });
  }
};

const submitEvaluation = async (req, res) => {
  const { application_id, communication_skills, technical_skills, notes } =
    req.body;

  console.log("Received evaluation data:", req.body);

  try {
    // Check if there is an interview that matches the application_id
    const [interviewCheck] = await db.execute(
      `SELECT id FROM interview WHERE application_id = ?`,
      [application_id]
    );

    if (interviewCheck.length === 0) {
      return res
        .status(400)
        .json({ message: "No interview found for the given Application ID." });
    }

    // Get the corresponding interview id
    const interviewId = interviewCheck[0].id;

    // Calculate the total score
    const totalScore =
      parseInt(communication_skills) + parseInt(technical_skills);

    // Insert into evaluations table
    const [result] = await db.execute(
      `
      INSERT INTO evaluations (application_id, communication_skills, technical_skills, notes, total_score, ApplicationID)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        interviewId, // Use the interviewId for the foreign key reference
        communication_skills,
        technical_skills,
        notes,
        totalScore,
        application_id,
      ]
    );

    // Remove all evaluations related to the interview
    await db.execute(`DELETE FROM evaluations WHERE application_id = ?`, [
      interviewId,
    ]);

    // Now remove the interview from the interview table
    await db.execute(`DELETE FROM interview WHERE id = ?`, [interviewId]);

    res.status(201).json({
      message: "Evaluation submitted successfully and interview removed!",
      evaluationId: result.insertId,
    });
  } catch (error) {
    console.error("Error submitting evaluation:", error);
    res.status(500).json({ message: "Error submitting evaluation." });
  }
};

module.exports = { getInterviews, submitEvaluation };
