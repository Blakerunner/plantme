const { Plant } = require("../models/Plant");

// getAll
exports.getAll = (req, res) => {
  Plant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// create
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

// seed
exports.seed = (req, res) => {
  Plant.seed()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
