// const express = require("express");
// const router = express.Router();
// const interviewerController = require("../controllers/interviewerController");

// router.get("/interviews", interviewerController.getInterviews);
// router.post("/evaluations", interviewerController.submitEvaluation);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   getInterviews,
//   submitEvaluation,
//   getInterviewerData,
// } = require("../controllers/interviewerController");
// // const authMiddleware = require("../middlewares/authMiddleware");

// router.get("/data", getInterviewerData);
// router.get("/interviews", getInterviews);
// router.post("/evaluations", submitEvaluation);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  getInterviews,
  submitEvaluation,
} = require("../controllers/interviewerController");

// Get interviews for the interviewer
router.get("/interviews/:userId", getInterviews);

// Submit evaluation
router.post("/evaluations", submitEvaluation);

module.exports = router;
