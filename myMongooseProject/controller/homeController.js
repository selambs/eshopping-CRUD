//import all the (biult-in and 3rd party) modules 
const product = require("../models/products");

//make visible for other js and create middleware
exports.homePage = (req, res, next) => {
  res.render("home");
};

