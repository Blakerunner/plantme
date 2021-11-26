const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const {authUser} = require('../middleware/auth');

// Get user's plant list
userRouter.get('/', authUser, userController.me);

// Add plant to the user's favorites
userRouter.put('/', authUser, userController.addMyPlant);

// Delete plant from user's favorites
userRouter.delete('/', authUser, userController.deleteMyPlant);

module.exports = {
  userRouter,
};
