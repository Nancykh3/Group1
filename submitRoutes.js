const express = require("express");
const router = express.Router();

const submitController = require("../controllers/submitController");

router.get("/submit", submitController.showSubmitForm);
router.post("/submit", submitController.handleSubmit);

module.exports = router;