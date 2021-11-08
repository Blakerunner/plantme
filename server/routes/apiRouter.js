const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");

// Get all plants
apiRouter.get("/", apiController.getAll);
// Create new plant
apiRouter.post("/create", apiController.create);

module.exports = {
  apiRouter,
};
