// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const {
//   getInterviewers,
//   addInterviewer,
//   removeInterviewer,
// } = require("../controllers/hrController");

// // Middleware to verify hr role
// const verifyHr = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).send({ message: "Access denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "HR Officer")
//       return res.status(403).send({ message: "Forbidden" });
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Token verification error:", error.message);
//     res.status(400).send({ message: "Invalid token" });
//   }
// };

// // Get all interviewers
// router.get("/interviewers", verifyHr, getInterviewers);

// // Add interviewer
// router.post("/add-interviewer", verifyHr, addInterviewer);

// // Remove interviewer
// router.delete("/interviewers/:id", verifyHr, removeInterviewer);

// module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getInterviewers,
  addInterviewer,
  removeInterviewer,
  getDepartments,
} = require("../controllers/hrController");

// Middleware to verify HR role
const verifyHr = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "HR Officer")
      return res.status(403).send({ message: "Forbidden" });
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(400).send({ message: "Invalid token" });
  }
};

// Get all interviewers
router.get("/interviewers", verifyHr, getInterviewers);

// Add interviewer
router.post("/add-interviewer", verifyHr, addInterviewer);

// Remove interviewer
router.delete("/interviewers/:id", verifyHr, removeInterviewer);

// Get all departments
router.get("/departments", verifyHr, getDepartments);

module.exports = router;
