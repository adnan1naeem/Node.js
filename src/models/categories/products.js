const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  discription: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock_count: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  is_featured: {
    type: Boolean,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
  }
});

//Export the model
const ProductsModel = mongoose.model("Products", ProductsSchema);

module.exports = ProductsModel;
