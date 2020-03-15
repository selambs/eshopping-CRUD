//import all the modules (biult-in and 3rd party)
const express = require("express");
const path = require("path");
// const mongConnect = require("./utils/database").mongoConnect;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

//import the routers
const homeRouters = require("./routes/homeRouter");
const productRouters = require("./routes/products");

//set engine(egs template)
//use the css,images from the public folder
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

//use the routers
app.use(homeRouters);
app.use(productRouters);

//connect the moongoose with the server
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    app.listen(2300, ()=> {
        console.log(' server is running on 2300');
    })
})
.catch(err => console.log(err));
