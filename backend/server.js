const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",       
  user: "root",   
  password: "mu$1cP_op101", 
  database: "ebid_proj"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
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
  const sqlUser = "SELECT * FROM user WHERE username = ? AND password = ?";
  db.query(sqlUser, [username, password], (err, resultsUser) => {
    if (err) {
      console.error("Error during login (user database):", err);
      return res.status(500).json({ error: "Database error" });
    }

    // If found in 'user' database, redirect to hompage
    if (resultsUser.length > 0) {
      return res.json({
        success: true,
        message: "Login successful!",
        redirectTo: "/home", 
      });
    }

    // If not found in 'user' database, check in the 'superuser' database
    const sqlSuperuser = "SELECT * FROM superuser WHERE username = ? AND password = ?";
    db.query(sqlSuperuser, [username, password], (err, resultsSuperuser) => {
      if (err) {
        console.error("Error during login (superuser database):", err);
        return res.status(500).json({ error: "Database error" });
      }

      // If found in 'superuser' database, redirect to admin page
      if (resultsSuperuser.length > 0) {
        return res.json({
          success: true,
          message: "Admin login successful!",
          redirectTo: "/admin", 
        });
      } 
      else {
        // Login failed
        return res.json({
          success: false,
          message: "Invalid username or password.",
        });
      }
    });
  });
});

const port = 8082;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
