const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router.get("/login", authController.loginForm);

module.exports = router;
