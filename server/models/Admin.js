module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('Admin', {
    method: {
      type: Sequelize.STRING,
    },
    endpoint: {
      type: Sequelize.STRING,
    },
    requests: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  return Admin;
};
