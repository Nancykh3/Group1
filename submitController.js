const projectInfo = require("../models/recipeModel");

const showSubmitForm = (req, res) => {
    res.render("submit");
};
const handleSubmit = (req, res) => {

    const newRecipe = {
        id: projectInfo.recipes.length + 1,
        name: req.body.name,
        description: req.body.description,
        time: req.body.time,
        ingredients: req.body.ingredients.split(",").map(item => item.trim())
    };

    projectInfo.recipes.push(newRecipe);

    res.redirect(`/recipe/${newRecipe.id}`);
};


module.exports = { showSubmitForm, handleSubmit };