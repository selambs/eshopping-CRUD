//import the database("eshopping") and the id that the database generates
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Products", mySchema);
