const { Sequelize } = require('sequelize');
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'plantme';

// Connect to database via Sequelize ORM
const sequelize = new Sequelize(
  MYSQL_DATABASE,
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'root',
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    logging: false,
  }
);

const db = {};
// reference to Sequelize package
db.Sequelize = Sequelize;
// reference to our database
db.sequelize = sequelize;

// connect our models for reference
db.admin = require('./Admin')(sequelize, Sequelize);
db.user = require('./User')(sequelize, Sequelize);
db.plant = require('./Plant')(sequelize, Sequelize);
db.usersplants = require('./UsersPlants')(sequelize);

// link users -> plants
db.user.belongsToMany(db.plant, {
  through: db.usersplants,
  constraints: false,
});
db.plant.belongsToMany(db.user, {
  through: db.usersplants,
  constraints: false,
});

// Confirm connection to database.
db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Connection has been established successfully to ${MYSQL_DATABASE}`
    );
    db.sequelize.sync({ alter: true, force: false });
    console.log(`Database synced.`);
  })
  .catch((err) => {
    console.error(`Unable to connect to the database ${MYSQL_DATABASE}`, err);
  });

module.exports = db;
