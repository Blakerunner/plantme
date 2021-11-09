const { DB } = require("../db/dbConnect");
const { Sequelize, DataTypes } = require("sequelize");

const Plant = DB.define("Plant", {
  name: {
    type: DataTypes.STRING,
  },
});

Plant.seed = async () => {
  await Plant.sync({ force: true });
  console.log("The table for the Plant model was just (re)created!");
  await Plant.bulkCreate([
    { name: "beefsteak tomatoe" },
    { name: "sun gold cherry tomatoe" },
    { name: "brandywine tomatoe" },
    { name: "roma tomatoe" },
  ])
    .then((plants) => {
      return plants;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

Plant.getAll = async () => {
  console.log("Getting plants from the Plant table.");
  await Plant.findAll()
    .then((plants) => {
      return plants;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

Plant.addPlant = async (plant) => {
  console.log("Creating new Plant:", plant);
  await Plant.create(plant)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return `Error: ${err}`;
    });
};

module.exports = {
  Plant,
};
