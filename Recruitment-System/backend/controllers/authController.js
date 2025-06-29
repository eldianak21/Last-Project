// const db = require("../config/db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { body, validationResult } = require("express-validator");
// const { generateOTP } = require("../utils/otp");
// const { sendEmail } = require("../utils/email");
// const moment = require("moment");

// // Error handler utility
// const handleError = (res, error, context) => {
//   console.error(`Error in ${context}:`, error);
//   res.status(500).json({
//     success: false,
//     message: error.message || "Internal server error",
//   });
// };

// // Signup Controller
// const signup = async (req, res) => {
//   try {
//     // Validate input fields
//     await body("username")
//       .isLength({ min: 3 })
//       .withMessage("Username must be at least 3 characters")
//       .run(req);
//     await body("email").isEmail().withMessage("Invalid email").run(req);
//     await body("password")
//       .isLength({ min: 6 })
//       .withMessage("Password must be at least 6 characters")
//       .run(req);
//     await body("phone")
//       .notEmpty()
//       .withMessage("Phone number is required")
//       .run(req);
//     await body("firstName")
//       .notEmpty()
//       .withMessage("First name is required")
//       .run(req);
//     await body("lastName")
//       .notEmpty()
//       .withMessage("Last name is required")
//       .run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, email, password, phone, firstName, lastName } = req.body;

//     // Check if user exists
//     const [existingUser] = await db.query(
//       "SELECT * FROM Users WHERE Email = ? OR Username = ?",
//       [email, username]
//     );

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create new user
//     const passwordHash = await bcrypt.hash(password, 10);
//     await db.query(
//       `INSERT INTO Users
//        (Username, PasswordHash, Role, Email, Phone, FirstName, LastName, requiresPasswordChange)
//        VALUES (?, ?, 'Applicant', ?, ?, ?, ?, true)`,
//       [username, passwordHash, email, phone, firstName, lastName]
//     );

//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//     });
//   } catch (error) {
//     handleError(res, error, "signup");
//   }
// };

// // Login Controller
// const login = async (req, res) => {
//   try {
//     // Validate input
//     await body("username")
//       .notEmpty()
//       .withMessage("Username is required")
//       .run(req);
//     await body("password")
//       .notEmpty()
//       .withMessage("Password is required")
//       .run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     // Find user
//     const [users] = await db.query("SELECT * FROM Users WHERE Username = ?", [
//       username,
//     ]);

//     if (!users.length) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const user = users[0];

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.PasswordHash);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate token
//     const requiresChange =
//       ["HR Officer", "Interviewer"].includes(user.Role) &&
//       user.requiresPasswordChange;

//     const token = jwt.sign(
//       {
//         userId: user.UserID,
//         username: user.Username,
//         role: user.Role,
//         firstName: user.FirstName,
//         lastName: user.LastName,
//         requiresPasswordChange: requiresChange,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({
//       success: true,
//       token,
//       requiresChange,
//       role: user.Role,
//       username: user.Username,
//     });
//   } catch (error) {
//     handleError(res, error, "login");
//   }
// };

// // Password Reset Controller - Updated to match your database columns
// const requestPasswordReset = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     // Check if user exists
//     const [users] = await db.query(
//       "SELECT UserID, Email FROM Users WHERE Email = ?",
//       [email]
//     );

//     if (!users.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No account found with this email",
//       });
//     }

//     // Generate OTP
//     const otp = generateOTP();
//     const expiresAt = moment().add(10, "minutes").toDate();

//     // Update user record - Using correct column names from your schema
//     await db.query(
//       "UPDATE Users SET reset_otp = ?, reset_otp_expires = ? WHERE Email = ?",
//       [otp, expiresAt, email]
//     );

//     // Send email
//     const emailContent = `
//       <h2>Password Reset Request</h2>
//       <p>Your OTP code is: <strong>${otp}</strong></p>
//       <p>This code expires in 10 minutes.</p>
//     `;

