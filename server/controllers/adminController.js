const { Admin } = require("../models/Admin");
const { Plant } = require("../models/Plant");
const { User } = require("../models/User");

// getAll endpoint stats
exports.getEndpoint = (req, res) => {
  Admin.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err,
      });
    });
};

// update an endpoint we are tracking
exports.updateEndpoint = (req, res, next) => {
  Admin.updateEndpoint(req.method, req.url).catch((err) => {
    console.log("Failed: ", err);
  });
  next();
};

// create admin endpoint to track
exports.create = (method, endpoint) => {
  Admin.create(method, endpoint)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err,
      });
    });
};

// seed the database
exports.seedDatabase = (req, res, next) => {
  Admin.seed().catch((err) => {
    res.status(500).send({
      message: err,
    });
  });
  Plant.seed().catch((err) => {
    res.status(500).send({
      message: err,
    });
  });
  User.seed().catch((err) => {
    res.status(500).send({
      message: err,
    });
  });
  res.send({ success: true, message: "Database Seeded." });
};
