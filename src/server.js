// GPT GENERATED

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const app = express();
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "user_management",
});

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
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));