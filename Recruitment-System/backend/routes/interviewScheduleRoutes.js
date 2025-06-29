const express = require("express");
const router = express.Router();
const interviewScheduleController = require("../controllers/interviewScheduleController"); // Import the controller

// POST /api/interview-schedule
router.post("/bulk", interviewScheduleController.scheduleInterview);

module.exports = router;
