const { Plant } = require("../models/Plant");

// get all plants
exports.getAll = (req, res) => {
  Plant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err,
      });
    });
};

// Get plant by id
exports.getPlantById = (req, res) => {
  res.send({success: true, msg: req.baseUrl});
};

// Add plant to database
exports.addPlant = (req, res) => {
  let plant = req.body.plant;
  if (!plant) {
    res.status(500).send({
      message: "plant required to create new Plant",
    });
  } else {
    Plant.addPlant(plant)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        });
      });
  }
};

// Edit plant
exports.editPlant = (req, res) => {
  res.send({success: true, msg: req.baseUrl});
};

// Delete plant
exports.deletePlant = (req, res) => {
  res.send({success: true, msg: req.baseUrl});
};

// seed
exports.seed = (req, res, next) => {
  Plant.seed()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
  next();
};
