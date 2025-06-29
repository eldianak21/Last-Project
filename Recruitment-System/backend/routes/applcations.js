// backend/routes/applications.js
const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applicationsController");

router.get("/", applicationsController.getApplications);

module.exports = router;
