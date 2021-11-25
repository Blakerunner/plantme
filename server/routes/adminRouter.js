const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
const {authAdmin} = require('../middleware/auth');

// Get all plants
adminRouter.get('/endpointStats', authAdmin, adminController.getEndpoint);

// Seed plants table
adminRouter.get('/seedDatabase', adminController.seedDatabase);

module.exports = {
  adminRouter,
};