//     const emailSent = await sendEmail(
//       email,
//       "Password Reset OTP",
//       emailContent
//     );

//     if (!emailSent) {
//       throw new Error("Failed to send OTP email");
//     }

//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//     });
//   } catch (error) {
//     handleError(res, error, "requestPasswordReset");
//   }
// };

// // OTP Verification - Updated to match your database columns
// const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const [users] = await db.query(
//       `SELECT UserID FROM Users
//        WHERE Email = ? AND reset_otp = ? AND reset_otp_expires > NOW()`,
//       [email, otp]
//     );

//     if (!users.length) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired OTP",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "OTP verified successfully",
//     });
//   } catch (error) {
//     handleError(res, error, "verifyOTP");
//   }
// };

// // Password Reset - Updated to match your database columns
// const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     // Verify OTP first
//     const [users] = await db.query(
//       `SELECT UserID FROM Users
//        WHERE Email = ? AND reset_otp = ? AND reset_otp_expires > NOW()`,
//       [email, otp]
//     );

//     if (!users.length) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired OTP",
//       });
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update password and clear OTP - Using correct column names
//     await db.query(
//       `UPDATE Users
//        SET PasswordHash = ?, reset_otp = NULL, reset_otp_expires = NULL
//        WHERE UserID = ?`,
//       [hashedPassword, users[0].UserID]
//     );

//     res.status(200).json({
//       success: true,
//       message: "Password reset successfully",
//     });
//   } catch (error) {
//     handleError(res, error, "resetPassword");
//   }
// };

// module.exports = {
//   signup,
//   login,
//   requestPasswordReset,
//   verifyOTP,
//   resetPassword,
// };

const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { generateOTP } = require("../utils/otp");
const { sendEmail } = require("../utils/email");
const moment = require("moment");
const crypto = require("crypto"); // Import crypto module

// Error handler utility
// Error handler utility
const handleError = (res, error, context) => {
  console.error(`Error in ${context}:`, error); // Corrected line
  res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

// Signup Controller
const signup = async (req, res) => {
  try {
    // Validate input fields
    await body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters")
      .run(req);
    await body("email").isEmail().withMessage("Invalid email").run(req);
    await body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .run(req);
    await body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .run(req);
    await body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .run(req);
    await body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, phone, firstName, lastName } = req.body;

    // Check if user exists
    const [existingUser] = await db.query(
      "SELECT * FROM Users WHERE Email = ? OR Username = ?",
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate verification code
    const verificationCode = generateOTP(); // Assuming generateOTP() returns a 6-digit code
    const verificationCodeExpiry = moment().add(10, "minutes").toDate();

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user with verification code and expiry
    await db.query(
      `INSERT INTO Users (Username, PasswordHash, Role, Email, Phone, FirstName, LastName, requiresPasswordChange, reset_otp, reset_otp_expires, is_verified)
             VALUES (?, ?, 'Applicant', ?, ?, ?, ?, true, ?, ?, false)`,
      [
        username,
        passwordHash,
        email,
        phone,
        firstName,
        lastName,
        verificationCode,
        verificationCodeExpiry,
      ]
    );

    // Send verification email
    // Send verification email
    const emailContent = `
    <h2>Email Verification</h2>
    <p>Your verification code is: <strong>${verificationCode}</strong></p>
    <p>This code expires in 10 minutes.</p>
`;

    const emailText = `Your verification code is: ${verificationCode}. This code expires in 10 minutes.`; // Corrected line

    const emailSent = await sendEmail(
      email,
      "Verify Your Email",
      emailContent,
      emailText
    ); // Pass both HTML and text

    if (!emailSent) {
      console.error("Failed to send verification email");
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again.",
      });
    }

    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email to verify your account.",
      email: email, // Send the email to the front end
    });
  } catch (error) {
    handleError(res, error, "signup");
  }
};

