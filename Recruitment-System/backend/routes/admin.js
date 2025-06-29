const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getAllUsers,
  addHRUser,
  removeUser,
} = require("../controllers/adminController");

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "Admin")
      return res.status(403).send({ message: "Forbidden" });
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(400).send({ message: "Invalid token" });
  }
};

// Get all users
router.get("/users", verifyAdmin, getAllUsers);

// Add HR User
router.post("/add-hr", verifyAdmin, addHRUser);

// Remove User
router.delete("/users/:id", verifyAdmin, removeUser);

module.exports = router;
