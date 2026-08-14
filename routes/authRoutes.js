const express = require("express");

const router = express.Router();

const {
    registerValidation,
    registerUser,
    loginUser
} = require("../controllers/authController");


// =========================
// REGISTER
// =========================

// Register page
router.get("/register", (req, res) => {
    res.render("register", {
        errors: [],
        oldData: {}
    });
});

// Register form submission
router.post("/register", registerValidation, registerUser);
router.post("/login", loginUser);

// =========================
// LOGIN
// =========================

// Login page
router.get("/login", (req, res) => {
    res.render("login", {
        error: null
    });
});

// Login form submission
router.post("/login", loginUser);


module.exports = router;