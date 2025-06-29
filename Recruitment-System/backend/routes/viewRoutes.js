const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

// Route to get a specific application by ID
router.get("/:applicationId", viewController.getApplicationById);

module.exports = router;
