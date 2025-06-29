// interviewController.js
const db = require("../config/db");
exports.createInterview = async (req, res) => {
  try {
    const {
      UserID,
      InterviewDate,
      InterviewTime,
      InterviewLocation,
      ZoomLink,
    } = req.body;

    // Validate the data (optional, but recommended)
    if (!UserID || !InterviewDate || !InterviewTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new interview record in the database
    const query = `
      INSERT INTO Interviews (UserID, InterviewDate, InterviewTime, InterviewLocation, ZoomLink, Status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [
        UserID,
        InterviewDate,
        InterviewTime,
        InterviewLocation,
        ZoomLink,
        "Scheduled",
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error creating interview:", error);
          return res
            .status(500)
            .json({ message: "Server error", error: error.message });
        }

        // Get the ID of the newly inserted interview (if needed)
        const newInterviewId = results.insertId;

        // Fetch the newly created interview record (optional, but good practice)
        const selectQuery = "SELECT * FROM Interviews WHERE InterviewID = ?"; // Assuming InterviewID is your primary key

        connection.query(
          selectQuery,
          [newInterviewId],
          (selectError, selectResults) => {
            if (selectError) {
              console.error("Error fetching new interview:", selectError);
              return res
                .status(500)
                .json({ message: "Server error", error: selectError.message });
            }

            const newInterview = selectResults[0]; // Get the first result (the interview)

            res.status(201).json({
              message: "Interview created successfully",
              interview: newInterview,
            }); // 201 Created
          }
        );
      }
    );
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
