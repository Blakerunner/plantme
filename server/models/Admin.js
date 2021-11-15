const { DB } = require("../db/dbConnect");
const { Sequelize, DataTypes } = require("sequelize");
const { adminData } = require("../data/adminData");

const Admin = DB.define("Admin", {
  method: {
    type: DataTypes.STRING,
  },
  endpoint: {
    type: DataTypes.STRING,
  },
  requests: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Admin.getAll = async () => {
  console.log("Getting plants from the Plant table.");
  await Admin.findAll()
    .then((plants) => {
      return plants;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

Admin.seed = async () => {
  await Admin.sync({ force: true });
  console.log("The table for the Admin model was just (re)created!");
  await Admin.bulkCreate(adminData)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

Admin.update = async (method, endpoint) => {
  console.log("Updating admin stats:", method, endpoint);
  const updatingAdmin = await Admin.findOne({
    where: {
      method: method,
      endpoint: endpoint,
    },
  })
    .then((data) => {
      return data.increment("requests");
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
  console.log("Update Complete");
};

Admin.create = async (method, endpoint) => {
  console.log("Creating new admin stats:", method, endpoint);
  const values = {
    method: method,
    endpoint: endpoint,
  };
  await Admin.create(values)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });

  console.log("Create Complete");
};

module.exports = {
  Admin,
};
