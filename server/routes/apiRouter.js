const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");

// Get all plants
apiRouter.get("/", apiController.getAll);

// Seed plants table
apiRouter.get("/seed", apiController.seed);

// Create new plant
apiRouter.post("/create", apiController.addPlant);

module.exports = {
  apiRouter,
};
