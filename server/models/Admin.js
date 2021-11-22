const { DB } = require("../db/dbConnect");
const { DataTypes } = require("sequelize");
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

Admin.endpointStats = () => {
  console.log("Getting Endpoint Stats");
  return Admin.findAll()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

Admin.addEndpoint = async (method, endpoint) => {
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

Admin.updateEndpoint = async (method, endpoint) => {
  console.log("Updating admin stats:", method, endpoint);
  await Admin.findOne({
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

module.exports = {
  Admin,
};
