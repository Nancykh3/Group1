const projectInfo = require("../models/recipeModel");

const showAbout = (req, res) => {
    res.render("about", projectInfo);
};

const showRecipe = (req, res) => {

    const recipeId = Number(req.params.id);

    const selectedRecipe = projectInfo.recipes.find(
        recipe => recipe.id === recipeId
    );

    res.render("recipe", {
        recipe: selectedRecipe
    });
};

module.exports = {
    showAbout,
    showRecipe
};