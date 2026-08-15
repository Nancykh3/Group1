const userModel = require("../models/userModel");

const showLogin = (req, res) => {
    if (req.session.user) {
        return res.redirect("/dashboard");
    }
    res.render("login", { error: null });
};

const handleLogin = (req, res) => {
    const { username, password } = req.body;

    const user = userModel.findUser(username, password);

    if (!user) {
        return res.render("login", { error: "Wrong username or password" });
    }

    req.session.user = {
        id: user.id,
        username: user.username,
        name: user.name
    };

    req.session.save(() => {
        res.redirect("/dashboard");
    });
};

const handleLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};

const showDashboard = (req, res) => {
    const submissions = userModel.getSubmissionsByUser(req.session.user.id);

    res.render("dashboard", {
        submissionsCount: submissions.length
    });
};

const showMySubmissions = (req, res) => {
    const submissions = userModel.getSubmissionsByUser(req.session.user.id);

    res.render("mySubmissions", {
        submissions: submissions
    });
};

module.exports = {
    showLogin,
    handleLogin,
    handleLogout,
    showDashboard,
    showMySubmissions
};
