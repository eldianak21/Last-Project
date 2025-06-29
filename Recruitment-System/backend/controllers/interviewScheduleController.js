// const db = require("../config/db");

// const scheduleInterview = async (req, res) => {
//   const interviews = req.body.interviews; // Expecting an array of interviews

//   if (!Array.isArray(interviews) || interviews.length === 0) {
//     return res.status(400).json({
//       message: "Missing or invalid data. Expecting an array of interviews.",
//     });
//   }

//   try {
//     for (const interview of interviews) {
//       const {
//         applicationId,
//         interviewDate,
//         interviewTime,
//         interviewLocation,
//         zoomLink,
//       } = interview;

//       if (!applicationId || !interviewDate || !interviewTime) {
//         return res.status(400).json({
//           message:
//             "Missing required fields: applicationId, interviewDate, interviewTime",
//         });
//       }

//       const checkSql = `SELECT * FROM interview WHERE application_id = ? AND interview_date = ? AND interview_time = ?`;
//       const [existingInterview] = await db.execute(checkSql, [
//         applicationId,
//         interviewDate,
//         interviewTime,
//       ]);

//       let sql;
//       let values;

//       if (existingInterview.length > 0) {
//         sql = `
//           UPDATE interview
//           SET
//             interview_location = ?,
//             zoom_link = ?
//           WHERE application_id = ? AND interview_date = ? AND interview_time = ?
//         `;
//         values = [
//           interviewLocation || null,
//           zoomLink || null,
//           applicationId,
//           interviewDate,
//           interviewTime,
//         ];
//       } else {
//         sql = `
//           INSERT INTO interview (
//             application_id,
//             interview_date,
//             interview_time,
//             interview_location,
//             zoom_link
//           ) VALUES (?, ?, ?, ?, ?)
//         `;
//         values = [
//           applicationId,
//           interviewDate,
//           interviewTime,
//           interviewLocation || null,
//           zoomLink || null,
//         ];
//       }

//       await db.execute(sql, values);
//     }

//     res.status(200).json({ message: "Interview details saved successfully" });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res
//       .status(500)
//       .json({ message: "Error processing request", error: error.message });
//   }
// };

// module.exports = {
//   scheduleInterview,
// };

// const db = require("../config/db");
// const scheduleInterview = async (req, res) => {
//   const interviews = req.body.interviews; // Expecting an array of interviews

//   if (!Array.isArray(interviews) || interviews.length === 0) {
//     return res.status(400).json({
//       message: "Missing or invalid data. Expecting an array of interviews.",
//     });
//   }

//   try {
//     for (const interview of interviews) {
//       const {
//         applicationId,
//         interviewDate,
//         interviewTime,
//         interviewLocation,
//         zoomLink,
//       } = interview;

//       if (!applicationId || !interviewDate || !interviewTime) {
//         return res.status(400).json({
//           message:
//             "Missing required fields: applicationId, interviewDate, interviewTime",
//         });
//       }

//       const checkSql = `SELECT * FROM interview WHERE application_id = ? AND interview_date = ? AND interview_time = ?`;
//       const [existingInterview] = await db.execute(checkSql, [
//         applicationId,
//         interviewDate,
//         interviewTime,
//       ]);

//       let sql;
//       let values;

//       if (existingInterview.length > 0) {
//         // Update the existing interview
//         sql = `
//           UPDATE interview
//           SET
//             interview_location = ?,
//             zoom_link = ?
//           WHERE application_id = ? AND interview_date = ? AND interview_time = ?
//         `;
//         values = [
//           interviewLocation || null,
//           zoomLink || null,
//           applicationId,
//           interviewDate,
//           interviewTime,
//         ];
//       } else {
//         // Insert a new interview
//         sql = `
//           INSERT INTO interview (
//             application_id,
//             interview_date,
//             interview_time,
//             interview_location,
//             zoom_link
//           ) VALUES (?, ?, ?, ?, ?)
//         `;
//         values = [
//           applicationId,
//           interviewDate,
//           interviewTime,
//           interviewLocation || null,
//           zoomLink || null,
//         ];
//       }

//       // Execute the SQL for insert or update
//       await db.execute(sql, values);

//       // Update the applicant's status
//       await db.execute(
//         "UPDATE applications SET Status = ? WHERE ApplicationID = ?",
//         ["Interview Scheduled", applicationId]
//       );
//     }

