const { User } = require('../models/User');
const userData = require('../data/userData');

// me
exports.me = (req, res) => {
  const id = req.query.id;
  try {
    const filteredUser = userData.userData.filter((user) => user.id === id);
    if (filteredUser.length == 0 || filteredUser.length > 1) {
      return res.status(500).send('Internal server error');
    }
    const data = { plants: filteredUser[0].plants };
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Internal server error');
  }
};

// create
exports.addPlant = (req, res) => {
  let plant = req.body.plant;
  if (!plant) {
    res.status(500).send({
      message: 'plant required to create new Plant',
    });
  } else {
    Plant.addPlant(plant)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        });
      });
  }
};

// Delete plant
exports.deletePlant = (req, res) => {
  res.send({ success: true, msg: req.baseUrl });
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
