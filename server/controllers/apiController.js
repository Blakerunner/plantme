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
