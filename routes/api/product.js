const express = require("express");
const router = express.Router();

const keys = require("../../config/keys");

// Load User model
const Product = require("../../models/Product");

// get product list
router.get("/", (req, res) => {
  Product.find({}, (err, response) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to get product detail",
          msgError: true,
        },
      });
    else {
      res.status(200).json({ response });
    }
  });
});

// get product list by id
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).end();
      } else {
        return res.status(200).json(product);
      }
    })
    .catch((err) => next(err));
});

// create product

router.post("/", (req, res) => {
  //console.log(req.body);
  const newProduct = new Product({
    categoryId: req.body.categoryId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    createdDate: req.body.createdDate,
  });
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => console.log(err));
});

// delete
router.delete("/:id", (req, res) => {
  //console.log(req.body);
  const prod = new Product(req.body);
  Product.findByIdAndDelete(req.params.id, (err) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to Delete Product",
          msgError: true,
        },
      });
    else res.send(prod);
  });
});

// udpate Product
router.put("/:id", (req, res) => {
  var updatedRecord = {
    categoryId: req.body.categoryId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
  };

  Product.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else
        console.log(
          "Error while updating a record : " + JSON.stringify(err, undefined, 2)
        );
    }
  );
});

module.exports = router;
