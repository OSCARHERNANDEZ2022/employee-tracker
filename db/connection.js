const mysql = require("mysql2");

// require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  // dialect: "mysql",
  // port: 3001,
  user: "root",
  password: "SAAB1212!!get$",
  database: "employee_tracker",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("CRM is now online...");
});

module.exports = connection;
