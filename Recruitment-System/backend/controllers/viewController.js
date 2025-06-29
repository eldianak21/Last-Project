const db = require("../config/db");

exports.getApplicationById = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const query = "SELECT * FROM applications WHERE ApplicationID = ?";
    const [results] = await db.query(query, [applicationId]); // Remove .promise()

    if (results.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    const application = results[0];
    const applicationData = {
      ApplicationID: application.ApplicationID,
      FirstName: application.FirstName,
      LastName: application.LastName,
      Email: application.Email,
      // Add other fields as needed
    };

    console.log("Application data:", applicationData); // Fixed the logging
    res.json(applicationData);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
