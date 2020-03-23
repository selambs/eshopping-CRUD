//import all the (biult-in and 3rd party) modules
const User = require("../models/user");
const Products = require("../models/products");
const bcrypt = require("bcryptjs");

//make visible for other js and create middleware
exports.signUpForm = (req, res, next) => {
  res.render("signupform", { path: "/signupForm", pageTitle: "Sign up" });
};

exports.createUserAccount = (req, res, next) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  User.findOne({ email: email })
    //nested promise
    .then(userInput => {
      if (userInput) {
        //if there is a maching email redirect to the sign upform
        return res.redirect("/signupForm");
      }
      //if no matching email, create a new user with incrypted password
      return (
        bcrypt
          //hash returns string and the length is up to 12
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hashedPassword,
              role: role,
              cart: { item: [] }
            });
            return user.save();
          })
          .then(result => {
            res.redirect("/signin");
          })
      );
    })
    .catch(err => {
      // console.log(err);
      throw new Error("user action failed");
    });
};

exports.loginForm = (req, res, next) => {
  res.render("login", { path: "/login", pageTitle: "Login" });
};

exports.signIn = (req, res, next) => {
  // const email = req.body.email;
  // const password = req.body.password;
  // const role = req.body.role;
  // User.findOne({ email: email })
  //   .then(user => {
  //     if (user) {
  //       //compare the password from the user input with saved in the server
  //       bcrypt.compare(password, user.password).then(isMatch => {
  //         if (isMatch) {
  //           // req.session.isAuthenticated = true;
  //           req.session.user = user;
  //           //session is only if we have a matching passwordy
  //           return req.session.save(err => {
  //             res.redirect("/products");
  //           });
  //         } else {
  //           req.flash("loginErr", "Invalid Username and Password!");
  //           //if the password doesn't match redirect to login page
  //           res.redirect("/login");
  //         }
  //       });
  //     } else {
  //       req.flash("loginErr", "Invalid Username and Password!");
  //       res.redirect("/login");
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  res.redirect("/products");
};

exports.logout = (req, res, next) => {
  res.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};

exports.addToCart = (req, res, next) => {
  Products.findById(req.body._id)
    .then(product => {
      req.user.addToCart(product).then(result => {
        res.redirect("/cart");
      });
    })
    .catch(err => console.log(err));
};

exports.itemsInCart = (req, res, next) => {
  const inCrat = req.user;
  // console.log(req.user);
  //to get a data from another collection use populate()
  inCrat
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      res.render("cart", {
        cart: user.cart,
        path: "/cart",
        pageTitle: "Products in Cart"
      });
    })
    .catch(err => console.log(err));
};

exports.removeFromCart = (req, res, next) => {
  const prodId = req.body._id;
  // console.log(prodId)
  req.user
    .deleteItemFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.paymentMethod = (req, res, next) => {
  res.render("checkOut")
};
