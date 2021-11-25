module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      plantList: {
        type: Sequelize.JSON,
        defaultValue: { ids: [] },
      },
    },
    {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
      },
    }
  );
  return User;
};
