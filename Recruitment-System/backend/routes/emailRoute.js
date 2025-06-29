const express = require("express");
const router = express.Router();
const emailControllers = require("../controllers/emailControllers");

// Send emails route
router.post("/send", emailControllers.sendEmail);

// NEW: Log applicants' emails route
// NEW: Log applicants' emails route
router.post("/log-applicants", (req, res) => {
  const { applicants } = req.body;

  if (!applicants || !Array.isArray(applicants)) {
    return res.status(400).json({ error: "Invalid applicants data" });
  }

  console.log("\n=== Passed Applicants' Emails ===");
  applicants.forEach((applicant, index) => {
    console.log(`${index + 1}. ${applicant.Email}`);
  });
  console.log("===============================\n");

  res.status(200).json({ message: "Applicants logged successfully" });
});

module.exports = router;
