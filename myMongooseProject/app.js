//import all the modules (biult-in and 3rd party)
const express = require("express");
const path = require("path");
// const mongConnect =  require("./utils/database").mongoConnect;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//import the routers
const userRouters = require("./routes/userRouter");
const productRouters = require("./routes/products");
const users = require("./models/user");
// const authRoutes = require("./routes/auth");
const flash = require("connect-flash");

//set engine(ejs template)
//use the css,images from the public folder
const app = express();
app.set("view engine", "ejs");
// mongoose.set("createIndexes", true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(flash());

//to do a mock(to pretend like a in-memory mongodb) use a middleware
app.use((req, res, next) => {
  users
    .findById("5e707d535fcb0c2c903e8e74")
    .then(userObj => {
      //to get the user object
      // console.log("info:",userObj)
      req.user = userObj;
      next();
    })
    .catch(err => console.log(err));
  //to pass the reuest that comes call next
  
});

//use the routers
app.use(userRouters);
app.use(productRouters);
// app.use(authRoutes);

//connect the moongoose with the server
mongoose
  .connect("mongodb://localhost:27017/eshopping", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(2300, () => {
      console.log(" server is running on 2300");
    });
  })
  .catch(err => console.log(err));
