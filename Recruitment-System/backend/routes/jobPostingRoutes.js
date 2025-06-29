const express = require("express");
const router = express.Router();
const jobPostingController = require("../controllers/jobPostingController");

// Route to fetch all job postings
router.get("/", jobPostingController.getJobPostings);

// Route to add a new job posting
router.post("/", jobPostingController.addJobPosting);

// You can add more routes here for additional functionality

module.exports = router;
