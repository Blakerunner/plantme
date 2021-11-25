module.exports = (sequelize, Sequelize) => {
  const Plant = sequelize.define("Plant", {
    name: {
      type: Sequelize.STRING,
    },
  });
  return Plant;
};
