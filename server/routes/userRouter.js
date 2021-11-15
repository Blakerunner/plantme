const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

// Get all plants
userRouter.get("/", adminController.update, userController.getAll);

// Seed plants table
userRouter.get("/seed", userController.seed);

// Create new plant
userRouter.post("/create", userController.addPlant);

module.exports = {
  userRouter,
};
