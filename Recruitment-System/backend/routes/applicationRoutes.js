// routes/applicationRoutes.js
const express = require('express');
const multer = require('multer');
const db = require('../config/db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set upload directory

// Define your selection criteria
const selectionCriteria = {
  minExperienceYears: 2,
  requiredQualifications: ['Bachelor\'s', 'Master\'s'],
  requiredSkills: ['JavaScript', 'React'], // Adjust as needed
};

// Function to check if a candidate meets selection criteria
const meetsCriteria = (candidate) => {
  const { experienceYears, highestQualification, skills } = candidate;
  const hasRequiredExperience = experienceYears >= selectionCriteria.minExperienceYears;
  const hasRequiredQualification = selectionCriteria.requiredQualifications.includes(highestQualification);
  const hasRequiredSkills = selectionCriteria.requiredSkills.every(skill => skills.includes(skill));

  return hasRequiredExperience && hasRequiredQualification && hasRequiredSkills;
};

// Function to parse the resume (implement your parsing logic)
const parseResume = (resumeText) => {
  // Implement logic to extract relevant details
  return {
    personalInfo: {
      experienceYears: 3, // Example value; parse actual value
      highestQualification: "Bachelor's", // Example value; parse actual value
    },
    skills: ['JavaScript', 'React'], // Example; parse actual skills
  };
};

// Endpoint to submit a job application
router.post('/:jobId', upload.single('resume'), (req, res) => {
  const { userId } = req.body; // Assuming userId is sent in the body
  const jobId = req.params.jobId;
  const resumeText = req.file.buffer.toString(); // Convert buffer to string

  // Parse resume
  const parsedData = parseResume(resumeText);

  const candidate = {
    userId,
    jobId,
    resume: req.file.path,
    experienceYears: parsedData.personalInfo.experienceYears,
    highestQualification: parsedData.personalInfo.highestQualification,
    skills: parsedData.skills,
  };

  // Check if the candidate meets the selection criteria
  if (!meetsCriteria(candidate)) {
    return res.status(400).json({ message: 'Candidate does not meet the selection criteria.' });
  }

  // Insert application into Applications table
  const query = 'INSERT INTO Applications (UserID, JobID, Resume) VALUES (?, ?, ?)';
  db.query(query, [userId, jobId, candidate.resume], (err, result) => {
    if (err) {
      console.error('Error inserting application:', err);
      return res.status(500).json({ message: 'Error submitting application' });
    }
    res.status(200).json({ message: 'Application submitted successfully', applicationId: result.insertId });
  });
});

module.exports = router;