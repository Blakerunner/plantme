const { Admin } = require("../models/Admin");

// getAll
exports.getAll = (req, res) => {
  Admin.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// update
exports.update = async (req, res, next) => {
  await Admin.update(req.method, req.baseUrl)
  .catch((err) => {
    console.log("Failed: ", err);
  });
  next();
}

// create
exports.create = (method, endpoint) => {
  Admin.create(method, endpoint)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err,
    });
  });
}

// seed
exports.seed = (req, res) => {
  Admin.seed()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
