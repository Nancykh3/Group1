const express = require("express");
const router = express.Router();

const submitController = require("../controllers/submitController");

// Submit Recipe
router.get("/submit", submitController.showSubmitForm);
router.post("/submit", submitController.handleSubmit);

// My Submissions
router.get("/my-submissions", submitController.showMySubmissions);

module.exports = router;