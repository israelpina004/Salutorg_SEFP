// Connects to MySQL databases.


// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors")


// const app = express()
// app.use(cors)
// app.use(express.json())


// const db = mysql.createConnection({
//     // Connection parameters
// })


// app.post('/SignUpDB', (req, res) =>{
//     // Queries to add accounts to the login database.
//     // Should make it so that sign ups are only admitted by a super-user.
// })


// const port = 3000;
// app.listen(port, () => {
//     console.log("Server listening on port ${port}");
// })
// GPT GENERATED


const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());


// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb",
});
/*
// Route to register a new user (Viewer applies to become a User)
app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;


  // Check if email or username already exists
  const existingUser = await db
    .promise()
    .query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username]);


  if (existingUser[0].length > 0) {
    return res.status(400).json({ error: "Email or username already exists" });
  }


  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);


  // Insert the user with 'pending' status
  db.query(
    "INSERT INTO users (email, username, password, role, status) VALUES (?, ?, ?, 'viewer', 'pending')",
    [email, username, hashedPassword],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error registering user" });
      }
      res.status(201).json({ message: "Application submitted for approval" });
    }
  );
});


// Route to get all pending applications (SuperUser approval screen)
app.get("/api/pending-approvals", (req, res) => {
  db.query("SELECT id, email, username, created_at FROM users WHERE status = 'pending'", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching pending approvals" });
    }
    res.json(results);
  });
});


// Route to approve or reject a user
app.post("/api/approve", (req, res) => {
  const { id, action } = req.body;


  // Validate action
  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }


  const status = action === "approve" ? "approved" : "rejected";


  db.query("UPDATE users SET status = ? WHERE id = ?", [status, id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error updating user status" });
    }
    res.json({ message: `User ${action}d successfully` });
  });
});*/


//Akram Backend
//Differences:
//Database name changed to "mydb"
//Added new column to user table called balance
//ALTER TABLE user ADD COLUMN balance DECIMAL(10, 2) DEFAULT 0.00;


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database.");
});


app.get('/', (req, res) => {
  let sql = "SELECT * FROM user";
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
  });
});


// Get balance for a specific user
app.get('/balance/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT balance FROM user WHERE user_ID = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ balance: results[0]?.balance || 0 });
  });
});


// Update balance (deposit or withdrawal)
app.post("/update-balance", (req, res) => {
  const { userId, amount } = req.body;
  const query = "UPDATE user SET balance = balance + ? WHERE user_ID = ?";
  db.query(query, [amount, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});


// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
