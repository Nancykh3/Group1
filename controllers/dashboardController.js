// =========================
// Show Dashboard
// =========================

const showDashboard = (req, res) => {
    res.render("dashboard", {
        currentUser: {
            name: req.session.user.name,
            username: req.session.user.username,
            email: req.session.user.email,
            role: req.session.user.role
        },

        submissionsCount: 0
    });
};

// =========================
// Logout
// =========================

const handleLogout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout error:", error);
            return res.status(500).send("Could not log out");
        }

        res.redirect("/login");
    });
};

module.exports = {
    showDashboard,
    handleLogout
};