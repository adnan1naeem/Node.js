const mongooes = require('mongoose');
const { Schema } = mongooes;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: Date.now(),
    },
});

userSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message: "Email already in use."});

const User = mongooes.model("user", userSchema);
module.exports = User;