const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

// Get all plants
adminRouter.get("/", adminController.getAll);

// Seed plants table
adminRouter.get("/seed", adminController.seed);

// Create new admin route
adminRouter.post("/create", adminController.create);

module.exports = {
  adminRouter,
};
