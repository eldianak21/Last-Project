// // server.js (Adjusted to include signup routes)

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const db = require('./config/db'); // Database connection
// const multer = require('multer');
// const { parseResume } = require('./utils/parseResume'); // Import resume parsing utility
// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/admin'); // Import admin routes

// dotenv.config();
// const app = express();

// // Enable CORS for all requests
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Set up multer for file uploads
// const upload = multer({ dest: 'uploads/' }); // Directory for uploads

// // Mount the authentication routes
// app.use('/api/auth', authRoutes); // Correctly mount the auth routes

// // Mount the admin routes
// app.use('/api/admin', adminRoutes); // Mount admin routes at /api/admin

// // Endpoint to submit a job application
// app.post('/api/applications/:jobId', upload.fields([{ name: 'resume' }]), async (req, res) => {
//     const { userId } = req.body;
//     const jobId = req.params.jobId;

//     // Check for required files
//     if (!req.files || !req.files.resume) {
//         return res.status(400).json({ message: 'Resume file is required.' });
//     }

//     try {
//         // Parse resume
//         const resumeData = await parseResume(req.files.resume[0].path);

//         // Fetch job criteria from the database
//         const jobQuery = 'SELECT MinExperienceYears, RequiredQualifications, RequiredSkills FROM JobPostings WHERE JobID = ?';
//         const [job] = await db.query(jobQuery, [jobId]);

//         if (!job) {
//             return res.status(404).json({ message: 'Job not found.' });
//         }

//         // Build candidate object using resume data
//         const candidate = {
//             userId,
//             jobId,
//             experienceYears: resumeData.personalInfo.experienceYears,
//             highestQualification: resumeData.personalInfo.highestQualification,
//             skills: resumeData.skills, // Only using skills from the resume
//         };

//         console.log('Candidate Data:', candidate); // Log candidate data

//         // Define selection criteria based on job
//         const selectionCriteria = {
//             minExperienceYears: job.MinExperienceYears || 1, // Default to 1 if not specified
//             requiredQualifications: job.RequiredQualifications ? job.RequiredQualifications.split(',') : [],
//             requiredSkills: job.RequiredSkills ? job.RequiredSkills.split(',') : [],
//         };

//         // Check if candidate meets selection criteria
//         const meetsCriteria = (candidate) => {
//             const { experienceYears, highestQualification, skills } = candidate;
//             const hasRequiredExperience = experienceYears >= selectionCriteria.minExperienceYears;
//             const hasRequiredQualification = selectionCriteria.requiredQualifications.includes(highestQualification);
//             const hasRequiredSkills = selectionCriteria.requiredSkills.every(skill => skills.includes(skill));

//             console.log('Experience Check:', hasRequiredExperience);
//             console.log('Qualification Check:', hasRequiredQualification);
//             console.log('Skills Check:', hasRequiredSkills);

//             return hasRequiredExperience || hasRequiredQualification || hasRequiredSkills; // Allow any match
//         };

//         if (!meetsCriteria(candidate)) {
//             return res.status(400).json({ message: 'Candidate does not meet the selection criteria.' });
//         }

//         // Insert application into the database
//         const query = 'INSERT INTO Applications (UserID, JobID, Resume) VALUES (?, ?, ?)';
//         await db.query(query, [userId, jobId, req.files.resume[0].path]);

//         // Prepare interview schedule (example: 7 days from now)
//         const interviewSchedule = {
//             candidateId: userId,
//             interviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//         };

//         // Respond with success message
//         res.status(200).json({ message: 'Application submitted successfully', interviewSchedule });
//     } catch (error) {
//         console.error('Error processing application:', error);
//         res.status(500).json({ message: 'Error submitting application: ' + error.message });
//     }
// });

// // Define a simple route for testing
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const db = require('./config/db'); // Database connection
// const multer = require('multer');
// const { parseResume } = require('./utils/parseResume'); // Import resume parsing utility
// const authRoutes = require('./routes/authRoutes'); // Import auth routes
// const adminRoutes = require('./routes/admin'); // Import admin routes

