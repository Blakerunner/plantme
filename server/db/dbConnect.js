const { Sequelize } = require("sequelize");
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "plantme"

// Connect to database via Sequelize ORM
const DB = new Sequelize(
  MYSQL_DATABASE,
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD || "",
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
  }
);

// Confirm connection to database.
try {
  DB.authenticate();
  console.log(`Database connected successful: ${MYSQL_DATABASE}`);
} catch (error) {
  console.error(
    `Unable to connect to the database: ${MYSQL_DATABASE}`,
    error
  );
}

module.exports = {
  DB,
};
