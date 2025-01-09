const express = require("express");

const Product = require("../models/product");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
const router = express.Router();

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", upload.single("productImage"), (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "Created Products Successfully !",
        createdProduct: {
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: "http://localhost:3000/products" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("From Database", doc);
      if (doc) {
        res.status(200).json({
          id: doc._id,
          name: doc.name,
          price: doc.price,
          result: {
            type: "GET",
            url: "http://localhost:3000/products" + id,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: " Not a valid entry found for the id input " });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ error: err });
    });
});

// here the request body should be an array [{"propName":"name","value":"12.99" }]
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.findByIdAndUpdate({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product Updated Successfully ! ",
        id: result._id,
        name: result.name,
        price: result.price,
        request: {
          type: "PATCH",
          url: "http://localhost:3000/products" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product Deleted !",
        type: "POST",
        url: "http://localhost:3000/products",
        syntax: { name: "Product_name", price: "value" },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
