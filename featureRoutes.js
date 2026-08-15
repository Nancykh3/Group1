const express = require("express");
const router = express.Router();

const featureController = require("../controllers/featureController");

router.get("/features", featureController.showFeatures);

module.exports = router;