//import all the modules (biult-in and 3rd party)
const Products = require("../models/products");
const url = require("url");

//make visible for other js and create middleware
exports.addForm = (req, res, next) => {
  res.render("addproducts");
};

exports.addItem = (req, res, next) => {
  // console.log(req.body);
  //req -->send request, if method is post, we can get the data sent to the server (req.body)
  new Products({
    title: req.body.title,
    imageURL: req.body.imageURL,
    price: req.body.price,
    description: req.body.description
  })
    .save()
    .then(() => {
      res.redirect("/products");
    })
    .catch(err => {
      throw "couldn't find products";
    });
};

exports.displayAll = (req, res, next) => {
  Products.find().then(allProducts => {
    res.render("products", { products: allProducts });
  });
};

exports.viewDetailByID = (req, res, next) => {
  // console.log(req.params);
  const getId = req.params.idOfItem;
  // wait for the return (promise), that comes from the database,
  // so we need to use .then() to recieve the promise(products in this case )
  Products.findById(getId).then(data => {
    console.log(data);
    res.render("viewDetail", { products: data });
  });
};

exports.editForm = (req, res, next) => {
  const getId = req.params.idOfItem;
  Products.findById(getId).then(data => {
    //  console.log(getId)
    res.render("edit", { prod: data });
  });
};

exports.editProductById = (req, res, next) => {
  //to get all the data that comes from the user to server(passes through req)
  const getId = req.body._id; //name:_id @form
  // console.log(getId)
  Products.findById(getId)
    .then(data => {
      (data.title = req.body.title),
        (data.imageURL = req.body.imageURL),
        (data.price = req.body.price),
        (data.description = req.body.description);
      data.save();
    })
    .then(() => {
      //respond to the user
      res.redirect("/products");
    })
    .catch(err => {
      if (err) throw err;
    });
};

exports.deleteProduct = (req, res, next) => {
  // console.log(req.body);
  Products.findByIdAndDelete(req.body._id)
    .then(() => {
      res.redirect("/products");
    })
    .catch(err => {
      throw "delete product";
    });
};
