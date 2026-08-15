const features = require("../models/featureModel");

const showFeatures = (req, res) => {
    res.render("feature", {
        features
    });
};

module.exports = {
    showFeatures
};