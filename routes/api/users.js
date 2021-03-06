const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          _id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          date: user.date,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Amar Tauqeer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
// udpate profile
router.put("/editProfile/:id", (req, res) => {
  updatedRecord = {
    name: req.body.name,
    email: req.body.email,
  };
  User.findByIdAndUpdate(
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

// change password
router.put("/changePassword/:id", (req, res) => {
  let saltRounds = 10;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const _id = req.body._id;
  // check the original password
  User.findOne({ _id }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernotfound: "User not found" });
    }
    // Check password
    bcrypt.compare(oldPassword, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        bcrypt.hash(newPassword, saltRounds, function (err, hash) {
          // Store hash in your password DB.
          updatedRecord = {
            password: hash,
          };
          User.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true },
            (err, docs) => {
              if (!err) res.send(docs);
              else
                console.log(
                  "Error while updating a record : " +
                    JSON.stringify(err, undefined, 2)
                );
            }
          );
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "old Password is incorrect" });
      }
    });
  });
});
module.exports = router;
