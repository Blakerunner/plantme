const db = require('../models/db');
const Plant = db.plant;
const User = db.user;
const UsersPlants = db.usersplants;

// me user profile
exports.me = (req, res, next) => {
  User.scope('withoutPassword')
    .findOne({
      where: { id: req.user.id },
      include: {
        model: Plant,
        through: { attributes: [] }, // will create a right join
      },
    })
    .then((user) => {
      res.send({ success: true, message: "Successful operation.", data: { user } });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err, data: {} });
    });
};

// add plant to user profile
exports.addMyPlant = async (req, res, next) => {
  const user = req.user;
  const { plant } = req.body;
  if (!plant) {
    res.status(500).send({
      success: false,
      message: 'Plant required to create new Plant',
      data: {}
    });
  } else {
    const alreadyHasPlant = await UsersPlants.findOne({
      where: { PlantId: plant.id, UserId: user.id },
    });
    console.log(
      '🚀 ~ file: userController.js ~ line 37 ~ alreadyHasPlant',
      alreadyHasPlant
    );
    if (!alreadyHasPlant) {
      User.findByPk(user.id)
        .then((userLocal) => {
          Plant.findByPk(plant.id)
            .then((plantLocal) => {
              if (!plantLocal) {
                res.status(400).send({
                  success: false,
                  message: `Plant Id ${plant.id} does not exist.`,
                  data: {}
                });
              }
              userLocal.addPlant(plantLocal);
              res.send({
                success: true,
                message: `User ${user.email} added Plant Id ${plant.id}`,
                data: {}
              });
            })
            .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));
    } else {
      res.send({
        success: false,
        message: `User ${user.email} already has Plant Id ${plant.id}`,
        data: {}
      });
    }
  }
};

// Delete plant from user profile
exports.deleteMyPlant = (req, res, next) => {
  const user = req.user;
  const { plant } = req.body;
  if (!plant) {
    res.status(500).send({
      success: false,
      message: 'No plant reference to delete',
      data: {}
    });
  } else {
    UsersPlants.destroy({ where: { UserId: user.id, PlantId: plant.id } })
      .then(() => {
        res.send({
          success: true,
          message: `User ${user.email} no longer associated with Plant Id ${plant.id}`,
          data: {}
        });
      })
      .catch((err) => res.status(500).send(err));
  }
};
