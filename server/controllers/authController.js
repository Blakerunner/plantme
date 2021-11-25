const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const User = db.user;

// Register a new user
exports.register = (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false
  };
  console.log("🚀 ~ file: authController.js ~ line 12 ~ user", newUser);
  User.findOne({
    where: {
      email: newUser.email,
    },
  })
    .then((user) => {
      if (user) {
        return res
          .status(401)
          .send({ success: false, message: "User Already Exists." });
      } else {
        bcrypt.hash(newUser.password, 8, (err, hashedPassword) => {
          if (err) {
            return res.status(500).send({
              message: err,
            });
          } else {
            newUser.password = hashedPassword
            User.create(newUser)
              .then((user) => {
                console.log("🚀 ~ file: authController.js ~ line 36 ~ .then ~ user", user);
                return res.send("Register success");
              })
              .catch((err) => {
                return res.status(500).send({ success: false, message: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ success: false, message: err });
    });
};

// Login a User
exports.login = (req, res, next) => {
  const loginUser = {
    email: req.body.email,
    password: req.body.password
  }
  User.findOne({
    where: {
      email: loginUser.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "User Does Not Exists." });
      }
      bcrypt
        .compare(loginUser.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
          if (result) {
            console.log("🚀 ~ file: authController.js ~ line 74 ~ .compare ~ result", result);
            const token = jwt.sign(
              {
                exp: 60 * 60,
                data: { id: user.id, email: user.email, isAdmin: user.isAdmin },
              },
              process.env.JSONWEBTOKEN_SECRET
            );

            if (!token) {
              return res.status(500).send({
                success: false,
                message: "Server Failed to create token",
              });
            }
            return res
              .status(200)
              .send({ success: true, message: "Login Success", token });
          } else {
            return res
              .status(200)
              .send({ success: false, message: "Incorrect credentials" });
          }
        })
    })
    .catch((err) => {
      console.log("🚀 ~ file: authController.js ~ line 104 ~ err", err);
      return res.status(500).send({ success: false, message: err });
    });
};

exports.logout = (req, res, next) => {
  res.send({ success: true, message: req.baseUrl });
};
