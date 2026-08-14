const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/authModel");

// Validation rules
const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
];

// Register handler
const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("register", {
            errors: errors.array(),
            oldData: req.body
        });
    }

    try {
        const { name, email, password, role } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).render("register", {
                errors: [{ msg: "Email is already registered" }],
                oldData: req.body
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        await newUser.save();

        // Redirect after successful POST
        res.redirect("/login");

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).render("register", {
            errors: [{ msg: "Something went wrong. Please try again." }],
            oldData: req.body
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check empty fields
        if (!email || !password) {
            return res.status(400).render("login", {
                error: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).render("login", {
                error: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).render("login", {
                error: "Invalid email or password"
            });
        }

        // Login successful
        console.log("Login successful:", user.email);

        res.redirect("/");

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).render("login", {
            error: "Something went wrong. Please try again."
        });
    }
};

module.exports = {
    registerValidation,
    registerUser,
    loginUser
};