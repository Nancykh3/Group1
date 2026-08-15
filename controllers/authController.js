const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Temporary users storage - no database
const users = [];

// =========================
// Validation rules
// =========================

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

// =========================
// Register
// =========================

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

        const normalizedEmail = email.trim().toLowerCase();

        // Check if email already exists
        const existingUser = users.find(
            (user) => user.email === normalizedEmail
        );

        if (existingUser) {
            return res.status(400).render("register", {
                errors: [{ msg: "Email is already registered" }],
                oldData: req.body
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create temporary user
        const newUser = {
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: role || "user"
        };

        users.push(newUser);

        console.log("User registered:", newUser.email);

        // Register -> Login
        return res.redirect("/login");

    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).render("register", {
            errors: [{ msg: "Something went wrong. Please try again." }],
            oldData: req.body
        });
    }
};

// =========================
// Login
// =========================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check empty fields
        if (!email || !password) {
            return res.status(400).render("login", {
                error: "Email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const user = users.find(
            (user) => user.email === normalizedEmail
        );

        if (!user) {
            return res.status(401).render("login", {
                error: "Invalid email or password"
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).render("login", {
                error: "Invalid email or password"
            });
        }

        // Save user in session
        req.session.user = {
            name: user.name,
            username: user.name,
            email: user.email,
            role: user.role
        };

        console.log("Login successful:", user.email);

        // Login -> Dashboard
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);

                return res.status(500).render("login", {
                    error: "Could not create login session"
                });
            }

            return res.redirect("/dashboard");
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).render("login", {
            error: "Something went wrong. Please try again."
        });
    }
};

module.exports = {
    registerValidation,
    registerUser,
    loginUser
};