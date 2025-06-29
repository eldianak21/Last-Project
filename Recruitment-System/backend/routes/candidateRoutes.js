const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

// GET candidate details
router.get("/:candidateId", candidateController.getCandidateById);

module.exports = router;
