const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

// Path to the SQL files directory
const sqlDir = path.join(__dirname, "backend/e_bid_database");

// Function to run all .sql files in the directory
const runSQLFiles = () => {
  const files = fs.readdirSync(sqlDir).filter((file) => file.endsWith(".sql"));

  files.forEach((file) => {
    const filePath = path.join(sqlDir, file);
    const sql = fs.readFileSync(filePath, "utf8");

    db.query(sql, (err, results) => {
      if (err) {
        console.error(`Error executing ${file}:`, err.message);
      } else {
        console.log(`${file} executed successfully.`);
      }
    });
  });

  db.end(() => {
    console.log("Database connection closed.");
  });
};

runSQLFiles();