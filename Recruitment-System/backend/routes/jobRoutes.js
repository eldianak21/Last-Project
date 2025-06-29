// const express = require('express');
// const multer = require('multer');
// const jobController = require('../controllers/jobController');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // Directory for resume uploads

// // Get all job postings
// router.get('/', jobController.getJobPostings);

// // Get job details by ID
// router.get('/:id', jobController.getJobById);

// // Submit an application for a specific job
// router.post('/:jobId/apply', upload.single('resume'), jobController.submitApplication);

// module.exports = router;

// routes/jobRoutes.js
const express = require("express");
const multer = require("multer");
const jobController = require("../controllers/jobController");
const path = require("path");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store uploaded files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

// Get all job postings
router.get("/", jobController.getJobPostings);

// Get job details by ID
router.get("/:id", jobController.getJobById);

// Delete a job posting
router.delete("/:id", jobController.deleteJobPosting); // Add the new route

// Submit an application for a specific job
router.post(
  "/:jobId/apply",
  upload.single("resume"),
  jobController.submitApplication
);

module.exports = router;
