const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var CategorySchema = new mongoose.Schema({
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
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Products'
  }]
});

//Export the model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
