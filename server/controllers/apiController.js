const { Plant } = require("../models/Plant");

exports.getAll = (req, res) => {
  Plant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: "Error: failed to get all scores.",
      });
    else res.send(data);
  });
};
