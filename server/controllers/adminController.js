const db = require('../models/db');
const Admin = db.admin;
const Plant = db.plant;
const User = db.user;
const {
  adminData,
  plantData,
  userData,
  usersplantsData,
} = require('../data/seedData');

// getAll endpoint stats
exports.getEndpoint = (req, res, next) => {
  Admin.findAll()
    .then((data) => {
      return res.send({
        success: true,
        message: 'successful operation',
        data: { stats: data },
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err,
        data: {},
      });
    });
};

// update an endpoint we are tracking
exports.updateEndpoint = async (req, res, next) => {
  try {
    const method = req.method;
    const endpoint = req.url;
    if (endpoint == '/api/v1/admin/seedDatabase') {
      next();
    }
    const admin = await Admin.findOne({ where: { method, endpoint } });
    if (admin) {
      admin.increment('requests');
      admin.save();
    } else {
      await Admin.create({ method, endpoint, requests: 1 });
    }
    next();
  } catch (err) {
    console.log(
      '🚀 ~ file: adminController.js ~ line 45 ~ exports.updateEndpoint= ~ err',
      err
    );
    next();
  }
};

// seed the database
exports.seedDatabase = async (req, res, next) => {
  try {
    await Admin.bulkCreate(adminData);
    await User.bulkCreate(userData);
    await Plant.bulkCreate(plantData);

    await usersplantsData.forEach((association) => {
      User.findByPk(association.userId).then((user) => {
        Plant.findByPk(association.plantId).then((plant) => {
          user.addPlant(plant);
        });
      });
    });

    res.send({ success: true, message: 'Database Seeded.', data: {} });
  } catch (err) {
    console.log(
      '🚀 ~ file: adminController.js ~ line 88 ~ exports.seedDatabase= ~ err',
      err
    );
  }
};
