const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

// Get all plants
adminRouter.get("/endpointStats", adminController.getEndpoint);

// Seed plants table
adminRouter.get("/seedDatabase", adminController.seedDatabase);

module.exports = {
  adminRouter,
};
