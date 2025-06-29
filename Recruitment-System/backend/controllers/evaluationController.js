// const db = require("../config/db");

// // Get applicant data by ID
// const getApplicantById = async (req, res) => {
//   const applicantId = req.params.id;

//   try {
//     const [result] = await db.query(
//       `SELECT a.FirstName, a.LastName
//        FROM applications a
//        JOIN applications app ON a.ApplicationID = app.ApplicationID
//        WHERE app.ApplicationID = ?`,
//       [applicantId]
//     );

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Applicant not found." });
//     }

//     res.json(result[0]);
//   } catch (error) {
//     console.error("Error fetching applicant:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get evaluations by ApplicationID
// const getEvaluationsById = async (req, res) => {
//   const applicationId = req.params.id; // This should now refer to ApplicationID

//   try {
//     const [evaluations] = await db.query(
//       "SELECT * FROM evaluations WHERE ApplicationID = ?", // Use ApplicationID in the query
//       [applicationId]
//     );

//     // Log the evaluations for debugging
//     console.log("Fetched evaluations:", evaluations);

//     if (evaluations.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No evaluations found for this Application ID." });
//     }

//     res.json(evaluations);
//   } catch (error) {
//     console.error("Error fetching evaluations:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const getPassedApplicants = async (req, res) => {
//   try {
//     const [applicants] = await db.query(`
//       SELECT a.FirstName, a.LastName, a.Email,
//              e.communication_skills, e.technical_skills,
//              e.total_score, e.evaluated_at
//       FROM evaluations e
//       JOIN applications app ON e.ApplicationID = app.ApplicationID
//       JOIN applications a ON app.ApplicationID = a.ApplicationID
//       WHERE e.total_score >= 5
//       ORDER BY e.total_score DESC
//     `);

//     res.json(applicants);
//   } catch (error) {
//     console.error("Error fetching passed applicants:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   getApplicantById,
//   getEvaluationsById,
//   getPassedApplicants,
// };

const db = require("../config/db");
const nodemailer = require("nodemailer");

// Create a reusable email transporter using Gmail as the service
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other email service you use
  auth: {
    user: "your-email@gmail.com", // Your email
    pass: "your-email-password", // Your email password or app-specific password
  },
});

// Send email to the passed applicant
const sendEmail = async (email, firstName, lastName) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Congratulations! You have passed the interview",
    text: `
      Dear ${firstName} ${lastName},

      Congratulations! You have passed the interview. We appreciate your efforts and would like to inform you that you are moving forward to the next stage.

      Best regards,
      Jimma University Recruitment Team
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Get applicant data by ID
const getApplicantById = async (req, res) => {
  const applicantId = req.params.id;

  try {
    const [result] = await db.query(
      `SELECT a.FirstName, a.LastName 
       FROM applications a
       WHERE a.ApplicationID = ?`,
      [applicantId]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Applicant not found." });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching applicant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get evaluations by ApplicationID
const getEvaluationsById = async (req, res) => {
  const applicationId = req.params.id; // This should now refer to ApplicationID

  try {
    const [evaluations] = await db.query(
      "SELECT * FROM evaluations WHERE ApplicationID = ?", // Use ApplicationID in the query
      [applicationId]
    );

    if (evaluations.length === 0) {
      return res
        .status(404)
        .json({ message: "No evaluations found for this Application ID." });
    }

    res.json(evaluations);
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get passed applicants and send them emails
const getPassedApplicants = async (req, res) => {
  try {
    // Fetch passed applicants from the database
    const [applicants] = await db.query(`
      SELECT a.FirstName, a.LastName, a.Email, 
             e.communication_skills, e.technical_skills, 
             e.total_score, e.evaluated_at
      FROM evaluations e
      JOIN applications app ON e.ApplicationID = app.ApplicationID
      JOIN applications a ON app.ApplicationID = a.ApplicationID
      WHERE e.total_score >= 5
      ORDER BY e.total_score DESC
    `);

    if (applicants.length > 0) {
      // Send emails to passed applicants in parallel
      await Promise.all(
        applicants.map((applicant) =>
          sendEmail(applicant.Email, applicant.FirstName, applicant.LastName)
        )
      );
    }

    res.json(applicants);
  } catch (error) {
    console.error("Error fetching passed applicants:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export functions
module.exports = {
  getApplicantById,
  getEvaluationsById,
  getPassedApplicants,
};
