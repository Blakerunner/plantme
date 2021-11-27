const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { authUser } = require('../middleware/auth');

// Register a new user
authRouter.post('/register', authController.register);

// Sign in a user
authRouter.post('/login', authController.login);

// Silent login with a token
authRouter.get('/silentLogin', authUser, authController.silentLogin);

module.exports = {
  authRouter,
};
