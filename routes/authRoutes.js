const express = require("express");
const router = express.Router();

const {
    registerValidation,
    registerUser,
    loginUser
} = require("../controllers/authController");

// =========================
// Login
// =========================

router.get("/login", (req, res) => {
    res.render("login", {
        error: null
    });
});

router.post("/login", loginUser);

// =========================
// Register
// =========================

router.get("/register", (req, res) => {
    res.render("register", {
        errors: [],
        oldData: {}
    });
});

router.post("/register", registerValidation, registerUser);

module.exports = router;