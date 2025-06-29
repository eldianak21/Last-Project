// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // const dotenv = require("dotenv");
// // const db = require("./config/db"); // Your database connection
// // const multer = require("multer");
// // const authRoutes = require("./routes/authRoutes"); // Import auth routes
// // const adminRoutes = require("./routes/admin"); // Import admin routes
// // const applicationRoutes = require("./routes/applicationRoutes"); // Import application routes
// // const applicationDataRoutes = require("./routes/applicationDataRoutes"); // Import applications routes
// // const jobRoutes = require("./routes/jobRoutes"); // New route
// // const userRoutes = require("./routes/userRoutes");
// // const hrRoutes = require("./routes/hrRoutes"); // Import hr
// // const jobPostingRoutes = require("./routes/jobPostingRoutes"); // Import hr
// // const emailRoutes = require("./routes/emailRoutes"); // Import email routes
// // const viewRoutes = require("./routes/viewRoutes"); // Import view routes
// // const interviewRoutes = require("./routes/viewRoutes"); // Import view routes
// // const interviewScheduleRoutes = require("./routes/interviewScheduleRoutes"); // Import interview routes
// // const evaluationRoutes = require("./routes/evaluationRoutes"); // Import evaluation routes
// // const newRoutes = require("./routes/newRoutes"); // Import new routes
// // const finalRoutes = require("./routes/finalRoutes"); // Import final routes
// // const passedRoutes = require("./routes/passedRoutes"); // Import passed routes
// // // const candidateRoutes = require("./routes/candidateRoutes"); // Import candidate routes
// // dotenv.config();
// // dotenv.config();
// // const app = express();

// // app.set("view engine", null); // Disable view engine (if not needed)
// // // Enable CORS for all requests
// // app.use(cors());

// // // Middleware to parse JSON bodies
// // app.use(bodyParser.json());

// // // Set up multer for file uploads
// // const upload = multer({ dest: "uploads/" }); // Directory for uploads

// // // Serve static files from the uploads directory
// // app.use("/uploads", express.static("uploads"));

// // // Use the email routes
// // app.use("/api/send", emailRoutes);

// // // Mount the authentication routes
// // app.use("/api/auth", authRoutes); // Mount the auth routes

// // // Mount the admin routes
// // app.use("/api/admin", adminRoutes); // Mount admin routes

// // // Mount hr routes
// // app.use("/api/hr", hrRoutes);

// // // Mount application routes
// // app.use("/api/applications", applicationRoutes); // Mount application routes

// // // Mount application data routes with the new route name
// // app.use("/api/application-data", applicationDataRoutes); // Mount application data routess

// // app.use("/api/view", viewRoutes);

// // app.use("/api/interviews", interviewRoutes); // Mount the routes
// // // Mount user routes
// // app.use("/api", userRoutes); // Mount the user routes

// // // app.use("/api/jobs", jobRoutes);

// // // Use job routes
// // app.use("/api/job-postings", jobRoutes); // Use new job routes

// // // Use job posting routes
// // app.use("/api/job-postings", jobPostingRoutes);

// // app.use("/api/interview-schedule", interviewScheduleRoutes); // Mount the interview routes

// // // Use evaluation routes
// // app.use("/api/evaluations", evaluationRoutes);

// // app.use("/api/applicants", newRoutes);

// // app.use("/api/final", finalRoutes);

// // app.use("/api/passed", passedRoutes);

// // app.use("/api/interviewer", interviewerRoutes);

// // // app.use("/api/candidates", candidateRoutes);

// // // Test endpoint
// // app.get("/", (req, res) => {
// //   res.send("API is running...");
// // });

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const db = require("./config/db");
// const multer = require("multer");

// // Import routes
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/admin");
// const applicationRoutes = require("./routes/applicationRoutes");
// const applicationDataRoutes = require("./routes/applicationDataRoutes");
// const jobRoutes = require("./routes/jobRoutes");
// const userRoutes = require("./routes/userRoutes");
// const hrRoutes = require("./routes/hrRoutes");
// const jobPostingRoutes = require("./routes/jobPostingRoutes");
// const emailRoutes = require("./routes/emailRoutes");
// const viewRoutes = require("./routes/viewRoutes");
// const interviewRoutes = require("./routes/viewRoutes");
// const interviewScheduleRoutes = require("./routes/interviewScheduleRoutes");
// const evaluationRoutes = require("./routes/evaluationRoutes");
// const newRoutes = require("./routes/newRoutes");
// const finalRoutes = require("./routes/finalRoutes");
// const passedRoutes = require("./routes/passedRoutes");
// const interviewerRoutes = require("./routes/interviewerRoutes");

// dotenv.config();
// const app = express();

// // Enhanced CORS configuration
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.options("*", cors());

// // Middleware
// app.use(bodyParser.json());
// const upload = multer({ dest: "uploads/" });
// app.use("/uploads", express.static("uploads"));

// // Routes
// app.use("/api/send", emailRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/hr", hrRoutes);
// app.use("/api/applications", applicationRoutes);
// app.use("/api/application-data", applicationDataRoutes);
// app.use("/api/view", viewRoutes);
// app.use("/api/interviews", interviewRoutes);
// app.use("/api", userRoutes);
// app.use("/api/job-postings", jobRoutes);
// app.use("/api/job-postings", jobPostingRoutes);
// app.use("/api/interview-schedule", interviewScheduleRoutes);
// app.use("/api/evaluations", evaluationRoutes);
// app.use("/api/applicants", newRoutes);
// app.use("/api/final", finalRoutes);
// app.use("/api/passed", passedRoutes);
// app.use("/api/interviewer", interviewerRoutes);

// // Test endpoint
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const multer = require("multer");

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
const applicationRoutes = require("./routes/applicationRoutes");
const applicationDataRoutes = require("./routes/applicationDataRoutes");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const hrRoutes = require("./routes/hrRoutes");
const jobPostingRoutes = require("./routes/jobPostingRoutes");
const emailRoutes = require("./routes/emailRoutes");
const viewRoutes = require("./routes/viewRoutes");
const interviewRoutes = require("./routes/viewRoutes");
const interviewScheduleRoutes = require("./routes/interviewScheduleRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const newRoutes = require("./routes/newRoutes");
const finalRoutes = require("./routes/finalRoutes");
const passedRoutes = require("./routes/passedRoutes");
const interviewerRoutes = require("./routes/interviewerRoutes");
const emailRoute = require("./routes/emailRoutes"); // Import email route
dotenv.config();
const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // Vite frontend
      "http://localhost:3000", // React frontend
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Middleware
app.use(bodyParser.json());
const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/email", emailRoutes);
app.use("/api/emails", emailRoute);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/application-data", applicationDataRoutes);
app.use("/api/view", viewRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/job-postings", jobRoutes);
app.use("/api/job-postings", jobPostingRoutes);
app.use("/api/interview-schedule", interviewScheduleRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/applicants", newRoutes);
app.use("/api/final", finalRoutes);
app.use("/api/passed", passedRoutes);
app.use("/api/interviewer", interviewerRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