//     res.status(200).json({ message: "Interview details saved successfully" });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res
//       .status(500)
//       .json({ message: "Error processing request", error: error.message });
//   }
// };

// module.exports = {
//   scheduleInterview,
// };

// const db = require("../config/db");

// const scheduleInterview = async (req, res) => {
//   const interviews = req.body.interviews;

//   if (!Array.isArray(interviews) || interviews.length === 0) {
//     return res.status(400).json({ message: "Missing or invalid data." });
//   }

//   try {
//     for (const interview of interviews) {
//       const {
//         applicationId,
//         interviewDate,
//         interviewTime,
//         interviewLocation,
//         zoomLink,
//         department,
//       } = interview;

//       if (!applicationId || !interviewDate || !interviewTime || !department) {
//         return res.status(400).json({ message: "Missing required fields." });
//       }

//       const checkSql = `SELECT * FROM interview WHERE application_id = ? AND interview_date = ? AND interview_time = ?`;
//       const [existingInterview] = await db.execute(checkSql, [
//         applicationId,
//         interviewDate,
//         interviewTime,
//       ]);

//       let sql;
//       let values;

//       if (existingInterview.length > 0) {
//         sql = `
//           UPDATE interview
//           SET
//             interview_location = ?,
//             zoom_link = ?,
//             department = ?
//           WHERE application_id = ? AND interview_date = ? AND interview_time = ?
//         `;
//         values = [
//           interviewLocation || null,
//           zoomLink || null,
//           department,
//           applicationId,
//           interviewDate,
//           interviewTime,
//         ];
//       } else {
//         sql = `
//           INSERT INTO interview (
//             application_id,
//             interview_date,
//             interview_time,
//             interview_location,
//             zoom_link,
//             department
//           ) VALUES (?, ?, ?, ?, ?, ?)
//         `;
//         values = [
//           applicationId,
//           interviewDate,
//           interviewTime,
//           interviewLocation || null,
//           zoomLink || null,
//           department,
//         ];
//       }

//       await db.execute(sql, values);
//       await db.execute(
//         "UPDATE applications SET Status = ? WHERE ApplicationID = ?",
//         ["Interview Scheduled", applicationId]
//       );
//     }

//     res.status(200).json({ message: "Interview details saved successfully" });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res
//       .status(500)
//       .json({ message: "Error processing request", error: error.message });
//   }
// };

// module.exports = {
//   scheduleInterview,
// };

const db = require("../config/db");

const scheduleInterview = async (req, res) => {
  const interviews = req.body.interviews;

  if (!Array.isArray(interviews) || interviews.length === 0) {
    return res.status(400).json({ message: "Missing or invalid data." });
  }

  try {
    for (const interview of interviews) {
      const {
        applicationId,
        interviewDate,
        interviewTime,
        interviewLocation,
        zoomLink,
        department, // Ensure this matches the frontend
      } = interview;

      if (!applicationId || !interviewDate || !interviewTime || !department) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const checkSql = `SELECT * FROM interview WHERE application_id = ? AND interview_date = ? AND interview_time = ?`;
      const [existingInterview] = await db.execute(checkSql, [
        applicationId,
        interviewDate,
        interviewTime,
      ]);

      let sql;
      let values;

      if (existingInterview.length > 0) {
        sql = `
          UPDATE interview
          SET
            interview_location = ?,
            zoom_link = ?,
            department = ?
          WHERE application_id = ? AND interview_date = ? AND interview_time = ?
        `;
        values = [
          interviewLocation || null,
          zoomLink || null,
          department,
          applicationId,
          interviewDate,
          interviewTime,
        ];
      } else {
        sql = `
          INSERT INTO interview (
            application_id,
            interview_date,
            interview_time,
            interview_location,
            zoom_link,
            department
          ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        values = [
          applicationId,
          interviewDate,
          interviewTime,
          interviewLocation || null,
          zoomLink || null,
          department,
        ];
      }

      await db.execute(sql, values);
      await db.execute(
        "UPDATE applications SET Status = ? WHERE ApplicationID = ?",
        ["Interview Scheduled", applicationId]
      );
    }

    res.status(200).json({ message: "Interview details saved successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res
      .status(500)
      .json({ message: "Error processing request", error: error.message });
  }
};

module.exports = {
  scheduleInterview,
};
