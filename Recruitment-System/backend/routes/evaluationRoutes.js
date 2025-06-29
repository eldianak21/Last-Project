const express = require("express");
const router = express.Router();
const { getEvaluationsById } = require("../controllers/evaluationController");

// Define the route to get evaluations by applicant ID
router.get("/:id", getEvaluationsById);

module.exports = router;
