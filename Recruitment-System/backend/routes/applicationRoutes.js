// const express = require("express");
// const multer = require("multer");
// const db = require("../config/db");
// const { parseResume } = require("../utils/parseResume");
// const router = express.Router();
// const path = require("path");

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Store uploaded files in the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
//   },
// });

// const upload = multer({ storage: storage });

// // Function to get selection criteria for a job
// const getSelectionCriteria = async (jobId) => {
//   try {
//     console.log("Executing getSelectionCriteria query for jobId:", jobId);
//     const [rows] = await db.execute(
//       "SELECT MinExperienceYears, RequiredQualifications, RequiredSkills FROM JobPostings WHERE JobID = ?",
//       [jobId]
//     );

//     console.log("getSelectionCriteria query results:", rows);

//     if (rows.length > 0) {
//       const { MinExperienceYears, RequiredQualifications, RequiredSkills } =
//         rows[0];
//       return {
//         minExperienceYears: MinExperienceYears,
//         requiredQualifications: RequiredQualifications
//           ? RequiredQualifications.split(",").map((q) => q.trim().toLowerCase())
//           : [],
//         requiredSkills: RequiredSkills
//           ? RequiredSkills.split(",").map((s) => s.trim().toLowerCase())
//           : [],
//       };
//     } else {
//       console.log("No selection criteria found for jobId:", jobId);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error in getSelectionCriteria:", error);
//     return null; // Handle error as needed
//   }
// };

// // Function to check if a candidate meets the selection criteria
// const meetsCriteria = (candidate, selectionCriteria) => {
//   if (!selectionCriteria) return false;

//   const { experienceYears, highestQualification } = candidate;
//   const candidateSkills = candidate.skills.map((skill) => skill.toLowerCase());
//   const lowerCandidateQualification = highestQualification
//     ? highestQualification.toLowerCase()
//     : "";
//   const requiredQualificationsLower =
//     selectionCriteria.requiredQualifications.map((q) => q.toLowerCase());

//   const hasRequiredExperience =
//     parseInt(experienceYears, 10) >=
//       parseInt(selectionCriteria.minExperienceYears, 10) ||
//     !selectionCriteria.minExperienceYears;

//   let hasRequiredQualification = false;
//   if (requiredQualificationsLower.length === 0) {
//     hasRequiredQualification = true;
//   } else if (lowerCandidateQualification) {
//     for (const reqQual of requiredQualificationsLower) {
//       const reqKeywords = reqQual.split(/\s+/).filter(Boolean);
//       const candidateKeywords = lowerCandidateQualification
//         .split(/\s+/)
//         .filter(Boolean);
//       let foundCount = reqKeywords.filter((keyword) =>
//         candidateKeywords.includes(keyword)
//       ).length;
//       if (foundCount >= 2 && reqKeywords.length > 0) {
//         hasRequiredQualification = true;
//         break;
//       }
//     }
//   }

//   const hasRequiredSkills =
//     selectionCriteria.requiredSkills.every((skill) =>
//       candidateSkills.some(
//         (candidateSkill) =>
//           candidateSkill.includes(skill) || skill.includes(candidateSkill)
//       )
//     ) || selectionCriteria.requiredSkills.length === 0;

//   console.log("Meets Qualification:", hasRequiredQualification);
//   console.log("Meets Experience:", hasRequiredExperience);
//   console.log("Meets Skills:", hasRequiredSkills);

//   return hasRequiredExperience && hasRequiredQualification && hasRequiredSkills;
// };

// // Route to parse resume and check eligibility
// router.post(
//   "/parse-resume/:jobId",
//   upload.single("resume"),
//   async (req, res) => {
//     const { userId } = req.body;
//     const jobId = req.params.jobId;

//     if (!req.file) {
//       return res.status(400).json({ message: "Please upload a resume file." });
//     }

//     const resumePath = req.file.path;

//     try {
//       const parsedData = await parseResume(resumePath);
//       console.log("Parsed Data before meetsCriteria:", parsedData);

