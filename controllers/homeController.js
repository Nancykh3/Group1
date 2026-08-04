const homeData = require("../models/homeModel.js");

const showHome = (req, res) => {
    res.render("home", homeData);
};

module.exports = {
    showHome
};