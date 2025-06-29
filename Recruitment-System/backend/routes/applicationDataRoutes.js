const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applicationsController");

// GET all applications
router.get("/", applicationsController.getApplications);

module.exports = router;