//       const selectionCriteria = await getSelectionCriteria(jobId);
//       console.log("Selection criteria:", selectionCriteria);

//       const candidate = {
//         userId,
//         jobId,
//         resume: resumePath,
//         personalInfo: parsedData.personalInfo || {},
//         skills: parsedData.skills || [],
//         experienceYears: parsedData.experienceYears,
//         highestQualification: parsedData.highestQualification,
//       };

//       const meetsRequirementsResult = meetsCriteria(
//         candidate,
//         selectionCriteria
//       );
//       console.log("Meets requirements:", meetsRequirementsResult);

//       res.status(200).json({
//         skills: parsedData.skills || [],
//         experienceYears: parsedData.experienceYears || "",
//         highestQualification: parsedData.highestQualification || "",
//         personalInfo: parsedData.personalInfo,
//         meetsRequirements: meetsRequirementsResult,
//       });
//       console.log("Response sent successfully.");
//     } catch (error) {
//       console.error("Error in /parse-resume/:jobId route:", error);
//       res.status(500).json({ message: "Error processing resume" });
//     }
//   }
// );

// // Route to submit an application for a specific job
// router.post(
//   "/:jobId",
//   upload.fields([
//     { name: "resume", maxCount: 1 },
//     { name: "scannedDocuments", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     const jobId = req.params.jobId;
//     const {
//       userId,
//       email,
//       firstName,
//       lastName,
//       phone1,
//       experienceYears,
//       highestQualification,
//     } = req.body;

//     const resumePath = req.files["resume"] ? req.files["resume"][0].path : null;
//     const scannedDocumentsPath = req.files["scannedDocuments"]
//       ? req.files["scannedDocuments"][0].path
//       : null;

//     // Log incoming request details
//     console.log("Incoming request body:", req.body);
//     console.log("File details:", req.files);

//     // Validate required fields
//     if (
//       !userId ||
//       !email ||
//       !firstName ||
//       !lastName ||
//       !phone1 ||
//       !experienceYears ||
//       !highestQualification ||
//       !resumePath
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Please fill in all required fields." });
//     }

//     try {
//       // 1. Parse the resume to extract information
//       const parsedData = await parseResume(resumePath);

//       // 2. Get the selection criteria for the job
//       const selectionCriteria = await getSelectionCriteria(jobId);

//       // 3. Create a candidate object
//       const candidate = {
//         userId,
//         jobId,
//         resume: resumePath,
//         personalInfo: parsedData.personalInfo || {},
//         skills: parsedData.skills || [],
//         experienceYears,
//         highestQualification,
//       };

//       // 4. Check if the candidate meets the requirements
//       const meetsRequirementsResult = meetsCriteria(
//         candidate,
//         selectionCriteria
//       );

//       let finalScannedDocumentsPath = null; // Initialize to null

//       // 5. Conditionally set scannedDocumentsPath based on eligibility
//       if (meetsRequirementsResult && scannedDocumentsPath) {
//         finalScannedDocumentsPath = scannedDocumentsPath;
//       }

//       // 6. Insert the application data into the database
//       const query = `
//         INSERT INTO Applications (UserID, JobID, SubmittedAt, FirstName, LastName, Email, Phone1, ExperienceYears, HighestQualification, Resume, ScannedDocuments)
//         VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//       const [result] = await db.query(query, [
//         userId,
//         jobId,
//         firstName,
//         lastName,
//         email,
//         phone1,
//         experienceYears,
//         highestQualification,
//         resumePath,
//         finalScannedDocumentsPath, // Use the conditional path
//       ]);

//       // Ensure you send a response here
//       console.log(
//         "Application successfully submitted with ID:",
//         result.insertId
//       );
//       res.status(201).json({
//         message: "Application submitted successfully!",
//         applicationId: result.insertId,
//         meetsRequirements: meetsRequirementsResult, // Send eligibility status
//       });
//     } catch (error) {
//       console.error("Error during application submission:", error);
//       return res.status(500).json({
//         message: "An unexpected error occurred during application submission.",
//       });
//     }
//   }
// );

