// userRoutes.js (or a similar file)

const express = require("express");
const db = require("../config/db"); // Adjust path as necessary
const router = express.Router();

// Define the endpoint to get user ID by email
router.get("/getUserId", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const [user] = await db.execute(
      "SELECT UserID FROM users WHERE Email = ?",
      [email]
    );

    if (user.length > 0) {
      return res.status(200).json({ userId: user[0].UserID });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the user ID" });
  }
});

module.exports = router;
