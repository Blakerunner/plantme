const mysql = require('mysql');
const DB = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "plantme",
});

DB.connect( (err) => {
    if (err) throw err;
    console.log(`mySQL database connected - ${process.env.MYSQL_DATABASE}`);
})

module.exports = DB;