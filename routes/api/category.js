const express = require("express");
const router = express.Router();

const keys = require("../../config/keys");

// Load User model
const Category = require("../../models/Category");

// get category list
router.get("/", (req, res) => {
  Category.find({}, (err, response) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to get category detail",
          msgError: true,
        },
      });
    else {
      res.status(200).json({ response });
    }
  });
});

// get category list by id
router.get("/:id", (req, res) => {
  Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).end();
      } else {
        return res.status(200).json(category);
      }
    })
    .catch((err) => next(err));
});

// create category

router.post("/", (req, res) => {
  //console.log(req.body);
  const newCategory = new Category({
    categoryId: req.body.categoryId,
    name: req.body.name,
    createdDate: req.body.createdDate,
  });
  newCategory
    .save()
    .then((category) => res.json(category))
    .catch((err) => console.log(err));
});

// delete
router.delete("/:id", (req, res) => {
  //console.log(req.body);
  const cat = new Category(req.body);
  Category.findByIdAndDelete(req.params.id, (err) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to Delete Category",
          msgError: true,
        },
      });
    else res.send(cat);
  });
});

// udpate category
router.put("/:id", (req, res) => {
  var updatedRecord = {
    name: req.body.name,
    categoryId: req.body.categoryId,
  };

  Category.findByIdAndUpdate(
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
