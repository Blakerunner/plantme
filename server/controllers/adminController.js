const { Admin } = require("../models/Admin");
const StatReport = require("../StatReport");

// getAll
exports.getAll = (req, res) => {
  Admin.findAll()
    .then((data) => {
      StatReport.statsObj["GET:/api/v1/admin"]++;
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
  await Admin.update(req.method, req.baseUrl).catch((err) => {
    console.log("Failed: ", err);
  });
  next();
};

// create
exports.create = (method, endpoint) => {
  Admin.create(method, endpoint)
    .then((data) => {
      StatReport.statsObj["POST:/api/v1/admin/create"]++;
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
  Admin.seed()
    .then((data) => {
      StatReport.statsObj["GET:/api/v1/admin/seed"]++;
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
