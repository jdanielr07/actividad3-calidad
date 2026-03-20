const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Logaritmos506$",
  database: "calidad"
});

module.exports = db;