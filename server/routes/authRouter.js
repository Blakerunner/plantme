const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

// Register a new user
authRouter.post('/register', authController.register);

// Sign in a user
authRouter.post('/login', authController.login);

// Silent login with a token
authRouter.post('/silentLogin', authController.silentLogin);

module.exports = {
  authRouter,
};
