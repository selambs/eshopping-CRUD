exports.loginForm = (req, res, next) => {
  res.render("login", {
    path: "/login",
    pageTitle: "Login"
  });
};
