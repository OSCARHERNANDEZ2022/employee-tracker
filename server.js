const mysql = require("mysql2");
const inquierer = require("inquirer");
require("console.table");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database

const db = mysql.createConnection(
  {
    host: "localhost",
    // Mysql username,
    user: "root",
    // Mysql password
    password: "SAAB1212!!get$",
    database: "employee tracker",
  },
  console.log("Connected to the employee tracker database.")
);

db.query(`SELECT * FROM employee`, (err, rows) => {
  console.log(rows);
});

// Default response for any other request (Not found)

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
