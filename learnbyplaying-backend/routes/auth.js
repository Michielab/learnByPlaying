const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtOptions = require("../config/jwtOptions");
const User = require("../model/user");

// Bcrypt let us encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", function(req, res) {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
  }

  if (email === "" || password === "") {
    res.status(401).json({ message: "fill up the fields" });
    return;
  }

  User.findOne({ email }, (err, user) => {
    if (!user) {
      res.status(401).json({ message: "no such user found" });
    } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (!isMatch) {
          res.status(401).json({ message: "passwords did not match" });
        } else {
          let payload = { id: user._id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ message: "ok", token, user });
        }
      });
    }
  });
});

router.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "email exist" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      name,
      email,
      password: hashPass
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        let payload = { id: user._id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({ message: "ok", token });
      }
    });
  });
});

module.exports = router;
