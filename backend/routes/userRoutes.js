const express = require("express");
const bcrypt = require("bcrypt");

const {
  registerUser,
  loginUser,
  getBalance,
  updateBalance,
  getUsers,
  logoutUser,
  getLoggedInUser,
  addComment, 
  getComments
} = require("../controllers/userController");

const router = express.Router();

// Routes to the functions
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getlogin", getLoggedInUser);
router.post("/logout", logoutUser);
router.get("/balance/:userId", getBalance);
router.post("/update-balance", updateBalance);
router.post("/addcomment", addComment);
router.get("/getcomment", getComments);
router.get("/", getUsers);

module.exports = router;


// module.exports = (db) => {
//   // Route to register a new user
//   router.post("/register", async (req, res) => {
//     const { email, username, password } = req.body;

//     const existingUser = await db
//       .promise()
//       .query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username]);

//     if (existingUser[0].length > 0) {
//       return res.status(400).json({ error: "Email or username already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     db.query(
//       "INSERT INTO users (email, username, password, role, status) VALUES (?, ?, ?, 'viewer', 'pending')",
//       [email, username, hashedPassword],
//       (err) => {
//         if (err) {
//           return res.status(500).json({ error: "Error registering user" });
//         }
//         res.status(201).json({ message: "Application submitted for approval" });
//       }
//     );
//   });

//   // Route to get all pending applications
//   router.get("/pending-approvals", (req, res) => {
//     db.query(
//       "SELECT id, email, username, created_at FROM users WHERE status = 'pending'",
//       (err, results) => {
//         if (err) {
//           return res.status(500).json({ error: "Error fetching pending approvals" });
//         }
//         res.json(results);
//       }
//     );
//   });

//   // Route to approve or reject a user
//   router.post("/approve", (req, res) => {
//     const { id, action } = req.body;

//     if (!["approve", "reject"].includes(action)) {
//       return res.status(400).json({ error: "Invalid action" });
//     }

//     const status = action === "approve" ? "approved" : "rejected";

//     db.query("UPDATE users SET status = ? WHERE id = ?", [status, id], (err) => {
//       if (err) {
//         return res.status(500).json({ error: "Error updating user status" });
//       }
//       res.json({ message: `User ${action}d successfully` });
//     });
//   });

//   return router;
// };