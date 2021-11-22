const { User } = require("../models/User");

// me
exports.me = (req, res) => {
  res.send({success: true, msg: req.baseUrl});
};

// create
exports.addPlant = (req, res) => {
  res.send({success: true, msg: req.baseUrl});
};

// delete
exports.deletePlant = (req, res) => {
  res.send({success: true, msg: req.baseUrl});
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
