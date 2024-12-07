const bcrypt = require("bcrypt");
const db = require("../models/db");

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      const passwordMatch = await bcrypt.compare(password, results[0].password);
      if (passwordMatch) {
        return res.json({ success: true, message: "Login successful!", redirectTo: "/home" });
      } else {
        return res.json({ success: false, message: "Invalid username or password." });
      }
    } else {
      return res.json({ success: false, message: "Invalid username or password." });
    }
  });
};

const getUsers = (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch users." });
    res.json(results);
  });
};

const getBalance = (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT balance FROM user WHERE user_ID = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ balance: results[0]?.balance || 0 });
  });
};

const updateBalance = (req, res) => {
  const { userId, amount } = req.body;
  const query = "UPDATE user SET balance = balance + ? WHERE user_ID = ?";
  db.query(query, [amount, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
};

const getPendingApprovals = (req, res) => {
  const query = "SELECT id, email, username, created_at FROM user WHERE status = 'pending'";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch pending approvals." });
    }
    res.json(results);
  });
};

const approveOrRejectUser = (req, res) => {
  const { id, action } = req.body;

  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }

  const status = action === "approve" ? "approved" : "rejected";
  const query = "UPDATE user SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update user status." });
    }
    res.json({ message: `User ${action}d successfully` });
  });
};

module.exports = { registerUser, loginUser, getUsers, getBalance, updateBalance, getPendingApprovals, approveOrRejectUser };