// dotenv.config();
// const app = express();

// // Enable CORS for all requests
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Set up multer for file uploads
// const upload = multer({ dest: 'uploads/' }); // Directory for uploads

// // Mount the authentication routes
// app.use('/api/auth', authRoutes); // Correctly mount the auth routes

// // Mount the admin routes
// app.use('/api/admin', adminRoutes); // Mount admin routes at /api/admin

// // Endpoint to submit a job application
// app.post('/api/applications/:jobId', upload.fields([{ name: 'resume' }]), async (req, res) => {
//     const { userId } = req.body;
//     const jobId = req.params.jobId;

//     // Check for required files
//     if (!req.files || !req.files.resume) {
//         return res.status(400).json({ message: 'Resume file is required.' });
//     }

//     try {
//         // Parse resume
//         const resumeData = await parseResume(req.files.resume[0].path);

//         // Fetch job criteria from the database
//         const jobQuery = 'SELECT MinExperienceYears, RequiredQualifications, RequiredSkills FROM JobPostings WHERE JobID = ?';
//         const [job] = await db.query(jobQuery, [jobId]);

//         if (!job) {
//             return res.status(404).json({ message: 'Job not found.' });
//         }

//         // Build candidate object using resume data
//         const candidate = {
//             userId,
//             jobId,
//             experienceYears: resumeData.personalInfo.experienceYears,
//             highestQualification: resumeData.personalInfo.highestQualification,
//             skills: resumeData.skills, // Only using skills from the resume
//         };

//         console.log('Candidate Data:', candidate); // Log candidate data

//         // Define selection criteria based on job
//         const selectionCriteria = {
//             minExperienceYears: job.MinExperienceYears || 1, // Default to 1 if not specified
//             requiredQualifications: job.RequiredQualifications ? job.RequiredQualifications.split(',') : [],
//             requiredSkills: job.RequiredSkills ? job.RequiredSkills.split(',') : [],
//         };

//         // Check if candidate meets selection criteria
//         const meetsCriteria = (candidate) => {
//             const { experienceYears, highestQualification, skills } = candidate;
//             const hasRequiredExperience = experienceYears >= selectionCriteria.minExperienceYears;
//             const hasRequiredQualification = selectionCriteria.requiredQualifications.includes(highestQualification);
//             const hasRequiredSkills = selectionCriteria.requiredSkills.every(skill => skills.includes(skill));

//             console.log('Experience Check:', hasRequiredExperience);
//             console.log('Qualification Check:', hasRequiredQualification);
//             console.log('Skills Check:', hasRequiredSkills);

//             return hasRequiredExperience || hasRequiredQualification || hasRequiredSkills; // Allow any match
//         };

//         if (!meetsCriteria(candidate)) {
//             return res.status(400).json({ message: 'Candidate does not meet the selection criteria.' });
//         }

//         // Insert application into the database
//         const query = 'INSERT INTO Applications (UserID, JobID, Resume) VALUES (?, ?, ?)';
//         await db.query(query, [userId, jobId, req.files.resume[0].path]);

//         // Prepare interview schedule (example: 7 days from now)
//         const interviewSchedule = {
//             candidateId: userId,
//             interviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//         };

//         // Respond with success message
//         res.status(200).json({ message: 'Application submitted successfully', interviewSchedule });
//     } catch (error) {
//         console.error('Error processing application:', error);
//         res.status(500).json({ message: 'Error submitting application: ' + error.message });
//     }
// });

// // Define a simple route for testing
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Your database connection
const multer = require('multer');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const adminRoutes = require('./routes/admin'); // Import admin routes

dotenv.config();
const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Directory for uploads

// Mount the authentication routes
app.use('/api/auth', authRoutes); // Correctly mount the auth routes

// Mount the admin routes
app.use('/api/admin', adminRoutes); // Mount admin routes at /api/admin

// Test endpoint
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});