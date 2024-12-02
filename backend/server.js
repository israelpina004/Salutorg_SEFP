// Connects to MySQL databases.

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "RuPaNgO01!",
    database: "ebid_proj"
});

app.post('/ebid_proj', (req, res) => {
  const sql = "INSERT INTO user (`email`, `username`, `password`) VALUES (?, ?, ?)";
  const values = [
    req.body.email,
    req.body.username,
    req.body.password
  ];

  db.query(sql, values, (err, data) => {  // Fixed this line
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

const port = 8081;
app.listen(port, () => {
    console.log("Server listening on port 8081");
});
