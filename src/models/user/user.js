const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
});

//Export the model
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
