const DB = require("../db/dbConnect");
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql');

const Plant = sequelize.define('Plant', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
});

Plant.getAll = (result) => {
  Plant.findAll = () => {
    if (err) {
      console.log("Plant.getAll error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  };
};

module.exports = {
  Plant,
};
