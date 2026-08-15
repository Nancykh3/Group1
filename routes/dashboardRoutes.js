const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const { requireLogin } = require("../middleware/authMiddleware");

// Dashboard
router.get("/", requireLogin, dashboardController.showDashboard);

// Logout
router.get("/logout", dashboardController.handleLogout);

module.exports = router;