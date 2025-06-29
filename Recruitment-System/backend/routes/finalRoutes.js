const express = require("express");
const router = express.Router();
const { getEvaluationsWithStatus } = require("../controllers/finalController"); // Import the controller function

router.get("/:id", getEvaluationsWithStatus);

module.exports = router;
