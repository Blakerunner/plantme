const { DB } = require("../db/dbConnect");
const { DataTypes } = require("sequelize");
const { userData } = require("../data/userData");

const User = DB.define("User", {
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

User.getAll = async () => {
  console.log("Getting plants from the Plant table.");
  await User.findAll()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

User.addUser = async (user) => {
  console.log("Creating new User:", user);
  await User.create(user)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

User.seed = async () => {
  await User.sync({ force: true });
  console.log("The table for the Plant model was just (re)created!");
  await User.bulkCreate(userData)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

module.exports = {
  User,
};