// module.exports = router;

// const express = require("express");
// const multer = require("multer");
// const db = require("../config/db");
// const { parseResume } = require("../utils/parseResume");
// const router = express.Router();
// const path = require("path");

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
//   },
// });

// const upload = multer({ storage: storage });

// // Function to get selection criteria for a job
// const getSelectionCriteria = async (jobId) => {
//   try {
//     const [rows] = await db.execute(
//       "SELECT MinExperienceYears, RequiredQualifications, RequiredSkills FROM JobPostings WHERE JobID = ?",
//       [jobId]
//     );

//     if (rows.length > 0) {
//       const { MinExperienceYears, RequiredQualifications, RequiredSkills } =
//         rows[0];
//       return {
//         minExperienceYears: MinExperienceYears,
//         requiredQualifications: RequiredQualifications
//           ? RequiredQualifications.split(",").map((q) => q.trim().toLowerCase())
//           : [],
//         requiredSkills: RequiredSkills
//           ? RequiredSkills.split(",").map((s) => s.trim().toLowerCase())
//           : [],
//       };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error in getSelectionCriteria:", error);
//     return null;
//   }
// };

// // Scoring function
// const calculateScore = (candidate, selectionCriteria) => {
//   let score = 0;

//   // Score based on experience (cap the maximum contribution)
//   const experienceScore = Math.min(candidate.experienceYears, 10); // Cap at 10
//   if (experienceScore >= selectionCriteria.minExperienceYears) {
//     score += experienceScore;
//   }

//   // Score based on qualifications
//   if (
//     selectionCriteria.requiredQualifications.includes(
//       candidate.highestQualification.toLowerCase()
//     )
//   ) {
//     score += 20; // Points for matching qualifications
//   }

//   // Score based on skills
//   candidate.skills.forEach((skill) => {
//     if (selectionCriteria.requiredSkills.includes(skill.toLowerCase())) {
//       score += 5; // Points for each required skill matched
//     }
//   });

//   return score;
// };

// // Function to check if a candidate meets the selection criteria
// const meetsCriteria = (candidate, selectionCriteria) => {
//   const score = calculateScore(candidate, selectionCriteria);
//   const meetsRequirements = score > 0; // Define minimum score for eligibility

//   return { meetsRequirements, score };
// };

// // Route to parse resume and check eligibility
// router.post(
//   "/parse-resume/:jobId",
//   upload.single("resume"),
//   async (req, res) => {
//     const { userId } = req.body;
//     const jobId = req.params.jobId;

//     if (!req.file) {
//       return res.status(400).json({ message: "Please upload a resume file." });
//     }

//     const resumePath = req.file.path;

//     try {
//       const parsedData = await parseResume(resumePath);
//       const selectionCriteria = await getSelectionCriteria(jobId);

//       const candidate = {
//         userId,
//         jobId,
//         resume: resumePath,
//         personalInfo: parsedData.personalInfo || {},
//         skills: parsedData.skills || [],
//         experienceYears: parsedData.experienceYears,
//         highestQualification: parsedData.highestQualification,
//       };

//       const meetsRequirementsResult = meetsCriteria(
//         candidate,
//         selectionCriteria
//       );

//       res.status(200).json({
//         skills: parsedData.skills || [],
//         experienceYears: parsedData.experienceYears || "",
//         highestQualification: parsedData.highestQualification || "",
//         personalInfo: parsedData.personalInfo,
//         meetsRequirements: meetsRequirementsResult.meetsRequirements,
//         score: meetsRequirementsResult.score,
//       });
//     } catch (error) {
//       console.error("Error in /parse-resume/:jobId route:", error);
//       res.status(500).json({ message: "Error processing resume" });
//     }
//   }
// );

