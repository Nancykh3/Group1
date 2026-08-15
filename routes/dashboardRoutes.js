const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const { requireLogin } = require("../middleware/authMiddleware");

router.get("/login", dashboardController.showLogin);
router.post("/login", dashboardController.handleLogin);
router.get("/logout", dashboardController.handleLogout);

router.get("/dashboard", requireLogin, dashboardController.showDashboard);

router.get("/my-submissions", requireLogin, dashboardController.showMySubmissions);

module.exports = router;
