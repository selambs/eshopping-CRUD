//import all the (biult-in and 3rd party) modules 
const express = require("express");
const homeController = require("../controller/homeController");

//create the routes
const router = express.Router();

//get the datas by usign get method
router.get("/", homeController.homePage);

//make visible for other js
module.exports = router;
