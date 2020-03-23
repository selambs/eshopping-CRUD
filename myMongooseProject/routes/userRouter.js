//import all the (biult-in and 3rd party) modules
const express = require("express");
const userController = require("../controller/userController");

//create the routes
const router = express.Router();

//get the datas by usign get method
router.get("/signupForm", userController.signUpForm);

//create a new account and save in the user server
router.post("/signup", userController.createUserAccount);

//get the login form
router.get("/signin", userController.loginForm);

//sign into the account
router.post("/signin", userController.signIn);

//logout from the user account
router.post("/logout", userController.logout);

//push items to cart
router.post("/add-to-cart", userController.addToCart);

//get products in cart
router.get("/cart", userController.itemsInCart);

//remove item from cart
router.post("/clear-cart", userController.removeFromCart);

//payment method
router.get("/place-order",userController.paymentMethod)

//clear cart when order is placed
// router.post("/place-order", userController.placeOrder);

//make visible for other js
module.exports = router;
