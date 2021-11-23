const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

// Get user's plant list
userRouter.get("/", userController.me);

// Add plant to the user's favorites
userRouter.post("/", userController.addPlant);

// Delete plant from user's favorites
userRouter.delete("/", userController.deletePlant);

module.exports = {
  userRouter,
};
