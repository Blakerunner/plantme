const express = require('express');
const plantRouter = express.Router();
const plantController = require('../controllers/plantController');

// Get all plants
plantRouter.get('/', plantController.getAll);

// Get plant by id
plantRouter.get('/:id', plantController.getPlantById);

// Get plant by id
plantRouter.post('/', plantController.addPlant);

// Edit plant
plantRouter.put('/', plantController.editPlant);

// Delete plant
plantRouter.delete('/', plantController.deletePlant);

module.exports = {
  plantRouter,
};