// // Route to submit an application for a specific job
// router.post(
//   "/:jobId",
//   upload.fields([
//     { name: "resume", maxCount: 1 },
//     { name: "scannedDocuments", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     const jobId = req.params.jobId;
//     const {
//       userId,
//       email,
//       firstName,
//       lastName,
//       phone1,
//       experienceYears,
//       highestQualification,
//     } = req.body;

//     const resumePath = req.files["resume"] ? req.files["resume"][0].path : null;
//     const scannedDocumentsPath = req.files["scannedDocuments"]
//       ? req.files["scannedDocuments"][0].path
//       : null;

//     if (
//       !userId ||
//       !email ||
//       !firstName ||
//       !lastName ||
//       !phone1 ||
//       !experienceYears ||
//       !highestQualification ||
//       !resumePath
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Please fill in all required fields." });
//     }

//     try {
//       const parsedData = await parseResume(resumePath);
//       const selectionCriteria = await getSelectionCriteria(jobId);

//       const candidate = {
//         userId,
//         jobId,
//         resume: resumePath,
//         personalInfo: parsedData.personalInfo || {},
//         skills: parsedData.skills || [],
//         experienceYears,
//         highestQualification,
//       };

//       const meetsRequirementsResult = meetsCriteria(
//         candidate,
//         selectionCriteria
//       );

//       let finalScannedDocumentsPath = null;
//       if (meetsRequirementsResult.meetsRequirements && scannedDocumentsPath) {
//         finalScannedDocumentsPath = scannedDocumentsPath;
//       }

//       const query = `
//       INSERT INTO Applications (UserID, JobID, SubmittedAt, FirstName, LastName, Email, Phone1, ExperienceYears, HighestQualification, Resume, ScannedDocuments, Score)
//       VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//       const [result] = await db.query(query, [
//         userId,
//         jobId,
//         firstName,
//         lastName,
//         email,
//         phone1,
//         experienceYears,
//         highestQualification,
//         resumePath,
//         finalScannedDocumentsPath,
//         meetsRequirementsResult.score, // Include score in the insert
//       ]);

//       res.status(201).json({
//         message: "Application submitted successfully!",
//         applicationId: result.insertId,
//         meetsRequirements: meetsRequirementsResult.meetsRequirements,
//         score: meetsRequirementsResult.score, // Include the score in the response
//       });
//     } catch (error) {
//       console.error("Error during application submission:", error);
//       return res.status(500).json({
//         message: "An unexpected error occurred during application submission.",
//       });
//     }
//   }
// );

// module.exports = router;

const express = require("express");
const multer = require("multer");
const db = require("../config/db");
const { parseResume } = require("../utils/parseResume");
const router = express.Router();
const path = require("path");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

