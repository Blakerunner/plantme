const db = require('../models/db');
const User = db.user;

// me user profile
exports.me = (req, res, next) => {
  User.scope('withoutPassword')
    .findOne({ where: { email: req.body.user.email } })
    .then((user) => {
      res.send({ success: true, user });
    })
    .catch((err) => {
      res.send({ success: false, message: err });
    });
};

// add plant to user profile
exports.addMyPlant = (req, res, next) => {
  let user = req.body.user;
  let plant = req.body.plant;
  if (!plant) {
    res.status(500).send({
      success: false,
      message: 'Plant required to create new Plant',
    });
  } else {
    User.findOne({ where: { email: user.email } })
      .then((user) => {
        let plantId = parseInt(plant.id);
        let ids = JSON.parse(user.plantList).ids;
        if (ids.includes(plantId)) {
          res.send({
            success: true,
            message: `You already have plant id ${plant.id}`,
          });
        } else {
          ids.push(plantId);
          user.plantList = { ids: ids };
          user.save();
          res.send({ success: true, message: `Added plant id ${plant.id}` });
        }
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err,
        });
      });
  }
};

// Delete plant from user profile
exports.deleteMyPlant = (req, res, next) => {
  let user = req.body.user;
  let plant = req.body.plant;
  if (!plant) {
    res.status(500).send({
      success: false,
      message: 'Plant required to create new Plant',
    });
  } else {
    User.findOne({ where: { email: user.email } })
      .then((user) => {
        let plantId = parseInt(plant.id);
        let ids = JSON.parse(user.plantList).ids;
        if (ids.includes(plantId)) {
          ids = ids.filter((item) => item !== plantId);
          user.plantList = { ids: ids };
          user.save();
          res.send({ success: true, message: `Removed plant id ${plant.id}` });
        } else {
          res.send({
            success: true,
            message: `You dont have that plant id ${plant.id}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err,
        });
      });
  }
};