// Verify Code Endpoint
const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "Email and verification code are required" });
    }

    // Find user with the email and verification code and code expiry not exceeded
    const [users] = await db.query(
      "SELECT * FROM Users WHERE Email = ? AND reset_otp = ? AND reset_otp_expires > NOW()",
      [email, code]
    );

    if (!users.length) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    const user = users[0];

    // Update user to mark as verified
    await db.query(
      "UPDATE Users SET is_verified = true, reset_otp = NULL, reset_otp_expires = NULL WHERE UserID = ?",
      [user.UserID]
    );

    // Generate token for the verified user
    const requiresChange =
      ["HR Officer", "Interviewer"].includes(user.Role) &&
      user.requiresPasswordChange;

    const jwtToken = jwt.sign(
      {
        userId: user.UserID,
        username: user.Username,
        role: user.Role,
        firstName: user.FirstName,
        lastName: user.LastName,
        requiresPasswordChange: requiresChange,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token: jwtToken, // Send the JWT token upon successful verification
      requiresChange,
      role: user.Role,
      username: user.Username,
    });
  } catch (error) {
    handleError(res, error, "verifyCode");
  }
};
// Login Controller
const login = async (req, res) => {
  try {
    // Validate input
    await body("username")
      .notEmpty()
      .withMessage("Username is required")
      .run(req);
    await body("password")
      .notEmpty()
      .withMessage("Password is required")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Find user
    const [users] = await db.query("SELECT * FROM Users WHERE Username = ?", [
      username,
    ]);

    if (!users.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const requiresChange =
      ["HR Officer", "Interviewer"].includes(user.Role) &&
      user.requiresPasswordChange;

    const token = jwt.sign(
      {
        userId: user.UserID,
        username: user.Username,
        role: user.Role,
        firstName: user.FirstName,
        lastName: user.LastName,
        requiresPasswordChange: requiresChange,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      requiresChange,
      role: user.Role,
      username: user.Username,
    });
  } catch (error) {
    handleError(res, error, "login");
  }
};

// Password Reset Controller - Updated to match your database columns
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if user exists
    const [users] = await db.query(
      "SELECT UserID, Email FROM Users WHERE Email = ?",
      [email]
    );

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = moment().add(10, "minutes").toDate();

    // Update user record - Using correct column names from your schema
    await db.query(
      "UPDATE Users SET reset_otp = ?, reset_otp_expires = ? WHERE Email = ?",
      [otp, expiresAt, email]
    );

    // Send email
    // Send email
    // Send email
    const emailContent = `
  <h2>Password Reset Request</h2>
  <p>Your OTP code is: <strong>${otp}</strong></p>
  <p>This code expires in 10 minutes.</p>
`;

    const emailText = `Your OTP code is: ${otp}. This code expires in 10 minutes.`; // Corrected line

    const emailSent = await sendEmail(
      email,
      "Password Reset OTP",
      emailContent,
      emailText
    );

    if (!emailSent) {
      throw new Error("Failed to send OTP email");
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    handleError(res, error, "requestPasswordReset");
  }
};

// OTP Verification - Updated to match your database columns
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const [users] = await db.query(
      `SELECT UserID FROM Users 
       WHERE Email = ? AND reset_otp = ? AND reset_otp_expires > NOW()`,
      [email, otp]
    );

    if (!users.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    handleError(res, error, "verifyOTP");
  }
};

// Password Reset - Updated to match your database columns
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Verify OTP first
    const [users] = await db.query(
      `SELECT UserID FROM Users 
       WHERE Email = ? AND reset_otp = ? AND reset_otp_expires > NOW()`,
      [email, otp]
    );

    if (!users.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP - Using correct column names
    await db.query(
      `UPDATE Users 
       SET PasswordHash = ?, reset_otp = NULL, reset_otp_expires = NULL 
       WHERE UserID = ?`,
      [hashedPassword, users[0].UserID]
    );

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    handleError(res, error, "resetPassword");
  }
};

module.exports = {
  signup,
  login,
  requestPasswordReset,
  verifyOTP,
  resetPassword,
  verifyCode,
};
