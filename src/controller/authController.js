// const User = require('../models/index')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user/user");

const register = (req, res, next) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(403).json({
          message: "User already exist",
        });
      }
      bcrypt.hash(req.body.password, 10, async function (err, hashedpass) {
        if (err) {
          res.status(500).json({
            error: err,
          });
        }
        let user = new UserModel({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedpass,
        });
        console.log("user", user);
        console.log("error", err);
        await user
          .save()
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.log("errorss", error);

            console.log(error);
            res.status(500).json(error);
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

const login = (req, res, next) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "User not exist",
        });
      }
      bcrypt.compare(
        req.body.password,
        user[0].password,
        async function (error, result) {
          if (!result) {
            res.status(401).json({
              message: "Incorect password",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                email: user[0].email,
              },
              "This is dummy text",
              { expiresIn: "24h" }
            );
            res.status(200).json({
              first_name: user[0].first_name,
              last_name: user[0].last_name,
              email: user[0].email,
              token: token,
            });
          }
        }
      );
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

module.exports = { register, login };
