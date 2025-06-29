const express = require("express");
const router = express.Router();

const { getPassedApplicants } = require("../controllers/evaluationController");

router.get("/", getPassedApplicants);

module.exports = router;
