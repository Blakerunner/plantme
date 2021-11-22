const { DB } = require("../db/dbConnect");
const { DataTypes } = require("sequelize");
const { plantData } = require("../data/plantData");

const Plant = DB.define("Plant", {
  name: {
    type: DataTypes.STRING,
  },
});

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

Plant.seed = async () => {
  await Plant.sync({ force: true });
  console.log("The table for the Plant model was just (re)created!");
  await Plant.bulkCreate(plantData)
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
