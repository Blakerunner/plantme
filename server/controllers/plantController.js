const db = require('../models/db');
const Plant = db.plant;

// get all plants
exports.getAll = (req, res, next) => {
  Plant.findAll()
    .then((data) => {
      res.send({ success: true, data });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err,
      });
    });
};

// Get plant by id
exports.getPlantById = (req, res, next) => {
  const id = req.params.id;
  Plant.findByPk(id)
    .then((data) => {
      res.send({ success: true, data });
    })
    .catch((err) => {
      res.status(401).send({
        success: false,
        message: `Plant id:${id} does not exist.`,
        err,
      });
    });
};

// Add plant to database
exports.addPlant = (req, res, next) => {
  const newPlant = req.body.plant;
  if (!newPlant) {
    res.status(500).send({
      success: false,
      message: 'Plant required to create new Plant',
    });
  }
  Plant.findOne({
    where: {
      name: newPlant.name,
    },
  }).then((plant) => {
    if (plant) {
      return res
        .status(401)
        .send({ success: false, message: 'Plant already exists' });
    } else {
      Plant.create(newPlant)
        .then((plant) => {
          return res.send({ success: true, plant });
        })
        .catch((err) => {
          return res.status(500).send({ success: false, message: err });
        });
    }
  });
};

// Edit plant
exports.editPlant = (req, res, next) => {
  const plant = req.body.plant;
  Plant.update(
    { name: plant.name },
    {
      where: {
        id: plant.id,
      },
    }
  )
    .then(() => {
      res.send({
        success: true,
        message: `Plant Id ${plant.id} updated to ${JSON.stringify(plant)}`,
      });
    })
    .catch((err) => {
      return res.status(500).send({ success: false, message: err });
    });
};

// Delete plant
exports.deletePlant = (req, res, next) => {
  const plant = req.body.plant;
  Plant.destroy({
    where: {
      id: plant.id,
    },
  })
    .then((response) => {
      if (response) {
        res.send({ success: true, message: `Plant Id ${plant.id} deleted.` });
      } else {
        res.send({
          success: false,
          message: `Plant Id ${plant.id} not found.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ success: false, message: err });
    });
};