// Function to get selection criteria for a job
const getSelectionCriteria = async (jobId) => {
  try {
    const [rows] = await db.execute(
      "SELECT MinExperienceYears, RequiredQualifications, RequiredSkills FROM JobPostings WHERE JobID = ?",
      [jobId]
    );

    if (rows.length > 0) {
      const { MinExperienceYears, RequiredQualifications, RequiredSkills } =
        rows[0];
      return {
        minExperienceYears: MinExperienceYears,
        requiredQualifications: RequiredQualifications
          ? RequiredQualifications.split(",").map((q) => q.trim().toLowerCase())
          : [],
        requiredSkills: RequiredSkills
          ? RequiredSkills.split(",").map((s) => s.trim().toLowerCase())
          : [],
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getSelectionCriteria:", error);
    return null;
  }
};

// Scoring function
const calculateScore = (candidate, selectionCriteria) => {
  let score = 0;

  const experienceScore = Math.min(candidate.experienceYears, 10);
  if (experienceScore >= selectionCriteria.minExperienceYears) {
    score += experienceScore; // Score based on experience
  }

  if (
    selectionCriteria.requiredQualifications.includes(
      candidate.highestQualification.toLowerCase()
    )
  ) {
    score += 20; // Points for matching qualifications
  }

  candidate.skills.forEach((skill) => {
    if (selectionCriteria.requiredSkills.includes(skill.toLowerCase())) {
      score += 5; // Points for each required skill matched
    }
  });

  return score;
};

// Function to check if a candidate meets the selection criteria
const meetsCriteria = (candidate, selectionCriteria) => {
  const score = calculateScore(candidate, selectionCriteria);
  const meetsRequirements = score > 0; // Define minimum score for eligibility

  return { meetsRequirements, score };
};

// Route to parse resume and check eligibility
// Route to parse resume and check eligibility
router.post(
  "/parse-resume/:jobId",
  upload.single("resume"),
  async (req, res) => {
    const { userId } = req.body;
    const jobId = req.params.jobId;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume file." });
    }

    const resumePath = req.file.path;

    try {
      const parsedData = await parseResume(resumePath);
      console.log("Parsed Data:", parsedData); // Log parsed data to the console

      const selectionCriteria = await getSelectionCriteria(jobId);

      const candidate = {
        userId,
        jobId,
        resume: resumePath,
        personalInfo: parsedData.personalInfo || {},
        skills: parsedData.skills || [],
        experienceYears: parsedData.experienceYears,
        highestQualification: parsedData.highestQualification,
      };

      const meetsRequirementsResult = meetsCriteria(
        candidate,
        selectionCriteria
      );

      res.status(200).json({
        parsedData: {
          personalInfo: candidate.personalInfo,
          skills: candidate.skills,
          experienceYears: candidate.experienceYears,
          highestQualification: candidate.highestQualification,
        },
        meetsRequirements: meetsRequirementsResult.meetsRequirements,
        score: meetsRequirementsResult.score,
      });
    } catch (error) {
      console.error("Error in /parse-resume/:jobId route:", error);
      res.status(500).json({ message: "Error processing resume" });
    }
  }
);

// Route to submit an application for a specific job
router.post(
  "/:jobId",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "scannedDocuments", maxCount: 1 },
  ]),
  async (req, res) => {
    const jobId = req.params.jobId;
    const {
      userId,
      email,
      firstName,
      lastName,
      phone1,
      experienceYears,
      highestQualification,
    } = req.body;

    const resumePath = req.files["resume"] ? req.files["resume"][0].path : null;
    const scannedDocumentsPath = req.files["scannedDocuments"]
      ? req.files["scannedDocuments"][0].path
      : null;

    if (
      !userId ||
      !email ||
      !firstName ||
      !lastName ||
      !phone1 ||
      !experienceYears ||
      !highestQualification ||
      !resumePath
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    try {
      const parsedData = await parseResume(resumePath);
      const selectionCriteria = await getSelectionCriteria(jobId);

      const candidate = {
        userId,
        jobId,
        resume: resumePath,
        personalInfo: parsedData.personalInfo || {},
        skills: parsedData.skills || [],
        experienceYears,
        highestQualification,
      };

      const meetsRequirementsResult = meetsCriteria(
        candidate,
        selectionCriteria
      );

      let finalScannedDocumentsPath = null;
      if (meetsRequirementsResult.meetsRequirements && scannedDocumentsPath) {
        finalScannedDocumentsPath = scannedDocumentsPath;
      }

      const query = `
      INSERT INTO Applications (UserID, JobID, SubmittedAt, FirstName, LastName, Email, Phone1, ExperienceYears, HighestQualification, Resume, ScannedDocuments, Score)
      VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      const [result] = await db.query(query, [
        userId,
        jobId,
        firstName,
        lastName,
        email,
        phone1,
        experienceYears,
        highestQualification,
        resumePath,
        finalScannedDocumentsPath,
        meetsRequirementsResult.score, // Include score in the insert
      ]);

      res.status(201).json({
        message: "Application submitted successfully!",
        applicationId: result.insertId,
        meetsRequirements: meetsRequirementsResult.meetsRequirements,
        score: meetsRequirementsResult.score, // Include the score in the response
      });
    } catch (error) {
      console.error("Error during application submission:", error);
      return res.status(500).json({
        message: "An unexpected error occurred during application submission.",
      });
    }
  }
);

module.exports = router;
