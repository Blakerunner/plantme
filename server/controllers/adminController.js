const db = require("../models/db");
const Admin = db.admin;
const Plant = db.plant;
const User = db.user;
const { adminData, plantData, userData } = require("../data/seedData");

// getAll endpoint stats
exports.getEndpoint = (req, res, next) => {
  Admin.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err,
      });
    });
};

// update an endpoint we are tracking
exports.updateEndpoint = (req, res, next) => {
  const method = req.method;
  const endpoint = req.url;
  console.log("Updating admin stats:", method, endpoint);
  Admin.findOne({
    where: {
      method: method,
      endpoint: endpoint,
    },
  })
    .then((result) => {
      result.increment("requests");
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: adminController.js ~ line 32 ~ updateEndpoint err",
        err
      );
    });
  next();
};

// seed the database
exports.seedDatabase = async (req, res, next) => {
  try {
    await Admin.sync({ alter: true, force: true });
    await Admin.bulkCreate(adminData);
    console.log("The table for the Admin model was just (re)created!");

    await User.sync({ alter: true, force: true });
    await User.bulkCreate(userData);
    console.log("The table for the User model was just (re)created!");

    await Plant.sync({ alter: true, force: true });
    await Plant.bulkCreate(plantData);
    console.log("The table for the Plant model was just (re)created!");

    res.send({ success: true, message: "Database Seeded." });
  } catch (err) {
    return `err: ${err}`;
  }
};
