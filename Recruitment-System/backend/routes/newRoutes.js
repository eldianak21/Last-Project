const express = require("express");
const router = express.Router();

const { getApplicantById } = require("../controllers/evaluationController");

router.get("/:id", getApplicantById);

module.exports = router;
