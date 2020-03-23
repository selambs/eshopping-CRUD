const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          //the id stores the object id
          type: mongoose.Types.ObjectId,
          //from which data base we take the object id (refer to collection)
          ref: "Products",
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    totalPrice: Number
  }
});

userSchema.methods.addToCart = function(product) {
  //to acccess the cart from the userSchema use this.cart
  let cart = this.cart;
  const isExisting = cart.items.findIndex(objInItems => {
    return (
      new String(objInItems.productId).trim() == new String(product._id).trim()
    );
  });
  if (isExisting >= 0) {
    cart.items[isExisting].quantity += 1;
  } else {
    cart.items.push({
      productId: product._id,
      quantity: 1
    });
  }
  if (!cart.totalPrice) {
    cart.totalPrice = 0;
  }
  cart.totalPrice += product.price;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function(productId) {
  const updateCart = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updateCart;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("Users", userSchema);
