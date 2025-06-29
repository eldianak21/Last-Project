// // const express = require("express");
// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// // const db = require("../config/db"); // Adjust the path as necessary
// // const { signup, login } = require("../controllers/authController"); // Keep existing imports
// // const router = express.Router();

// // // Public routes
// // router.post("/signup", signup);
// // router.post("/login", login);

// // // Change Password route
// // router.post("/change-password", async (req, res) => {
// //   const { username, newPassword } = req.body;

// //   try {
// //     const hashedPassword = await bcrypt.hash(newPassword, 10);
// //     await db.query(
// //       "UPDATE Users SET PasswordHash = ?, requiresPasswordChange = ? WHERE Username = ?",
// //       [hashedPassword, false, username]
// //     );

// //     res.status(200).send({ message: "Password changed successfully!" });
// //   } catch (error) {
// //     console.error("Error changing password:", error);
// //     res.status(500).send({ message: "Failed to change password." });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const db = require("../config/db"); // Adjust the path as necessary
// const {
//   signup,
//   login,
//   requestPasswordReset,
//   verifyOTP,
//   resetPassword,
// } = require("../controllers/authController"); // Updated import to include new functions
// const router = express.Router();

// // Public routes
// router.post("/signup", signup);
// router.post("/login", login);

// // Change Password route
// router.post("/change-password", async (req, res) => {
//   const { username, newPassword } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await db.query(
//       "UPDATE Users SET PasswordHash = ?, requiresPasswordChange = ? WHERE Username = ?",
//       [hashedPassword, false, username]
//     );

//     res.status(200).send({ message: "Password changed successfully!" });
//   } catch (error) {
//     console.error("Error changing password:", error);
//     res.status(500).send({ message: "Failed to change password." });
//   }
// });

// // Password Reset Routes
// router.post("/password-reset/request-password-reset", requestPasswordReset);
// router.post("/password-reset/verify-otp", verifyOTP);
// router.post("/password-reset/reset-password", resetPassword);

// module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Adjust the path as necessary
const {
  signup,
  login,
  requestPasswordReset,
  verifyOTP,
  resetPassword,
  verifyCode, // Import the new function
} = require("../controllers/authController"); // Updated import to include new functions
const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-code", verifyCode); // Add the new route

// Change Password route
router.post("/change-password", async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      "UPDATE Users SET PasswordHash = ?, requiresPasswordChange = ? WHERE Username = ?",
      [hashedPassword, false, username]
    );

    res.status(200).send({ message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).send({ message: "Failed to change password." });
  }
});

// Password Reset Routes
router.post("/password-reset/request-password-reset", requestPasswordReset);
router.post("/password-reset/verify-otp", verifyOTP);
router.post("/password-reset/reset-password", resetPassword);

module.exports = router;
