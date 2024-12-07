// Connects to MySQL database

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "RuPaNgO01!",
  database: "ebid_proj",
});

// Register
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

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // First, check in the 'user' database
  const sqlUser = "SELECT * FROM user WHERE username = ?";
  db.query(sqlUser, [username], async (err, resultsUser) => {
    if (err) {
      console.error("Error during login (user database):", err);
      return res.status(500).json({ error: "Database error" });
    }

    // If user is found, compare the entered password with the hashed password
    if (resultsUser.length > 0) {
      const hashedPassword = resultsUser[0].password; // This should be a string
      console.log('Hashed password from DB:', hashedPassword); // Log to check
      
      if (!hashedPassword || typeof hashedPassword !== 'string') {
        return res.status(400).json({ error: 'Invalid password data in database.' });
      }

      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        return res.json({
          success: true,
          message: "Login successful!",
          redirectTo: "/home", 
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid username or password.",
        });
      }
    }

    // If not found in 'user' database, check in the 'superuser' database
    const sqlSuperuser = "SELECT * FROM superuser WHERE username = ?";
    db.query(sqlSuperuser, [username], async (err, resultsSuperuser) => {
      if (err) {
        console.error("Error during login (superuser database):", err);
        return res.status(500).json({ error: "Database error" });
      }

      // If superuser is found, compare the entered password with the hashed password
      if (resultsSuperuser.length > 0) {
        const hashedSuperuserPassword = resultsSuperuser[0].password; // Get the hashed password

        const superuserPasswordMatch = await bcrypt.compare(password, hashedSuperuserPassword); // Compare with bcrypt

        if (superuserPasswordMatch) {
          return res.json({
            success: true,
            message: "Admin login successful!",
            redirectTo: "/admin", 
          });
        } else {
          return res.json({
            success: false,
            message: "Invalid username or password.",
          });
        }
      } else {
        // If not found in either database, return a failure message
        return res.json({
          success: false,
          message: "Invalid username or password.",
        });
      }
    });
  });
});

const port = 8081;
app.listen(port, () => {
    console.log("Server listening on port 8081");
});