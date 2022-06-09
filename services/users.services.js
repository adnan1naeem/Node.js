const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const auth = require('../middlewares/auth');

async function login({username, password}, callback) {
    const user = await User.findOne({username});

    if(user !== null){
        if(bcryptjs.compareSync(password, user.password)){
            const token = auth.generateAccessToken(username);
            return callback(null, {...user.toJSON(), token})
        }
        else{
            return callback({
                message: "Invalid UserName/Password",
            })
        }
    }
    else{
        return callback({
            message: "Invalid UserName/Password",
        })
    }
};

async function register(params, callback) {

    if(params.username == undefined){
        return callback({
            message: "UserName Required",
        });
    }
    const user = new User(params);
    user.save().then((response) => {
        return callback(null, response);
    }).catch((error) =>{
        return callback(error);
    });
};

module.exports = {
    login, 
    register,
}