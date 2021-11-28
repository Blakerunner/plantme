const db = require('../models/db');
const Plant = db.plant;

// get all plants
exports.getAll = (req, res, next) => {
  Plant.findAll()
    .then((data) => {
      res.send({
        success: true,
        message: 'Successful operation',
        data: { plants: data },
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err,
        data: {},
      });
    });
};

// Get plant by id
exports.getPlantById = (req, res, next) => {
  const id = req.params.id;
  Plant.findByPk(id)
    .then((data) => {
      res.send({
        success: true,
        message: 'Successful operation',
        data: { plant: data },
      });
    })
    .catch((err) => {
      res.status(401).send({
        success: false,
        message: `Plant id:${id} does not exist.`,
        data: { err },
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
      data: {},
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
        .send({ success: false, message: 'Plant already exists', data: {} });
    } else {
      Plant.create(newPlant)
        .then((plant) => {
          return res.send({
            success: true,
            message: 'Successful operation',
            data: { plant },
          });
        })
        .catch((err) => {
          return res
            .status(500)
            .send({ success: false, message: err, data: {} });
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
        data: {},
      });
    })
    .catch((err) => {
      return res.status(500).send({ success: false, message: err, data: {} });
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
        res.send({
          success: true,
          message: `Plant Id ${plant.id} deleted.`,
          data: {},
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Plant Id ${plant.id} not found.`,
          data: {},
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ success: false, message: err, data: {} });
    });
};
