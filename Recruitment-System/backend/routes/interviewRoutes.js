// interviewRoutes.js
const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");

router.post("/", interviewController.createInterview);

module.exports = router;
