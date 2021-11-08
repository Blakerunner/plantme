// Connect to database via Sequelize ORM
const DB = new Sequelize(
  process.env.MYSQL_DATABASE || "plantme",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD || "",
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
  }
);

try {
  await DB.authenticate();
  console.log(`Database connected successful: ${process.env.MYSQL_DATABASE}`);
} catch (error) {
  console.error(
    `Unable to connect to the database: ${process.env.MYSQL_DATABASE}`,
    error
  );
}

module.exports = {
  DB,
};
