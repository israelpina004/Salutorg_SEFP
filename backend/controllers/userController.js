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
        // Update the is_loggedin attribute to TRUE
        const updateSql = "UPDATE user SET is_loggedin = TRUE WHERE username = ?";
        db.query(updateSql, [username], (updateErr) => {
          if (updateErr) return res.status(500).json({ error: "Database update error" });

          return res.json({ success: true, message: "Login successful!", redirectTo: "/home" });
        });
      } else {
        return res.json({ success: false, message: "Invalid username or password." });
      }
    } else {
      return res.json({ success: false, message: "Invalid username or password." });
    }
  });
};

const getLoggedInUser = (req, res) => {
  const sql = "SELECT * FROM user WHERE is_loggedin = TRUE";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No users are currently logged in." });
    }

    // Assuming only one user is logged in
    const loggedInUser = results[0]; // Get the first logged-in user details
    return res.json({ success: true, loggedInUser });
  });
};

const logoutUser = (req, res) => {
  const sqlGetLoggedInUser = "SELECT username FROM user WHERE is_loggedin = TRUE";

  // Fetch the currently logged-in user
  db.query(sqlGetLoggedInUser, (getErr, results) => {
    if (getErr) {
      console.error("Database error while fetching logged-in user:", getErr);
      return res.status(500).json({ success: false, message: "Database error during fetching logged-in user." });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No user is currently logged in." });
    }

    // There should only be one logged-in user based on your website logic
    const loggedInUser = results[0].username;

    // Proceed to log out the logged-in user
    const sqlUpdate = "UPDATE user SET is_loggedin = FALSE WHERE username = ?";
    db.query(sqlUpdate, [loggedInUser], (updateErr, updateResults) => {
      if (updateErr) {
        console.error("Database error during logout:", updateErr);
        return res.status(500).json({ success: false, message: "Database error during logout." });
      }

      console.log(`User '${loggedInUser}' successfully logged out.`);
      return res.json({ success: true, message: `Logout successful for user '${loggedInUser}'!` });
    });
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



module.exports = 
{ registerUser, 
  loginUser, 
  getUsers, 
  getBalance, 
  updateBalance,
  logoutUser,
  getLoggedInUser,
 };
