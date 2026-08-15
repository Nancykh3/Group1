const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");

router.get("/about", recipeController.showAbout);

router.get("/recipe/:id", recipeController.showRecipe);

module.exports = router;