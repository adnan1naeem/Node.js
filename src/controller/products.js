const { ProductsModel, CategoryModel } = require("../models/index");

const addProduct = (req, res, next) => {
  CategoryModel.findById(req.body._id)
    .exec()
    .then(async (result) => {
      if (!result) {
        res.status(403).json({
          message: "No Category found with this id",
        });
      }
      if (result) {
        let product = new ProductsModel({
          name: req.body.name,
          discription: req.body.discription,
          image: req.body.image,
          stock_count: req.body.stock_count,
          price: req.body.price,
          rating: req.body.rating,
          is_featured: req.body.is_featured,
        });
        ProductsModel.find({ name: req.body.name })
          .exec()
          .then(async (response) => {
            if (response.length >= 1) {
              return res.status(403).json({
                message: "ProductsModel already exist",
              });
            }
            await product
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "Product Added Successfull!",
                });
              })
              .catch((error) => {
                console.log("errorss", error);
                res.status(500).json(error);
              });
            await CategoryModel.updateOne(
              { _id: req.body._id },
              {
                $push: {
                  products: [product],
                },
              }
            );
          })
          .catch((err) => {
            console.log("errorss", err);
            res.status(500).json({
              err: err,
            });
          });
      }
    });
};

const productList = (req, res, next) => {
  CategoryModel.findById(req.params.id)
    .exec()
    .then(async (result) => {
      let data = [];
      if (!result) {
        res.status(403).json({
          message: "No Category found with this id",
        });
      }
      if (result) {
        ProductsModel.find().then(async (response) => {
          let products = response.filter((value) =>
            result.products.includes(value._id)
          );
          return res.status(200).json({
            product: products,
          });
        });
      }
    });
};

const deleteProduct = (req, res, next) => {
  ProductsModel.findById(req.params.id)
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(401).json({
          message: "ProductsModel not exist",
        });
      }
      if (result) {
        ProductsModel.findByIdAndDelete(req.params.id)
          .then((response) => {
            res.status(200).json({
              message: "ProductsModel deleted successfully",
            });
          })
          .catch((err) => {
            console.log(err, "Error it is ");
            res.status(500).json({
              err: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err, "Error it is  usdb");
      res.status(500).json({
        err: err,
      });
    });
};

module.exports = { addProduct, productList, deleteProduct };
