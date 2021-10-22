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
  console.log('heelo')
  // Form validation
  const { data, error } = validateRegisterInput.validate(req.body);
  // Check validation
  if (error) {
    console.log(error);
    if (error.message.startsWith('name')) {
      return res.status(400).json({ nameinputerror: error.details[0].message });
    } else if (error.message.startsWith('email')) {
      return res.status(400).json({ emailinputerror: error.details[0].message });
    } else if (error.message.startsWith('password')) {
      return res.status(400).json({ passwordinputerror: error.details[0].message });
    }
    return res.status(400).json(error.details[0].message);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
  // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
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
  const { data, error } = validateLoginInput.validate(req.body);
  // Check validation
  if (error) {
    console.log(error);
    if (error.message.startsWith('"email"')) {
      console.log("starts with email");
      return res.status(400).json({ emailinputerror: error.details[0].message });
    }
    return res.status(400).json({ passwordinputerror: error.details[0].message })
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
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

module.exports = router;