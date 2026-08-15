const projectInfo = require("../models/recipeModel");

// =========================
// Show Submit Form
// =========================

const showSubmitForm = (req, res) => {
    res.render("submit");
};

// =========================
// Handle Submit
// =========================

const handleSubmit = (req, res) => {
    const newRecipe = {
        id: projectInfo.recipes.length + 1,
        name: req.body.name,
        description: req.body.description,
        time: req.body.time,
        ingredients: req.body.ingredients
            .split(",")
            .map((item) => item.trim())
    };

    projectInfo.recipes.push(newRecipe);

    res.redirect(`/recipe/${newRecipe.id}`);
};

// =========================
// My Submissions
// =========================

const showMySubmissions = (req, res) => {
    res.render("mySubmissions", {
        currentUser: req.session.user,
        submissions: []
    });
};

module.exports = {
    showSubmitForm,
    handleSubmit,
    showMySubmissions
};