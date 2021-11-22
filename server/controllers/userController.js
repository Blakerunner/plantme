const { Plant } = require("../models/Plant");
const { adminController } = require("./adminController");
const StatReport = require("../StatReport");

// getAll
exports.getAll = (req, res) => {
  Plant.findAll()
    .then((data) => {
      StatReport.statsObj["GET:/api/v1/user"]++;
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
        StatReport.statsObj["POST:/api/v1/user/create"]++;
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
      StatReport.statsObj["GET:/api/v1/user/seed"]++;
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
