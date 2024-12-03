// Connects to MySQL databases.

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "RuPaNgO01!",
    database: "ebid_proj"
});

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
    const sql = "INSERT INTO user (`email`, `username`, `password`) VALUES (?, ?, ?)";
    const values = [email, username, hashedPassword];
    
    db.query(sql, values, (err, data) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Username is already taken." });
        }
        return res.status(500).json({ error: "Server error." });
      }
      return res.status(200).json({ message: "User registered successfully.", data });
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error during registration." });
  }
});

const port = 8081;
app.listen(port, () => {
    console.log("Server listening on port 8081");
});

//   const sql = "INSERT INTO user (`email`, `username`, `password`) VALUES (?, ?, ?)";
//   const values = [
//     req.body.email,
//     req.body.username,
//     req.body.password
//   ];

//   db.query(sql, values, (err, data) => {  // Fixed this line
//     if (err) {
//       if (err.code === "ER_DUP_ENTRY") {
//         return res.status(400).json({ error: "Username is already taken." });
//       }
//       return res.status(500).json({ error: "Server error." });
//     }
//     return res.status(200).json({ message: "User applied successfully.", data });
//   });
// });
