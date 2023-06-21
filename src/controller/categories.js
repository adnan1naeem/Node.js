const { CategoryModel } = require("../models/index");

const addCategory = (req, res, next) => {
  CategoryModel.find({ name: req.body.name })
    .exec()
    .then(async (result) => {
      if (result.length >= 1) {
        return res.status(403).json({
          message: "Category already exist",
        });
      }
      let category = new CategoryModel({
        name: req.body.name,
        discription: req.body.discription,
        image: req.body.image,
      });
      await category
        .save()
        .then((response) => {
          res.status(201).json(category);
        })
        .catch((error) => {
          console.log("errorss", error);
          res.status(500).json(error);
        });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

const catgoryList = (req, res, next) => {
  CategoryModel.find()
    .exec()
    .then(async (result) => {
      if (result.length >= 1) {
        return res.status(200).json({
            catgory: result
        });
      }
      if (result.length === 0) {
        console.log(result, "Error it it is ");
        res.status(200).json({
            category: []
        });
      }
    })
    .catch((error) => {
        console.log(error, "Error it is ");
      res.status(500).json({
        message: error,
      });
    });
};

const deleteCategory = (req, res, next) => {
  CategoryModel.findById(req.params.id)
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(401).json({
          message: "Category not exist",
        });
      }
      if (result) {
        CategoryModel.findByIdAndDelete(req.params.id)
          .then((response) => {
            res.status(200).json({
              message: "Category deleted successfully",
            });
          })
          .catch((err) => {
            console.log(err, "Error it is ")
            res.status(500).json({
              err: err,
            });
          });
      }
    })
    .catch((err) => {
        console.log(err, "Error it is  usdb")
      res.status(500).json({
        err: err,
      });
    });
};

module.exports = { addCategory, catgoryList, deleteCategory };
