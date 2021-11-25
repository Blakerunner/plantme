const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const User = db.user;

// Register a new user
exports.register = (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
  };
  console.log('🚀 ~ file: authController.js ~ line 12 ~ user', newUser);
  User.findOne({
    where: {
      email: newUser.email,
    },
  })
    .then((user) => {
      if (user) {
        return res
          .status(401)
          .send({ success: false, message: 'User Already Exists.' });
      } else {
        bcrypt.hash(newUser.password, 8, (err, hashedPassword) => {
          if (err) {
            return res.status(500).send({
              message: err,
            });
          } else {
            newUser.password = hashedPassword;
            User.create(newUser)
              .then((user) => {
                console.log(
                  '🚀 ~ file: authController.js ~ line 36 ~ .then ~ user',
                  user
                );
                return res.send('Register success');
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
    password: req.body.password,
  };
  User.findOne({
    where: {
      email: loginUser.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: 'User Does Not Exists.' });
      }
      bcrypt.compare(loginUser.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          console.log(
            '🚀 ~ file: authController.js ~ line 74 ~ .compare ~ result',
            result
          );
          user.password = null;
          const token = jwt.sign({ user }, process.env.JSONWEBTOKEN_SECRET, {
            expiresIn: 60 * 60 * 24,
            issuer: 'plantme.api',
          });
          if (!token) {
            return res.status(500).send({
              success: false,
              message: 'Server Failed to create token',
            });
          }
          res.cookie('jwt', token, { secure: false, httpOnly: true, expires: 60 * 60 * 24 });
          res.send({ success: true, message: 'Login Success', user, token }); // need to remove token from send as it is unsecure.
        } else {
          return res
            .status(403)
            .send({ success: false, message: 'Incorrect credentials' });
        }
      });
    })
    .catch((err) => {
      console.log('🚀 ~ file: authController.js ~ line 104 ~ err', err);
      return res.status(500).send({ success: false, message: err });
    });
};

// Silently logged in a user
exports.silentLogin = (req, res, next) => {
  const bearer = req.headers.authorization;
  const token = bearer.split(' ')[1];
  if (!token) {
    return res.status(403).send('Token is required for authentication');
  }
  const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
  console.log('🚀 ~ file: authController.js ~ line 114 ~ decoded', decoded);
  User.findOne({
    where: {
      id: decoded.user.id,
      email: decoded.user.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: 'User Does Not Exists.' });
      }
      user.password = null;
      return res
        .status(200)
        .send({ success: true, message: 'Silent Login Success', token, user });
    })
    .catch((err) => {
      return res.status(500).send({ success: false, message: err });
    });
};
