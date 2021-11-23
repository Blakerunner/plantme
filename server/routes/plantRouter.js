const express = require("express");
const plantRouter = express.Router();
const plantController = require("../controllers/plantController");

// Get all plants
plantRouter.get("/", plantController.getAll);

// Get plant by id
plantRouter.get("/:id", plantController.getPlantById);

// Get plant by id
plantRouter.post("/", plantController.addPlant);

// Delete plant from user's favorites
plantRouter.put("/", plantController.editPlant);

// Delete plant from user's favorites
plantRouter.delete("/", plantController.deletePlant);

module.exports = {
  plantRouter,
};
