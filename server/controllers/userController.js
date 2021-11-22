const { User } = require("../models/User");

// me
exports.me = (req, res) => {
  res.send("me", req.bodyUrl);
};

// create
exports.addPlant = (req, res) => {
  res.send("addPlant", req.bodyUrl);
};

// delete
exports.deletePlant = (req, res) => {
  res.send("deletePlant", req.bodyUrl);
};

// seed
exports.seed = (req, res, next) => {
  User.seed()
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
